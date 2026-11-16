const THEME_KEY = 'theme';
const LANGUAGE_KEY = 'language';

const languageContent = {
  ja: {
    brandTitle: '特定技能練習問題',
    brandSub: '特定技能1号 試験対策',
    notebookLabel: '間違いノート',
    menuBrand: '特定技能1号 学科・実技試験対策',
    appTitle: '特定技能練習問題',
    menuSubtitle: '6つの分野の練習問題と重要語彙を、母国語の解説つきで学べます。',
    statSectors: '分野',
    statQuestions: '問',
    statWords: '語',
    step1: '分野をえらぶ',
    step2: '練習問題・重要語彙で学ぶ',
    step3: '間違いノートで復習',
    sectorsHeading: '分野をえらぶ',
    start: '練習問題',
    vocabulary: '重要語彙',
    sectorDetails: '分野ガイド・学習モード',
    questionCount: '全290問 · 重要語彙1,000語',
    footerDisclaimer: '特定技能練習問題 — 公表されている試験基準・出題範囲に基づく自主学習サイト（非公式）',
    footerMistakes: '間違いノート ›',
    question: '問題',
    progress: '進捗',
    next: '次へ',
    menu: 'メニュー',
    back: '戻る',
    result: '結果',
    resultHeading: 'お疲れさまでした',
    restart: 'もう一度挑戦',
    accuracy: '正解率',
    correctFeedback: '正解です！',
    wrongFeedback: '不正解です。正解：',
    resultHigh: '素晴らしい結果です！',
    resultMedium: 'よくできました。もう少し練習しましょう。',
    resultLow: 'もう一度挑戦して、問題を復習しましょう。',
    sectors: {
      construction: '建設',
      agriculture: '農業',
      foodservice: '外食業',
      foodmanufacturing: '飲食料品製造業',
      lodging: '宿泊',
      automobile: '自動車整備'
    },
    sectorDesc: {
      construction: '土木・建築・ライフライン設備・安全衛生',
      agriculture: '施設園芸・畑作・果樹・畜産管理・安全衛生',
      foodservice: '接客サービス・飲食物調理・衛生管理・店舗安全',
      foodmanufacturing: '製造工程・HACCP・品質管理・衛生安全',
      lodging: 'フロント業務・接客マナー・客室管理・施設安全',
      automobile: '日常点検・定期点検・分解整備・故障診断・安全作業'
    },
    questions: {
      construction: [
        '建設現場で土砂を押して移動させる重機はどれですか？',
        'セメント・砂・砂利などを水と混ぜて作る建築材料は何ですか？',
        '建設現場で頭部を保護するために着用するものは何ですか？'
      ],
      agriculture: [
        '畑から作物を取り入れることを何といいますか？',
        '植物の成長を助けるために土に加えるものは何ですか？',
        '作物を害虫や病気から守るために使う薬剤は何ですか？'
      ],
      foodservice: [
        'お客様に料理や飲み物を提供する仕事は何ですか？',
        '食品を加熱して食べられる状態にすることは何ですか？',
        'お客様から料理の希望を受け付けることは何ですか？'
      ],
      foodmanufacturing: [
        '食品を作るために使う材料は何ですか？',
        '器具や設備の細菌を薬剤などで取り除くことは何ですか？',
        '製品を包んで保護することは何ですか？'
      ],
      lodging: [
        'ホテルでお客様が宿泊する部屋は何ですか？',
        '客室を清潔に保つために行う作業は何ですか？',
        'ホテルに到着したお客様の宿泊手続きを行う場所はどこですか？'
      ],
      automobile: [
        '自動車の状態を定期的に確認することは何ですか？',
        '自動車を良好な状態に保つための点検や修理は何ですか？',
        '自動車の整備作業に使う道具は何ですか？'
      ]
    }
  },
  uz: {
    brandTitle: 'Maxsus malaka mashq savollari',
    brandSub: '1-toifa maxsus malaka imtihoni',
    notebookLabel: 'Xatolar daftari',
    menuBrand: '1-toifa nazariy va amaliy imtihonlarga tayyorgarlik',
    appTitle: 'Maxsus malaka imtihoni mashq savollari',
    menuSubtitle: '6 ta soha bo‘yicha mashq savollari va muhim atamalarni o‘z ona tilingizdagi tushuntirishlar bilan o‘rganing.',
    statSectors: 'soha',
    statQuestions: 'ta mashq',
    statWords: 'ta atama',
    step1: 'Sohani tanlang',
    step2: 'Savol va lug‘at bilan o‘rganing',
    step3: 'Xatolar daftari orqali takrorlang',
    sectorsHeading: 'Sohani tanlang',
    start: 'Mashq savollari',
    vocabulary: 'Asosiy lug‘at',
    sectorDetails: 'Soha qo‘llanmasi va rejimlar',
    questionCount: '290 ta savol · 1 000 ta so‘z',
    footerDisclaimer: '特定技能練習問題 — Rasmiy ochiq imtihon dasturlari asosida tuzilgan mustaqil o‘quv platformasi',
    footerMistakes: 'Xatolar daftari ›',
    question: 'Savol',
    progress: 'Jarayon',
    next: 'Keyingi',
    menu: 'Menyu',
    back: 'Ortga',
    result: 'Natija',
    resultHeading: 'Test yakunlandi',
    restart: 'Qayta boshlash',
    accuracy: 'To‘g‘ri javoblar',
    correctFeedback: 'To‘g‘ri javob!',
    wrongFeedback: 'Noto‘g‘ri. To‘g‘ri javob: ',
    resultHigh: 'Ajoyib natija! Barakalla.',
    resultMedium: 'Yaxshi ishladingiz. Yana biroz mashq qiling.',
    resultLow: 'Yana urinib ko‘ring va savollarni takrorlang.',
    sectors: {
      construction: 'Qurilish',
      agriculture: 'Qishloq xo‘jaligi',
      foodservice: 'Umumiy ovqatlanish',
      foodmanufacturing: 'Oziq-ovqat ishlab chiqarish',
      lodging: 'Mehmonxona',
      automobile: 'Avtomobil ta’mirlash'
    },
    sectorDesc: {
      construction: 'Fuqaro qurilishi, bino qurish, infratuzilma va mehnat xavfsizligi',
      agriculture: 'Issiqxona, dehqonchilik, meva yetishtirish, chorvachilik va xavfsizlik',
      foodservice: 'Mijozlarga xizmat, taom tayyorlash, sanitariya va oshxona xavfsizligi',
      foodmanufacturing: 'Ishlab chiqarish jarayoni, HACCP, sifat nazorati va sanitariya xavfsizligi',
      lodging: 'Front-ofis xizmati, mehmondo‘stlik odobi, xonalar nazorati va xavfsizlik',
      automobile: 'Kundalik ko‘rik, rejali texnik xizmat, qismlarga ajratish va tashxis'
    },
    questions: {
      construction: [
        'Qurilish maydonida tuproqni surib tashiydigan og‘ir texnika qaysi?',
        'Sement, qum va shag‘alni suv bilan aralashtirib tayyorlanadigan qurilish materiali nima?',
        'Qurilish maydonida boshni himoya qilish uchun nima kiyiladi?'
      ],
      agriculture: [
        'Daladan yetishtirilgan hosilni yig‘ib olish nima deyiladi?',
        'O‘simliklarning o‘sishiga yordam berish uchun tuproqqa nima qo‘shiladi?',
        'Ekinlarni zararkunanda va kasalliklardan himoya qilish uchun qanday vosita ishlatiladi?'
      ],
      foodservice: [
        'Mijozlarga taom va ichimlik taqdim etish bilan bog‘liq ish nima?',
        'Oziq-ovqatni qizdirib, iste’mol qilishga tayyorlash nima deyiladi?',
        'Mijozning taom buyurtmasini qabul qilish nima deyiladi?'
      ],
      foodmanufacturing: [
        'Oziq-ovqat tayyorlash uchun ishlatiladigan mahsulotlar nima deyiladi?',
        'Jihozlardagi bakteriyalarni maxsus vosita bilan yo‘qotish nima deyiladi?',
        'Mahsulotni o‘rab, himoya qilish nima deyiladi?'
      ],
      lodging: [
        'Mehmonxonada mijoz tunab qoladigan xona nima deyiladi?',
        'Mehmonxona xonasini ozoda saqlash uchun bajariladigan ish nima?',
        'Mehmonxonaga kelgan mijozni ro‘yxatdan o‘tkazish joyi qayerda?'
      ],
      automobile: [
        'Avtomobilning holatini muntazam tekshirish nima deyiladi?',
        'Avtomobilni soz holatda saqlash uchun tekshirish va ta’mirlash nima?',
        'Avtomobilni ta’mirlashda ishlatiladigan asboblar nima deyiladi?'
      ]
    }
  },
  en: {
    brandTitle: 'Specified Skilled Worker Practice',
    brandSub: 'Specified Skilled Worker (i) Prep',
    notebookLabel: 'Mistake Notebook',
    menuBrand: 'Specified Skilled Worker (i) Subject & Practical Exam Prep',
    appTitle: 'Specified Skilled Worker Exam Practice',
    menuSubtitle: 'Practice questions and core vocabulary across 6 sectors with explanations in your native language.',
    statSectors: 'sectors',
    statQuestions: 'questions',
    statWords: 'terms',
    step1: 'Choose a sector',
    step2: 'Study questions & vocabulary',
    step3: 'Review with mistake notebook',
    sectorsHeading: 'Select a sector',
    start: 'Practice',
    vocabulary: 'Vocabulary',
    sectorDetails: 'Sector guide & modes',
    questionCount: '290 questions · 1,000 terms',
    footerDisclaimer: 'Specified Skilled Worker Practice — Unofficial study platform based on official exam guidelines',
    footerMistakes: 'Mistake Notebook ›',
    question: 'Question',
    progress: 'Progress',
    next: 'Next',
    menu: 'Menu',
    back: 'Back',
    result: 'Result',
    resultHeading: 'Quiz complete',
    restart: 'Try again',
    accuracy: 'Accuracy',
    correctFeedback: 'Correct!',
    wrongFeedback: 'Incorrect. Correct answer: ',
    resultHigh: 'Excellent result!',
    resultMedium: 'Good work. Keep practicing.',
    resultLow: 'Try again and review these questions.',
    sectors: {
      construction: 'Construction',
      agriculture: 'Agriculture',
      foodservice: 'Food Service',
      foodmanufacturing: 'Food Manufacturing',
      lodging: 'Lodging',
      automobile: 'Automobile Maintenance'
    },
    sectorDesc: {
      construction: 'Civil engineering, building construction, infrastructure & site safety',
      agriculture: 'Greenhouse horticulture, field crops, livestock management & safety',
      foodservice: 'Customer service, food preparation, hygiene management & store safety',
      foodmanufacturing: 'Processing lines, HACCP principles, quality control & sanitation',
      lodging: 'Front desk operations, hospitality etiquette, housekeeping & facility safety',
      automobile: 'Daily inspection, periodic maintenance, disassembly, diagnostics & safety'
    },
    questions: {
      construction: [
        'Which machine pushes and moves soil at a construction site?',
        'What building material is made by mixing cement, sand, and gravel with water?',
        'What should workers wear to protect their heads at a construction site?'
      ],
      agriculture: [
        'What is the process of collecting crops from a field called?',
        'What is added to soil to help plants grow?',
        'What is used to protect crops from pests and disease?'
      ],
      foodservice: [
        'What is the work of serving food and drinks to customers called?',
        'What is heating food until it is ready to eat called?',
        'What is receiving a customer’s food order called?'
      ],
      foodmanufacturing: [
        'What are the materials used to make food products called?',
        'What is removing bacteria from equipment with a disinfectant called?',
        'What is wrapping a product to protect it called?'
      ],
      lodging: [
        'What is the room where a hotel guest stays called?',
        'What is the work of keeping a hotel room clean called?',
        'Where does a hotel register arriving guests?'
      ],
      automobile: [
        'What is regularly checking a vehicle’s condition called?',
        'What are inspections and repairs that keep a vehicle in good condition called?',
        'What are the tools used to repair a vehicle called?'
      ]
    }
  },
  ne: {
    brandTitle: 'विशिष्ट सीप परीक्षा अभ्यास',
    brandSub: 'विशिष्ट सीप १ परीक्षा तयारी',
    notebookLabel: 'गल्ती टिपोट',
    menuBrand: 'विशिष्ट सीप १ सैद्धान्तिक र व्यावहारिक परीक्षा तयारी',
    appTitle: 'विशिष्ट सीप परीक्षा अभ्यास',
    menuSubtitle: '६ वटा क्षेत्रका अभ्यास प्रश्न र मुख्य शब्दावलीलाई आफ्नै मातृभाषाको व्याख्यासहित सिक्नुहोस्।',
    statSectors: 'क्षेत्र',
    statQuestions: 'प्रश्न',
    statWords: 'शब्द',
    step1: 'क्षेत्र छान्नुहोस्',
    step2: 'अभ्यास प्रश्न र शब्दावलीबाट सिक्नुहोस्',
    step3: 'गल्ती नोटबुकबाट पुनरावलोकन गर्नुहोस्',
    sectorsHeading: 'क्षेत्र छान्नुहोस्',
    start: 'अभ्यास',
    vocabulary: 'मुख्य शब्दावली',
    sectorDetails: 'क्षेत्र निर्देशिका र मोडहरू',
    questionCount: '२९० प्रश्न · १,००० शब्द',
    footerDisclaimer: 'विशिष्ट सीप परीक्षा अभ्यास — आधिकारिक परीक्षा दायरामा आधारित अनौपचारिक अध्ययन मञ्च',
    footerMistakes: 'गल्ती टिपोट ›',
    question: 'प्रश्न',
    progress: 'प्रगति',
    next: 'अर्को',
    menu: 'मेनु',
    back: 'फर्कनुहोस्',
    result: 'नतिजा',
    resultHeading: 'अभ्यास पूरा भयो',
    restart: 'फेरि प्रयास गर्नुहोस्',
    accuracy: 'सही प्रतिशत',
    correctFeedback: 'सही उत्तर!',
    wrongFeedback: 'गलत। सही उत्तर: ',
    resultHigh: 'उत्कृष्ट नतिजा!',
    resultMedium: 'राम्रो प्रयास। अझै अभ्यास गर्नुहोस्।',
    resultLow: 'फेरि प्रयास गर्नुहोस् र प्रश्नहरू दोहोर्याउनुहोस्।',
    sectors: {
      construction: 'निर्माण',
      agriculture: 'कृषि',
      foodservice: 'खाद्य सेवा',
      foodmanufacturing: 'खाद्य उत्पादन',
      lodging: 'आवास सेवा',
      automobile: 'सवारी मर्मत'
    },
    sectorDesc: {
      construction: 'सिभिल निर्माण, भवन निर्माण, पूर्वाधार र कार्यस्थल सुरक्षा',
      agriculture: 'हरितगृह बागवानी, बालीनाली, फलफूल, पशुपालन र सुरक्षा',
      foodservice: 'ग्राहक सेवा, खाना पकाउने कार्य, सरसफाइ व्यवस्थापन र सुरक्षा',
      foodmanufacturing: 'उत्पादन प्रक्रिया, HACCP, गुणस्तर नियन्त्रण र सरसफाइ सुरक्षा',
      lodging: 'फ्रन्ट डेस्क सेवा, आतिथ्य शिष्टाचार, कोठा व्यवस्थापन र सुरक्षा',
      automobile: 'दैनिक निरीक्षण, आवधिक मर्मत, पार्टपुर्जा मर्मत र खराबी पहिचान'
    },
    questions: {
      construction: [
        'निर्माणस्थलमा माटो धकेलेर सार्ने मेसिन कुन हो?',
        'सिमेन्ट, बालुवा र गिट्टीमा पानी मिसाएर बनाइने निर्माण सामग्री के हो?',
        'निर्माणस्थलमा टाउको जोगाउन के लगाउनुपर्छ?'
      ],
      agriculture: [
        'खेतबाट बाली भित्र्याउने कामलाई के भनिन्छ?',
        'बिरुवा बढाउन माटोमा के थपिन्छ?',
        'बालीलाई कीरा र रोगबाट जोगाउन के प्रयोग गरिन्छ?'
      ],
      foodservice: [
        'ग्राहकलाई खाना र पेय पदार्थ दिने कामलाई के भनिन्छ?',
        'खानालाई तताएर खान योग्य बनाउने काम के हो?',
        'ग्राहकको खाना अर्डर स्वीकार गर्ने काम के हो?'
      ],
      foodmanufacturing: [
        'खाद्य पदार्थ बनाउन प्रयोग हुने सामग्रीलाई के भनिन्छ?',
        'उपकरणका जीवाणु कीटाणुनाशकले हटाउने काम के हो?',
        'उत्पादनलाई सुरक्षित राख्न बेर्ने काम के हो?'
      ],
      lodging: [
        'होटलमा पाहुना बस्ने कोठालाई के भनिन्छ?',
        'होटलको कोठा सफा राख्ने काम के हो?',
        'होटलमा आउने पाहुनाको दर्ता कहाँ गरिन्छ?'
      ],
      automobile: [
        'गाडीको अवस्था नियमित जाँच गर्ने काम के हो?',
        'गाडी राम्रो अवस्थामा राख्न गरिने जाँच र मर्मतलाई के भनिन्छ?',
        'गाडी मर्मतमा प्रयोग हुने औजारलाई के भनिन्छ?'
      ]
    }
  },
  my: {
    brandTitle: 'သတ်မှတ်ကျွမ်းကျင်မှု စာမေးပွဲလေ့ကျင့်ခန်း',
    brandSub: 'အဆင့် (၁) ကျွမ်းကျင်လုပ်သား စာမေးပွဲပြင်ဆင်မှု',
    notebookLabel: 'မှားသောမေးခွန်းများ မှတ်စု',
    menuBrand: 'အဆင့် (၁) သီအိုရီနှင့် လက်တွေ့ စာမေးပွဲပြင်ဆင်မှု',
    appTitle: 'သတ်မှတ်ကျွမ်းကျင်မှု စာမေးပွဲလေ့ကျင့်ခန်း',
    menuSubtitle: 'ကဏ္ဍ ၆ ခုအတွက် လေ့ကျင့်ခန်းမေးခွန်းများနှင့် အရေးကြီးသော ဝေါဟာရများကို မိခင်ဘာသာစကား ရှင်းလင်းချက်ဖြင့် လေ့လာပါ။',
    statSectors: 'ကဏ္ဍ',
    statQuestions: 'မေးခွန်း',
    statWords: 'ဝေါဟာရ',
    step1: 'ကဏ္ဍတစ်ခုကို ရွေးချယ်ပါ',
    step2: 'မေးခွန်းနှင့် ဝေါဟာရများဖြင့် လေ့လာပါ',
    step3: 'အမှားမှတ်စုဖြင့် ပြန်လည်လေ့လာပါ',
    sectorsHeading: 'ကဏ္ဍတစ်ခုကို ရွေးချယ်ပါ',
    start: 'လေ့ကျင့်ခန်း',
    vocabulary: 'အဓိက ဝေါဟာရ',
    sectorDetails: 'ကဏ္ဍလမ်းညွှန်နှင့် ပုံစံများ',
    questionCount: '၂၉၀ မေးခွန်း · ၁,၀၀၀ စကားလုံး',
    footerDisclaimer: 'သတ်မှတ်ကျွမ်းကျင်မှု စာမေးပွဲလေ့ကျင့်ခန်း — တရားဝင်သင်ရိုးညွှန်းတမ်းအပေါ် အခြေခံထားသော လေ့လာရေးပလက်ဖောင်း',
    footerMistakes: 'မှားသောမေးခွန်းများ မှတ်စု ›',
    question: 'မေးခွန်း',
    progress: 'တိုးတက်မှု',
    next: 'နောက်တစ်ခု',
    menu: 'မီနူး',
    back: 'နောက်သို့',
    result: 'ရလဒ်',
    resultHeading: 'လေ့ကျင့်မှု ပြီးဆုံးပါပြီ',
    restart: 'ထပ်မံကြိုးစားရန်',
    accuracy: 'မှန်ကန်မှု',
    correctFeedback: 'အဖြေမှန်ပါသည်။',
    wrongFeedback: 'အဖြေမှားပါသည်။ အဖြေမှန်မှာ: ',
    resultHigh: 'အလွန်ကောင်းသော ရလဒ်ပါ။',
    resultMedium: 'ကောင်းမွန်ပါသည်။ ဆက်လက်လေ့ကျင့်ပါ။',
    resultLow: 'ထပ်မံကြိုးစားပြီး မေးခွန်းများကို ပြန်လေ့လာပါ။',
    sectors: {
      construction: 'ဆောက်လုပ်ရေး',
      agriculture: 'စိုက်ပျိုးရေး',
      foodservice: 'စားသောက်ဝန်ဆောင်မှု',
      foodmanufacturing: 'အစားအသောက်ထုတ်လုပ်ရေး',
      lodging: 'တည်းခိုဝန်ဆောင်မှု',
      automobile: 'မော်တော်ယာဉ်ပြုပြင်ရေး'
    },
    sectorDesc: {
      construction: 'မြို့ပြအင်ဂျင်နီယာ၊ အဆောက်အအုံဆောက်လုပ်ရေး၊ အခြေခံအဆောက်အအုံနှင့် လုပ်ငန်းခွင်ဘေးကင်းရေး',
      agriculture: 'ဖန်လုံအိမ်စိုက်ပျိုးရေး၊ သီးနှံစိုက်ပျိုးရေး၊ မွေးမြူရေးနှင့် ဘေးကင်းရေး',
      foodservice: 'ဧည့်ဝန်ဆောင်မှု၊ အစားအစာချက်ပြုတ်ခြင်း၊ သန့်ရှင်းရေးစီမံခန့်ခွဲမှုနှင့် ဘေးကင်းရေး',
      foodmanufacturing: 'ထုတ်လုပ်မှုလုပ်ငန်းစဉ်၊ HACCP၊ အရည်အသွေးထိန်းချုပ်မှုနှင့် ဘေးကင်းရေး',
      lodging: 'ဧည့်ကြိုလုပ်ငန်း၊ ဧည့်ဝတ်ပြုမှု၊ အခန်းစီမံခန့်ခွဲမှုနှင့် အဆောက်အအုံဘေးကင်းရေး',
      automobile: 'နေ့စဉ်စစ်ဆေးခြင်း၊ ပုံမှန်ထိန်းသိမ်းခြင်း၊ ဖြုတ်တပ်ပြုပြင်ခြင်းနှင့် ရောဂါရှာဖွေခြင်း'
    },
    questions: {
      construction: [
        'ဆောက်လုပ်ရေးလုပ်ငန်းခွင်တွင် မြေကြီးကို တွန်းရွှေ့သော စက်ယန္တရားမှာ မည်သည်နည်း။',
        'ဘိလပ်မြေ၊ သဲနှင့် ကျောက်စရစ်ကို ရေနှင့်ရော၍ ပြုလုပ်သော ဆောက်လုပ်ရေးပစ္စည်းမှာ မည်သည်နည်း။',
        'ဆောက်လုပ်ရေးလုပ်ငန်းခွင်တွင် ဦးခေါင်းကို ကာကွယ်ရန် ဘာဝတ်ဆင်ရမည်နည်း။'
      ],
      agriculture: [
        'လယ်ကွင်းမှ သီးနှံများကို ရိတ်သိမ်းခြင်းကို မည်သို့ခေါ်သနည်း။',
        'အပင်များကြီးထွားစေရန် မြေဆီလွှာထဲသို့ ဘာထည့်သနည်း။',
        'သီးနှံများကို ပိုးမွှားနှင့် ရောဂါများမှ ကာကွယ်ရန် ဘာသုံးသနည်း။'
      ],
      foodservice: [
        'ဖောက်သည်များအား အစားအစာနှင့် အဖျော်ယမကာများ ပေးဝေသည့်အလုပ်ကို မည်သို့ခေါ်သနည်း။',
        'အစားအစာကို အပူပေး၍ စားသုံးရန် အသင့်ဖြစ်အောင် ပြုလုပ်ခြင်းမှာ ဘာလဲ။',
        'ဖောက်သည်ထံမှ အစားအစာမှာယူမှုကို လက်ခံခြင်းမှာ ဘာလဲ။'
      ],
      foodmanufacturing: [
        'အစားအစာထုတ်ကုန်များ ပြုလုပ်ရာတွင် အသုံးပြုသော ပစ္စည်းများကို ဘာခေါ်သနည်း။',
        'ပိုးသတ်ဆေးဖြင့် ကိရိယာပေါ်ရှိ ဘက်တီးရီးယားများကို ဖယ်ရှားခြင်းမှာ ဘာလဲ။',
        'ထုတ်ကုန်ကို ကာကွယ်ရန် ထုပ်ပိုးခြင်းကို ဘာခေါ်သနည်း။'
      ],
      lodging: [
        'ဟိုတယ်တွင် ဧည့်သည်တည်းခိုသည့် အခန်းကို ဘာခေါ်သနည်း။',
        'ဟိုတယ်အခန်းကို သန့်ရှင်းစွာ ထိန်းသိမ်းသည့်အလုပ်မှာ ဘာလဲ။',
        'ဟိုတယ်သို့ ရောက်လာသော ဧည့်သည်များကို မည်သည့်နေရာတွင် စာရင်းသွင်းသနည်း။'
      ],
      automobile: [
        'မော်တော်ယာဉ်၏ အခြေအနေကို ပုံမှန်စစ်ဆေးခြင်းကို ဘာခေါ်သနည်း။',
        'မော်တော်ယာဉ်ကို ကောင်းမွန်စွာ ထိန်းသိမ်းရန် စစ်ဆေးပြုပြင်ခြင်းကို ဘာခေါ်သနည်း။',
        'မော်တော်ယာဉ်ပြုပြင်ရာတွင် အသုံးပြုသော ကိရိယာများကို ဘာခေါ်သနည်း။'
      ]
    }
  }
};

