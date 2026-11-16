"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const languages = ["uz", "ja", "en", "ne", "my"];
const files = {
  agriculture: "agriculture-question-data.js",
  automobile: "automobile-question-data.js",
  construction: "construction-mock-data.js",
  foodmanufacturing: "foodmanufacturing-question-data.js",
  foodservice: "foodservice-question-data.js",
  lodging: "lodging-question-data.js"
};
const japanese = /[\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF]/u;
const broken = /[\u25A0\uFFFD]|(?:縺|繧|蜿|譁|隱|陦|闔|逡){2,}/u;
const generator = require(path.join(root, "sector-question-generator.js"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function categoryCounts(items) {
  return Object.fromEntries([...items.reduce((counts, item) => {
    counts.set(item.category, (counts.get(item.category) || 0) + 1);
    return counts;
  }, new Map())].sort(([left], [right]) => left.localeCompare(right, "ja")));
}

const summary = {};
for (const [sector, file] of Object.entries(files)) {
  const data = require(path.join(root, file));
  const browserSandbox = {};
  browserSandbox.globalThis = browserSandbox;
  vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), browserSandbox, { filename: file });
  assert(browserSandbox.SECTOR_QUESTION_DATA?.[sector]?.sector === sector, `${file} browser registration failed.`);
  const normalized = generator.validateDataset(data);
  assert(normalized.sector === sector, `${file} exports sector ${normalized.sector}.`);
  assert(normalized.sources.every((source) => /^https:\/\//u.test(source.url)), `${sector} has a non-HTTPS source.`);
  assert(
    new Set(normalized.blueprints.map(item => JSON.stringify(item.distractorsJa))).size === normalized.blueprints.length,
    `${sector} reuses a complete distractor set between base questions.`
  );
  assert(
    normalized.blueprints.every(item => item.explanation.ne),
    `${sector} is missing Nepali explanations.`
  );
  assert(
    normalized.blueprints.every(item => !item.promptJa.includes('画像')),
    `${sector} contains a prompt that depends on an absent image.`
  );

  const counts = {};
  for (const language of languages) {
    const questions = generator.generate(data, language, { seed: 20260816 });
    const expectedOptionCount = generator.optionCountForSector(sector);
    assert(questions.length === generator.QUESTIONS_PER_SECTOR && questions.length === 290, `${sector}/${language} does not equal 290 questions.`);
    assert(new Set(questions.map((item) => item.id)).size === questions.length, `${sector}/${language} has duplicate ids.`);
    assert(new Set(questions.map((item) => item.prompt)).size === questions.length, `${sector}/${language} has duplicate prompts.`);
    for (const question of questions) {
      assert(japanese.test(question.prompt) && !broken.test(question.prompt), `${question.id} has invalid Japanese prompt text.`);
      assert(
        question.options.length === expectedOptionCount && new Set(question.options).size === expectedOptionCount,
        `${question.id} needs ${expectedOptionCount} unique options.`
      );
      assert(question.options.filter((option) => option === question.correct).length === 1, `${question.id} answer integrity failed.`);
      assert(question.options.every((option) => japanese.test(option) && !broken.test(option)), `${question.id} has an invalid option.`);
      assert(question.explanation && !broken.test(question.explanation), `${question.id} has an invalid explanation.`);
    }
    counts[language] = questions.length;
  }

  const html = fs.readFileSync(path.join(root, `${sector}.html`), "utf8");
  assert(html.includes("sector-question-generator.js"), `${sector}.html does not load the common generator.`);
  assert(html.includes(file), `${sector}.html does not load ${file}.`);
  if (sector !== "construction") {
    assert(html.includes(`${sector}-vocabulary-1000.js`), `${sector}.html does not load its vocabulary practice data.`);
  }
  summary[sector] = {
    blueprints: normalized.blueprints.length,
    practiceVariants: generator.QUESTIONS_PER_SECTOR,
    totalQuestions: counts.ja,
    categories: categoryCounts(normalized.blueprints),
    officialSources: normalized.sources.length
  };
}

const practice = fs.readFileSync(path.join(root, "practice.js"), "utf8");
assert(practice.includes("merged.length !== expectedRemoteQuestionCount"), "practice.js does not reject stale or mismatched remote banks.");
console.log(JSON.stringify({ ok: true, summary }, null, 2));
