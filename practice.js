(function () {
  'use strict';

  const supportedLanguages = ['uz', 'ja', 'en', 'ne', 'my'];
  const languageNames = {
    uz: "O'zbek", ja: '日本語', en: 'English', ne: 'नेपाली', my: 'မြန်မာဘာသာ'
  };

  const fields = {
    agriculture: {
      title: { uz: "Qishloq xo'jaligi", ja: '農業', en: 'Agriculture', ne: 'कृषि', my: 'စိုက်ပျိုးရေး' },
      back: 'index.html',
      questions: [
        {
          prompt: {
            uz: "Hosilni daladan yig‘ib olishni bildiradigan yaponcha so‘zni tanlang.",
            ja: '作物を畑から取り入れることを表す言葉はどれですか？',
            en: 'Choose the Japanese term for harvesting crops from a field.',
            ne: 'खेतबाट बाली भित्र्याउने जापानी शब्द छान्नुहोस्।'
          },
          answer: '収穫', options: ['収穫', '栽培', '肥料', '農薬']
        },
        {
          prompt: {
            uz: "O‘simlik o‘sishi uchun tuproqqa beriladigan narsani bildiradigan so‘zni tanlang.",
            ja: '植物の成長のために土に与えるものはどれですか？',
            en: 'Choose the Japanese term for material added to soil to help plants grow.',
            ne: 'बिरुवा बढ्न माटोमा हालिने वस्तुको जापानी शब्द छान्नुहोस्।'
          },
          answer: '肥料', options: ['肥料', '現場', '注文', '予約']
        },
        {
          prompt: {
            uz: "Ekin yetishtirishni bildiradigan yaponcha so‘zni tanlang.",
            ja: '作物を育てることを表す言葉はどれですか？',
            en: 'Choose the Japanese term for cultivating crops.',
            ne: 'बाली उब्जाउने जापानी शब्द छान्नुहोस्।'
          },
          answer: '栽培', options: ['栽培', '包装', '整備', '清掃']
        }
      ]
    },
    automobile: {
      title: { uz: "Avtomobil ta'mirlash", ja: '自動車整備', en: 'Automobile maintenance', ne: 'अटोमोबाइल मर्मत', my: 'မော်တော်ယာဉ် ပြုပြင်ထိန်းသိမ်းရေး' },
      back: 'index.html',
      questions: [
        {
          prompt: {
            uz: "Avtomobilni tekshirib va ta’mirlab yaxshi holatda saqlash nima deyiladi?",
            ja: '車を点検・修理して良い状態に保つことは何ですか？',
            en: 'What Japanese term means inspecting and repairing a vehicle to keep it in good condition?',
            ne: 'सवारी जाँच र मर्मत गरेर राम्रो अवस्थामा राख्ने कामलाई जापानीमा के भनिन्छ?'
          },
          answer: '整備', options: ['整備', '収穫', '接客', '宿泊']
        },
        {
          prompt: {
            uz: "Avtomobil holatini batafsil tekshirishni bildiradigan so‘zni tanlang.",
            ja: '車の状態を詳しく確認することは何ですか？',
            en: 'Choose the Japanese term for checking a vehicle condition in detail.',
            ne: 'सवारीको अवस्था विस्तृत रूपमा जाँच गर्ने जापानी शब्द छान्नुहोस्।'
          },
          answer: '点検', options: ['点検', '注文', '農薬', '包装']
        },
        {
          prompt: {
            uz: "Ishda foydalaniladigan asboblarni bildiradigan yaponcha so‘zni tanlang.",
            ja: '作業に使う道具を表す言葉はどれですか？',
            en: 'Choose the Japanese term for tools used at work.',
            ne: 'काममा प्रयोग हुने औजारको जापानी शब्द छान्नुहोस्।'
          },
          answer: '工具', options: ['工具', '原材料', '客室', '肥料']
        }
      ]
    },
    construction: {
      title: { uz: 'Qurilish', ja: '建設', en: 'Construction', ne: 'निर्माण', my: 'ဆောက်လုပ်ရေး' },
      back: 'index.html',
      questions: []
    },
    foodmanufacturing: {
      title: { uz: 'Oziq-ovqat ishlab chiqarish', ja: '飲食料品製造業', en: 'Food manufacturing', ne: 'खाद्य उत्पादन', my: 'အစားအသောက်ထုတ်လုပ်ရေး' },
      back: 'index.html',
      questions: [
        {
          prompt: {
            uz: "Oziq-ovqat tayyorlashda asos bo‘ladigan xom ashyoni bildiradigan so‘zni tanlang.",
            ja: '食品を作るもとになる材料は何ですか？',
            en: 'Choose the Japanese term for raw materials used to make food.',
            ne: 'खाद्य बनाउन प्रयोग हुने कच्चा पदार्थको जापानी शब्द छान्नुहोस्।'
          },
          answer: '原材料', options: ['原材料', '工具', '農薬', '受付']
        },
        {
          prompt: {
            uz: "Bakteriyalarni yo‘qotib, gigiyenik holatga keltirish nima deyiladi?",
            ja: '細菌をなくして衛生的にすることは何ですか？',
            en: 'What Japanese term means removing bacteria to make something hygienic?',
            ne: 'जीवाणु हटाएर स्वच्छ बनाउने कामको जापानी शब्द छान्नुहोस्।'
          },
          answer: '消毒', options: ['消毒', '点検', '収穫', '宿泊']
        },
        {
          prompt: {
            uz: "Mahsulotni o‘rash yoki qadoqlashni bildiradigan so‘zni tanlang.",
            ja: '製品を包むことを表す言葉はどれですか？',
            en: 'Choose the Japanese term for packaging a product.',
            ne: 'उत्पादन प्याक गर्ने जापानी शब्द छान्नुहोस्।'
          },
          answer: '包装', options: ['包装', '栽培', '整備', '接客']
        }
      ]
    },
    foodservice: {
      title: { uz: 'Ovqatlanish xizmati', ja: '外食業', en: 'Food service', ne: 'खाद्य सेवा', my: 'စားသောက်ဝန်ဆောင်မှု' },
      back: 'index.html',
      questions: [
        {
          prompt: {
            uz: "Mijozga xushmuomalalik bilan xizmat ko‘rsatish nima deyiladi?",
            ja: 'お客様に丁寧に対応することは何ですか？',
            en: 'What Japanese term means serving customers politely?',
            ne: 'ग्राहकलाई विनम्रतापूर्वक सेवा दिने कामलाई जापानीमा के भनिन्छ?'
          },
          answer: '接客', options: ['接客', '建設', '消毒', '予約']
        },
        {
          prompt: {
            uz: "Ovqat tayyorlashni bildiradigan yaponcha so‘zni tanlang.",
            ja: '食べ物を作ることを表す言葉はどれですか？',
            en: 'Choose the Japanese term for preparing food.',
            ne: 'खाना तयार गर्ने जापानी शब्द छान्नुहोस्।'
          },
          answer: '調理', options: ['調理', '清掃', '点検', '保護具']
        },
        {
          prompt: {
            uz: "Mijozdan qabul qilinadigan buyurtmani bildiradigan so‘zni tanlang.",
            ja: 'お客様から受ける依頼は何ですか？',
            en: 'Choose the Japanese term for an order received from a customer.',
            ne: 'ग्राहकबाट लिइने अर्डरको जापानी शब्द छान्नुहोस्।'
          },
          answer: '注文', options: ['注文', '収穫', '客室', '部品']
        }
      ]
    },
    lodging: {
      title: { uz: 'Mehmonxona xizmati', ja: '宿泊業', en: 'Lodging', ne: 'आवास सेवा', my: 'တည်းခိုဝန်ဆောင်မှု' },
      back: 'index.html',
      questions: [
        {
          prompt: {
            uz: "Mehmon tunaydigan xonani bildiradigan yaponcha so‘zni tanlang.",
            ja: 'お客様が宿泊する部屋はどれですか？',
            en: 'Choose the Japanese term for a room where a guest stays.',
            ne: 'पाहुना बस्ने कोठाको जापानी शब्द छान्नुहोस्।'
          },
          answer: '客室', options: ['客室', '現場', '原材料', '農薬']
        },
        {
          prompt: {
            uz: "Mehmon kelishidan oldin xonani band qilish nima deyiladi?",
            ja: '宿泊前に部屋を確保することは何ですか？',
            en: 'What Japanese term means reserving a room before a stay?',
            ne: 'बसाइअघि कोठा सुरक्षित गर्ने कामको जापानी शब्द छान्नुहोस्।'
          },
          answer: '予約', options: ['予約', '整備', '包装', '栽培']
        },
        {
          prompt: {
            uz: "Mehmon dastlab murojaat qiladigan qabul joyini bildiradigan so‘zni tanlang.",
            ja: 'お客様を最初に案内する場所はどれですか？',
            en: 'Choose the Japanese term for the reception point that first assists a guest.',
            ne: 'पाहुनालाई सुरुमा सहयोग गर्ने स्वागत स्थानको जापानी शब्द छान्नुहोस्।'
          },
          answer: '受付', options: ['受付', '工具', '消毒', '収穫']
        }
      ]
    }
  };

  const text = {
    uz: {
      practice: 'Mashq savollari', question: 'Savol', correct: "To‘g‘ri!",
      wrong: "Noto‘g‘ri. To‘g‘ri javob:", next: 'Keyingi savol', finish: 'Tugatish',
      back: 'Ortga', notebook: 'Xatolar daftarim', language: 'Til', themeLight: 'Tun rejimi', themeDark: 'Kun rejimi',
      loading: 'Savollar yuklanmoqda. Iltimos, kuting.'
    },
    ja: {
      practice: '練習問題', question: '問題', correct: '正解です！',
      wrong: '不正解です。正しい答え：', next: '次の問題', finish: '終了',
      back: '戻る', notebook: '間違いノート', language: '言語', themeLight: '夜間表示', themeDark: '昼間表示',
      loading: '問題を読み込んでいます。しばらくお待ちください。'
    },
    en: {
      practice: 'Practice questions', question: 'Question', correct: 'Correct!',
      wrong: 'Incorrect. Correct answer:', next: 'Next question', finish: 'Finish',
      back: 'Back', notebook: 'My mistakes', language: 'Language', themeLight: 'Dark mode', themeDark: 'Light mode',
      loading: 'Loading questions. Please wait.'
    },
    ne: {
      practice: 'अभ्यास प्रश्नहरू', question: 'प्रश्न', correct: 'सही!',
      wrong: 'गलत। सही उत्तर:', next: 'अर्को प्रश्न', finish: 'समाप्त',
      back: 'फर्कनुहोस्', notebook: 'गल्तीहरूको नोटबुक', language: 'भाषा', themeLight: 'रातको मोड', themeDark: 'दिनको मोड',
      loading: 'प्रश्नहरू लोड हुँदैछन्। कृपया पर्खनुहोस्।'
    },
    my: {
      practice: 'လေ့ကျင့်ခန်း မေးခွန်းများ', question: 'မေးခွန်း', correct: 'မှန်ကန်ပါသည်!',
      wrong: 'မမှန်ပါ။ အဖြေမှန်မှာ:', next: 'နောက်မေးခွန်း', finish: 'ပြီးဆုံး',
      back: 'ပြန်သွားရန်', notebook: 'အမှားမှတ်စု', language: 'ဘာသာစကား', themeLight: 'အမှောင်မုဒ်', themeDark: 'အလင်းမုဒ်',
      loading: 'မေးခွန်းများကို ဖွင့်နေပါသည်။ ခဏစောင့်ပါ။'
    }
  };

  const meanings = {
    '収穫': { uz: "Hosil yig‘imi", ja: '収穫（しゅうかく）', en: 'Harvest', ne: 'बाली भित्र्याउने काम', my: 'ရိတ်သိမ်းခြင်း' },
    '肥料': { uz: "O‘g‘it", ja: '肥料（ひりょう）', en: 'Fertilizer', ne: 'मल', my: 'မြေဩဇာ' },
    '栽培': { uz: 'Ekin yetishtirish', ja: '栽培（さいばい）', en: 'Cultivation', ne: 'खेती', my: 'စိုက်ပျိုးခြင်း' },
    '整備': { uz: "Texnik xizmat ko‘rsatish", ja: '整備（せいび）', en: 'Maintenance', ne: 'मर्मतसम्भार', my: 'ပြုပြင်ထိန်းသိမ်းခြင်း' },
    '点検': { uz: 'Tekshiruv', ja: '点検（てんけん）', en: 'Inspection', ne: 'जाँच', my: 'စစ်ဆေးခြင်း' },
    '工具': { uz: 'Asbob-uskunalar', ja: '工具（こうぐ）', en: 'Tools', ne: 'औजारहरू', my: 'ကိရိယာများ' },
    '原材料': { uz: 'Xom ashyo', ja: '原材料（げんざいりょう）', en: 'Raw materials', ne: 'कच्चा पदार्थ', my: 'ကုန်ကြမ်းများ' },
    '消毒': { uz: 'Dezinfeksiya', ja: '消毒（しょうどく）', en: 'Disinfection', ne: 'कीटाणुशोधन', my: 'ပိုးသတ်ခြင်း' },
    '包装': { uz: 'Qadoqlash', ja: '包装（ほうそう）', en: 'Packaging', ne: 'प्याकेजिङ', my: 'ထုပ်ပိုးခြင်း' },
    '接客': { uz: "Mijozlarga xizmat ko‘rsatish", ja: '接客（せっきゃく）', en: 'Customer service', ne: 'ग्राहक सेवा', my: 'ဖောက်သည် ဝန်ဆောင်မှု' },
    '調理': { uz: 'Taom tayyorlash', ja: '調理（ちょうり）', en: 'Cooking', ne: 'खाना पकाउने काम', my: 'ချက်ပြုတ်ခြင်း' },
    '注文': { uz: 'Buyurtma', ja: '注文（ちゅうもん）', en: 'Order', ne: 'अर्डर', my: 'မှာယူမှု' },
    '客室': { uz: 'Mehmon xonasi', ja: '客室（きゃくしつ）', en: 'Guest room', ne: 'पाहुना कोठा', my: 'ဧည့်သည် အခန်း' },
    '予約': { uz: 'Oldindan band qilish', ja: '予約（よやく）', en: 'Reservation', ne: 'अग्रिम बुकिङ', my: 'ကြိုတင်စာရင်းပေးခြင်း' },
    '受付': { uz: 'Qabulxona', ja: '受付（うけつけ）', en: 'Reception', ne: 'स्वागत कक्ष', my: 'ဧည့်ကြိုကောင်တာ' }
  };

  const bankCopy = {
    uz: {
      summary: (count) => `Savollar bazasi ma’lumoti (jami ${count} ta: 90 ta asosiy muhim savol va 200 ta amaliy-vaziyatli savol)`,
      disclaimer: 'Savollar rasmiy e’lon qilingan imtihon dasturi va o‘quv qo‘llanmalari asosida mustaqil tuzilgan bo‘lib, rasmiy imtihon savollarining ko‘chirma nusxasi emas.',
      format: 'O‘quv mashqlari bilimlarni mustahkamlash uchun mo‘ljallangan; rasmiy imtihondagi audio yoki tasvirli topshiriqlar formatidan farq qilishi mumkin.',
      itemSources: 'Mavzu manbasi',
      sources: 'Rasmiy mavzu manbalari'
    },
    ja: {
      summary: (count) => `収録問題について（全${count}問：基本重要問題 90問＋実務判断・応用問題 200問）`,
      disclaimer: '公表されている出題範囲および学習用資料に基づき独自に作成した演習問題であり、公式試験問題の転載ではありません。',
      format: '知識定着を目的とした演習形式のため、本試験における図表問題や聴解問題などの全形式をそのまま再現するものではありません。',
      itemSources: '出題範囲の資料',
      sources: '公式出題範囲の資料'
    },
    en: {
      summary: (count) => `Question bank overview (${count} items: 90 core questions + 200 practical & applied questions)`,
      disclaimer: 'Independently authored from published official exam syllabi and study materials; not copied from official test papers.',
      format: 'Designed for knowledge review; does not replicate every image-based or listening task format used in the official CBT exam.',
      itemSources: 'Scope source',
      sources: 'Official scope sources'
    },
    ne: {
      summary: (count) => `प्रश्न सङ्ग्रहको जानकारी (जम्मा ${count}: ९० मुख्य प्रश्न + २०० व्यावहारिक र लागू प्रश्न)`,
      disclaimer: 'यी प्रश्नहरू सार्वजनिक गरिएको आधिकारिक पाठ्यक्रम तथा अध्ययन सामग्रीका आधारमा स्वतन्त्र रूपमा तयार गरिएका हुन्; आधिकारिक परीक्षाका प्रश्नहरूको नक्कल होइनन्।',
      format: 'ज्ञानलाई बलियो बनाउन अभ्यास ढाँचामा तयार गरिएको हो; यसले आधिकारिक परीक्षाका सबै चित्र वा श्रवण कार्य ढाँचाहरूलाई हुबहु प्रतिलिपि गर्दैन।',
      itemSources: 'विषय स्रोत',
      sources: 'आधिकारिक विषय स्रोत'
    },
    my: {
      summary: (count) => `မေးခွန်းဘဏ် အချက်အလက် (စုစုပေါင်း ${count} ခု - အဓိကမေးခွန်း ၉၀ + လက်တွေ့အသုံးချမေးခွန်း ၂၀၀)`,
      disclaimer: 'ဤမေးခွန်းများကို တရားဝင် ထုတ်ပြန်ထားသော စာမေးပွဲ သင်ရိုးညွှန်းတမ်းနှင့် လေ့လာမှု စာရွက်စာတမ်းများအပေါ် အခြေခံ၍ သီးခြား ရေးသားထားခြင်းဖြစ်ပြီး တရားဝင် စာမေးပွဲ မေးခွန်းများမှ ကူးယူထားခြင်း မဟုတ်ပါ။',
      format: 'အသိပညာ တိုးတက်ခိုင်မာစေရန် ရည်ရွယ်သည့် လေ့ကျင့်ခန်းပုံစံဖြစ်ပြီး စစ်ဆေးမှု စာမေးပွဲရှိ ရုပ်ပုံ သို့မဟုတ် နားထောင်မှုဆိုင်ရာ မေးခွန်းပုံစံအားလုံးကို တိုက်ရိုက် ထင်ဟပ်စေခြင်း မရှိနိုင်ပါ။',
      itemSources: 'သင်ခန်းစာအရင်းအမြစ်',
      sources: 'တရားဝင် အကြောင်းအရာအရင်းအမြစ်များ'
    }
  };

  const OFFICIAL_EXAM_COUNTS = {
    construction: 50,
    agriculture: 70,
    foodservice: 45,
    foodmanufacturing: 40,
    lodging: 36,
    automobile: 39
  };

  const modeLabels = {
    mock_exam: {
      ja: (c) => `本番模擬試験モード（本試験と同数：${c}問・合格基準65%）`,
      uz: (c) => `Haqiqiy imtihon rejimi (${c} ta savol · o‘tish bali 65%)`,
      en: (c) => `Official Mock Exam Mode (${c} questions · 65% pass mark)`,
      ne: (c) => `आधिकारिक नक्कली परीक्षा मोड (${c} प्रश्न · ६५% उत्तीर्ण)`,
      my: (c) => `တရားဝင် စမ်းသပ်စာမေးပွဲမုဒ် (${c} မေးခွန်း · ၆၅% အောင်မှတ်)`
    },
    core_90: {
      ja: '基本・重要問題（90問）',
      uz: 'Asosiy muhim savollar (90 ta)',
      en: 'Core Important Questions (90 items)',
      ne: 'मुख्य महत्त्वपूर्ण प्रश्नहरू (९० प्रश्न)',
      my: 'အဓိက အရေးကြီးမေးခွန်းများ (၉၀ မေးခွန်း)'
    },
    applied_200: {
      ja: '実務判断・応用問題（200問）',
      uz: 'Amaliy va vaziyatli savollar (200 ta)',
      en: 'Practical & Applied Questions (200 items)',
      ne: 'व्यावहारिक र लागू प्रश्नहरू (२०० प्रश्न)',
      my: 'လက်တွေ့နှင့် အသုံးချမေးခွန်းများ (၂၀၀ မေးခွန်း)'
    }
  };

  const examResultCopy = {
    ja: {
      title: '模擬試験 結果まとめ',
      score: (correct, total, pct) => `${total}問中 ${correct}問 正解（${pct}%）`,
      passedBadge: '合格基準クリア！',
      passedMsg: 'おめでとうございます！特定技能1号 本試験の合格基準（65%）を達成しました。',
      failedBadge: (needed) => `あと${needed}問で合格基準（65%）`,
      failedMsg: (passCount) => `合格基準は65%（${passCount}問以上正解）です。間違えた問題を復習して、もう一度挑戦しましょう！`,
      correctLabel: '正解数',
      wrongLabel: '不正解数',
      rateLabel: '正答率',
      thresholdLabel: '合格基準',
      thresholdValue: (passCount) => `65%（${passCount}問以上）`,
      retryBtn: 'もう一度挑戦する',
      mistakesBtn: '間違いノートで復習',
      backBtn: '分野トップへ戻る'
    },
    uz: {
      title: 'Imtihon natijalari',
      score: (correct, total, pct) => `${total} tadan ${correct} ta to‘g‘ri (${pct}%)`,
      passedBadge: 'O‘tish bali to‘plandi!',
      passedMsg: 'Tabriklaymiz! Maxsus malakali ishchi 1-toifa imtihonining o‘tish balini (65%) muvaffaqiyatli topshirdingiz.',
      failedBadge: (needed) => `O‘tish uchun yana ${needed} ta to‘g‘ri javob kerak (65%)`,
      failedMsg: (passCount) => `O‘tish bali 65% (${passCount} ta to‘g‘ri javob). Xatolarni takrorlab, yana urinib ko‘ring!`,
      correctLabel: 'To‘g‘ri javoblar',
      wrongLabel: 'Noto‘g‘ri javoblar',
      rateLabel: 'Natija',
      thresholdLabel: 'O‘tish bali',
      thresholdValue: (passCount) => `65% (${passCount} ta)`,
      retryBtn: 'Qaytadan topshirish',
      mistakesBtn: 'Xatolar daftarini ko‘rish',
      backBtn: 'Bosh sahifaga qaytish'
    },
    en: {
      title: 'Mock Exam Results',
      score: (correct, total, pct) => `${correct} / ${total} Correct (${pct}%)`,
      passedBadge: 'Pass Mark Achieved!',
      passedMsg: 'Congratulations! You met the official Tokutei Ginou exam passing standard (65%).',
      failedBadge: (needed) => `${needed} more correct answers needed to pass (65%)`,
      failedMsg: (passCount) => `Passing standard is 65% (${passCount}+ correct). Review your mistakes and try again!`,
      correctLabel: 'Correct',
      wrongLabel: 'Incorrect',
      rateLabel: 'Score Rate',
      thresholdLabel: 'Passing Mark',
      thresholdValue: (passCount) => `65% (${passCount}+ questions)`,
      retryBtn: 'Try Again',
      mistakesBtn: 'Review Mistakes',
      backBtn: 'Back to Sector Menu'
    },
    ne: {
      title: 'नक्कली परीक्षाको नतिजा',
      score: (correct, total, pct) => `${total} मध्ये ${correct} सही (${pct}%)`,
      passedBadge: 'उत्तीर्ण मापदण्ड पूरा भयो!',
      passedMsg: 'बधाई छ! तपाईंले विशिष्ट सीपयुक्त कामदार परीक्षाको उत्तीर्ण मापदण्ड (६५%) हासिल गर्नुभयो।',
      failedBadge: (needed) => `उत्तीर्ण हुन अझै ${needed} प्रश्न सही चाहिन्छ (६५%)`,
      failedMsg: (passCount) => `उत्तीर्ण मापदण्ड ६५% (${passCount} प्रश्न वा बढी) हो। गल्तीहरू समीक्षा गरेर फेरि प्रयास गर्नुहोस्!`,
      correctLabel: 'सही',
      wrongLabel: 'गलत',
      rateLabel: 'अंक प्रतिशत',
      thresholdLabel: 'उत्तीर्ण मापदण्ड',
      thresholdValue: (passCount) => `६५% (${passCount}+ प्रश्न)`,
      retryBtn: 'फेरि सुरु गर्नुहोस्',
      mistakesBtn: 'गल्ती नोटबुक हेर्नुहोस्',
      backBtn: 'मुख्य मेनुमा फर्कनुहोस्'
    },
    my: {
      title: 'စမ်းသပ်စာမေးပွဲ ရလဒ်အကျဉ်းချုပ်',
      score: (correct, total, pct) => `${total} ခုတွင် ${correct} ခု မှန်ကန်သည် (${pct}%)`,
      passedBadge: 'အောင်ချက် သတ်မှတ်ချက် ပြည့်မီပါသည်!',
      passedMsg: 'ဂုဏ်ယူပါသည်။ သတ်မှတ်ကျွမ်းကျင်မှု အဆင့် ၁ စာမေးပွဲ အောင်မှတ် (၆၅%) ကို ရရှိခဲ့ပါသည်။',
      failedBadge: (needed) => `အောင်မှတ်မီရန် နောက်ထပ် ${needed} ခု လိုအပ်ပါသည် (၆၅%)`,
      failedMsg: (passCount) => `အောင်မှတ်သည် ၆၅% (${passCount} ခုနှင့်အထက်) ဖြစ်သည်။ မှားယွင်းမှုများကို ပြန်လည်လေ့လာပြီး ထပ်မံကြိုးစားပါ။`,
      correctLabel: 'အဖြေမှန်',
      wrongLabel: 'အဖြေမှား',
      rateLabel: 'ရမှတ်ရာခိုင်နှုန်း',
      thresholdLabel: 'အောင်မှတ်စံနှုန်း',
      thresholdValue: (passCount) => `၆၅% (${passCount} ခုနှင့်အထက်)`,
      retryBtn: 'ထပ်မံကြိုးစားရန်',
      mistakesBtn: 'အမှားမှတ်စု ပြန်ကြည့်ရန်',
      backBtn: 'မူလစာမျက်နှာသို့'
    }
  };

  const topicCopy = {
    uz: { label: 'Rejim / Mavzu', all: 'Barcha savollar (jami 290 ta)' },
    ja: { label: 'モード・分野', all: '全問題演習（全290問・基本＋応用）' },
    en: { label: 'Mode / Topic', all: 'All Questions (all 290 items)' },
    ne: { label: 'मोड / विषय', all: 'सबै प्रश्नहरू (जम्मा २९०)' },
    my: { label: 'မုဒ် / အကြောင်းအရာ', all: 'မေးခွန်းအားလုံး (စုစုပေါင်း ၂၉၀)' }
  };
  const categoryLabels = {
    foodmanufacturingVocabulary: {
      uz: 'Oziq-ovqat ishlab chiqarish lug‘ati (1 000 ta so‘z)', ja: '飲食料品製造業語彙（1,000語）', en: 'Food manufacturing vocabulary (1,000 words)',
      ne: 'खाद्य उत्पादन शब्दावली (१,००० शब्द)', my: 'အစားအသောက်ထုတ်လုပ်မှု ဝေါဟာရ (စကားလုံး ၁,၀၀၀)'
    },
    automobileVocabulary: {
      uz: 'Avtomobil ta’mirlash lug‘ati (1 000 ta so‘z)', ja: '自動車整備語彙（1,000語）', en: 'Automobile vocabulary (1,000 words)',
      ne: 'सवारी मर्मत शब्दावली (१,००० शब्द)', my: 'မော်တော်ယာဉ် ဝေါဟာရ (စကားလုံး ၁,၀၀၀)'
    },
    foodserviceVocabulary: {
      uz: 'Umumiy ovqatlanish lug‘ati (1 000 ta so‘z)', ja: '外食業語彙（1,000語）', en: 'Food service vocabulary (1,000 words)',
      ne: 'रेस्टुरेन्ट सेवा शब्दावली (१,००० शब्द)', my: 'စားသောက်ဆိုင် ဝေါဟာရ (စကားလုံး ၁,၀၀၀)'
    },
    lodgingVocabulary: {
      uz: 'Mehmonxona xizmati lug‘ati (1 000 ta so‘z)', ja: '宿泊業語彙（1,000語）', en: 'Lodging vocabulary (1,000 words)',
      ne: 'होटल सेवा शब्दावली (१,००० शब्द)', my: 'ဟိုတယ်လုပ်ငန်း ဝေါဟာရ (စကားလုံး ၁,၀၀၀)'
    },
    agricultureVocabulary: {
      uz: 'Qishloq xo‘jaligi lug‘ati (1 000 ta so‘z)', ja: '農業語彙（1,000語）', en: 'Agriculture vocabulary (1,000 words)',
      ne: 'कृषि शब्दावली (१,००० शब्द)', my: 'စိုက်ပျိုးရေး ဝေါဟာရ (စကားလုံး ၁,၀၀၀)'
    },
    crop_foundations: { uz: 'Dehqonchilik asoslari', ja: '耕種農業・基礎', en: 'Crop foundations', ne: 'बाली खेतीका आधार', my: 'သီးနှံစိုက်ပျိုးရေး အခြေခံများ' },
    crop_management: { uz: 'Ekinlarni boshqarish', ja: '栽培管理', en: 'Crop management', ne: 'बाली व्यवस्थापन', my: 'သီးနှံစိုက်ပျိုးမှု စီမံခန့်ခွဲခြင်း' },
    harvest_postharvest: { uz: 'Hosil va saqlash', ja: '収穫・収穫後管理', en: 'Harvest and postharvest', ne: 'कटानी र कटानीपछिको काम', my: 'ရိတ်သိမ်းခြင်းနှင့် ရိတ်သိမ်းပြီးနောက် စီမံခန့်ခွဲမှု' },
    livestock_management: { uz: 'Chorvachilik', ja: '畜産管理', en: 'Livestock management', ne: 'पशुपालन व्यवस्थापन', my: 'မွေးမြူရေး စီမံခန့်ခွဲမှု' },
    safety_hygiene: { uz: 'Xavfsizlik va gigiyena', ja: '安全衛生', en: 'Safety and hygiene', ne: 'सुरक्षा र सरसफाइ', my: 'ဘေးကင်းရေးနှင့် သန့်ရှင်းရေး' },
    practical_recognition: { uz: 'Amaliy vaziyatlar', ja: '実務判断', en: 'Practical judgment', ne: 'व्यावहारिक निर्णय', my: 'လက်တွေ့လုပ်ငန်း ဆုံးဖြတ်ချက်' },
    engine_systems: { uz: 'Dvigatel tizimlari', ja: 'エンジン', en: 'Engine systems', ne: 'इन्जिन प्रणाली', my: 'အင်ဂျင်စနစ်များ' },
    chassis_systems: { uz: 'Shassi tizimlari', ja: 'シャシ', en: 'Chassis systems', ne: 'चेसिस प्रणाली', my: 'ကိုယ်ထည်စနစ်များ' },
    tools_measurement: { uz: 'Asbob va o‘lchov', ja: '工具・測定', en: 'Tools and measurement', ne: 'औजार र मापन', my: 'ကိရိယာများနှင့် တိုင်းတာခြင်း' },
    inspection_adjustment: { uz: 'Tekshiruv va sozlash', ja: '点検・調整', en: 'Inspection and adjustment', ne: 'जाँच र समायोजन', my: 'စစ်ဆေးခြင်းနှင့် ချိန်ညှိခြင်း' },
    safety_materials: { uz: 'Xavfsizlik, material va qonun', ja: '安全・材料・法令', en: 'Safety, materials, and rules', ne: 'सुरक्षा, सामग्री र नियम', my: 'ဘေးကင်းရေး၊ ပစ္စည်းများနှင့် စည်းမျဉ်းများ' },
    practical_judgment: { uz: 'Amaliy diagnostika', ja: '実技判断', en: 'Practical diagnosis', ne: 'व्यावहारिक निदान', my: 'လက်တွေ့ စစ်ဆေးဆုံးဖြတ်မှု' },
    'food-safety': { uz: 'Oziq-ovqat xavfsizligi', ja: '食品安全', en: 'Food safety', ne: 'खाद्य सुरक्षा', my: 'အစားအသောက် ဘေးကင်းရေး' },
    'general-hygiene': { uz: 'Umumiy gigiyena', ja: '一般衛生管理', en: 'General hygiene', ne: 'सामान्य सरसफाइ', my: 'အထွေထွေ သန့်ရှင်းရေး' },
    'process-control': { uz: 'Jarayon nazorati', ja: '工程管理', en: 'Process control', ne: 'प्रक्रिया नियन्त्रण', my: 'လုပ်ငန်းစဉ် ထိန်းချုပ်မှု' },
    haccp: { uz: 'HACCP nazorati', ja: 'ハサップ管理', en: 'HACCP control', ne: 'ह्यासप नियन्त्रण', my: 'HACCP ထိန်းချုပ်မှု' },
    'occupational-safety': { uz: 'Mehnat xavfsizligi', ja: '労働安全', en: 'Occupational safety', ne: 'पेसागत सुरक्षा', my: 'လုပ်ငန်းခွင် ဘေးကင်းရေး' },
    'hygiene-management': { uz: 'Gigiyena boshqaruvi', ja: '衛生管理', en: 'Hygiene management', ne: 'सरसफाइ व्यवस्थापन', my: 'သန့်ရှင်းရေး စီမံခန့်ခွဲမှု' },
    'food-preparation': { uz: 'Taom tayyorlash', ja: '飲食物調理', en: 'Food preparation', ne: 'खाना तयारी', my: 'အစားအသောက် ပြင်ဆင်ခြင်း' },
    'customer-service': { uz: 'Mijozlarga xizmat', ja: '接客全般', en: 'Customer service', ne: 'ग्राहक सेवा', my: 'ဖောက်သည် ဝန်ဆောင်မှု' },
    '共通基礎': { uz: 'Umumiy asoslar', ja: '共通基礎', en: 'Common foundations', ne: 'साझा आधार', my: 'အထွေထွေ အခြေခံများ' },
    '安全衛生': { uz: 'Xavfsizlik va gigiyena', ja: '安全衛生', en: 'Safety and hygiene', ne: 'सुरक्षा र सरसफाइ', my: 'ဘေးကင်းရေးနှင့် သန့်ရှင်းရေး' },
    '法令・現場文化': { uz: 'Qonun va ish madaniyati', ja: '法令・現場文化', en: 'Rules and site culture', ne: 'नियम र कार्यस्थल संस्कृति', my: 'ဥပဒေများနှင့် လုပ်ငန်းခွင်ယဉ်ကျေးမှု' },
    '土木・学科': { uz: 'Fuqarolik qurilishi — nazariya', ja: '土木・学科', en: 'Civil — theory', ne: 'सिभिल — सिद्धान्त', my: 'မြို့ပြဆောက်လုပ်ရေး — သီအိုရီ' },
    '土木・実技': { uz: 'Fuqarolik qurilishi — amaliyot', ja: '土木・実技', en: 'Civil — practical', ne: 'सिभिल — व्यावहारिक', my: 'မြို့ပြဆောက်လုပ်ရေး — လက်တွေ့' },
    '建築・学科': { uz: 'Bino qurilishi — nazariya', ja: '建築・学科', en: 'Building — theory', ne: 'भवन — सिद्धान्त', my: 'အဆောက်အအုံ — သီအိုရီ' },
    '建築・実技': { uz: 'Bino qurilishi — amaliyot', ja: '建築・実技', en: 'Building — practical', ne: 'भवन — व्यावहारिक', my: 'အဆောက်အအုံ — လက်တွေ့' },
    'ライフライン・設備・学科': { uz: 'Infratuzilma — nazariya', ja: 'ライフライン・設備・学科', en: 'Infrastructure — theory', ne: 'पूर्वाधार — सिद्धान्त', my: 'အခြေခံအဆောက်အအုံနှင့် စက်ပစ္စည်း — သီအိုရီ' },
    'ライフライン・設備・実技': { uz: 'Infratuzilma — amaliyot', ja: 'ライフライン・設備・実技', en: 'Infrastructure — practical', ne: 'पूर्वाधार — व्यावहारिक', my: 'အခြေခံအဆောက်အအုံနှင့် စက်ပစ္စည်း — လက်တွေ့' },
    'フロント業務': { uz: 'Qabulxona ishlari', ja: 'フロント業務', en: 'Front desk', ne: 'फ्रन्ट डेस्क', my: 'ဧည့်ကြိုလုပ်ငန်း' },
    '企画・広報業務': { uz: 'Reja va reklama', ja: '企画・広報業務', en: 'Planning and PR', ne: 'योजना र प्रचार', my: 'စီမံကိန်းနှင့် ပြန်ကြားရေး' },
    '接客業務': { uz: 'Mehmonlarga xizmat', ja: '接客業務', en: 'Guest service', ne: 'अतिथि सेवा', my: 'ဧည့်သည်ဝန်ဆောင်မှု' },
    'レストランサービス業務': { uz: 'Restoran xizmati', ja: 'レストランサービス業務', en: 'Restaurant service', ne: 'रेस्टुरेन्ट सेवा', my: 'စားသောက်ဆိုင်ဝန်ဆောင်မှု' },
    '安全衛生・基礎知識': { uz: 'Xavfsizlik va asosiy bilim', ja: '安全衛生・基礎知識', en: 'Safety and fundamentals', ne: 'सुरक्षा र आधारभूत ज्ञान', my: 'ဘေးကင်းရေးနှင့် အခြေခံအသိပညာ' },
    vocabulary: { uz: 'Qurilish lug‘ati', ja: '建設語彙', en: 'Construction vocabulary', ne: 'निर्माण शब्दावली', my: 'ဆောက်လုပ်ရေး ဝေါဟာရ' }
  };

  const fieldKey = document.body.dataset.field;
  const field = fields[fieldKey];
  const $ = (id) => document.getElementById(id);
  const furigana = window.JapaneseFurigana || null;
  const generatedQuestionCount = window.SectorQuestionGenerator?.QUESTIONS_PER_SECTOR || 290;
  const expectedOptionCount = window.SectorQuestionGenerator?.optionCountForSector?.(fieldKey) || 4;
  const expectedRemoteQuestionCount = 290;
  const expectedQuestionCount = 290;
  let language = supportedLanguages.includes(localStorage.getItem('language'))
    ? localStorage.getItem('language')
    : 'ja';
  let index = 0;
  let answered = false;
  let sessionAnswered = 0;
  let sessionCorrect = 0;
  let sessionCategoryStats = {};
  let questions = [];
  let isExamFinished = false;
  let sessionHistory = [];
  let reviewMode = 'both';
  let reviewFilter = 'wrong';
  const urlTopic = typeof window !== 'undefined' && window.location
    ? new URLSearchParams(window.location.search).get('topic')
    : null;
  let activeTopic = urlTopic || 'mock_exam';
  let questionSource = 'bundled';
  let syncSequence = 0;

  function shuffle(items) {
    const result = [...items];
    for (let current = result.length - 1; current > 0; current -= 1) {
      const random = Math.floor(Math.random() * (current + 1));
      [result[current], result[random]] = [result[random], result[current]];
    }
    return result;
  }

  function createStaticQuestions() {
    return field.questions.map((question, questionIndex) => ({
      id: `${fieldKey}-${questionIndex + 1}-${language}`,
      prompt: question.prompt.ja,
      correct: question.answer,
      options: [...question.options],
      explanation: language === 'ja'
        ? meanings[question.answer].ja
        : `${question.answer} — ${meanings[question.answer][language] || meanings[question.answer].en}`
    }));
  }

  function createConstructionQuestions() {
    const data = window.CONSTRUCTION_VOCABULARY;
    const generator = window.ConstructionQuestionGenerator;
    const categories = Array.isArray(window.CONSTRUCTION_CATEGORIES)
      ? window.CONSTRUCTION_CATEGORIES
      : [];
    if (!Array.isArray(data) || data.length !== 1000 || !generator || categories.length !== 23) {
      throw new Error('Construction practice requires exactly 1,000 vocabulary records.');
    }
    const japaneseQuestions = generator.generate(data, 'ja', { optionCount: 4, seed: 20260729 });
    if (language === 'ja') return japaneseQuestions;

    const localizedAnswers = generator.generate(data, language, { optionCount: 4, seed: 20260729 });
    return japaneseQuestions.map((question, questionIndex) => ({
      ...question,
      id: localizedAnswers[questionIndex].id,
      explanation: localizedAnswers[questionIndex].explanation
    }));
  }

  function createSectorMockQuestions() {
    const data = window.SECTOR_QUESTION_DATA?.[fieldKey];
    const generator = window.SectorQuestionGenerator;
    if (!data || !generator?.generate) {
      throw new Error(`The ${fieldKey} mock-question bank could not be loaded.`);
    }
    const items = generator.generate(data, language, { seed: 20260816 });
    if (items.length !== generatedQuestionCount) {
      throw new Error(`${fieldKey} requires ${generatedQuestionCount} generated practice variants.`);
    }
    return items;
  }

  const vocabCategoryJa = {
    agriculture: {
      cultivationBasics: '耕種農業の基礎・土壌',
      seedlingPlanting: '播種・育苗・定植',
      cropManagement: '栽培管理・整枝・授粉',
      fertilizersNutrients: '肥料・施肥・栄養要素',
      pestsDiseasesProtection: '病害虫防除・農薬',
      irrigationEnvironment: '灌水・ハウス環境制御',
      vegetableCrops: '野菜各論',
      fruitGrainCrops: '水稲・穀物・果樹',
      harvestPackagingShipping: '収穫・調製・選別・出荷',
      livestockManagement: '畜産・肉牛・酪農',
      pigPoultryCare: '養豚・養鶏・衛生管理',
      machinerySafety5S: '農業機械・安全衛生・5S'
    },
    automobile: {
      vehicleBody: '車両の種類・車体・外装',
      engine: 'エンジン・燃料・吸排気・冷却',
      drivetrain: '駆動系・トランスミッション・サスペンション',
      brakesTires: 'ブレーキ・タイヤ・ホイール',
      electrical: '電装・バッテリー・センサー・HV/EV',
      fluidsFasteners: '油脂・液体・消耗品・締結部品',
      toolsEquipment: '工具・設備・測定器',
      procedures: '整備作業・手順・動作',
      inspection: '車検・法規・書類・保険',
      diagnosis: '故障・症状・原因診断',
      safetyService: '安全・環境・職場・接客',
      materialsBasics: '材料・単位・形状・位置・基本語',
      systemsWork: '制度・特定技能・雇用・生活'
    },
    foodmanufacturing: {
      rawMaterials: '原材料',
      products: '製品',
      manufacturing: '製造工程・加工方法',
      equipment: '機械・設備・器具',
      ingredients: '原料・受入検査',
      hygiene: '衛生管理・HACCP',
      quality: '品質管理・表示',
      safety: '労働安全・作業環境',
      process: '製造工程',
      workplace: '職場の表現・作業指示',
      logistics: '包装・物流・在庫',
      units: '単位・数量・温度',
      systems: '制度・特定技能・雇用',
      nutrients: '水・油脂・栄養成分'
    },
    foodservice: {
      ingredients1: '食材①',
      ingredients2: '食材②',
      seasonings: '調味料・飲料・主食',
      preparation: '調理・動作・切り方',
      equipment: '調理器具・厨房設備',
      store: '食器・店舗設備・店の種類',
      service: '接客・サービス用語',
      hygiene: '衛生管理・食中毒・安全',
      management: '店舗管理・経営・労務',
      dishes: '料理名・味・分量・特定技能',
      additional: '職種・料理分類・栄養'
    },
    lodging: {
      lodgingTypes: '宿泊施設・客室',
      reservations: '予約・受付',
      guestService: '接客・サービス',
      housekeeping: '清掃・客室整備',
      meals: '食事・料理',
      ryokanCulture: '旅館・日本文化',
      tourism: '観光・交通',
      safety: '安全・防災・衛生',
      work: '職種・勤務',
      sales: '販売・料金',
      systems: '制度・法律',
      basics: '数字・基本語',
      additional: 'その他の用語'
    }
  };

  const sectorJaNames = {
    agriculture: '農業',
    automobile: '自動車整備',
    foodmanufacturing: '飲食料品製造業',
    foodservice: '外食業',
    lodging: '宿泊業'
  };

  function buildSectorVocabularyQuestions(sectorKey, vocabulary, selectedLanguage) {
    if (!Array.isArray(vocabulary) || vocabulary.length !== 1000) {
      throw new Error(`${sectorKey} practice requires exactly 1,000 imported vocabulary records.`);
    }
    const distractorCount = expectedOptionCount - 1;
    if (distractorCount < 1) {
      throw new Error(`${sectorKey} vocabulary practice requires at least two answer options.`);
    }
    const sectorJa = sectorJaNames[sectorKey] || '専門';

    return vocabulary.map((entry, index) => {
      let prompt;
      let explanation;
      const options = [entry.term];

      if (selectedLanguage === 'ja') {
        if (entry.term === entry.reading) {
          const catJa = vocabCategoryJa[sectorKey]?.[entry.category] || '重要語彙';
          prompt = `次のうち、「${catJa}」に分類される${sectorJa}の用語はどれですか。`;
          explanation = `${entry.term}（分類：${catJa}）`;

          for (let offset = 137; options.length < expectedOptionCount && offset < vocabulary.length * 20; offset += 137) {
            const candidate = vocabulary[(index + offset) % vocabulary.length];
            if (candidate && candidate.category !== entry.category && !options.includes(candidate.term)) {
              options.push(candidate.term);
            }
          }
          if (options.length < expectedOptionCount) {
            for (let i = 0; i < vocabulary.length && options.length < expectedOptionCount; i += 1) {
              const candidate = vocabulary[i];
              if (candidate && candidate.category !== entry.category && !options.includes(candidate.term)) {
                options.push(candidate.term);
              }
            }
          }
        } else {
          prompt = `「${entry.reading}」と読む${sectorJa}の用語はどれですか。`;
          explanation = `${entry.term}（${entry.reading}）`;

          for (let offset = 137; options.length < expectedOptionCount && offset < vocabulary.length * 20; offset += 137) {
            const candidate = vocabulary[(index + offset) % vocabulary.length];
            if (candidate && candidate.reading !== entry.reading && !options.includes(candidate.term)) {
              options.push(candidate.term);
            }
          }
          if (options.length < expectedOptionCount) {
            for (let i = 0; i < vocabulary.length && options.length < expectedOptionCount; i += 1) {
              const candidate = vocabulary[i];
              if (candidate && candidate.reading !== entry.reading && !options.includes(candidate.term)) {
                options.push(candidate.term);
              }
            }
          }
        }
      } else {
        const meaning = entry.meaning[selectedLanguage] || entry.meaning.uz || entry.meaning.en;
        const promptFor = {
          agriculture: {
            uz: `"${meaning}" ma’nosiga mos keladigan yaponcha atamani tanlang.`,
            en: `Choose the Japanese agriculture term that means "${meaning}".`,
            ne: `“${meaning}” को अर्थ दिने जापानी कृषि शब्दावली छान्नुहोस्।`,
            my: `“${meaning}” ဟု အဓိပ္ပာယ်ရသော ဂျပန် စိုက်ပျိုးရေး ဝေါဟာရကို ရွေးပါ။`
          },
          automobile: {
            uz: `"${meaning}" ma’nosiga mos keladigan yaponcha atamani tanlang.`,
            en: `Choose the Japanese automotive term that means "${meaning}".`,
            ne: `“${meaning}” को अर्थ दिने जापानी सवारी मर्मत शब्द छान्नुहोस्।`,
            my: `“${meaning}” ဟု အဓိပ္ပာယ်ရသော ဂျပန် မော်တော်ယာဉ် ဝေါဟာရကို ရွေးပါ။`
          },
          foodmanufacturing: {
            uz: `"${meaning}" ma’nosiga mos keladigan yaponcha so‘zni tanlang.`,
            en: `Choose the Japanese word that means "${meaning}".`,
            ne: `“${meaning}” को अर्थ दिने जापानी शब्द छान्नुहोस्।`,
            my: `“${meaning}” ဟု အဓိပ္ပာယ်ရသော ဂျပန်စကားလုံးကို ရွေးပါ။`
          },
          foodservice: {
            uz: `"${meaning}" ma’nosiga mos keladigan yaponcha atamani tanlang.`,
            en: `Choose the Japanese food service term that means "${meaning}".`,
            ne: `“${meaning}” को अर्थ दिने जापानी रेस्टुरेन्ट सेवा शब्द छान्नुहोस्।`,
            my: `“${meaning}” ဟု အဓိပ္ပာယ်ရသော ဂျပန် စားသောက်ဆိုင် ဝေါဟာရကို ရွေးပါ။`
          },
          lodging: {
            uz: `"${meaning}" ma’nosiga mos keladigan yaponcha atamani tanlang.`,
            en: `Choose the Japanese lodging/hospitality term that means "${meaning}".`,
            ne: `“${meaning}” को अर्थ दिने जापानी होटल शब्दावली छान्नुहोस्।`,
            my: `“${meaning}” ဟု အဓိပ္ပာယ်ရသော ဂျပန် ဟိုတယ်လုပ်ငန်း ဝေါဟာရကို ရွေးပါ။`
          }
        };
        const localizedPrompts = promptFor[sectorKey] || promptFor.foodmanufacturing;
        prompt = localizedPrompts[selectedLanguage] || localizedPrompts.uz;
        explanation = `${entry.term}（${entry.reading}） — ${meaning}`;

        for (let offset = 137; options.length < expectedOptionCount && offset < vocabulary.length * 20; offset += 137) {
          const candidate = vocabulary[(index + offset) % vocabulary.length];
          const candMeaning = candidate.meaning[selectedLanguage] || candidate.meaning.uz || candidate.meaning.en;
          if (candMeaning !== meaning && !options.includes(candidate.term)) {
            options.push(candidate.term);
          }
        }
        if (options.length < expectedOptionCount) {
          for (let i = 0; i < vocabulary.length && options.length < expectedOptionCount; i += 1) {
            const candidate = vocabulary[i];
            const candMeaning = candidate.meaning[selectedLanguage] || candidate.meaning.uz || candidate.meaning.en;
            if (candMeaning !== meaning && !options.includes(candidate.term)) {
              options.push(candidate.term);
            }
          }
        }
      }

      return {
        id: `${sectorKey}-${entry.sourceId}`,
        prompt,
        correct: entry.term,
        options,
        explanation,
        topic: 'vocabulary',
        vocabularyId: entry.sourceId
      };
    });
  }

  function createFoodManufacturingVocabularyQuestions(selectedLanguage = language) {
    if (fieldKey !== 'foodmanufacturing') return [];
    return buildSectorVocabularyQuestions('foodmanufacturing', window.FOODMANUFACTURING_VOCABULARY_1000, selectedLanguage);
  }

  function createFoodServiceVocabularyQuestions(selectedLanguage = language) {
    if (fieldKey !== 'foodservice') return [];
    const vocabulary = window.FOODSERVICE_VOCABULARY_1000 || globalThis.FOODSERVICE_VOCABULARY_1000;
    return buildSectorVocabularyQuestions('foodservice', vocabulary, selectedLanguage);
  }

  function createLodgingVocabularyQuestions(selectedLanguage = language) {
    if (fieldKey !== 'lodging') return [];
    const vocabulary = window.LODGING_VOCABULARY_1000 || globalThis.LODGING_VOCABULARY_1000;
    return buildSectorVocabularyQuestions('lodging', vocabulary, selectedLanguage);
  }

  function createAgricultureVocabularyQuestions(selectedLanguage = language) {
    if (fieldKey !== 'agriculture') return [];
    const vocabulary = window.AGRICULTURE_VOCABULARY_1000 || globalThis.AGRICULTURE_VOCABULARY_1000;
    return buildSectorVocabularyQuestions('agriculture', vocabulary, selectedLanguage);
  }

  function createAutomobileVocabularyQuestions(selectedLanguage = language) {
    if (fieldKey !== 'automobile') return [];
    return buildSectorVocabularyQuestions('automobile', window.AUTOMOBILE_VOCABULARY_1000, selectedLanguage);
  }

  function createQuestions() {
    const mockQuestions = createSectorMockQuestions();
    if (mockQuestions.length !== expectedQuestionCount) {
      throw new Error(`${fieldKey} requires ${expectedQuestionCount} bundled questions.`);
    }
    return shuffle(mockQuestions);
  }

  function filterQuestions(items) {
    if (activeTopic === 'all') return items;
    if (activeTopic === 'mock_exam') {
      const examCount = OFFICIAL_EXAM_COUNTS[fieldKey] || 45;
      const seenBlueprints = new Set();
      const distinctQuestions = [];
      const shuffledItems = shuffle(items);
      for (const item of shuffledItems) {
        const bpKey = item.blueprintId || item.id;
        if (!seenBlueprints.has(bpKey)) {
          seenBlueprints.add(bpKey);
          distinctQuestions.push(item);
        }
      }
      return distinctQuestions.slice(0, examCount);
    }
    if (activeTopic === 'core_90') {
      return items.filter(item => item.group === 'core_90' || item.variant === 1);
    }
    if (activeTopic === 'applied_200') {
      return items.filter(item => item.group === 'applied_200' || item.variant > 1);
    }
    const categoryBlueprintItems = items.filter(item =>
      (item.topic === activeTopic || item.categoryId === activeTopic)
    );
    if (categoryBlueprintItems.length > 0) {
      return categoryBlueprintItems;
    }
    return items.filter(item => item.topic === activeTopic || item.categoryId === activeTopic);
  }

  function localizedExplanation(japaneseQuestion, localizedQuestion, selectedLanguage) {
    const explanation = String(localizedQuestion?.explanation || '').trim();
    if (selectedLanguage === 'ja' || !explanation) return explanation || japaneseQuestion.correct;
    return explanation.includes(japaneseQuestion.correct)
      ? explanation
      : `${japaneseQuestion.correct} — ${explanation}`;
  }

  function canonicalQuestionId(question, index) {
    const id = String(question?.id || '').trim();
    return id ? id.replace(/-(?:uz|ja|en|ne|my)$/u, '') : `question-${index}`;
  }

  function mergeRemoteQuestions(japaneseItems, localizedItems, selectedLanguage) {
    if (!Array.isArray(japaneseItems) || !japaneseItems.length) return null;
    if (!Array.isArray(localizedItems) || localizedItems.length !== japaneseItems.length) return null;

    const localizedById = new Map(localizedItems.map((question, questionIndex) => [
      canonicalQuestionId(question, questionIndex),
      question
    ]));

    const merged = japaneseItems.map((japaneseQuestion, questionIndex) => {
      const localizedQuestion = localizedById.get(canonicalQuestionId(japaneseQuestion, questionIndex));
      const options = Array.isArray(japaneseQuestion.options)
        ? [...japaneseQuestion.options]
        : [];
      if (
        !japaneseQuestion.prompt
        || !japaneseQuestion.correct
        || options.length !== expectedOptionCount
        || new Set(options).size !== options.length
        || options.filter(option => option === japaneseQuestion.correct).length !== 1
      ) {
        return null;
      }
      return {
        ...japaneseQuestion,
        id: localizedQuestion?.id || japaneseQuestion.id,
        options,
        explanation: localizedExplanation(japaneseQuestion, localizedQuestion, selectedLanguage)
      };
    });
    return merged.every(Boolean) ? merged : null;
  }

  function render() {
    if (isExamFinished) {
      showExamResultSummary();
      return;
    }
    const resultCard = $('examResultCard');
    if (resultCard) resultCard.classList.add('hidden');
    $('question')?.classList.remove('hidden');
    $('options')?.classList.remove('hidden');

    const practiceText = text[language] || text.en;
    const item = questions[index];
    const fieldTitle = field.title[language] || field.title.en || field.title.ja;
    document.documentElement.lang = language;
    document.title = `${fieldTitle} — ${practiceText.practice}`;
    $('back').href = `./${field.back}`;
    $('back').textContent = practiceText.back;
    const notebookLink = document.querySelector('.notebook-link');
    if (notebookLink) notebookLink.textContent = practiceText.notebook;
    $('title').textContent = fieldTitle;
    $('practice').textContent = practiceText.practice;
    $('progress').textContent = `${practiceText.question} ${index + 1} / ${questions.length}`;

    let metaRow = document.querySelector('.practice-meta-row');
    const progressEl = $('progress');
    if (!metaRow && progressEl && progressEl.parentNode) {
      metaRow = document.createElement('div');
      metaRow.className = 'practice-meta-row';
      progressEl.parentNode.insertBefore(metaRow, progressEl);
      metaRow.appendChild(progressEl);
      const sessionStats = document.createElement('div');
      sessionStats.id = 'sessionStats';
      sessionStats.className = 'session-stats';
      metaRow.appendChild(sessionStats);
    }
    updateSessionStats();

    let progressBar = $('practiceProgressBarFill');
    if (!progressBar) {
      const track = document.createElement('div');
      track.className = 'practice-progress-bar';
      progressBar = document.createElement('div');
      progressBar.id = 'practiceProgressBarFill';
      progressBar.className = 'practice-progress-fill';
      track.append(progressBar);
      (metaRow || progressEl)?.after(track);
    }
    const percent = Math.min(100, Math.round(((index + 1) / questions.length) * 100));
    progressBar.style.width = `${percent}%`;

    if (furigana) {
      furigana.setText($('question'), item.prompt);
    } else {
      $('question').textContent = item.prompt;
    }
    $('question').lang = 'ja';
    $('feedback').className = 'feedback hidden';
    $('feedback').replaceChildren();
    $('next').className = 'next hidden';
    $('next').textContent = index === questions.length - 1 ? practiceText.finish : practiceText.next;

    let finishBtn = $('finishExamBtn');
    if (!finishBtn) {
      finishBtn = document.createElement('button');
      finishBtn.id = 'finishExamBtn';
      finishBtn.type = 'button';
      finishBtn.className = 'finish-exam-btn';
      $('next')?.after(finishBtn);
      finishBtn.addEventListener('click', () => {
        if (sessionAnswered === 0) {
          const politeMsg = {
            uz: 'Natijani ko‘rish uchun kamida 1 ta savolga javob bering.',
            ja: '結果を見るには少なくとも1問回答してください。',
            en: 'Please answer at least 1 question to finish the test.',
            ne: 'नतिजा हेर्न कम्तीमा १ प्रश्नको जवाफ दिनुहोस्।',
            my: 'ရလဒ်ကြည့်ရန် အနည်းဆုံး မေးခွန်း ၁ ခု ဖြေဆိုပါ။'
          }[language] || '結果を見るには少なくとも1問回答してください。';
          alert(politeMsg);
          return;
        }
        showExamResultSummary();
      });
    }
    const finishBtnLabels = {
      uz: '📊 Testni yakunlash va natijani ko‘rish',
      ja: '📊 テストを終了して結果・解説を見る',
      en: '📊 Finish Test & View Results',
      ne: '📊 परीक्षा समाप्त गरी नतिजा हेर्नुहोस्',
      my: '📊 စာမေးပွဲအဆုံးသတ်ပြီး ရလဒ်ကြည့်ရန်'
    };
    finishBtn.textContent = finishBtnLabels[language] || finishBtnLabels.ja;
    finishBtn.classList.remove('hidden');
    if (sessionAnswered >= 1) {
      finishBtn.classList.remove('is-disabled');
      finishBtn.removeAttribute('disabled');
    } else {
      finishBtn.classList.add('is-disabled');
    }
    $('language').setAttribute('aria-label', practiceText.language);
    answered = false;

    const isReadingQuestion = item.vocabularyId !== undefined && item.prompt && item.prompt.includes('と読む');
    const list = $('options');
    list.replaceChildren();
    shuffle(item.options).forEach((answer, optIndex) => {
      const button = document.createElement('button');
      button.className = 'option';
      button.type = 'button';
      button.lang = 'ja';

      const badge = document.createElement('span');
      badge.className = 'option-badge';
      badge.textContent = String(optIndex + 1);

      const label = document.createElement('span');
      label.className = 'option-text';
      if (furigana && !isReadingQuestion) {
        furigana.setText(label, answer);
      } else {
        label.textContent = answer;
      }

      button.append(badge, label);
      button.dataset.answer = answer;
      button.addEventListener('click', () => choose(button, answer, item));
      list.append(button);
    });

    renderTopicFilter();
    renderBankInfo();
    updateThemeButton();
  }

  function renderTopicFilter() {
    const data = window.SECTOR_QUESTION_DATA?.[fieldKey];
    if (!data || !Array.isArray(data.blueprints)) return;
    let container = $('topicFilterContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'topicFilterContainer';
      container.className = 'practice-filter';
      $('title')?.after(container);
    }
    const existing = $('topicFilter');
    if (existing && container.dataset.language === language) {
      existing.value = activeTopic;
      return;
    }

    const copy = topicCopy[language] || topicCopy.ja;
    const label = document.createElement('label');
    label.htmlFor = 'topicFilter';
    label.textContent = copy.label;
    const select = document.createElement('select');
    select.id = 'topicFilter';

    const examCount = OFFICIAL_EXAM_COUNTS[fieldKey] || 45;
    const locale = { uz: 'uz-UZ', ja: 'ja-JP', en: 'en-US', ne: 'ne-NP', my: 'my-MM' }[language] || 'en-US';
    const numberFormatter = new Intl.NumberFormat(locale);

    const categories = [...new Set(data.blueprints.map(item => item.category))];
    const filterOptions = [];

    // 1. mock_exam
    const mockLabelFn = modeLabels.mock_exam[language] || modeLabels.mock_exam.ja;
    filterOptions.push({
      id: 'mock_exam',
      label: mockLabelFn(numberFormatter.format(examCount))
    });

    // 2. core_90
    filterOptions.push({
      id: 'core_90',
      label: modeLabels.core_90[language] || modeLabels.core_90.ja
    });

    // 3. applied_200
    filterOptions.push({
      id: 'applied_200',
      label: modeLabels.applied_200[language] || modeLabels.applied_200.ja
    });

    // 4. blueprint categories
    categories.forEach((category) => {
      const count = data.blueprints.filter(item => item.category === category).length;
      const localized = categoryLabels[category]?.[language] || categoryLabels[category]?.en || categoryLabels[category]?.ja || category;
      filterOptions.push({
        id: category,
        label: `${localized} (${numberFormatter.format(count)})`
      });
    });

    // 5. all
    filterOptions.push({
      id: 'all',
      label: `${copy.all} (${numberFormatter.format(expectedQuestionCount)})`
    });

    filterOptions.forEach(({ id, label: optLabel }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = optLabel;
      select.append(option);
    });

    if (![...select.options].some(option => option.value === activeTopic)) activeTopic = 'mock_exam';
    select.value = activeTopic;
    select.addEventListener('change', () => {
      activeTopic = select.value;
      isExamFinished = false;
      resetQuestions();
      render();
      synchronizeQuestions(language);
    });
    container.dataset.language = language;
    container.replaceChildren(label, select);
  }

  function updateSessionStats() {
    const statsContainer = $('sessionStats');
    if (!statsContainer) return;
    const pct = sessionAnswered > 0 ? Math.round((sessionCorrect / sessionAnswered) * 100) : 0;
    const scoreTextByLang = {
      ja: `正解 ${sessionCorrect} / ${sessionAnswered}（${pct}%）`,
      uz: `To‘g‘ri: ${sessionCorrect} / ${sessionAnswered} (${pct}%)`,
      en: `Correct: ${sessionCorrect} / ${sessionAnswered} (${pct}%)`,
      ne: `सही: ${sessionCorrect} / ${sessionAnswered} (${pct}%)`,
      my: `အဖြေမှန်: ${sessionCorrect} / ${sessionAnswered} (${pct}%)`
    };
    const hintText = `1–${expectedOptionCount} · Enter`;
    const scoreText = sessionAnswered > 0 ? (scoreTextByLang[language] || scoreTextByLang.ja) : hintText;

    const shuffleTextByLang = {
      ja: '最初から',
      uz: 'Yangilash',
      en: 'Shuffle',
      ne: 'फेरि सुरु',
      my: 'အသစ်စတင်'
    };
    const shuffleText = shuffleTextByLang[language] || shuffleTextByLang.ja;

    let scoreBadge = $('sessionScoreBadge');
    if (!scoreBadge) {
      scoreBadge = document.createElement('span');
      scoreBadge.id = 'sessionScoreBadge';
      scoreBadge.className = 'session-score-badge';
      statsContainer.appendChild(scoreBadge);
    }
    scoreBadge.textContent = scoreText;

    let shuffleBtn = $('shuffleReset');
    if (!shuffleBtn) {
      shuffleBtn = document.createElement('button');
      shuffleBtn.type = 'button';
      shuffleBtn.id = 'shuffleReset';
      shuffleBtn.className = 'shuffle-btn';
      shuffleBtn.addEventListener('click', () => {
        isExamFinished = false;
        resetQuestions();
        render();
      });
      statsContainer.appendChild(shuffleBtn);
    }
    shuffleBtn.textContent = shuffleText;

    const finishBtn = $('finishExamBtn');
    if (finishBtn) {
      const finishBtnLabels = {
        uz: '📊 Testni yakunlash va natijani ko‘rish',
        ja: '📊 テストを終了して結果・解説を見る',
        en: '📊 Finish Test & View Results',
        ne: '📊 परीक्षा समाप्त गरी नतिजा हेर्नुहोस्',
        my: '📊 စာမေးပွဲအဆုံးသတ်ပြီး ရလဒ်ကြည့်ရန်'
      };
      finishBtn.textContent = finishBtnLabels[language] || finishBtnLabels.ja;
      if (sessionAnswered >= 1) {
        finishBtn.classList.remove('is-disabled');
        finishBtn.removeAttribute('disabled');
      } else {
        finishBtn.classList.add('is-disabled');
      }
    }
  }

  function renderBankInfo() {
    const data = window.SECTOR_QUESTION_DATA?.[fieldKey];
    if (!data || !Array.isArray(data.sources)) return;
    let details = $('bankInfo');
    if (!details) {
      details = document.createElement('details');
      details.id = 'bankInfo';
      details.className = 'bank-info';
      document.querySelector('.card')?.after(details);
    }
    if (details.dataset.language === language) return;
    details.dataset.language = language;
    const locale = { uz: 'uz-UZ', ja: 'ja-JP', en: 'en-US', ne: 'ne-NP', my: 'my-MM' }[language] || 'en-US';
    const copy = bankCopy[language] || bankCopy.ja;
    const summary = document.createElement('summary');
    summary.textContent = copy.summary(new Intl.NumberFormat(locale).format(expectedQuestionCount));
    const disclaimer = document.createElement('p');
    disclaimer.textContent = copy.disclaimer;
    const format = document.createElement('p');
    format.textContent = copy.format;
    const heading = document.createElement('p');
    heading.className = 'bank-info__heading';
    heading.textContent = copy.sources;
    const links = document.createElement('ul');
    data.sources.forEach((source) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = source.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = `${source.organization}: ${source.title}`;
      item.append(link);
      links.append(item);
    });
    details.replaceChildren(summary, disclaimer, format, heading, links);
  }

  function showExamResultSummary() {
    isExamFinished = true;
    $('question')?.classList.add('hidden');
    $('options')?.classList.add('hidden');
    $('feedback')?.classList.add('hidden');
    $('next')?.classList.add('hidden');
    $('finishExamBtn')?.classList.add('hidden');

    const copy = examResultCopy[language] || examResultCopy.ja;
    const fieldTitle = field.title[language] || field.title.en || field.title.ja;

    const resultLabels = {
      ja: {
        answered: '回答数',
        correct: '正解',
        wrong: '不正解',
        threshold: '合格基準（65%）',
        barCorrect: '正解',
        barWrong: '不正解',
        reviewTitle: '📝 間違えた問題と正解・解説',
        allQuestionsTitle: '📝 回答した全問題と解説',
        allCorrectCheer: '🎉 素晴らしい！全問正解です！間違いはありません。',
        toggleBoth: '🌐 日本語 + 母国語（併記）',
        toggleNative: '母国語のみ',
        toggleJa: '🇯🇵 日本語のみ',
        filterWrong: '❌ 間違えた問題',
        filterAll: '📋 全問題',
        yourAnswer: 'あなたの回答：',
        correctAnswer: '正解：',
        explanation: '解説：'
      },
      uz: {
        answered: 'Jami ishlangan',
        correct: 'To‘g‘ri javoblar',
        wrong: 'Xato javoblar',
        threshold: 'O‘tish chegarasi (65%)',
        barCorrect: 'To‘g‘ri',
        barWrong: 'Xato',
        reviewTitle: '📝 Xato qilingan savollar va to‘g‘ri javoblar tahlili',
        allQuestionsTitle: '📝 Ishlangan barcha savollar tahlili',
        allCorrectCheer: '🎉 Ajoyib! 100% to‘g‘ri javob berdingiz! Xatolar yo‘q!',
        toggleBoth: '🌐 Ona tilida + Yaponcha (併記)',
        toggleNative: '🇺🇿 O‘zbek tilida',
        toggleJa: '🇯🇵 Yapon tilida (日本語)',
        filterWrong: '❌ Faqat xato savollar',
        filterAll: '📋 Barcha savollar',
        yourAnswer: 'Siz tanlagan javob:',
        correctAnswer: 'To‘g‘ri javob:',
        explanation: 'Izoh / Tushuntirish:'
      },
      en: {
        answered: 'Total Answered',
        correct: 'Correct',
        wrong: 'Incorrect',
        threshold: 'Passing Mark (65%)',
        barCorrect: 'Correct',
        barWrong: 'Wrong',
        reviewTitle: '📝 Detailed Review of Mistakes & Correct Answers',
        allQuestionsTitle: '📝 Review of All Answered Questions',
        allCorrectCheer: '🎉 Perfect Score! All answers are 100% correct!',
        toggleBoth: '🌐 English + Japanese',
        toggleNative: 'English Only',
        toggleJa: '🇯🇵 Japanese Only',
        filterWrong: '❌ Mistakes Only',
        filterAll: '📋 All Questions',
        yourAnswer: 'Your Answer:',
        correctAnswer: 'Correct Answer:',
        explanation: 'Explanation:'
      },
      ne: {
        answered: 'जम्मा उत्तर दिएका',
        correct: 'सही उत्तर',
        wrong: 'गलत उत्तर',
        threshold: 'उत्तीर्ण अङ्क (६५%)',
        barCorrect: 'सही',
        barWrong: 'गलत',
        reviewTitle: '📝 गल्ती भएका प्रश्न र सही उत्तर विश्लेषण',
        allQuestionsTitle: '📝 उत्तर दिएका सबै प्रश्नहरू',
        allCorrectCheer: '🎉 उत्कृष्ट! १००% सही उत्तर! कुनै गल्ती छैन।',
        toggleBoth: '🌐 नेपाली + जापानी',
        toggleNative: 'नेपाली मात्र',
        toggleJa: '🇯🇵 जापानी मात्र',
        filterWrong: '❌ गलत प्रश्न मात्र',
        filterAll: '📋 सबै प्रश्नहरू',
        yourAnswer: 'तपाईंको उत्तर:',
        correctAnswer: 'सही उत्तर:',
        explanation: 'व्याख्या:'
      },
      my: {
        answered: 'စုစုပေါင်း ဖြေဆိုခဲ့သည်',
        correct: 'မှန်ကန်သော အဖြေ',
        wrong: 'မှားယွင်းသော အဖြေ',
        threshold: 'အောင်မြင်မှု အမှတ် (၆၅%)',
        barCorrect: 'မှန်',
        barWrong: 'မှား',
        reviewTitle: '📝 မှားယွင်းသော မေးခွန်းများနှင့် အဖြေမှန် သုံးသပ်ချက်',
        allQuestionsTitle: '📝 ဖြေဆိုခဲ့သော မေးခွန်းအားလုံး',
        allCorrectCheer: '🎉 ထူးချွန်သည်! အားလုံး မှန်ကန်ပါသည်! အမှားမရှိပါ။',
        toggleBoth: '🌐 မြန်မာ + ဂျပန်',
        toggleNative: 'မြန်မာဘာသာသာ',
        toggleJa: '🇯🇵 ဂျပန်ဘာသာသာ',
        filterWrong: '❌ အမှားများသာ',
        filterAll: '📋 မေးခွန်းအားလုံး',
        yourAnswer: 'သင့်အဖြေ:',
        correctAnswer: 'အဖြေမှန်:',
        explanation: 'ရှင်းလင်းချက်:'
      }
    };
    const rl = resultLabels[language] || resultLabels.ja;

    $('progress').textContent = `${fieldTitle} — ${copy.title}`;
    let progressBar = $('practiceProgressBarFill');
    if (progressBar) progressBar.style.width = '100%';

    let card = document.querySelector('.card');
    if (!card) return;

    let resultContainer = $('examResultCard');
    if (!resultContainer) {
      resultContainer = document.createElement('div');
      resultContainer.id = 'examResultCard';
      resultContainer.className = 'exam-result-card';
      card.appendChild(resultContainer);
    }
    resultContainer.classList.remove('hidden');

    const total = sessionAnswered > 0 ? sessionAnswered : (sessionHistory.length || 1);
    const correct = sessionCorrect;
    const wrong = Math.max(0, total - correct);
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const wrongPct = total > 0 ? (100 - pct) : 0;
    const passThreshold = 65;
    const passed = pct >= passThreshold;
    const passCount = Math.ceil(total * 0.65);
    const needed = Math.max(0, passCount - correct);

    const headDiv = document.createElement('div');
    headDiv.className = 'exam-result-head';

    const badge = document.createElement('div');
    badge.className = `exam-result-badge ${passed ? 'passed' : 'failed'}`;
    const badgeIcon = passed
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    badge.innerHTML = `${badgeIcon} <span>${passed ? copy.passedBadge : copy.failedBadge(needed)}</span>`;

    const titleEl = document.createElement('h2');
    titleEl.className = 'exam-result-title';
    titleEl.textContent = copy.title;

    const scoreEl = document.createElement('div');
    scoreEl.className = 'exam-result-score';
    scoreEl.textContent = copy.score(correct, total, pct);

    const noteEl = document.createElement('p');
    noteEl.className = 'exam-result-note';
    noteEl.textContent = passed ? copy.passedMsg : copy.failedMsg(passCount);

    headDiv.append(badge, titleEl, scoreEl, noteEl);

    // Dual-color visual progress bar
    const dualBar = document.createElement('div');
    dualBar.className = 'exam-dual-bar-wrap';
    dualBar.innerHTML = `
      <div class="exam-dual-bar-labels">
        <span class="dual-label-correct">✅ ${rl.barCorrect}: ${correct} (${pct}%)</span>
        <span class="dual-label-wrong">❌ ${rl.barWrong}: ${wrong} (${wrongPct}%)</span>
      </div>
      <div class="exam-dual-bar-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
        <div class="exam-dual-bar-fill-correct" style="width: ${pct}%"></div>
        <div class="exam-dual-bar-fill-wrong" style="width: ${wrongPct}%"></div>
      </div>
    `;

    // 4-column stats grid
    const statsGrid = document.createElement('div');
    statsGrid.className = 'exam-result-stats exam-result-stats-4col';
    statsGrid.innerHTML = `
      <div class="exam-result-stat-item">
        <div class="exam-result-stat-label">${rl.answered}</div>
        <div class="exam-result-stat-value">${total}</div>
      </div>
      <div class="exam-result-stat-item stat-item-correct">
        <div class="exam-result-stat-label">${rl.correct}</div>
        <div class="exam-result-stat-value stat-val-correct">✅ ${correct} (${pct}%)</div>
      </div>
      <div class="exam-result-stat-item stat-item-wrong">
        <div class="exam-result-stat-label">${rl.wrong}</div>
        <div class="exam-result-stat-value stat-val-wrong">❌ ${wrong} (${wrongPct}%)</div>
      </div>
      <div class="exam-result-stat-item stat-item-threshold">
        <div class="exam-result-stat-label">${rl.threshold}</div>
        <div class="exam-result-stat-value">${passCount} (${copy.thresholdValue ? copy.thresholdValue(passCount) : '65%'})</div>
      </div>
    `;

    // Action buttons
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'exam-result-actions';

    const retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'exam-result-retry-btn';
    retryBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg> ' + copy.retryBtn;
    retryBtn.addEventListener('click', () => {
      isExamFinished = false;
      resultContainer.classList.add('hidden');
      $('question')?.classList.remove('hidden');
      $('options')?.classList.remove('hidden');
      resetQuestions();
      render();
    });

    const subActions = document.createElement('div');
    subActions.className = 'exam-result-sub-actions';

    const mistakesLink = document.createElement('a');
    mistakesLink.href = './mistakes.html';
    mistakesLink.className = 'exam-result-sub-btn';
    mistakesLink.textContent = copy.mistakesBtn;

    const backLink = document.createElement('a');
    backLink.href = `./${field.back}`;
    backLink.className = 'exam-result-sub-btn';
    backLink.textContent = copy.backBtn;

    subActions.append(mistakesLink, backLink);
    actionsDiv.append(retryBtn, subActions);

    // Diagnostic breakdown for all 6 sectors
    let diagSection = null;
    if (fieldKey) {
      diagSection = document.createElement('div');
      diagSection.className = 'exam-diag-report';

      const diagI18n = {
        ja: {
          title: '📊 分野別・弱点診断レポート',
          lead: 'カテゴリごとの正答率と今後の学習アドバイス：',
          excellent: '⭐️ 良好',
          review: '⚠️ 要復習',
          weak: '❌ 弱点',
          adviceTitle: '💡 重点復習アドバイス',
          adviceText: '正答率が低かった分野は、専門用語カードや問題の解説を重点的に復習しましょう。',
          vocabBtn: '📚 専門語彙カード・一覧で復習する（1,000語）'
        },
        uz: {
          title: '📊 Bo‘limlar bo‘yicha zaiflik diagnostikasi',
          lead: 'Bo‘limlar bo‘yicha natijangiz va o‘rganish tahlili:',
          excellent: '⭐️ A’lo',
          review: '⚠️ Takrorlash kerak',
          weak: '❌ Zaif mavzu',
          adviceTitle: '💡 O‘rganish bo‘yicha tavsiya',
          adviceText: 'Past foiz to‘plangan bo‘limlar bo‘yicha maxsus so‘zlarni Flashcard orqali takrorlash tavsiya etiladi.',
          vocabBtn: '📚 Sohaga oid maxsus lug‘at va Flashcard (1 000 ta so‘z)'
        },
        en: {
          title: '📊 Category Diagnostic & Weakness Report',
          lead: 'Performance breakdown by topic:',
          excellent: '⭐️ Good',
          review: '⚠️ Needs review',
          weak: '❌ Weak spot',
          adviceTitle: '💡 Study Recommendation',
          adviceText: 'Focus on topics with lower scores by reviewing sector vocabulary flashcards and practice items.',
          vocabBtn: '📚 Review Sector Vocabulary & Flashcards (1,000 words)'
        },
        ne: {
          title: '📊 विधागत कमजोरी निदान प्रतिवेदन',
          lead: 'विधागत कार्यसम्पादन विश्लेषण:',
          excellent: '⭐️ उत्कृष्ट',
          review: '⚠️ समीक्षा आवश्यक',
          weak: '❌ कमजोर',
          adviceTitle: '💡 सुझाव',
          adviceText: 'कम अङ्क आएका विधाका शब्द तथा प्रश्नहरू फ्ल्यासकार्डमार्फत फेरि दोहोर्याउनुहोस्।',
          vocabBtn: '📚 शब्दावली र फ्ल्यासकार्ड समीक्षा गर्नुहोस् (१,००० शब्द)'
        },
        my: {
          title: '📊 ကဏ္ဍအလိုက် အားနည်းချက် သုံးသပ်ချက် အစီရင်ခံစာ',
          lead: 'ခေါင်းစဉ်အလိုက် လုပ်ဆောင်ချက် အကျဉ်းချုပ်:',
          excellent: '⭐️ ကောင်းမွန်',
          review: '⚠️ ပြန်လည်လေ့လာရန်',
          weak: '❌ အားနည်းချက်',
          adviceTitle: '💡 အကြံပြုချက်',
          adviceText: 'ရမှတ်နည်းသော ကဏ္ဍများကို ဝေါဟာရကတ်ပြားများဖြင့် ထပ်မံလေ့လာပါ။',
          vocabBtn: '📚 ဝေါဟာရနှင့် ကတ်ပြားများ ပြန်လည်လေ့လာရန် (၁,၀၀၀ လုံး)'
        }
      };
      const dt = diagI18n[language] || diagI18n.ja;

      const diagHead = document.createElement('div');
      diagHead.className = 'exam-diag-head';
      const diagTitle = document.createElement('h3');
      diagTitle.className = 'exam-diag-title';
      diagTitle.textContent = dt.title;
      const diagLead = document.createElement('p');
      diagLead.className = 'exam-diag-lead';
      diagLead.textContent = dt.lead;
      diagHead.append(diagTitle, diagLead);

      const diagList = document.createElement('div');
      diagList.className = 'exam-diag-list';

      const catKeys = Object.keys(sessionCategoryStats);
      if (catKeys.length > 0) {
        catKeys.forEach((catKey) => {
          const stat = sessionCategoryStats[catKey];
          const catPct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
          const catName = categoryLabels[catKey]?.[language] || categoryLabels[catKey]?.ja || catKey;

          let statusClass = 'status-excellent';
          let statusText = dt.excellent;
          if (catPct < 50) {
            statusClass = 'status-weak';
            statusText = dt.weak;
          } else if (catPct < 70) {
            statusClass = 'status-review';
            statusText = dt.review;
          }

          const row = document.createElement('div');
          row.className = 'exam-diag-row';
          row.innerHTML = `
            <div class="exam-diag-row-top">
              <span class="exam-diag-name">${catName}</span>
              <span class="exam-diag-badge ${statusClass}">${statusText} (${stat.correct}/${stat.total} — ${catPct}%)</span>
            </div>
            <div class="exam-diag-bar">
              <div class="exam-diag-bar-fill ${statusClass}" style="width: ${catPct}%"></div>
            </div>
          `;
          diagList.append(row);
        });
      }

      const vocabHref = `./${fieldKey}-vocab.html`;
      const adviceBox = document.createElement('div');
      adviceBox.className = 'exam-diag-advice';
      adviceBox.innerHTML = `
        <div class="exam-diag-advice-title">${dt.adviceTitle}</div>
        <p class="exam-diag-advice-text">${dt.adviceText}</p>
        <a href="${vocabHref}" class="exam-diag-vocab-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>${dt.vocabBtn}</span>
        </a>
      `;

      diagSection.append(diagHead, diagList, adviceBox);
    }

    // Detailed Mistake & Question Review Section with Bilingual / Native / Japanese Toggle
    const reviewSection = document.createElement('div');
    reviewSection.className = 'exam-review-section';

    function buildReviewDOM() {
      reviewSection.replaceChildren();

      const header = document.createElement('div');
      header.className = 'exam-review-header';

      const title = document.createElement('h3');
      title.className = 'exam-review-title';
      title.textContent = wrong === 0 ? rl.allQuestionsTitle : rl.reviewTitle;
      header.append(title);

      const controls = document.createElement('div');
      controls.className = 'exam-review-controls';

      // Language mode toggle: [🌐 Both (併記)] [Native] [🇯🇵 Japanese]
      const langToggleGroup = document.createElement('div');
      langToggleGroup.className = 'exam-review-toggle-group';
      langToggleGroup.setAttribute('role', 'tablist');

      const nativeLangName = languageNames[language] || 'Ona tili';
      const modes = [
        { id: 'both', label: rl.toggleBoth },
        { id: 'native', label: language === 'ja' ? '日本語' : `${nativeLangName} (${rl.toggleNative})` },
        { id: 'ja', label: rl.toggleJa }
      ];

      modes.forEach(m => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `exam-review-toggle-btn ${reviewMode === m.id ? 'is-active' : ''}`;
        btn.textContent = m.label;
        btn.addEventListener('click', () => {
          reviewMode = m.id;
          buildReviewDOM();
        });
        langToggleGroup.append(btn);
      });

      controls.append(langToggleGroup);

      // Filter toggle (if wrong > 0): [❌ Mistakes] [📋 All]
      if (wrong > 0) {
        const filterToggleGroup = document.createElement('div');
        filterToggleGroup.className = 'exam-review-toggle-group';

        const filterModes = [
          { id: 'wrong', label: `${rl.filterWrong} (${wrong})` },
          { id: 'all', label: `${rl.filterAll} (${total})` }
        ];

        filterModes.forEach(f => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `exam-review-toggle-btn ${reviewFilter === f.id ? 'is-active' : ''}`;
          btn.textContent = f.label;
          btn.addEventListener('click', () => {
            reviewFilter = f.id;
            buildReviewDOM();
          });
          filterToggleGroup.append(btn);
        });
        controls.append(filterToggleGroup);
      }

      header.append(controls);
      reviewSection.append(header);

      if (wrong === 0) {
        const cheerBox = document.createElement('div');
        cheerBox.className = 'review-all-correct-box';
        cheerBox.innerHTML = `
          <div class="review-all-correct-icon">🎉</div>
          <p class="review-all-correct-text">${rl.allCorrectCheer}</p>
        `;
        reviewSection.append(cheerBox);
      }

      const activeHistory = (reviewFilter === 'wrong' && wrong > 0)
        ? sessionHistory.filter(h => !h.isCorrect)
        : sessionHistory;

      const data = window.SECTOR_QUESTION_DATA?.[fieldKey];

      activeHistory.forEach((h, hIdx) => {
        const cardEl = document.createElement('div');
        cardEl.className = `exam-review-card ${h.isCorrect ? 'is-correct' : 'is-wrong'}`;

        const item = h.item || {};
        const bp = data?.blueprints?.find(b => b.id === (item.blueprintId || item.id));
        const catName = categoryLabels[h.category]?.[language] || categoryLabels[h.category]?.ja || h.category;

        // Card Head
        const head = document.createElement('div');
        head.className = 'review-card-head';
        head.innerHTML = `
          <div class="review-head-left">
            <span class="review-num">#${hIdx + 1}</span>
            ${catName ? `<span class="review-cat-badge">${catName}</span>` : ''}
          </div>
          <span class="review-status-badge ${h.isCorrect ? 'correct' : 'wrong'}">
            ${h.isCorrect ? '✅ ' + (copy.passedBadge || '正解') : '❌ ' + rl.wrong}
          </span>
        `;
        cardEl.append(head);

        // Question Prompt
        if (reviewMode === 'both' || reviewMode === 'ja') {
          const pJa = document.createElement('div');
          pJa.className = 'review-prompt-ja';
          pJa.lang = 'ja';
          if (furigana) {
            furigana.setText(pJa, item.prompt || '');
          } else {
            pJa.textContent = item.prompt || '';
          }
          cardEl.append(pJa);
        }

        // Answers Box
        const ansBox = document.createElement('div');
        ansBox.className = 'review-ans-box';

        if (!h.isCorrect) {
          const userRow = document.createElement('div');
          userRow.className = 'review-ans-row user-wrong';
          userRow.innerHTML = `<span class="review-ans-label">❌ ${rl.yourAnswer}</span> <strong class="review-ans-val">${h.selectedAnswer}</strong>`;
          ansBox.append(userRow);
        }

        const correctRow = document.createElement('div');
        correctRow.className = 'review-ans-row correct-ans';
        correctRow.innerHTML = `<span class="review-ans-label">✅ ${rl.correctAnswer}</span> <strong class="review-ans-val">${h.correctAnswer}</strong>`;
        ansBox.append(correctRow);

        cardEl.append(ansBox);

        // Explanations Box
        const expBox = document.createElement('div');
        expBox.className = 'review-exp-box';

        let jaExp = bp?.explanation?.ja || h.explanationJa || '';
        let nativeExp = bp?.explanation?.[language] || bp?.explanation?.uz || bp?.explanation?.en || h.explanationLocalized || '';

        if (!jaExp && item.explanation) jaExp = item.explanation;
        if (!nativeExp && item.explanation) nativeExp = item.explanation;

        if (reviewMode === 'both') {
          if (language !== 'ja' && nativeExp && jaExp && nativeExp !== jaExp) {
            const blockNat = document.createElement('div');
            blockNat.className = 'review-exp-block';
            blockNat.innerHTML = `<span class="review-exp-tag">💡 ${rl.explanation}</span> <span>${nativeExp}</span>`;
            const blockJa = document.createElement('div');
            blockJa.className = 'review-exp-block';
            blockJa.innerHTML = `<span class="review-exp-tag">🇯🇵 日本語解説:</span> <span>${jaExp}</span>`;
            expBox.append(blockNat, blockJa);
          } else {
            const single = document.createElement('div');
            single.className = 'review-exp-block';
            single.innerHTML = `<span class="review-exp-tag">💡 ${rl.explanation}</span> <span>${nativeExp || jaExp}</span>`;
            expBox.append(single);
          }
        } else if (reviewMode === 'native') {
          const single = document.createElement('div');
          single.className = 'review-exp-block';
          single.innerHTML = `<span class="review-exp-tag">💡 ${rl.explanation}</span> <span>${nativeExp || jaExp}</span>`;
          expBox.append(single);
        } else { // 'ja'
          const single = document.createElement('div');
          single.className = 'review-exp-block';
          single.innerHTML = `<span class="review-exp-tag">🇯🇵 日本語解説:</span> <span>${jaExp || nativeExp}</span>`;
          expBox.append(single);
        }

        cardEl.append(expBox);
        reviewSection.append(cardEl);
      });
    }

    buildReviewDOM();

    if (diagSection) {
      resultContainer.replaceChildren(headDiv, dualBar, statsGrid, diagSection, reviewSection, actionsDiv);
    } else {
      resultContainer.replaceChildren(headDiv, dualBar, statsGrid, reviewSection, actionsDiv);
    }
  }

  function showPracticeError(error) {
    console.error('Practice could not be rendered:', error);
    $('question').textContent = (text[language] || text.en).loading;
    $('options').replaceChildren();
    $('feedback').className = 'feedback hidden';
    $('next').className = 'next hidden';
  }

  async function synchronizeQuestions(selectedLanguage = language) {
    const requestId = ++syncSequence;
    try {
      if (window.firebaseStudyReady) await window.firebaseStudyReady;
      if (!window.FirebaseStudy?.loadQuestions) return;
      const [japaneseItems, localizedItems] = await Promise.all([
        window.FirebaseStudy.loadQuestions(fieldKey, 'ja'),
        selectedLanguage === 'ja'
          ? window.FirebaseStudy.loadQuestions(fieldKey, 'ja')
          : window.FirebaseStudy.loadQuestions(fieldKey, selectedLanguage)
      ]);
      const merged = mergeRemoteQuestions(japaneseItems, localizedItems, selectedLanguage);
      if (!merged || requestId !== syncSequence || selectedLanguage !== language) return;
      if (merged.length !== expectedRemoteQuestionCount) {
        console.warn(`Ignoring a mismatched ${fieldKey} Firestore bank with ${merged.length} questions.`);
        return;
      }
      if (answered || index !== 0) return;
      questions = filterQuestions(shuffle([...merged]));
      if (!questions.length) return;
      questionSource = 'firestore';
      document.documentElement.dataset.contentSource = 'firestore';
      render();
    } catch (error) {
      console.warn('Bundled questions remain active because Firestore sync failed:', error);
    }
  }

  function choose(button, answer, item) {
    if (answered) return;
    answered = true;
    sessionAnswered += 1;
    if (item.category) {
      if (!sessionCategoryStats[item.category]) {
        sessionCategoryStats[item.category] = { correct: 0, total: 0 };
      }
      sessionCategoryStats[item.category].total += 1;
      if (answer === item.correct) {
        sessionCategoryStats[item.category].correct += 1;
      }
    }
    document.querySelectorAll('.option').forEach((option) => {
      option.disabled = true;
    });

    const isCorrect = (answer === item.correct);
    const data = window.SECTOR_QUESTION_DATA?.[fieldKey];
    const bp = data?.blueprints?.find(b => b.id === (item.blueprintId || item.id));
    const explanationJa = bp?.explanation?.ja || (language === 'ja' ? item.explanation : item.correct);
    const explanationLocalized = bp?.explanation?.[language] || item.explanation;

    sessionHistory.push({
      questionId: item.id,
      item: item,
      isCorrect: isCorrect,
      selectedAnswer: answer,
      correctAnswer: item.correct,
      category: item.categoryId || item.category || item.topic || '',
      explanationJa: explanationJa,
      explanationLocalized: explanationLocalized,
      explanations: bp?.explanation || null
    });

    const activeText = text[language];
    const feedback = $('feedback');
    if (answer === item.correct) {
      sessionCorrect += 1;
      window.MistakeNotebook?.remove(fieldKey, item.id);
      button.classList.add('correct');
      const prefix = document.createTextNode(`${activeText.correct} `);
      const explanation = document.createElement('span');
      explanation.lang = language;
      if (furigana) {
        furigana.setText(explanation, item.explanation);
      } else {
        explanation.textContent = item.explanation;
      }
      feedback.replaceChildren(prefix, explanation);
      feedback.className = 'feedback good';
    } else {
      window.MistakeNotebook?.save({
        field: fieldKey,
        questionId: item.id,
        prompt: item.prompt,
        correctAnswer: item.correct,
        explanation: item.explanation,
        selectedAnswer: answer,
        promptJa: item.prompt,
        correctJa: item.correct,
        explanationJa: explanationJa,
        explanations: bp?.explanation || null
      });
      button.classList.add('wrong');
      const correctButton = [...document.querySelectorAll('.option')]
        .find((option) => option.dataset.answer === item.correct);
      if (correctButton) correctButton.classList.add('correct');

      const prefix = document.createTextNode(`${activeText.wrong} `);
      const explanation = document.createElement('span');
      explanation.lang = language;
      if (furigana) {
        furigana.setText(explanation, item.explanation);
      } else {
        explanation.textContent = item.explanation;
      }
      feedback.replaceChildren(prefix, explanation);
      feedback.className = 'feedback wrong';
    }
    appendQuestionSources(feedback, item);
    updateSessionStats();
    window.FirebaseStudy?.recordAnswer({
      field: fieldKey,
      language,
      questionId: item.id,
      selectedAnswer: answer,
      correctAnswer: item.correct,
      correct: answer === item.correct
    }).catch((error) => console.error('Answer could not be saved:', error));
    $('next').className = 'next';
    requestAnimationFrame(() => {
      $('next').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function appendQuestionSources(feedback, item) {
    if (!Array.isArray(item.sourceIds) || !item.sourceIds.length) return;
    const data = window.SECTOR_QUESTION_DATA?.[fieldKey];
    const sources = Array.isArray(data?.sources)
      ? data.sources.filter(source => item.sourceIds.includes(source.id))
      : [];
    if (!sources.length) return;
    const copy = bankCopy[language] || bankCopy.ja;
    const note = document.createElement('small');
    note.className = 'feedback-sources';
    note.append(document.createTextNode(`${copy.itemSources}: `));
    sources.forEach((source, sourceIndex) => {
      if (sourceIndex) note.append(document.createTextNode(' · '));
      const link = document.createElement('a');
      link.href = source.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = source.organization;
      note.append(link);
    });
    feedback.append(note);
  }

  function resetQuestions() {
    index = 0;
    answered = false;
    sessionAnswered = 0;
    sessionCorrect = 0;
    sessionCategoryStats = {};
    sessionHistory = [];
    isExamFinished = false;
    questionSource = 'bundled';
    document.documentElement.dataset.contentSource = 'bundled';
    questions = filterQuestions(createQuestions());
    if (!questions.length) {
      activeTopic = 'all';
      questions = createQuestions();
    }
  }

  const SUN_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  const MOON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function updateThemeButton() {
    const activeText = text[language] || text.en;
    const dark = document.body.classList.contains('dark');
    const themeBtn = $('theme');
    if (!themeBtn) return;
    if (window.ThemeManager) {
      window.ThemeManager.updateUI();
    } else {
      themeBtn.innerHTML = dark ? SUN_SVG : MOON_SVG;
    }
    themeBtn.setAttribute('aria-label', dark ? activeText.themeDark : activeText.themeLight);
    themeBtn.title = dark ? activeText.themeDark : activeText.themeLight;
  }

  document.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target && event.target.matches && event.target.matches('input, select, textarea, [contenteditable="true"]')) {
      return;
    }
    if (['1', '2', '3', '4'].includes(event.key)) {
      if (!answered) {
        const optionButtons = document.querySelectorAll('.option');
        const targetBtn = optionButtons[Number(event.key) - 1];
        if (targetBtn && !targetBtn.disabled) {
          event.preventDefault();
          targetBtn.click();
        }
      }
      return;
    }
    if (event.key === 'Enter' || event.key === 'ArrowRight') {
      const nextBtn = $('next');
      if (answered && nextBtn && !nextBtn.classList.contains('hidden')) {
        event.preventDefault();
        nextBtn.click();
      }
    }
  });

  $('next').addEventListener('click', () => {
    if (index === questions.length - 1) {
      showExamResultSummary();
    } else {
      index += 1;
      render();
    }
  });

  const languageSelect = $('language');
  supportedLanguages.forEach((locale) => {
    if (![...languageSelect.options].some((option) => option.value === locale)) {
      const option = document.createElement('option');
      option.value = locale;
      option.textContent = languageNames[locale];
      languageSelect.append(option);
    }
  });
  languageSelect.value = language;
  languageSelect.addEventListener('change', (event) => {
    language = supportedLanguages.includes(event.target.value) ? event.target.value : 'ja';
    localStorage.setItem('language', language);
    if (isExamFinished) {
      showExamResultSummary();
    } else {
      resetQuestions();
      render();
      synchronizeQuestions(language);
    }
  });

  $('theme').addEventListener('click', (e) => {
    if (window.ThemeManager) return;
    e.preventDefault();
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeButton();
  });

  if (window.ThemeManager) {
    window.ThemeManager.updateUI();
  } else if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  function initializePractice() {
    // Bundled questions render immediately so navigation never waits on Firestore.
    try {
      resetQuestions();
      render();
    } catch (error) {
      showPracticeError(error);
    }

    window.__PRACTICE_TEST__ = Object.freeze({
      field: fieldKey,
      get language() { return language; },
      get questionCount() { return questions.length; },
      expectedQuestionCount,
      expectedConstructionCount: fieldKey === 'construction' ? expectedQuestionCount : null,
      baseQuestionCount: window.SectorQuestionGenerator?.REQUIRED_BLUEPRINT_COUNT || 90,
      practiceVariantCount: generatedQuestionCount,
      optionCount: expectedOptionCount,
      unofficialPractice: true,
      get source() { return questionSource; }
    });
    synchronizeQuestions(language);
  }

  initializePractice();
})();