const quizBank = {
  construction: [
    { options: ['収穫', 'ブルドーザー', '接客', '客室'], answer: 'ブルドーザー' },
    { options: ['清掃', '点検', 'コンクリート', '予約'], answer: 'コンクリート' },
    { options: ['ヘルメット', '肥料', '原材料', '調理'], answer: 'ヘルメット' }
  ],
  agriculture: [
    { options: ['収穫', '栽培', '消毒', '整備'], answer: '収穫' },
    { options: ['予約', '肥料', '包装', '客室'], answer: '肥料' },
    { options: ['接客', '工具', '農薬', '注文'], answer: '農薬' }
  ],
  foodservice: [
    { options: ['接客', '栽培', '点検', '収穫'], answer: '接客' },
    { options: ['包装', '調理', '整備', '清掃'], answer: '調理' },
    { options: ['注文', '肥料', '工具', '宿泊'], answer: '注文' }
  ],
  foodmanufacturing: [
    { options: ['工具', '原材料', '農薬', '客室'], answer: '原材料' },
    { options: ['消毒', '収穫', '点検', '接客'], answer: '消毒' },
    { options: ['包装', '栽培', '調理', '整備'], answer: '包装' }
  ],
  lodging: [
    { options: ['客室', '農薬', '調理', '工具'], answer: '客室' },
    { options: ['点検', '清掃', '収穫', '注文'], answer: '清掃' },
    { options: ['受付', '包装', '栽培', '消毒'], answer: '受付' }
  ],
  automobile: [
    { options: ['点検', '収穫', '接客', '宿泊'], answer: '点検' },
    { options: ['整備', '包装', '予約', '栽培'], answer: '整備' },
    { options: ['肥料', '工具', '客室', '原材料'], answer: '工具' }
  ]
};

