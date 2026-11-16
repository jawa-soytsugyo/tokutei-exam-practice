"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
require(path.join(root, "sector-vocabulary-reviewed.js"));
const reviewedVocabulary = global.SECTOR_REVIEWED_VOCABULARY;
const languages = ["uz", "ja", "en", "ne", "my"];
const sectors = [
  "construction",
  "agriculture",
  "automobile",
  "foodservice",
  "foodmanufacturing",
  "lodging"
];
const QUESTION_CHUNK_SIZE = 180;
const MAX_DOCUMENT_BYTES = 900000;
const dataFiles = {
  construction: "construction-mock-data.js",
  agriculture: "agriculture-question-data.js",
  automobile: "automobile-question-data.js",
  foodservice: "foodservice-question-data.js",
  foodmanufacturing: "foodmanufacturing-question-data.js",
  lodging: "lodging-question-data.js"
};

function loadConstructionData() {
  global.window = {};
  require(path.join(root, "construction-vocab-data.js"));
  require(path.join(root, "construction-i18n.js"));
  const generator = require(path.join(root, "construction-question-generator.js"));
  const vocabulary = global.window.CONSTRUCTION_VOCABULARY;
  const categories = global.window.CONSTRUCTION_CATEGORIES;
  if (!Array.isArray(vocabulary) || vocabulary.length !== 1000) {
    throw new Error("Construction vocabulary must contain exactly 1,000 records.");
  }
  if (!Array.isArray(categories) || categories.length !== 23) {
    throw new Error("Construction vocabulary requires all 23 categories.");
  }
  return { vocabulary, categories, generator };
}

function loadSectorData() {
  return Object.fromEntries(sectors.map((sector) => {
    const data = require(path.join(root, dataFiles[sector]));
    return [sector, data];
  }));
}

function extractAttribute(tag, name) {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match ? match[1] : "";
}

function extractSimpleVocabulary(sector) {
  const html = fs.readFileSync(path.join(root, `${sector}-vocab.html`), "utf8");
  const articles = [...html.matchAll(/<article class="word">([\s\S]*?)<\/article>/gi)];
  const curatedItems = articles.map((article, index) => {
    const body = article[1];
    const term = body.match(/<p class="word__term">([\s\S]*?)<\/p>/i);
    const meaning = body.match(/<p class="word__meaning"([^>]*)>([\s\S]*?)<\/p>/i);
    const note = body.match(/<p class="word__note"([^>]*)>([\s\S]*?)<\/p>/i);
    return {
      id: index + 1,
      termHtml: term ? term[1].trim() : "",
      meaning: {
        uz: extractAttribute(meaning?.[1] || "", "data-uz") || meaning?.[2]?.trim() || "",
        ja: extractAttribute(meaning?.[1] || "", "data-ja"),
        en: extractAttribute(meaning?.[1] || "", "data-en"),
        ne: extractAttribute(meaning?.[1] || "", "data-ne"),
        my: extractAttribute(meaning?.[1] || "", "data-my")
          || extractAttribute(meaning?.[1] || "", "data-en")
      },
      note: {
        uz: extractAttribute(note?.[1] || "", "data-uz") || note?.[2]?.trim() || "",
        ja: extractAttribute(note?.[1] || "", "data-ja"),
        en: extractAttribute(note?.[1] || "", "data-en"),
        ne: extractAttribute(note?.[1] || "", "data-ne"),
        my: extractAttribute(note?.[1] || "", "data-my")
          || extractAttribute(note?.[1] || "", "data-en")
      }
    };
  });
  const reviewedItems = (reviewedVocabulary[sector] || []).map((entry, index) => ({
    id: curatedItems.length + index + 1,
    termHtml: `<ruby>${entry.term}<rt>${entry.reading}</rt></ruby>`,
    meaning: entry.meaning,
    note: entry.note,
    sourceId: entry.sourceId,
    sourcePage: entry.sourcePage || null,
    sourceUrl: entry.sourceUrl || null
  }));
  return [...curatedItems, ...reviewedItems];
}

