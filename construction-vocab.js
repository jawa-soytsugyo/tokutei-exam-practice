(function () {
  'use strict';

  const supportedLanguages = ['uz', 'ja', 'en', 'ne', 'my'];
  const savedLanguage = localStorage.getItem('language') || 'ja';
  let language = supportedLanguages.includes(savedLanguage) ? savedLanguage : 'ja';
  let vocabulary = Array.isArray(window.CONSTRUCTION_VOCABULARY)
    ? window.CONSTRUCTION_VOCABULARY
    : [];
  let categories = Array.isArray(window.CONSTRUCTION_CATEGORIES)
    ? window.CONSTRUCTION_CATEGORIES
    : [];
  let categoryByJapaneseName = new Map(categories.map((category) => [category.ja, category]));
  const japaneseOnlyTerms = window.CONSTRUCTION_JAPANESE_ONLY_TERMS || {};
  const pageSize = 40;

  const copy = {
    uz: {
      eyebrow: 'Tokutei Ginou • Qurilish',
      title: 'Qurilish lug‘ati',
      lead: 'Qurilish sohasidagi 1 000 ta yaponcha atamani 23 bo‘limda o‘rganing.',
      listTitle: 'Qurilish atamalari',
      searchLabel: 'Qidirish',
      searchPlaceholder: 'Yaponcha, o‘qilishi yoki o‘zbekcha ma’nosi',
      categoryLabel: 'Bo‘lim',
      filters: 'Lug‘at filtrlari',
      pagination: 'Sahifalash',
      allCategories: 'Barcha bo‘limlar',
      back: 'Ortga',
      previous: 'Oldingi',
      next: 'Keyingi',
      reading: 'O‘qilishi',
      languageLabel: 'Til',
      notebook: 'Xatolar daftarim',
      noResults: 'Mos atama topilmadi.',
      dataError: '1 000 ta atama ma’lumoti yuklanmadi.',
      themeLight: 'Tun rejimi',
      themeDark: 'Kun rejimi',
      count: (visible, total) => `${visible} / ${total} ta so‘z`,
      page: (current, total) => `${current} / ${total}-sahifa`
    },
    ja: {
      eyebrow: '特定技能・建設',
      title: '建設分野の語彙',
      lead: '建設分野で使う日本語1000語を23項目で学びます。',
      listTitle: '建設用語',
      searchLabel: '検索',
      searchPlaceholder: '日本語または項目名で検索',
      categoryLabel: '項目',
      filters: '語彙の絞り込み',
      pagination: 'ページ移動',
      allCategories: 'すべての項目',
      back: '戻る',
      previous: '前へ',
      next: '次へ',
      reading: '読み方',
      languageLabel: '言語',
      notebook: '間違いノート',
      noResults: '該当する用語がありません。',
      dataError: '1000語のデータを読み込めませんでした。',
      themeLight: '夜間表示',
      themeDark: '昼間表示',
      count: (visible, total) => `${visible} / ${total}語`,
      page: (current, total) => `${current} / ${total}ページ`
    },
    en: {
      eyebrow: 'Specified Skilled Worker • Construction',
      title: 'Construction vocabulary',
      lead: 'Study 1,000 Japanese construction terms across 23 categories.',
      listTitle: 'Construction terms',
      searchLabel: 'Search',
      searchPlaceholder: 'Japanese term or romanized reading',
      categoryLabel: 'Category',
      filters: 'Vocabulary filters',
      pagination: 'Pagination',
      allCategories: 'All categories',
      back: 'Back',
      previous: 'Previous',
      next: 'Next',
      reading: 'Reading',
      languageLabel: 'Language',
      notebook: 'My mistakes',
      noResults: 'No matching terms found.',
      dataError: 'The 1,000-term dataset could not be loaded.',
      themeLight: 'Dark mode',
      themeDark: 'Light mode',
      count: (visible, total) => `${visible} of ${total} words`,
      page: (current, total) => `Page ${current} of ${total}`
    },
    ne: {
      eyebrow: 'निर्दिष्ट दक्ष कामदार • निर्माण',
      title: 'निर्माण शब्दावली',
      lead: '२३ वर्गमा रहेका १,००० जापानी निर्माण शब्द अध्ययन गर्नुहोस्।',
      listTitle: 'निर्माण शब्दहरू',
      searchLabel: 'खोज्नुहोस्',
      searchPlaceholder: 'जापानी शब्द वा रोमन पढाइ',
      categoryLabel: 'वर्ग',
      filters: 'शब्दावली फिल्टर',
      pagination: 'पृष्ठ परिवर्तन',
      allCategories: 'सबै वर्ग',
      back: 'फर्कनुहोस्',
      previous: 'अघिल्लो',
      next: 'अर्को',
      reading: 'पढाइ',
      languageLabel: 'भाषा',
      notebook: 'गल्तीहरूको नोटबुक',
      noResults: 'मिल्ने शब्द भेटिएन।',
      dataError: '१,००० शब्दको डाटा लोड हुन सकेन।',
      themeLight: 'रातको मोड',
      themeDark: 'दिनको मोड',
      count: (visible, total) => `${total} मध्ये ${visible} शब्द`,
      page: (current, total) => `${total} मध्ये पृष्ठ ${current}`
    },
    my: {
      eyebrow: 'သတ်မှတ်ကျွမ်းကျင်လုပ်သား • ဆောက်လုပ်ရေး',
      title: 'ဆောက်လုပ်ရေး ဝေါဟာရ',
      lead: 'ကဏ္ဍ ၂၃ ခုတွင် အသုံးပြုသော ဂျပန် ဆောက်လုပ်ရေးဝေါဟာရ ၁,၀၀၀ ကို လေ့လာပါ။',
      listTitle: 'ဆောက်လုပ်ရေး ဝေါဟာရများ',
      searchLabel: 'ရှာဖွေရန်',
      searchPlaceholder: 'ဂျပန်ဝေါဟာရ သို့မဟုတ် ရိုမဂျီဖတ်သံ',
      categoryLabel: 'ကဏ္ဍ',
      filters: 'ဝေါဟာရ စစ်ထုတ်မှုများ',
      pagination: 'စာမျက်နှာပြောင်းရန်',
      allCategories: 'ကဏ္ဍအားလုံး',
      back: 'နောက်သို့',
      previous: 'ယခင်',
      next: 'နောက်တစ်ခု',
      reading: 'ဖတ်သံ',
      languageLabel: 'ဘာသာစကား',
      notebook: 'အမှားမှတ်စု',
      noResults: 'ကိုက်ညီသော ဝေါဟာရ မတွေ့ပါ။',
      dataError: 'ဝေါဟာရ ၁,၀၀၀ ပါဒေတာကို မဖွင့်နိုင်ပါ။',
      themeLight: 'အမှောင်မုဒ်',
      themeDark: 'အလင်းမုဒ်',
      count: (visible, total) => `စုစုပေါင်း ${total} လုံးအနက် ${visible} လုံး`,
      page: (current, total) => `စာမျက်နှာ ${current} / ${total}`
    }
  };

  let text = copy[language] || copy.ja;
  const elements = {
    back: document.getElementById('back'),
    theme: document.getElementById('theme'),
    eyebrow: document.getElementById('eyebrow'),
    title: document.getElementById('title'),
    lead: document.getElementById('lead'),
    searchLabel: document.getElementById('searchLabel'),
    search: document.getElementById('search'),
    categoryLabel: document.getElementById('categoryLabel'),
    category: document.getElementById('category'),
    filters: document.querySelector('.filters'),
    listTitle: document.getElementById('listTitle'),
    count: document.getElementById('count'),
    list: document.getElementById('vocabulary'),
    previous: document.getElementById('previous'),
    next: document.getElementById('next'),
    pageStatus: document.getElementById('pageStatus')
  };
  elements.pager = document.querySelector('.pager');

  const fc = {
    isFlashcardMode: false,
    deck: [],
    index: 0
  };

  const fcI18n = {
    ja: {
      viewList: '一覧',
      viewFlashcard: '単語カード (Flashcard)',
      hint: '👆 タップで意味を表示',
      flip: '🔄 めくる',
      prev: '⬅️ 前へ',
      next: '次へ ➡️',
      mistake: '❌ 覚えていない',
      known: '✅ 覚えた！',
      empty: '該当する単語がありません',
      counter: (cur, total) => `${cur} / ${total}`,
      savedToMistakes: '間違いノートに保存しました'
    },
    uz: {
      viewList: "Ro'yxat",
      viewFlashcard: 'Kartochka (Flashcard)',
      hint: "👆 Bosib ma'nosini ko'ring",
      flip: '🔄 Aylantirish',
      prev: '⬅️ Oldingi',
      next: 'Keyingi ➡️',
      mistake: '❌ Eslay olmadim',
      known: '✅ Bildim!',
      empty: 'Mos atama topilmadi',
      counter: (cur, total) => `${cur} / ${total}`,
      savedToMistakes: 'Xatolar daftariga saqlandi'
    },
    en: {
      viewList: 'List',
      viewFlashcard: 'Flashcards',
      hint: '👆 Tap to reveal meaning',
      flip: '🔄 Flip',
      prev: '⬅️ Prev',
      next: 'Next ➡️',
      mistake: '❌ Still learning',
      known: '✅ Got it!',
      empty: 'No matching terms',
      counter: (cur, total) => `${cur} / ${total}`,
      savedToMistakes: 'Saved to Mistake Notebook'
    },
    ne: {
      viewList: 'सूची',
      viewFlashcard: 'फ्ल्यासकार्ड',
      hint: '👆 अर्थ हेर्न ट्याप गर्नुहोस्',
      flip: '🔄 पल्टाउनुहोस्',
      prev: '⬅️ अघिल्लो',
      next: 'पछिल्लो ➡️',
      mistake: '❌ सम्झन सकिन',
      known: '✅ थाहा पाएँ!',
      empty: 'कुनै शब्द फेला परेन',
      counter: (cur, total) => `${cur} / ${total}`,
      savedToMistakes: 'गल्ती नोटबुकमा सुरक्षित गरियो'
    },
    my: {
      viewList: 'စာရင်း',
      viewFlashcard: 'ကတ်ပြား',
      hint: '👆 အဓိပ္ပာယ်ကြည့်ရန်နှိပ်ပါ',
      flip: '🔄 လှန်ပါ',
      prev: '⬅️ ရှေ့သို့',
      next: 'နောက်သို့ ➡️',
      mistake: '❌ မမှတ်မိသေးပါ',
      known: '✅ မှတ်မိပါပြီ!',
      empty: 'ကိုက်ညီသော စကားလုံး မတွေ့ပါ',
      counter: (cur, total) => `${cur} / ${total}`,
      savedToMistakes: 'အမှားမှတ်စုတွင် သိမ်းဆည်းပြီးပါပြီ'
    }
  };

  function updateFlashcardLabels() {
    const t = fcI18n[language] || fcI18n.ja;
    const viewListLabel = document.getElementById('viewListLabel');
    if (viewListLabel) viewListLabel.textContent = t.viewList;
    const viewFlashcardLabel = document.getElementById('viewFlashcardLabel');
    if (viewFlashcardLabel) viewFlashcardLabel.textContent = t.viewFlashcard;
    const fcHintLabel = document.getElementById('fcHintLabel');
    if (fcHintLabel) fcHintLabel.textContent = t.hint;
    const fcFlip = document.getElementById('fcFlip');
    if (fcFlip) fcFlip.textContent = t.flip;
    const fcPrev = document.getElementById('fcPrev');
    if (fcPrev) fcPrev.textContent = t.prev;
    const fcNext = document.getElementById('fcNext');
    if (fcNext) fcNext.textContent = t.next;
    const fcMistake = document.getElementById('fcMistake');
    if (fcMistake) fcMistake.textContent = t.mistake;
    const fcKnown = document.getElementById('fcKnown');
    if (fcKnown) fcKnown.textContent = t.known;
  }

  function renderFlashcard() {
    const flashcardArea = document.getElementById('flashcardArea');
    if (!flashcardArea) return;
    const t = fcI18n[language] || fcI18n.ja;
    const fcCard = document.getElementById('fcCard');
    const fcCount = document.getElementById('fcCount');
    const fcCategory = document.getElementById('fcCategory');
    const fcTerm = document.getElementById('fcTerm');
    const fcFrontReading = document.getElementById('fcFrontReading');
    const fcBackCategory = document.getElementById('fcBackCategory');
    const fcMeaning = document.getElementById('fcMeaning');
    const fcReading = document.getElementById('fcReading');
    const fcNote = document.getElementById('fcNote');
    const fcPrev = document.getElementById('fcPrev');
    const fcNext = document.getElementById('fcNext');

    if (fcCard) fcCard.classList.remove('is-flipped');

    if (!fc.deck || fc.deck.length === 0) {
      if (fcCount) fcCount.textContent = '0 / 0';
      if (fcCategory) fcCategory.textContent = '';
      if (fcTerm) fcTerm.textContent = t.empty;
      if (fcFrontReading) fcFrontReading.textContent = '';
      if (fcBackCategory) fcBackCategory.textContent = '';
      if (fcMeaning) fcMeaning.textContent = t.empty;
      if (fcReading) fcReading.textContent = '';
      if (fcNote) fcNote.textContent = '';
      if (fcPrev) fcPrev.disabled = true;
      if (fcNext) fcNext.disabled = true;
      return;
    }

    if (fc.index < 0) fc.index = 0;
    if (fc.index >= fc.deck.length) fc.index = fc.deck.length - 1;

    const entry = fc.deck[fc.index];
    const catLabel = categoryText(entry.category);
    const visibleTerm = visibleJapaneseTerm(entry);
    const furigana = window.JapaneseFurigana;
    const kana = furigana ? furigana.readingFor(visibleTerm, entry.romaji) : '';

    if (fcCategory) fcCategory.textContent = catLabel;
    if (fcBackCategory) fcBackCategory.textContent = catLabel;
    if (fcCount) fcCount.textContent = t.counter(fc.index + 1, fc.deck.length);

    if (fcTerm) {
      if (furigana) {
        furigana.setText(fcTerm, visibleTerm, kana);
      } else {
        fcTerm.textContent = visibleTerm;
      }
    }

    if (fcFrontReading) {
      fcFrontReading.textContent = kana ? `【${kana}】` : (entry.romaji ? `【${entry.romaji}】` : '');
    }

    const meaningText = language === 'ja'
      ? (kana ? `読み方：${kana}` : (entry.romaji ? `読み方：${entry.romaji}` : ''))
      : (language === 'uz'
          ? entry.uzbek
          : language === 'en'
            ? entry.english
            : language === 'ne'
              ? entry.nepali
              : (entry.myanmar || entry.meaningMy || entry.english));

    if (fcMeaning) fcMeaning.textContent = meaningText;

    const readingPrefix = {
      ja: '読み: ', uz: 'Talaffuz: ', en: 'Reading: ', ne: 'पढाइ: ', my: 'ဖတ်သံ: '
    }[language] || '読み: ';
    const displayReading = kana || entry.romaji;
    if (fcReading) fcReading.textContent = displayReading ? `${readingPrefix}${displayReading}` : '';
    if (fcNote) {
      fcNote.textContent = catLabel ? (language === 'ja' ? `分野：${catLabel}` : `Category: ${catLabel}`) : '';
    }

    if (fcPrev) fcPrev.disabled = fc.index === 0;
    if (fcNext) fcNext.disabled = fc.index === fc.deck.length - 1;
  }

  function initFlashcardMode() {
    const flashcardArea = document.getElementById('flashcardArea');
    const viewListBtn = document.getElementById('viewListBtn');
    const viewFlashcardBtn = document.getElementById('viewFlashcardBtn');
    if (!flashcardArea || !viewListBtn || !viewFlashcardBtn) return;

    updateFlashcardLabels();

    function setMode(isFlashcard) {
      fc.isFlashcardMode = isFlashcard;
      if (isFlashcard) {
        viewListBtn.classList.remove('is-active');
        viewListBtn.setAttribute('aria-selected', 'false');
        viewFlashcardBtn.classList.add('is-active');
        viewFlashcardBtn.setAttribute('aria-selected', 'true');

        if (elements.list) elements.list.classList.add('is-hidden');
        if (elements.pager) elements.pager.classList.add('is-hidden');

        flashcardArea.classList.remove('is-hidden');
        fc.deck = getFilteredVocabulary();
        fc.index = 0;
        renderFlashcard();
      } else {
        viewFlashcardBtn.classList.remove('is-active');
        viewFlashcardBtn.setAttribute('aria-selected', 'false');
        viewListBtn.classList.add('is-active');
        viewListBtn.setAttribute('aria-selected', 'true');

        flashcardArea.classList.add('is-hidden');
        if (elements.list) elements.list.classList.remove('is-hidden');
        if (elements.pager) elements.pager.classList.remove('is-hidden');
        render();
      }
    }

    viewListBtn.addEventListener('click', () => setMode(false));
    viewFlashcardBtn.addEventListener('click', () => setMode(true));

    const fcCard = document.getElementById('fcCard');
    const fcFlip = document.getElementById('fcFlip');
    function toggleFlip() {
      if (fcCard) fcCard.classList.toggle('is-flipped');
    }
    if (fcCard) {
      fcCard.addEventListener('click', toggleFlip);
      fcCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFlip();
        }
      });
    }
    if (fcFlip) fcFlip.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFlip();
    });

    const fcPrev = document.getElementById('fcPrev');
    if (fcPrev) {
      fcPrev.addEventListener('click', () => {
        if (fc.index > 0) {
          fc.index -= 1;
          renderFlashcard();
        }
      });
    }

    const fcNext = document.getElementById('fcNext');
    if (fcNext) {
      fcNext.addEventListener('click', () => {
        if (fc.index < fc.deck.length - 1) {
          fc.index += 1;
          renderFlashcard();
        }
      });
    }

    const fcMistake = document.getElementById('fcMistake');
    if (fcMistake) {
      fcMistake.addEventListener('click', () => {
        if (!fc.deck || fc.deck.length === 0) return;
        const entry = fc.deck[fc.index];
        const catLabel = categoryText(entry.category);
        const visibleTerm = visibleJapaneseTerm(entry);
        const furigana = window.JapaneseFurigana;
        const kana = furigana ? furigana.readingFor(visibleTerm, entry.romaji) : '';
        const meaningText = language === 'ja'
          ? (kana ? `読み方：${kana}` : (entry.romaji ? `読み方：${entry.romaji}` : visibleTerm))
          : (language === 'uz'
              ? entry.uzbek
              : language === 'en'
                ? entry.english
                : language === 'ne'
                  ? entry.nepali
                  : (entry.myanmar || entry.meaningMy || entry.english));

        window.MistakeNotebook?.save({
          field: 'construction',
          questionId: `vocab-${entry.id || visibleTerm}`,
          prompt: `【単語】${visibleTerm}${kana ? ` (${kana})` : (entry.romaji ? ` (${entry.romaji})` : '')}`,
          correctAnswer: `${meaningText}${catLabel ? ` [${catLabel}]` : ''}`,
          explanation: `${visibleTerm} (${kana || entry.romaji}): ${meaningText}`
        });

        const t = fcI18n[language] || fcI18n.ja;
        const origText = fcMistake.textContent;
        fcMistake.textContent = `💾 ${t.savedToMistakes}`;
        setTimeout(() => {
          fcMistake.textContent = origText;
        }, 900);

        if (fc.index < fc.deck.length - 1) {
          setTimeout(() => {
            fc.index += 1;
            renderFlashcard();
          }, 400);
        }
      });
    }

    const fcKnown = document.getElementById('fcKnown');
    if (fcKnown) {
      fcKnown.addEventListener('click', () => {
        const cheerText = {
          uz: '🌟 Barakkalla!', ja: '🌟 素晴らしい！', en: '🌟 Great job!', ne: '🌟 धेरै राम्रो!', my: '🌟 သာလွန်ကောင်းမွန်သည်!'
        }[language] || '🌟 覚えました！';
        const origText = fcKnown.textContent;
        fcKnown.textContent = cheerText;
        setTimeout(() => {
          fcKnown.textContent = origText;
        }, 800);

        if (fc.index < fc.deck.length - 1) {
          setTimeout(() => {
            fc.index += 1;
            renderFlashcard();
          }, 350);
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!fc.isFlashcardMode) return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT')) return;
      if (e.key === 'ArrowRight') {
        if (fc.index < fc.deck.length - 1) {
          fc.index += 1;
          renderFlashcard();
        }
      } else if (e.key === 'ArrowLeft') {
        if (fc.index > 0) {
          fc.index -= 1;
          renderFlashcard();
        }
      }
    });
  }

  let currentPage = 1;

  function categoryText(japaneseName) {
    const category = categoryByJapaneseName.get(japaneseName);
    return category ? (category[language] || category.en || category.ja) : japaneseName;
  }

  function visibleJapaneseTerm(entry) {
    return language === 'ja'
      ? (japaneseOnlyTerms[entry.japanese] || entry.japanese)
      : entry.japanese;
  }

  function toHiragana(str) {
    if (!str) return '';
    return str.replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  }

  function toKatakana(str) {
    if (!str) return '';
    return str.replace(/[\u3041-\u3096]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60));
  }

  function normalize(value) {
    return String(value || '').normalize('NFKC').trim().toLowerCase();
  }

  function getFilteredVocabulary() {
    const rawQuery = elements.search ? elements.search.value : '';
    const query = normalize(rawQuery);
    const queryHira = toHiragana(query);
    const queryKata = toKatakana(query);
    let selectedCategory = elements.category ? elements.category.value : '';

    function matchesEntry(entry) {
      if (!query) return true;
      const furigana = window.JapaneseFurigana;
      const visibleTerm = visibleJapaneseTerm(entry);
      const kana = furigana ? furigana.readingFor(visibleTerm, entry.romaji) : '';
      const parts = [
        visibleTerm,
        entry.japanese,
        kana,
        toHiragana(visibleTerm),
        toKatakana(visibleTerm),
        toHiragana(kana),
        toKatakana(kana),
        entry.romaji,
        entry.uzbek,
        entry.english,
        entry.nepali,
        entry.myanmar || entry.meaningMy || '',
        categoryText(entry.category)
      ];
      const target = normalize(parts.join(' '));
      return target.includes(query)
        || (queryHira && target.includes(queryHira))
        || (queryKata && target.includes(queryKata));
    }

    let results = vocabulary.filter((entry) => {
      if (selectedCategory && entry.category !== selectedCategory) return false;
      return matchesEntry(entry);
    });

    if (results.length === 0 && selectedCategory && query) {
      const allMatches = vocabulary.filter(matchesEntry);
      if (allMatches.length > 0) {
        if (elements.category) elements.category.value = '';
        results = allMatches;
      }
    }

    return results;
  }

  function createCard(entry) {
    const article = document.createElement('article');
    article.className = 'word';

    const meta = document.createElement('div');
    meta.className = 'word__meta';
    const number = document.createElement('span');
    number.textContent = `№ ${entry.id}`;
    const category = document.createElement('span');
    category.className = 'word__category';
    category.textContent = categoryText(entry.category);
    meta.append(number, category);

    const term = document.createElement('p');
    term.className = 'word__term';
    term.lang = 'ja';
    const furigana = window.JapaneseFurigana;
    const visibleTerm = visibleJapaneseTerm(entry);
    const kana = furigana ? furigana.readingFor(visibleTerm, entry.romaji) : '';
    if (furigana) {
      furigana.setText(term, visibleTerm, kana);
    } else {
      term.textContent = visibleTerm;
    }

    article.append(meta, term);

    if (language !== 'ja') {
      const meaning = document.createElement('p');
      meaning.className = 'word__meaning';
      meaning.textContent = language === 'uz'
        ? entry.uzbek
        : language === 'en'
          ? entry.english
          : language === 'ne'
            ? entry.nepali
            : (entry.myanmar || entry.meaningMy || entry.english);
      article.append(meaning);
    }

    if (language !== 'ja') {
      const reading = document.createElement('p');
      reading.className = 'word__reading';
      reading.textContent = `${text.reading}: ${entry.romaji}`;
      article.append(reading);
    }

    return article;
  }

  function render() {
    const filtered = getFilteredVocabulary();

    if (fc.isFlashcardMode) {
      fc.deck = filtered;
      if (fc.index >= fc.deck.length) fc.index = Math.max(0, fc.deck.length - 1);
      renderFlashcard();
      if (elements.count) elements.count.textContent = text.count(filtered.length, vocabulary.length);
      return;
    }

    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const start = (currentPage - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);
    const fragment = document.createDocumentFragment();

    if (!pageItems.length) {
      const empty = document.createElement('p');
      empty.className = 'empty';
      empty.textContent = text.noResults;
      fragment.append(empty);
    } else {
      pageItems.forEach((entry) => fragment.append(createCard(entry)));
    }

    elements.list.replaceChildren(fragment);
    elements.count.textContent = text.count(filtered.length, vocabulary.length);
    elements.pageStatus.textContent = text.page(currentPage, pageCount);
    elements.previous.disabled = currentPage === 1;
    elements.next.disabled = currentPage === pageCount;
  }

  function applyStaticCopy() {
    text = copy[language] || copy.ja;
    document.documentElement.lang = language;
    document.title = text.title;
    if (elements.back) elements.back.textContent = text.back;
    if (elements.eyebrow) elements.eyebrow.textContent = text.eyebrow;
    if (elements.title) elements.title.textContent = text.title;
    if (elements.lead) elements.lead.textContent = text.lead;
    if (elements.searchLabel) elements.searchLabel.textContent = text.searchLabel;
    if (elements.search) elements.search.placeholder = text.searchPlaceholder;
    if (elements.categoryLabel) elements.categoryLabel.textContent = text.categoryLabel;
    if (elements.filters) elements.filters.setAttribute('aria-label', text.filters);
    if (elements.listTitle) elements.listTitle.textContent = text.listTitle;
    if (elements.previous) elements.previous.textContent = text.previous;
    if (elements.next) elements.next.textContent = text.next;
    if (elements.pager) elements.pager.setAttribute('aria-label', text.pagination);

    const notebookLink = document.getElementById('notebookLink') || document.querySelector('.notebook-link');
    if (notebookLink) notebookLink.textContent = text.notebook;
    const langSel = document.getElementById('language');
    if (langSel) langSel.setAttribute('aria-label', text.languageLabel);

    rebuildCategoryOptions();
    updateFlashcardLabels();
    if (fc.isFlashcardMode) renderFlashcard();
  }

  function rebuildCategoryOptions() {
    if (!elements.category) return;
    const selected = elements.category.value;
    elements.category.replaceChildren();
    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = text.allCategories;
    elements.category.append(allOption);
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.ja;
      option.textContent = category[language] || category.en || category.ja;
      elements.category.append(option);
    });
    elements.category.value = selected;
  }

  function updateThemeButton() {
    if (!elements.theme) return;
    const dark = document.body.classList.contains('dark');
    if (window.ThemeManager) {
      window.ThemeManager.updateUI();
    } else {
      const SUN_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
      const MOON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      elements.theme.innerHTML = dark ? SUN_SVG : MOON_SVG;
    }
    elements.theme.setAttribute('aria-label', dark ? text.themeDark : text.themeLight);
    elements.theme.title = dark ? text.themeDark : text.themeLight;
  }

  elements.search.addEventListener('input', () => {
    currentPage = 1;
    render();
  });
  elements.category.addEventListener('change', () => {
    currentPage = 1;
    render();
  });
  elements.previous.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  elements.next.addEventListener('click', () => {
    const pageCount = Math.max(1, Math.ceil(getFilteredVocabulary().length / pageSize));
    if (currentPage < pageCount) {
      currentPage += 1;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  elements.theme?.addEventListener('click', () => {
    if (window.ThemeManager) return;
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeButton();
  });

  function renderVocabularyState() {
    if (vocabulary.length !== 1000 || categories.length !== 23) {
      elements.list.replaceChildren();
      const error = document.createElement('p');
      error.className = 'empty';
      error.textContent = text.dataError;
      elements.list.append(error);
      elements.count.textContent = text.count(vocabulary.length, 1000);
      elements.previous.disabled = true;
      elements.next.disabled = true;
    } else {
      render();
    }
  }

  function initializeVocabulary() {
    if (!window.ThemeManager && localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

    applyStaticCopy();
    renderVocabularyState();
    updateThemeButton();
    initFlashcardMode();
    document.documentElement.classList.add('locale-ready');

    const languageSelect = document.getElementById('language');
    if (languageSelect) {
      const languageNames = {
        uz: "O'zbek", ja: '日本語', en: 'English', ne: 'नेपाली', my: 'မြန်မာဘာသာ'
      };
      supportedLanguages.forEach((locale) => {
        if (![...languageSelect.options].some((opt) => opt.value === locale)) {
          const opt = document.createElement('option');
          opt.value = locale;
          opt.textContent = languageNames[locale] || locale;
          languageSelect.append(opt);
        }
      });
      languageSelect.value = language;
      languageSelect.setAttribute('aria-label', text.languageLabel);
      languageSelect.addEventListener('change', () => {
        const newLang = supportedLanguages.includes(languageSelect.value) ? languageSelect.value : 'ja';
        language = newLang;
        localStorage.setItem('language', language);
        text = copy[language] || copy.ja;
        applyStaticCopy();
        renderVocabularyState();
        updateThemeButton();
        window.ThemeManager?.updateUI();
      });
    }

    window.__CONSTRUCTION_VOCAB_TEST__ = Object.freeze({
      total: vocabulary.length,
      categoryCount: categories.length,
      questionSourceCount: vocabulary.length,
      source: 'bundled'
    });

    const synchronize = async () => {
      try {
        if (window.firebaseStudyReady) await window.firebaseStudyReady;
        const remote = await window.FirebaseStudy?.loadVocabulary('construction');
        if (!remote || !Array.isArray(remote.items) || !Array.isArray(remote.categories)) return;
        vocabulary = remote.items;
        categories = remote.categories;
        categoryByJapaneseName = new Map(categories.map((category) => [category.ja, category]));
        renderVocabularyState();
        document.documentElement.dataset.contentSource = 'firestore';
      } catch (error) {
        console.warn('Using bundled vocabulary data:', error);
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(synchronize, { timeout: 1200 });
    } else {
      setTimeout(synchronize, 0);
    }
  }

  initializeVocabulary();
})();