let currentSector = '';
let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let selectedAnswer = '';
let questionAnswered = false;

function getCurrentLanguage() {
  const stored = localStorage.getItem(LANGUAGE_KEY) || localStorage.getItem('tokutei_skill_language');
  return stored && languageContent[stored] ? stored : 'ja';
}

function applyLanguage(language) {
  const safeLanguage = languageContent[language] ? language : 'ja';
  localStorage.setItem(LANGUAGE_KEY, safeLanguage);

  const labels = languageContent[safeLanguage];
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  document.documentElement.lang = safeLanguage;
  document.title = safeLanguage === 'ja' ? '特定技能練習問題' : labels.appTitle;

  setText('headerBrandTitle', labels.brandTitle);
  setText('headerBrandSub', labels.brandSub);
  setText('notebookNavLabel', labels.notebookLabel);

  setText('menuBrand', labels.menuBrand);
  setText('appTitle', labels.appTitle);
  setText('menuSubtitle', labels.menuSubtitle);
  setText('statSectors', labels.statSectors);
  setText('statQuestions', labels.statQuestions);
  setText('statWords', labels.statWords);
  setText('step1Text', labels.step1);
  setText('step2Text', labels.step2);
  setText('step3Text', labels.step3);
  setText('sectorsHeading', labels.sectorsHeading);

  setText('questionLabel', labels.question);
  const progress = document.getElementById('progress');
  if (progress) progress.setAttribute('aria-label', labels.progress);
  setText('nextButton', labels.next);
  setText('backToMenuButton', labels.back);
  setText('menuFromResultButton', labels.back);
  setText('vocabularyButton', labels.vocabulary);
  setText('resultVocabularyButton', labels.vocabulary);
  setText('resultLabel', labels.result);
  setText('resultHeading', labels.resultHeading);
  setText('restartButton', labels.restart);

  setText('footerDisclaimer', labels.footerDisclaimer);
  setText('footerMistakesLink', labels.footerMistakes);

  const sectorCodes = [
    { key: 'construction', ja: '分野 01', other: '01 · 建設' },
    { key: 'agriculture', ja: '分野 02', other: '02 · 農業' },
    { key: 'foodservice', ja: '分野 03', other: '03 · 外食業' },
    { key: 'foodmanufacturing', ja: '分野 04', other: '04 · 飲食料品製造' },
    { key: 'lodging', ja: '分野 05', other: '05 · 宿泊' },
    { key: 'automobile', ja: '分野 06', other: '06 · 自動車整備' }
  ];

  sectorCodes.forEach(({ key, ja, other }) => {
    const codeEl = document.querySelector(`[data-sector-code="${key}"]`);
    if (codeEl) {
      codeEl.textContent = safeLanguage === 'ja' ? ja : other;
    }
  });

  document.querySelectorAll('[data-sector-name]').forEach((element) => {
    const sector = element.dataset.sectorName;
    if (labels.sectors[sector]) {
      element.textContent = labels.sectors[sector];
    }
  });

  document.querySelectorAll('[data-sector-desc]').forEach((element) => {
    const sector = element.dataset.sectorDesc;
    if (labels.sectorDesc[sector]) {
      element.textContent = labels.sectorDesc[sector];
    }
  });

  document.querySelectorAll('[data-i18n="start"]').forEach((element) => {
    element.textContent = labels.start;
  });

  document.querySelectorAll('[data-i18n="vocabulary"]').forEach((element) => {
    element.textContent = labels.vocabulary;
  });

  document.querySelectorAll('[data-i18n-count]').forEach((element) => {
    element.textContent = labels.questionCount;
  });

  document.querySelectorAll('[data-i18n="sectorDetails"]').forEach((element) => {
    element.textContent = labels.sectorDetails;
  });

  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) languageSelect.value = safeLanguage;

  const settingsBtn = document.getElementById('globalSettingsButton');
  if (settingsBtn) {
    const settingsTitles = { ja: '設定', uz: 'Sozlamalar', en: 'Settings', ne: 'सेटिङहरू', my: 'ဆက်တင်များ' };
    const title = settingsTitles[safeLanguage] || '設定';
    settingsBtn.setAttribute('aria-label', title);
    settingsBtn.title = title;
  }

  updateThemeButton();
}

