"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const sectors = ["agriculture", "automobile", "foodmanufacturing", "foodservice", "lodging"];
const requiredLanguages = ["uz", "ja", "en", "ne"];
const japaneseText = /[\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF]/u;
require(path.join(root, "sector-vocabulary-reviewed.js"));
const reviewedVocabulary = global.SECTOR_REVIEWED_VOCABULARY;
const requiredReviewedLanguages = ["uz", "ja", "en", "ne", "my"];
const forbiddenScripts = [
  "firebase-bootstrap.js",
  "sector-vocabulary-generator.js",
  "simple-vocab-firestore.js"
];
const questionData = Object.fromEntries(sectors.map((sector) => [
  sector,
  require(path.join(root, `${sector}-question-data.js`))
]));
const vocabularyDataContext = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, "foodmanufacturing-vocabulary-1000.js"), "utf8"),
  vocabularyDataContext,
  { filename: "foodmanufacturing-vocabulary-1000.js" }
);
const foodmanufacturingVocabulary = vocabularyDataContext.window.FOODMANUFACTURING_VOCABULARY_1000;
const lodgingVocabularyContext = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, "lodging-vocabulary-1000.js"), "utf8"),
  lodgingVocabularyContext,
  { filename: "lodging-vocabulary-1000.js" }
);
const lodgingVocabulary = lodgingVocabularyContext.LODGING_VOCABULARY_1000;

const automobileVocabularyContext = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, "automobile-vocabulary-1000.js"), "utf8"),
  automobileVocabularyContext,
  { filename: "automobile-vocabulary-1000.js" }
);
const automobileVocabulary = automobileVocabularyContext.window.AUTOMOBILE_VOCABULARY_1000;

const foodserviceVocabularyContext = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, "foodservice-vocabulary-1000.js"), "utf8"),
  foodserviceVocabularyContext,
  { filename: "foodservice-vocabulary-1000.js" }
);
const foodserviceVocabulary = foodserviceVocabularyContext.FOODSERVICE_VOCABULARY_1000 || foodserviceVocabularyContext.window.FOODSERVICE_VOCABULARY_1000;

const agricultureVocabularyContext = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, "agriculture-vocabulary-1000.js"), "utf8"),
  agricultureVocabularyContext,
  { filename: "agriculture-vocabulary-1000.js" }
);
const agricultureVocabulary = agricultureVocabularyContext.AGRICULTURE_VOCABULARY_1000 || agricultureVocabularyContext.window.AGRICULTURE_VOCABULARY_1000;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function paragraphAttributes(article, className) {
  const pattern = new RegExp(`<p class="${className}"([^>]*)>`, "u");
  return article.match(pattern)?.[1] || "";
}

function visibleTerm(article) {
  const html = article.match(/<p class="word__term">([\s\S]*?)<\/p>/u)?.[1] || "";
  return html
    .replace(/<rt>[\s\S]*?<\/rt>/gu, "")
    .replace(/<[^>]+>/gu, "")
    .trim();
}

function hasFuriganaForKanji(article) {
  const html = article.match(/<p class="word__term">([\s\S]*?)<\/p>/u)?.[1] || "";
  return !/[\u3400-\u9FFF]/u.test(html.replace(/<rt>[\s\S]*?<\/rt>/gu, ""))
    || /<ruby>[^<]*[\u3400-\u9FFF][^<]*<rt>[^<]+<\/rt><\/ruby>/u.test(html);
}

