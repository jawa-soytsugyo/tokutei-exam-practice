/*
 * Construction vocabulary -> practice-question generator.
 *
 * This file is deliberately side-effect free. It does not touch the DOM,
 * localStorage, practice.js, or any sector page.
 *
 * Required vocabulary shape (aliases shown are also accepted):
 * {
 *   id: 1,
 *   categoryId: 1,
 *   termJa: "建設",              // aliases: japanese, term, ja
 *   readingKana: "けんせつ",     // optional aliases: kana, readingJa, furigana
 *   readingRomaji: "kensetsu",  // aliases: romaji, reading
 *   meaningUz: "qurilish",      // aliases: uzbek, meaning, uz
 *   meaningEn: "construction"   // optional; aliases: english, en
 * }
 *
 * Browser:
 *   const questions =
 *     ConstructionQuestionGenerator.generate(window.CONSTRUCTION_VOCABULARY, "uz");
 *
 * CommonJS test runner:
 *   const generator = require("./construction-question-generator.js");
 */
(function expose(root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.ConstructionQuestionGenerator = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function createApi() {
  "use strict";

  const REQUIRED_VOCABULARY_COUNT = 1000;
  const SUPPORTED_LANGUAGES = Object.freeze(["uz", "ja", "en", "ne", "my"]);
  const JAPANESE_CHARACTER = /[\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF\u3005\u3006\u30F6]/u;
  const FOREIGN_SCRIPT = /[A-Za-z\u00C0-\u024F\u0400-\u052F\u0600-\u06FF\u0900-\u097F\u0E00-\u0E7F\u1100-\u11FF\uAC00-\uD7AF]/u;
  const BROKEN_GLYPH = /[\u25A0\uFFFD]/u;
  const JAPANESE_ONLY_TERM_OVERRIDES = Object.freeze({
    "FRP防水": "繊維強化プラスチック防水",
    "LAN配線": "構内通信網配線",
    "CAD図面": "キャド図面",
    "BIM": "ビム"
  });

  function fail(message) {
    throw new Error(`[construction-question-generator] ${message}`);
  }

  function firstText(record, keys) {
    for (const key of keys) {
      if (typeof record[key] === "string" && record[key].trim()) {
        return record[key].trim();
      }
    }
    return "";
  }

  function normalizeRecord(record, index) {
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      fail(`Vocabulary record ${index + 1} must be an object.`);
    }

    const id = record.id ?? index + 1;
    const termJa = firstText(record, ["termJa", "japanese", "term", "ja"]);
    const suppliedPracticeTerm = firstText(record, ["termJaPractice"]);
    const termJaPractice = suppliedPracticeTerm || JAPANESE_ONLY_TERM_OVERRIDES[termJa] || termJa;
    const readingKana = firstText(record, ["readingKana", "kana", "readingJa", "furigana"]);
    const readingRomaji = firstText(record, ["readingRomaji", "romaji", "reading"]);
    const meaningUz = firstText(record, ["meaningUz", "uzbek", "meaning", "uz"]);
    const meaningEn = firstText(record, ["meaningEn", "english", "en"]);
    const meaningNe = firstText(record, ["meaningNe", "nepali", "ne"]);
    const meaningMy = firstText(record, ["meaningMy", "myanmar", "my"]);

    if (!termJa) {
      fail(`Vocabulary record ${id} has no Japanese term.`);
    }
    if (BROKEN_GLYPH.test(termJa)) {
      fail(`Vocabulary record ${id} Japanese term contains a broken replacement glyph.`);
    }

    return {
      id,
      categoryId: record.categoryId ?? record.sectionId ?? record.category ?? "uncategorized",
      termJa,
      termJaPractice,
      readingKana,
      readingRomaji,
      meaningUz,
      meaningEn,
      meaningNe,
      meaningMy,
      source: record
    };
  }

  function normalizeVocabulary(vocabulary) {
    if (!Array.isArray(vocabulary)) {
      fail("Vocabulary must be an array.");
    }
    if (vocabulary.length !== REQUIRED_VOCABULARY_COUNT) {
      fail(`Expected exactly ${REQUIRED_VOCABULARY_COUNT} vocabulary records; received ${vocabulary.length}.`);
    }

    const records = vocabulary.map(normalizeRecord);
    const ids = new Set();

    for (const record of records) {
      const key = String(record.id);
      if (ids.has(key)) {
        fail(`Duplicate vocabulary id: ${key}.`);
      }
      ids.add(key);
    }

    return records;
  }

  function normalizeLanguage(language) {
    const normalized = String(language || "").toLowerCase();
    if (!SUPPORTED_LANGUAGES.includes(normalized)) {
      fail(`Unsupported language "${language}". Use ${SUPPORTED_LANGUAGES.join(", ")}.`);
    }
    return normalized;
  }

  function assertJapaneseOnly(value, context) {
    if (typeof value !== "string" || !value.trim()) {
      fail(`${context} must be non-empty Japanese text.`);
    }
    if (FOREIGN_SCRIPT.test(value)) {
      fail(`${context} contains foreign-language characters: "${value}".`);
    }
    if (BROKEN_GLYPH.test(value)) {
      fail(`${context} contains a broken replacement glyph.`);
    }
    if (!JAPANESE_CHARACTER.test(value)) {
      fail(`${context} does not contain Japanese characters: "${value}".`);
    }
  }

  function hashText(value) {
    let hash = 2166136261;
    const text = String(value);
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function makeRandom(seed) {
    let state = seed >>> 0;
    return function random() {
      state += 0x6D2B79F5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffled(items, seed) {
    const result = [...items];
    const random = makeRandom(seed);
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function clueFor(record, language) {
    let clue;

    if (language === "ja") {
      clue = String(record.categoryId);
    } else if (language === "uz") {
      if (!record.meaningUz) {
        fail(`Uzbek mode requires meaningUz for vocabulary id ${record.id}.`);
      }
      clue = record.meaningUz;
    } else if (language === "en" && record.meaningEn) {
      clue = record.meaningEn;
    } else if (language === "ne" && record.meaningNe) {
      clue = record.meaningNe;
    } else if (language === "my" && (record.meaningMy || record.meaningEn)) {
      clue = record.meaningMy || record.meaningEn;
    } else if (record.readingRomaji) {
      clue = record.readingRomaji;
    } else {
      fail(`English mode requires meaningEn or readingRomaji for vocabulary id ${record.id}.`);
    }

    if (BROKEN_GLYPH.test(clue)) {
      fail(`Vocabulary id ${record.id} contains a broken replacement glyph in its ${language} clue.`);
    }

    return clue;
  }

  function promptFor(record, language, clue) {
    if (language === "ja") {
      return `次のうち「${clue}」に分類される建設用語はどれですか。`;
    }
    if (language === "uz") {
      return `“${clue}” ma'nosiga mos yaponcha qurilish atamasini tanlang.`;
    }
    if (language === "ne") {
      return `“${clue}” अर्थसँग मिल्ने जापानी निर्माण शब्द छान्नुहोस्।`;
    }
    if (language === "my") {
      return `“${clue}” အဓိပ္ပာယ်နှင့် ကိုက်ညီသော ဂျပန်ဆောက်လုပ်ရေးဝေါဟာရကို ရွေးပါ။`;
    }
    if (record.meaningEn) {
      return `Choose the Japanese construction term that means “${clue}”.`;
    }
    return `Choose the Japanese construction term read “${clue}”.`;
  }

  function explanationFor(record, language) {
    if (language === "ja") {
      return `${record.termJaPractice}（${record.categoryId}）`;
    }
    if (language === "uz") {
      const reading = record.readingKana || record.readingRomaji;
      return `${record.termJa}${reading ? `（${reading}）` : ""} — ${record.meaningUz}`;
    }
    const reading = record.readingKana || record.readingRomaji;
    if (language === "ne") {
      const meaning = record.meaningNe ? ` — ${record.meaningNe}` : "";
      return `${record.termJa}${reading ? `（${reading}）` : ""}${meaning}`;
    }
    if (language === "my") {
      const meaning = record.meaningMy || record.meaningEn;
      return `${record.termJa}${reading ? `（${reading}）` : ""}${meaning ? ` — ${meaning}` : ""}`;
    }
    const meaning = record.meaningEn ? ` — ${record.meaningEn}` : "";
    return `${record.termJa}${reading ? `（${reading}）` : ""}${meaning}`;
  }

  function visibleTerm(record, language) {
    return language === "ja" ? record.termJaPractice : record.termJa;
  }

  function buildDistractors(record, records, language, count, seed) {
    const targetClue = clueFor(record, language);
    const seenTerms = new Set([visibleTerm(record, language)]);

    function eligible(candidate) {
      if (String(candidate.id) === String(record.id)) return false;
      if (seenTerms.has(visibleTerm(candidate, language))) return false;

      let candidateClue;
      try {
        candidateClue = clueFor(candidate, language);
      } catch (_error) {
        return false;
      }

      return candidateClue !== targetClue;
    }

    const sameCategory = records.filter(
      candidate => candidate.categoryId === record.categoryId && eligible(candidate)
    );
    const otherCategories = records.filter(
      candidate => candidate.categoryId !== record.categoryId && eligible(candidate)
    );
    const candidates = [
      ...shuffled(sameCategory, seed ^ 0x9E3779B9),
      ...shuffled(otherCategories, seed ^ 0x85EBCA6B)
    ];
    const distractors = [];

    for (const candidate of candidates) {
      const candidateTerm = visibleTerm(candidate, language);
      if (seenTerms.has(candidateTerm)) continue;
      distractors.push(candidateTerm);
      seenTerms.add(candidateTerm);
      if (distractors.length === count) break;
    }

    if (distractors.length !== count) {
      fail(`Could not build ${count} unique distractors for vocabulary id ${record.id}.`);
    }

    return distractors;
  }

  function validateJapaneseQuestion(question) {
    assertJapaneseOnly(question.prompt, `Question ${question.id} prompt`);
    assertJapaneseOnly(question.correct, `Question ${question.id} correct answer`);
    assertJapaneseOnly(question.explanation, `Question ${question.id} explanation`);
    question.options.forEach((option, index) => {
      assertJapaneseOnly(option, `Question ${question.id} option ${index + 1}`);
    });
  }

  function generate(vocabulary, language, configuration) {
    const records = normalizeVocabulary(vocabulary);
    const lang = normalizeLanguage(language);
    const config = configuration || {};
    const optionCount = config.optionCount ?? 4;
    const baseSeed = Number.isInteger(config.seed) ? config.seed : 20260729;

    if (!Number.isInteger(optionCount) || optionCount < 2 || optionCount > 4) {
      fail("optionCount must be an integer from 2 through 4.");
    }

    const questions = records.map((record, index) => {
      const clue = clueFor(record, lang);
      const seed = hashText(`${baseSeed}:${lang}:${record.id}:${index}`);
      const distractors = buildDistractors(
        record,
        records,
        lang,
        optionCount - 1,
        seed
      );
      const question = {
        id: `construction-${record.id}-${lang}`,
        vocabularyId: record.id,
        categoryId: record.categoryId,
        language: lang,
        prompt: promptFor(record, lang, clue),
        correct: visibleTerm(record, lang),
        distractors,
        options: shuffled([visibleTerm(record, lang), ...distractors], seed ^ 0xC2B2AE35),
        explanation: explanationFor(record, lang)
      };

      if (lang === "ja") {
        validateJapaneseQuestion(question);
      }

      return question;
    });

    if (questions.length !== REQUIRED_VOCABULARY_COUNT) {
      fail(`Generated ${questions.length} questions instead of ${REQUIRED_VOCABULARY_COUNT}.`);
    }
    if (new Set(questions.map(question => question.id)).size !== REQUIRED_VOCABULARY_COUNT) {
      fail("Generated question ids are not unique.");
    }

    return questions;
  }

  function toLegacyTuples(questions) {
    if (!Array.isArray(questions)) {
      fail("Questions must be an array.");
    }
    return questions.map(question => [
      question.prompt,
      question.correct,
      ...question.distractors
    ]);
  }

  return Object.freeze({
    REQUIRED_VOCABULARY_COUNT,
    SUPPORTED_LANGUAGES,
    generate,
    toLegacyTuples,
    assertJapaneseOnly
  });
}));