function updateNotebookBadge() {
  const badge = document.getElementById('notebookCountBadge');
  if (!badge) return;
  const count = window.MistakeNotebook?.read().length || 0;
  badge.textContent = String(count);
  badge.classList.toggle('hidden', count === 0);
}

function toggleTheme() {
  if (window.ThemeManager) {
    window.ThemeManager.toggle();
    return;
  }
  const isDark = document.body.classList.contains('dark');
  document.body.classList.toggle('dark', !isDark);
  localStorage.setItem(THEME_KEY, !isDark ? 'dark' : 'light');
  updateThemeButton();
}

function updateThemeButton() {
  if (window.ThemeManager) {
    window.ThemeManager.updateUI();
  }
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.toggle('hidden', screen.id !== screenId);
  });
}

function startQuiz(sector) {
  currentSector = sector;
  const vocabularyHref = `./${sector}-vocab.html`;
  document.getElementById('vocabularyButton')?.setAttribute('href', vocabularyHref);
  document.getElementById('resultVocabularyButton')?.setAttribute('href', vocabularyHref);
  currentQuiz = quizBank[sector] || [];
  currentIndex = 0;
  score = 0;
  selectedAnswer = '';
  questionAnswered = false;

  const questionCount = document.getElementById('questionCount');
  const categoryBadge = document.getElementById('categoryBadge');
  const progressBar = document.getElementById('progressBar');
  const quizCard = document.getElementById('quizCard');
  const resultCard = document.getElementById('resultCard');

  if (questionCount) questionCount.textContent = `1/${currentQuiz.length}`;
  if (categoryBadge) categoryBadge.textContent = languageContent[getCurrentLanguage()].sectors[sector] || 'Test';
  if (progressBar) progressBar.style.width = '0%';
  if (quizCard) quizCard.classList.remove('hidden');
  if (resultCard) resultCard.classList.add('hidden');

  showScreen('quizScreen');
  renderQuestion();
}