for (const sector of sectors) {
  const file = `${sector}-vocab.html`;
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const cards = [...html.matchAll(/<article class="word">([\s\S]*?)<\/article>/gu)]
    .map((match) => match[1]);
  const reviewedTerms = reviewedVocabulary[sector];
  const importedTerms = sector === "foodmanufacturing"
    ? foodmanufacturingVocabulary
    : sector === "lodging"
      ? lodgingVocabulary
      : sector === "automobile"
        ? automobileVocabulary
        : sector === "foodservice"
          ? foodserviceVocabulary
          : sector === "agriculture"
            ? agricultureVocabulary
            : [];
  const curatedTerms = [
    ...cards.map(visibleTerm),
    ...reviewedTerms.map((entry) => entry.term)
  ];
  const terms = [...curatedTerms, ...importedTerms.map((entry) => entry.term)];

  const expectedStaticCount = sector === "foodmanufacturing" ? 30 : 10;
  assert(
    cards.length === expectedStaticCount,
    `${file} must contain exactly ${expectedStaticCount} curated vocabulary cards.`
  );
  assert(curatedTerms.every((term) => japaneseText.test(term)), `${file} contains a missing or non-Japanese curated term.`);
  assert(
    new Set(curatedTerms).size === curatedTerms.length,
    `${file} contains duplicate curated vocabulary terms.`
  );
  assert(cards.every(hasFuriganaForKanji), `${file} contains a kanji term without furigana.`);
  if (sector === "foodmanufacturing" || sector === "lodging" || sector === "automobile" || sector === "foodservice" || sector === "agriculture") {
    assert(importedTerms.length === 1000, `${file} must load exactly 1,000 imported vocabulary records.`);
    assert(
      new Set(importedTerms.map((entry) => entry.sourceId)).size === importedTerms.length,
      `${file} contains duplicate imported vocabulary IDs.`
    );
    assert(
      new Set(importedTerms.map((entry) => entry.term)).size === importedTerms.length,
      `${file} contains duplicate imported vocabulary terms.`
    );
    assert(
      importedTerms.every((entry) => entry.term && entry.reading && /^[\u3040-\u309F\u30FC・,，.。()（） ]+$/u.test(entry.reading)),
      `${file} contains an invalid imported vocabulary term or reading.`
    );
    assert(
      importedTerms.every((entry) => /[\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF]|[A-Za-z0-9]/u.test(entry.term)),
      `${file} contains an imported vocabulary term without Japanese or Latin/digit characters.`
    );
    for (const [importedIndex, entry] of importedTerms.entries()) {
      for (const language of ["uz", "en", "ne", "my"]) {
        assert(
          typeof entry.meaning[language] === "string" && entry.meaning[language].trim(),
          `${entry.sourceId} is missing its ${language} translation.`
        );
      }
      if (sector === "automobile" || sector === "lodging" || sector === "foodservice" || sector === "agriculture") {
        assert(
          Number.isInteger(entry.sourcePage) && entry.sourcePage >= 3 && entry.sourcePage <= 62,
          `${entry.sourceId} has an invalid PDF source page.`
        );
        assert(
          entry.sourceId === `${sector}-pdf-${String(importedIndex + 1).padStart(4, "0")}`,
          `${entry.sourceId} does not match its position in the PDF vocabulary.`
        );
      }
    }
    if (sector === "lodging") {
      const expectedCategories = new Set([
        "lodgingTypes", "reservations", "guestService", "housekeeping", "meals",
        "ryokanCulture", "tourism", "safety", "work", "sales", "systems", "basics",
        "additional"
      ]);
      assert(
        importedTerms.every((entry) => expectedCategories.has(entry.category))
          && new Set(importedTerms.map((entry) => entry.category)).size === expectedCategories.size,
        `${file} must include the 13 expected lodging vocabulary categories.`
      );
      assert(!html.includes("lodging-vocabulary-1000.pdf"), `${file} must not link to the source PDF.`);
    }
    assert(
      html.includes(`${sector}-vocabulary-1000.js`),
      `${file} does not load its imported vocabulary.`
    );
  }
  const blueprints = new Map(questionData[sector].blueprints.map((blueprint) => [
    blueprint.id,
    blueprint
  ]));
  const sources = new Map(questionData[sector].sources.map((source) => [
    source.id,
    source
  ]));

  for (const [index, entry] of reviewedTerms.entries()) {
    assert(entry.term && entry.reading, `${sector} reviewed term ${index + 1} is missing its term or reading.`);
    assert(
      /[\u3400-\u9FFF]/u.test(entry.term) ? japaneseText.test(entry.reading) : true,
      `${sector} reviewed term ${entry.term} has an invalid Japanese reading.`
    );
    assert(
      entry.meaning && entry.note,
      `${sector} reviewed term ${entry.term} is missing its meaning or note.`
    );
    for (const language of requiredReviewedLanguages) {
      assert(
        typeof entry.meaning[language] === "string" && entry.meaning[language].trim(),
        `${sector} reviewed term ${entry.term} is missing its ${language} meaning.`
      );
      assert(
        typeof entry.note[language] === "string" && entry.note[language].trim(),
        `${sector} reviewed term ${entry.term} is missing its ${language} note.`
      );
    }
    const sourceBlueprint = blueprints.get(entry.sourceId);
    if (sourceBlueprint) {
      assert(
        sourceBlueprint.sourceIds.length > 0
          && sourceBlueprint.sourceIds.every((sourceId) => sources.has(sourceId)),
        `${sector} reviewed term ${entry.term} references a blueprint without valid official sources.`
      );
      assert(
        sourceBlueprint.correctJa.includes(entry.term),
        `${sector} reviewed term ${entry.term} does not appear in its cited correct answer.`
      );
    } else {
      const source = sources.get(entry.sourceId);
      assert(source, `${sector} reviewed term ${entry.term} references an unknown source.`);
      assert(
        Number.isInteger(entry.sourcePage) && entry.sourcePage > 0,
        `${sector} reviewed term ${entry.term} must cite a positive PDF page number.`
      );
      assert(
        typeof entry.sourceUrl === "string" && /^https:\/\//u.test(entry.sourceUrl),
        `${sector} reviewed term ${entry.term} must cite a secure source document URL.`
      );
      assert(
        new URL(entry.sourceUrl).hostname === new URL(source.url).hostname,
        `${sector} reviewed term ${entry.term} document must match its official source organization.`
      );
    }
  }

  for (const [index, card] of cards.entries()) {
    for (const className of ["word__meaning", "word__note"]) {
      const attributes = paragraphAttributes(card, className);
      for (const language of requiredLanguages) {
        assert(
          new RegExp(`data-${language}="[^"]+"`, "u").test(attributes),
          `${file} card ${index + 1} is missing its ${language} ${className}.`
        );
      }
    }
  }

  for (const script of forbiddenScripts) {
    assert(!html.includes(script), `${file} must not replace reviewed cards using ${script}.`);
  }

  console.log(
    `${sector}: ${new Set(terms).size} unique terms; `
    + `${requiredLanguages.join(", ")} core translations and five-language reviewed entries present.`
  );
}
