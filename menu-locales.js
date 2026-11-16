(function () {
  const fieldTitles = {
    'agriculture-menu.html': 'कृषि',
    'automobile-menu.html': 'अटोमोबाइल मर्मत',
    'construction-menu.html': 'निर्माण',
    'foodmanufacturing-menu.html': 'खाद्य उत्पादन',
    'foodservice-menu.html': 'खाद्य सेवा',
    'lodging-menu.html': 'आवास सेवा'
  };
  const myFieldTitles = {
    'agriculture-menu.html': 'စိုက်ပျိုးရေး',
    'automobile-menu.html': 'မော်တော်ယာဉ် ပြုပြင်ထိန်းသိမ်းရေး',
    'construction-menu.html': 'ဆောက်လုပ်ရေး',
    'foodmanufacturing-menu.html': 'အစားအသောက်ထုတ်လုပ်ရေး',
    'foodservice-menu.html': 'စားသောက်ဝန်ဆောင်မှု',
    'lodging-menu.html': 'တည်းခိုဝန်ဆောင်မှု'
  };

  const routeName = decodeURIComponent(window.location.pathname)
    .split('/')
    .pop()
    .toLowerCase();
  const fileName = routeName.endsWith('.html') ? routeName : `${routeName}.html`;
  const fieldTitle = fieldTitles[fileName];
  const myFieldTitle = myFieldTitles[fileName];

  if (typeof translations === 'undefined' || !fieldTitle || !myFieldTitle) {
    document.documentElement.classList.add('menu-locale-ready');
    return;
  }

  translations.ja.brandTitle = '特定技能練習問題';
  translations.uz.metricLabel = 'Jami test savollari';
  translations.uz.practiceDesc = '90 ta asosiy muhim savol va 200 ta amaliy-vaziyatli savol (jami 290 ta savol).';
  translations.uz.vocabDesc = '1 000 ta sohaga oid yaponcha so‘z va atamalarni takrorlash.';
  translations.uz.modesNote = 'Savollar rasmiy dasturga mos original mashqlar; rasmiy imtihon savollari emas.';
  translations.ja.metricLabel = '本試験形式演習問題';
  translations.ja.practiceDesc = '本試験形式の実務判断・学科実技問題（全290問：基本90問＋応用200問）を学習します。';
  translations.ja.vocabDesc = '分野別の重要語彙1,000語を学びます。';
  translations.ja.modesNote = '公式試験問題の転載ではなく、公開された出題範囲に基づく非公式教材です。';
  translations.en.metricLabel = 'Official practice questions';
  translations.en.practiceDesc = 'Study 290 authentic exam questions (90 core questions + 200 practical judgment questions).';
  translations.en.vocabDesc = 'Master 1,000 sector-specific Japanese vocabulary words.';
  translations.en.modesNote = 'These are unofficial original study questions, not copied official exam questions.';
  translations.ne = {
    brandTitle: '特定技能練習問題',
    brandSubtitle: 'परीक्षा अभ्यास प्लेटफर्म',
    languageLabel: 'भाषा',
    notebook: 'गल्तीहरूको नोटबुक',
    back: 'फिर्ता',
    eyebrow: 'अध्ययन मोड छान्नुहोस्',
    fieldTitle,
    subtitle: 'शब्दावली वा अभ्यास प्रश्नहरू मध्ये एउटा छान्नुहोस्।',
    metricLabel: 'प्रामाणिक परीक्षा अभ्यास प्रश्नहरू',
    miniVocabulary: 'शब्दावली',
    miniPractice: 'अभ्यास',
    modesTitle: 'मोड छान्नुहोस्',
    modesNote: 'यी आधिकारिक दायरामा आधारित मौलिक अनौपचारिक अभ्यास प्रश्न हुन्।',
    vocabTitle: 'शब्दावली अभ्यास',
    vocabDesc: '१,००० क्षेत्रगत महत्त्वपूर्ण जापानी शब्दहरू दोहोर्याउनुहोस्।',
    practiceTitle: 'अभ्यास प्रश्नहरू',
    practiceDesc: '२९० प्रामाणिक परीक्षा प्रश्नहरू (९० मुख्य प्रश्न + २०० व्यावहारिक निर्णय प्रश्न)।',
    openMode: 'सुरु गर्नुहोस्',
    themeLight: 'रात',
    themeDark: 'दिन'
  };
  translations.my = {
    brandTitle: '特定技能練習問題',
    brandSubtitle: 'စာမေးပွဲ လေ့ကျင့်ရေး ပလက်ဖောင်း',
    languageLabel: 'ဘာသာစကား',
    notebook: 'အမှားမှတ်စု',
    back: 'နောက်သို့',
    eyebrow: 'လေ့လာမှုပုံစံကို ရွေးပါ',
    fieldTitle: myFieldTitle,
    subtitle: 'ဝေါဟာရ သို့မဟုတ် လေ့ကျင့်မေးခွန်းများကို ရွေးပါ။',
    metricLabel: 'စာမေးပွဲပုံစံ လေ့ကျင့်ခန်းမေးခွန်းများ',
    miniVocabulary: 'ဝေါဟာရ',
    miniPractice: 'လေ့ကျင့်မှု',
    modesTitle: 'ပုံစံကို ရွေးပါ',
    modesNote: 'ဤမေးခွန်းများသည် တရားဝင်စာမေးပွဲ မေးခွန်းများမဟုတ်ဘဲ၊ တရားဝင်သင်ရိုးအပေါ် အခြေခံထားသော မူရင်းလေ့ကျင့်ခန်းများ ဖြစ်သည်။',
    vocabTitle: 'ဝေါဟာရလေ့ကျင့်မှု',
    vocabDesc: 'ကဏ္ဍအလိုက် အရေးကြီးသော ဂျပန်ဝေါဟာရ ၁,၀၀၀ ခုကို လေ့လာပါ။',
    practiceTitle: 'လေ့ကျင့်မေးခွန်းများ',
    practiceDesc: 'စာမေးပွဲပုံစံ အစစ်အမှန် မေးခွန်း ၂၉၀ ခု (အခြေခံ ၉၀ + လက်တွေ့ ၂၀၀) ကို လေ့ကျင့်ပါ။',
    openMode: 'စတင်ရန်',
    themeLight: 'ည',
    themeDark: 'နေ့'
  };

  const languageSelect = document.getElementById('langSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', () => applyMenuLocale());
  }
  [
    ['ne', 'नेपाली'],
    ['my', 'မြန်မာဘာသာ']
  ].forEach(([value, label]) => {
    if (!languageSelect || languageSelect.querySelector(`option[value="${value}"]`)) return;
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    languageSelect.append(option);
  });

  const accessibility = {
    uz: {
      language: 'Til', font: 'Shrift o‘lchami', smaller: 'Kichraytirish',
      reset: 'Tiklash', larger: 'Kattalashtirish', summary: 'O‘qish xulosasi'
    },
    ja: {
      language: '言語', font: '文字サイズ', smaller: '小さくする',
      reset: '元に戻す', larger: '大きくする', summary: '学習内容'
    },
    en: {
      language: 'Language', font: 'Font size', smaller: 'Decrease font',
      reset: 'Reset font', larger: 'Increase font', summary: 'Study summary'
    },
    ne: {
      language: 'भाषा', font: 'अक्षरको आकार', smaller: 'सानो बनाउनुहोस्',
      reset: 'पहिलेकै बनाउनुहोस्', larger: 'ठूलो बनाउनुहोस्', summary: 'अध्ययन सारांश'
    },
    my: {
      language: 'ဘာသာစကား', font: 'စာလုံးအရွယ်အစား', smaller: 'စာလုံးအရွယ်အစား လျှော့ရန်',
      reset: 'မူလအရွယ်အစားသို့ ပြန်ထားရန်', larger: 'စာလုံးအရွယ်အစား တိုးရန်', summary: 'လေ့လာမှု အနှစ်ချုပ်'
    }
  };

  function applyMenuLocale() {
    const saved = localStorage.getItem('language');
    const language = Object.prototype.hasOwnProperty.call(accessibility, saved) ? saved : 'ja';
    const labels = accessibility[language];
    const select = document.getElementById('langSelect');
    if (select) {
      select.value = language;
      select.setAttribute('aria-label', labels.language);
    }
    if (typeof applyLanguage === 'function') applyLanguage(language);
    const fontControls = document.querySelector('.font-button:not(.theme-toggle)')?.closest('.control-group');
    if (fontControls) fontControls.setAttribute('aria-label', labels.font);
    const fontButtons = document.querySelectorAll('.font-button:not(.theme-toggle)');
    [labels.smaller, labels.reset, labels.larger].forEach((label, index) => {
      if (fontButtons[index]) {
        fontButtons[index].title = label;
        fontButtons[index].textContent = language === 'ja' ? ['小', '標準', '大'][index] : ['A−', 'A', 'A+'][index];
      }
    });
    const summary = document.querySelector('.hero-panel');
    if (summary) summary.setAttribute('aria-label', labels.summary);

    const settingsBtn = document.getElementById('globalSettingsButton');
    if (settingsBtn) {
      const settingsTitles = { ja: '設定', uz: 'Sozlamalar', en: 'Settings', ne: 'सेटिङहरू', my: 'ဆက်တင်များ' };
      const title = settingsTitles[language] || '設定';
      settingsBtn.setAttribute('aria-label', title);
      settingsBtn.title = title;
    }

    document.documentElement.classList.add('menu-locale-ready');
  }

  // Menu-specific locales are loaded after the page's initial language render.
  // Reapply the saved locale now so existing Nepali preferences and new Myanmar
  // preferences do not briefly or permanently fall back to Japanese.
  applyMenuLocale();
  if (document.readyState === 'loading') {
    window.addEventListener('load', applyMenuLocale, { once: true });
  }
})();