function renderQuestion() {
  const total = currentQuiz.length;
  if (!total) return;

  const item = currentQuiz[currentIndex];
  const questionText = document.getElementById('questionText');
  const answers = document.getElementById('answers');
  const questionCount = document.getElementById('questionCount');
  const feedback = document.getElementById('feedback');
  const progressBar = document.getElementById('progressBar');
  const nextButton = document.getElementById('nextButton');

  if (questionText) {
    questionText.textContent = languageContent[getCurrentLanguage()].questions[currentSector][currentIndex];
  }
  if (questionCount) questionCount.textContent = `${currentIndex + 1}/${total}`;
  if (feedback) feedback.textContent = '';
  if (nextButton) nextButton.disabled = true;
  if (progressBar) progressBar.style.width = `${((currentIndex) / total) * 100}%`;

  selectedAnswer = '';
  questionAnswered = false;
  answers.innerHTML = '';

  item.options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-button';
    button.textContent = option;
    button.addEventListener('click', () => {
      if (questionAnswered) return;

      questionAnswered = true;
      selectedAnswer = option;
      document.querySelectorAll('.answer-button').forEach((btn) => btn.classList.remove('selected'));
      button.classList.add('selected');
      const isCorrect = option === item.answer;
      const feedbackEl = document.getElementById('feedback');
      if (feedbackEl) {
        const labels = languageContent[getCurrentLanguage()];
        feedbackEl.textContent = isCorrect ? labels.correctFeedback : `${labels.wrongFeedback}${item.answer}`;
        feedbackEl.style.color = isCorrect ? 'var(--good, #16a34a)' : 'var(--danger, #dc2626)';
      }
      if (nextButton) nextButton.disabled = false;
      if (isCorrect) score += 1;
    });
    answers.appendChild(button);
  });
}

