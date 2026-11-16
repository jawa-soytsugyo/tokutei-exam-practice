"use strict";

const fs = require("fs");
const path = require("path");

const projectId = process.argv[2];
if (!projectId) {
  console.error("Usage: node tools/seed-firestore.js <project-id>");
  process.exit(1);
}

const root = path.resolve(__dirname, "..");
const seed = JSON.parse(fs.readFileSync(path.join(root, "firestore-seed.json"), "utf8"));

function firestoreValue(value) {
  if (value === null) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(firestoreValue) } };
  }
  if (typeof value === "object") {
    return {
      mapValue: {
        fields: Object.fromEntries(
          Object.entries(value).map(([key, item]) => [key, firestoreValue(item)])
        )
      }
    };
  }
  throw new Error(`Unsupported Firestore value: ${typeof value}`);
}

async function accessToken() {
  const authPath = path.join(
    process.env.APPDATA,
    "npm",
    "node_modules",
    "firebase-tools",
    "lib",
    "auth.js"
  );
  const auth = require(authPath);
  const account = auth.getGlobalDefaultAccount();
  if (!account?.tokens?.refresh_token) {
    throw new Error("Firebase CLI is not logged in.");
  }
  const tokens = await auth.getAccessToken(account.tokens.refresh_token, [
    "https://www.googleapis.com/auth/cloud-platform"
  ]);
  if (!tokens?.access_token) throw new Error("Could not obtain a Firebase access token.");
  return tokens.access_token;
}

async function main() {
  const token = await accessToken();
  for (const item of seed.documents) {
    const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}` +
      `/databases/(default)/documents/content/${encodeURIComponent(item.id)}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fields: Object.fromEntries(
          Object.entries(item.data).map(([key, value]) => [key, firestoreValue(value)])
        )
      })
    });
    if (!response.ok) {
      throw new Error(`${item.id}: ${response.status} ${await response.text()}`);
    }
    console.log(`Seeded content/${item.id}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