function validateQuestions(sector, language, items, expectedOptionCount) {
  if (!Array.isArray(items) || items.length <= 1000) {
    throw new Error(`${sector}/${language} must contain more than 1,000 questions.`);
  }
  if (new Set(items.map((item) => item.id)).size !== items.length) {
    throw new Error(`${sector}/${language} contains duplicate question ids.`);
  }
  for (const item of items) {
    if (!item.prompt || !item.correct || !Array.isArray(item.options) || item.options.length !== expectedOptionCount) {
      throw new Error(`${sector}/${language}/${item.id} has an invalid question shape.`);
    }
    if (item.options.filter((option) => option === item.correct).length !== 1) {
      throw new Error(`${sector}/${language}/${item.id} must contain its answer exactly once.`);
    }
    if (new Set(item.options).size !== item.options.length) {
      throw new Error(`${sector}/${language}/${item.id} contains duplicate options.`);
    }
  }
}

function splitQuestionDocuments(sector, language, items, data, generatedAt) {
  const baseId = `questions-${sector}-${language}`;
  const chunks = [];
  for (let offset = 0; offset < items.length; offset += QUESTION_CHUNK_SIZE) {
    chunks.push(items.slice(offset, offset + QUESTION_CHUNK_SIZE));
  }
  const chunkIds = chunks.map((_, index) => (
    `${baseId}-${String(index + 1).padStart(3, "0")}`
  ));
  const documents = [{
    id: baseId,
    data: {
      kind: "question-manifest",
      sector,
      language,
      version: 2,
      updatedAt: generatedAt,
      count: items.length,
      chunkSize: QUESTION_CHUNK_SIZE,
      chunkIds,
      contentKind: "generated-practice-variants",
      generatedPracticeVariants: 1080,
      blueprintCount: data.blueprints.length,
      sources: data.sources
    }
  }];
  chunks.forEach((chunk, index) => {
    documents.push({
      id: chunkIds[index],
      data: {
        kind: "question-chunk",
        sector,
        language,
        version: 2,
        updatedAt: generatedAt,
        chunkIndex: index + 1,
        chunkCount: chunks.length,
        items: chunk
      }
    });
  });
  return documents;
}

function main() {
  const construction = loadConstructionData();
  const questionGenerator = require(path.join(root, "sector-question-generator.js"));
  const sectorData = loadSectorData();
  const documents = [];
  const generatedAt = new Date().toISOString();
  const questionCounts = {};

  for (const sector of sectors) {
    questionGenerator.validateDataset(sectorData[sector]);
  }

  documents.push({
    id: "metadata",
    data: {
      schemaVersion: 2,
      generatedAt,
      sectors,
      languages,
      questionChunkSize: QUESTION_CHUNK_SIZE,
      contentKind: "original-blueprints-with-generated-practice-variants",
      description: "Unofficial Tokutei Ginou practice variants generated from original syllabus-aligned blueprints"
    }
  });

  documents.push({
    id: "vocabulary-construction",
    data: {
      sector: "construction",
      version: 2,
      updatedAt: generatedAt,
      categories: construction.categories,
      items: construction.vocabulary
    }
  });

  for (const sector of sectors.filter((item) => item !== "construction")) {
    documents.push({
      id: `vocabulary-${sector}`,
      data: {
        sector,
        version: 2,
        updatedAt: generatedAt,
        items: extractSimpleVocabulary(sector)
      }
    });
  }

  for (const sector of sectors) {
    questionCounts[sector] = {};
    for (const language of languages) {
      const mockItems = questionGenerator.generate(sectorData[sector], language, { seed: 20260816 });
      const items = sector === "construction"
        ? [
          ...construction.generator.generate(construction.vocabulary, language, {
            optionCount: 4,
            seed: 20260729
          }),
          ...mockItems
        ]
        : mockItems;
      validateQuestions(sector, language, items, questionGenerator.optionCountForSector(sector));
      questionCounts[sector][language] = items.length;
      documents.push(...splitQuestionDocuments(
        sector,
        language,
        items,
        sectorData[sector],
        generatedAt
      ));
    }
  }

  documents[0].data.questionCounts = questionCounts;
  for (const document of documents) {
    const bytes = Buffer.byteLength(JSON.stringify(document.data));
    if (bytes >= MAX_DOCUMENT_BYTES) {
      throw new Error(`${document.id} is too large for a Firestore document: ${bytes} bytes.`);
    }
  }

  const output = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(root, "firestore-seed.json");
  fs.writeFileSync(output, JSON.stringify({ documents }, null, 2), "utf8");
  console.log(`Created ${output} with ${documents.length} documents.`);
  for (const sector of sectors) {
    console.log(`${sector}: ${questionCounts[sector].ja} questions per locale`);
  }
}

main();