function showResult() {
  const total = currentQuiz.length;
  const percent = Math.round((score / total) * 100);
  const labels = languageContent[getCurrentLanguage()];
  const resultCard = document.getElementById('resultCard');
  const scoreText = document.getElementById('scoreText');
  const accuracyText = document.getElementById('accuracyText');
  const resultMessage = document.getElementById('resultMessage');

  if (scoreText) scoreText.textContent = `${score}/${total}`;
  if (accuracyText) accuracyText.textContent = `${labels.accuracy} ${percent}%`;
  if (resultMessage) {
    if (percent >= 80) resultMessage.textContent = labels.resultHigh;
    else if (percent >= 50) resultMessage.textContent = labels.resultMedium;
    else resultMessage.textContent = labels.resultLow;
  }

  const quizCard = document.getElementById('quizCard');
  if (quizCard) quizCard.classList.add('hidden');
  if (resultCard) resultCard.classList.remove('hidden');
}

function nextQuestion() {
  const total = currentQuiz.length;
  if (!selectedAnswer || !questionAnswered) return;

  if (currentIndex < total - 1) {
    currentIndex += 1;
    selectedAnswer = '';
    questionAnswered = false;
    renderQuestion();
  } else {
    showResult();
  }
}

function returnToMenu() {
  const quizCard = document.getElementById('quizCard');
  const resultCard = document.getElementById('resultCard');
  if (quizCard) quizCard.classList.remove('hidden');
  if (resultCard) resultCard.classList.add('hidden');
  showScreen('menuScreen');
}

function initApp() {
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', (event) => {
      applyLanguage(event.target.value);
    });
  }

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  const nextButton = document.getElementById('nextButton');
  if (nextButton) {
    nextButton.addEventListener('click', nextQuestion);
  }

  const restartButton = document.getElementById('restartButton');
  if (restartButton) {
    restartButton.addEventListener('click', () => startQuiz(currentSector));
  }

  const backToMenuButton = document.getElementById('backToMenuButton');
  if (backToMenuButton) {
    backToMenuButton.addEventListener('click', returnToMenu);
  }

  const menuFromResultButton = document.getElementById('menuFromResultButton');
  if (menuFromResultButton) {
    menuFromResultButton.addEventListener('click', returnToMenu);
  }

  applyLanguage(getCurrentLanguage());
  updateNotebookBadge();
  updateThemeButton();
}

window.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('pageshow', updateNotebookBadge);
window.addEventListener('storage', (event) => {
  if (!event.key || event.key.includes('mistake') || event.key.includes('notebook')) {
    updateNotebookBadge();
  }
});
