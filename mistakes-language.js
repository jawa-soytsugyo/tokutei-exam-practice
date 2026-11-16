(function () {
  'use strict';

  const fields = {
    agriculture: {
      ja: '農業', uz: 'Qishloq xo‘jaligi', en: 'Agriculture', ne: 'कृषि', my: 'စိုက်ပျိုးရေး'
    },
    automobile: {
      ja: '自動車整備', uz: 'Avtomobil ta’mirlash', en: 'Automobile maintenance', ne: 'सवारी मर्मत', my: 'မော်တော်ယာဉ်ပြုပြင်ရေး'
    },
    construction: {
      ja: '建設', uz: 'Qurilish', en: 'Construction', ne: 'निर्माण', my: 'ဆောက်လုပ်ရေး'
    },
    foodmanufacturing: {
      ja: '飲食料品製造業', uz: 'Oziq-ovqat ishlab chiqarish', en: 'Food manufacturing', ne: 'खाद्य उत्पादन', my: 'အစားအသောက်ထုတ်လုပ်ရေး'
    },
    foodservice: {
      ja: '外食業', uz: 'Umumiy ovqatlanish', en: 'Food service', ne: 'खाद्य सेवा', my: 'စားသောက်ဝန်ဆောင်မှု'
    },
    lodging: {
      ja: '宿泊', uz: 'Mehmonxona xizmati', en: 'Lodging', ne: 'आवास सेवा', my: 'တည်းခိုဝန်ဆောင်မှု'
    }
  };

  const copy = {
    ja: {
      back: '戻る', eyebrow: '復習', title: '間違いノート',
      count: (n) => `${n}問の復習問題`,
      empty: 'まだ間違い問題はありません。問題を解くと、間違えた問題がここに保存されます。',
      answer: '正解：', done: '確認しました', clear: 'すべて削除',
      confirm: '保存した間違い問題をすべて削除しますか？',
      language: '言語', backHome: '分野選択に戻る',
      yourAnswer: 'あなたの回答：',
      explanationLabel: '解説：'
    },
    uz: {
      back: 'Ortga', eyebrow: 'Takrorlash', title: 'Xatolar daftarim',
      count: (n) => `${n} ta xato savol`,
      empty: 'Hozircha xato savollar yo‘q. Test ishlaganingizda xato javoblar shu yerda saqlanadi.',
      answer: 'To‘g‘ri javob:', done: 'Tushundim', clear: 'Hammasini o‘chirish',
      confirm: 'Barcha saqlangan xato savollarni o‘chirmoqchimisiz?',
      language: 'Til', backHome: 'Bosh sahifaga qaytish',
      yourAnswer: 'Siz tanlagan xato javob:',
      explanationLabel: 'Izoh / Tushuntirish:'
    },
    en: {
      back: 'Back', eyebrow: 'Review', title: 'My mistakes',
      count: (n) => `${n} questions to review`,
      empty: 'No mistakes saved yet. Incorrect answers will appear here after a practice quiz.',
      answer: 'Correct answer:', done: 'Understood', clear: 'Clear all',
      confirm: 'Remove all saved mistakes?', language: 'Language', backHome: 'Back to sectors',
      yourAnswer: 'Your answer:',
      explanationLabel: 'Explanation:'
    },
    ne: {
      back: 'फिर्ता', eyebrow: 'पुनरावलोकन', title: 'गल्तीहरूको नोटबुक',
      count: (n) => `पुनरावलोकनका लागि ${n} प्रश्न`,
      empty: 'अहिलेसम्म कुनै गल्ती सुरक्षित गरिएको छैन। अभ्यासपछि गलत उत्तर यहाँ देखिनेछन्।',
      answer: 'सही उत्तर:', done: 'बुझें', clear: 'सबै हटाउनुहोस्',
      confirm: 'सुरक्षित गरिएका सबै गल्ती हटाउने?', language: 'भाषा', backHome: 'गृहपृष्ठमा फर्कनुहोस्',
      yourAnswer: 'तपाईंको उत्तर:',
      explanationLabel: 'व्याख्या:'
    },
    my: {
      back: 'နောက်သို့', eyebrow: 'ပြန်လည်လေ့လာရန်', title: 'အမှားမှတ်စု',
      count: (n) => `ပြန်လည်လေ့လာရန် မေးခွန်း ${n} ခု`,
      empty: 'သိမ်းထားသော အမှားမရှိသေးပါ။ လေ့ကျင့်ပြီးနောက် မှားသောအဖြေများကို ဤနေရာတွင် ပြပါမည်။',
      answer: 'အဖြေမှန်:', done: 'နားလည်ပါပြီ', clear: 'အားလုံးဖျက်ရန်',
      confirm: 'သိမ်းထားသော အမှားအားလုံးကို ဖျက်မလား?', language: 'ဘာသာစကား', backHome: 'ပင်မစာမျက်နှာသို့ ပြန်သွားရန်',
      yourAnswer: 'သင့်အဖြေ:',
      explanationLabel: 'ရှင်းလင်းချက်:'
    }
  };

  const $ = (id) => document.getElementById(id);
  if (!window.ThemeManager) {
    document.body.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
  }
  const languageNames = ['ja', 'uz', 'en', 'ne', 'my'];
  const savedLanguage = localStorage.getItem('language');
  const initialLanguage = languageNames.includes(savedLanguage) ? savedLanguage : 'ja';
  const languageSelect = $('language');
  languageSelect.value = initialLanguage;

  function render() {
    const language = languageNames.includes(languageSelect.value) ? languageSelect.value : 'ja';
    const labels = copy[language];
    const items = window.MistakeNotebook.read();
    document.documentElement.lang = language;
    document.title = labels.title;
    languageSelect.setAttribute('aria-label', labels.language);
    $('back').textContent = labels.back;
    $('eyebrow').textContent = labels.eyebrow;
    $('title').textContent = labels.title;
    $('summary').textContent = labels.count(items.length);
    $('clear').textContent = labels.clear;
    $('clear').hidden = items.length === 0;
    $('list').replaceChildren();

    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state-card';
      const icon = document.createElement('div');
      icon.className = 'empty-state-card__icon';
      icon.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="m9 9.5 2 2 4-4"/></svg>';
      const message = document.createElement('p');
      message.className = 'empty-state-card__text';
      message.textContent = labels.empty;
      const homeLink = document.createElement('a');
      homeLink.className = 'primary-button';
      homeLink.href = './index.html';
      homeLink.textContent = labels.backHome;
      empty.append(icon, message, homeLink);
      $('list').append(empty);
      window.ThemeManager?.updateUI();
      return;
    }

    items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'mistake';
      const field = document.createElement('p');
      field.className = 'mistake__field';
      field.textContent = fields[item.field]?.[language] || item.field;

      const question = document.createElement('p');
      question.className = 'mistake__question';
      question.lang = 'ja';
      if (window.JapaneseFurigana) {
        window.JapaneseFurigana.setText(question, item.prompt);
      } else {
        question.textContent = item.prompt;
      }

      const answerBox = document.createElement('div');
      answerBox.className = 'mistake__answers';

      if (item.selectedAnswer) {
        const userAns = document.createElement('p');
        userAns.className = 'mistake__user-answer';
        userAns.textContent = `❌ ${labels.yourAnswer} ${item.selectedAnswer}`;
        answerBox.append(userAns);
      }

      const answer = document.createElement('p');
      answer.className = 'mistake__answer';
      answer.lang = 'ja';
      answer.textContent = `✅ ${labels.answer} ${item.correctAnswer}`;
      answerBox.append(answer);

      const explanation = document.createElement('div');
      explanation.className = 'mistake__explanation';

      const localizedExp = item.explanations?.[language] || item.explanation;
      const jaExp = item.explanationJa || item.explanations?.ja;

      if (language !== 'ja' && jaExp && localizedExp && jaExp !== localizedExp) {
        const pNat = document.createElement('p');
        pNat.className = 'exp-native';
        pNat.textContent = `💡 ${labels.explanationLabel} ${localizedExp}`;
        const pJa = document.createElement('p');
        pJa.className = 'exp-ja';
        pJa.textContent = `🇯🇵 解説：${jaExp}`;
        explanation.append(pNat, pJa);
      } else {
        const pExp = document.createElement('p');
        pExp.textContent = `💡 ${labels.explanationLabel} ${localizedExp || item.explanation || ''}`;
        explanation.append(pExp);
      }

      const done = document.createElement('button');
      done.type = 'button';
      done.className = 'mistake__done';
      done.textContent = labels.done;
      done.addEventListener('click', () => {
        window.MistakeNotebook.remove(item.field, item.questionId);
        render();
      });

      card.append(field, question, answerBox, explanation, done);
      $('list').append(card);
    });

    window.ThemeManager?.updateUI();

    const settingsBtn = document.getElementById('globalSettingsButton');
    if (settingsBtn) {
      const settingsTitles = { ja: '設定', uz: 'Sozlamalar', en: 'Settings', ne: 'सेटिङहरू', my: 'ဆက်တင်များ' };
      const title = settingsTitles[languageSelect.value] || '設定';
      settingsBtn.setAttribute('aria-label', title);
      settingsBtn.title = title;
    }
  }

  languageSelect.onchange = () => {
    const language = languageNames.includes(languageSelect.value) ? languageSelect.value : 'ja';
    localStorage.setItem('language', language);
    render();
  };

  $('clear').onclick = () => {
    if (window.confirm(copy[languageSelect.value].confirm)) {
      window.MistakeNotebook.clear();
      render();
    }
  };

  render();
})();
