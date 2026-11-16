(function () {
  'use strict';

  const storedLang = localStorage.getItem('language');
  let language = ['uz', 'ja', 'en', 'ne', 'my'].includes(storedLang)
    ? storedLang
    : (['uz', 'ja', 'en', 'ne', 'my'].includes(document.documentElement.lang) ? document.documentElement.lang : 'ja');
  document.documentElement.lang = language;
  const sector = document.body.dataset.sector;
  const labels = {
    uz: {
      search: 'Qidirish', searchPlaceholder: 'Yaponcha so‘z yoki tarjimadan qidiring',
      category: 'Bo‘lim', all: 'Barcha bo‘limlar', count: (shown, total) => `${shown} / ${total} ta so‘z`,
      page: (current, total) => `${current} / ${total}-sahifa`, previous: 'Oldingi', next: 'Keyingi',
      filters: 'Lug‘at filtrlari', pagination: 'Sahifalash',
      languageLabel: 'Til',
      notebook: 'Xatolar daftarim'
    },
    ja: {
      search: '検索', searchPlaceholder: '日本語または意味で検索',
      category: '項目', all: 'すべての項目', count: (shown, total) => `${shown} / ${total}語`,
      page: (current, total) => `${current} / ${total}ページ`, previous: '前へ', next: '次へ',
      filters: '語彙の絞り込み', pagination: 'ページ移動',
      languageLabel: '言語',
      notebook: '間違いノート'
    },
    en: {
      search: 'Search', searchPlaceholder: 'Search Japanese terms or meanings',
      category: 'Category', all: 'All categories', count: (shown, total) => `${shown} of ${total} words`,
      page: (current, total) => `Page ${current} of ${total}`, previous: 'Previous', next: 'Next',
      filters: 'Vocabulary filters', pagination: 'Pagination',
      languageLabel: 'Language',
      notebook: 'My mistakes'
    },
    ne: {
      search: 'खोज्नुहोस्', searchPlaceholder: 'जापानी शब्द वा अर्थ खोज्नुहोस्',
      category: 'वर्ग', all: 'सबै वर्ग', count: (shown, total) => `${total} मध्ये ${shown} शब्द`,
      page: (current, total) => `${total} मध्ये पृष्ठ ${current}`, previous: 'अघिल्लो', next: 'अर्को',
      filters: 'शब्दावली फिल्टर', pagination: 'पृष्ठ परिवर्तन',
      languageLabel: 'भाषा',
      notebook: 'गल्तीहरूको नोटबुक'
    },
    my: {
      search: 'ရှာဖွေရန်', searchPlaceholder: 'ဂျပန်ဝေါဟာရ သို့မဟုတ် အဓိပ္ပာယ် ရှာရန်',
      category: 'ကဏ္ဍ', all: 'ကဏ္ဍအားလုံး', count: (shown, total) => `စုစုပေါင်း ${total} လုံးအနက် ${shown} လုံး`,
      page: (current, total) => `စာမျက်နှာ ${current} / ${total}`, previous: 'ယခင်', next: 'နောက်တစ်ခု',
      filters: 'ဝေါဟာရ စစ်ထုတ်မှုများ', pagination: 'စာမျက်နှာပြောင်းရန်',
      languageLabel: 'ဘာသာစကား',
      notebook: 'အမှားမှတ်စု'
    }
  };
  const categories = {
    agriculture: {
      cultivationBasics: ['農業', '栽培', '種', '土'],
      seedlingPlanting: [],
      cropManagement: [],
      fertilizersNutrients: ['肥料'],
      pestsDiseasesProtection: ['農薬'],
      irrigationEnvironment: ['水やり', '温室'],
      vegetableCrops: [],
      fruitGrainCrops: [],
      harvestPackagingShipping: ['収穫', '選別'],
      livestockManagement: [],
      pigPoultryCare: [],
      machinerySafety5S: []
    },
    automobile: {
      vehicleBody: ['自動車'],
      engine: [],
      drivetrain: [],
      brakesTires: [],
      electrical: [],
      fluidsFasteners: ['部品', '交換'],
      toolsEquipment: ['工具'],
      procedures: ['整備', '点検', '修理'],
      inspection: ['車検'],
      diagnosis: ['故障'],
      safetyService: ['安全'],
      materialsBasics: [],
      systemsWork: []
    },
    foodmanufacturing: {
      rawMaterials: [],
      products: [],
      manufacturing: [],
      equipment: [],
      ingredients: ['原材料', '計量', 'アレルゲン', '受入検査', '食品表示', 'ロット番号', '期限表示'],
      hygiene: ['食品製造', '衛生', '異物', '消毒', '食中毒菌', '交差汚染', '洗浄', '手洗い', '手指消毒', '作業着', '健康確認', '手袋交換'],
      quality: [],
      safety: [],
      process: ['加熱', '冷却', '包装', '解凍', '中心温度', '急速冷却', '殺菌', '追跡可能性', '金属検出機', '重要管理点'],
      workplace: [],
      logistics: [],
      units: [],
      systems: [],
      nutrients: []
    },
    foodservice: {
      ingredients1: [],
      ingredients2: [],
      seasonings: [],
      preparation: [],
      equipment: [],
      store: [],
      service: ['飲食店', '接客', '注文', '配膳', '会計', '予約'],
      hygiene: ['衛生', '調理', '清掃', '食物アレルギー'],
      management: [],
      dishes: [],
      additional: []
    },
    lodging: {
      lodgingTypes: ['宿泊業', '客室', '館内'],
      reservations: ['予約', '受付'],
      guestService: ['接客', '忘れ物'],
      housekeeping: ['清掃', '客室清掃'],
      meals: [],
      ryokanCulture: [],
      tourism: [],
      safety: ['非常口'],
      work: [],
      sales: ['販売手数料', '在庫配分'],
      systems: [],
      basics: [],
      additional: ['利用時間', '利用目的']
    }
  };
  const categoryLabels = {
    agriculture: {
      cultivationBasics: { uz: 'Dehqonchilik asoslari va tuproq', ja: '耕種農業の基礎・土壌', en: 'Cultivation basics and soil', ne: 'खेतीका आधार र माटो', my: 'စိုက်ပျိုးရေးအခြေခံနှင့် မြေဆီလွှာ' },
      seedlingPlanting: { uz: 'Urug‘ va ko‘chat o‘tqazish', ja: '播種・育苗・定植', en: 'Seeding and planting', ne: 'बीउ, नर्सरी र रोपाईं', my: 'မျိုးစေ့ကြဲခြင်းနှင့် စိုက်ပျိုးခြင်း' },
      cropManagement: { uz: 'Ekinlarni parvarishlash', ja: '栽培管理・整枝・授粉', en: 'Crop management and training', ne: 'बाली स्याहार र परागसेचन', my: 'သီးနှံပြုစုခြင်းနှင့် ဝတ်မှုန်ကူးခြင်း' },
      fertilizersNutrients: { uz: 'O‘g‘itlar va oziqlantirish', ja: '肥料・施肥・栄養要素', en: 'Fertilizers and nutrients', ne: 'मलखाद र पोषण तत्त्व', my: 'မြေဩဇာနှင့် အာဟာရဓာတ်' },
      pestsDiseasesProtection: { uz: 'Zararkunandalar va kasalliklar', ja: '病害虫防除・農薬', en: 'Pest and disease control', ne: 'रोग, कीरा र विषादी', my: 'ပိုးမွှားရောဂါကာကွယ်ရေး' },
      irrigationEnvironment: { uz: 'Sug‘orish va issiqxona muhiti', ja: '灌水・ハウス環境制御', en: 'Irrigation and greenhouse climate', ne: 'सिँचाइ र हरितगृह वातावरण', my: 'ရေသွင်းခြင်းနှင့် ဖန်လုံအိမ်ထိန်းချုပ်မှု' },
      vegetableCrops: { uz: 'Sabzavot ekinlari', ja: '野菜各論', en: 'Vegetable crops', ne: 'विभिन्न तरकारी बाली', my: 'ဟင်းသီးဟင်းရွက် သီးနှံများ' },
      fruitGrainCrops: { uz: 'Sholi, don va mevalar', ja: '水稲・穀物・果樹', en: 'Rice, grains, and fruit trees', ne: 'धान, अन्न र फलफूल', my: 'စပါး၊ နှံစားသီးနှံနှင့် သစ်သီးပင်' },
      harvestPackagingShipping: { uz: 'Hosil yig‘ish va jo‘natish', ja: '収穫・調製・選別・出荷', en: 'Harvest, sorting, and shipping', ne: 'बाली कटानी, छनोट र ढुवानी', my: 'ရိတ်သိမ်း၊ ရွေးချယ်နှင့် တင်ပို့ခြင်း' },
      livestockManagement: { uz: 'Qoramolchilik va sutchilik', ja: '畜産・肉牛・酪農', en: 'Livestock and dairy cattle', ne: 'पशुपालन र गाईपालन', my: 'မွေးမြူရေးနှင့် နို့စားနွား' },
      pigPoultryCare: { uz: 'Cho‘chqachilik va parrandachilik', ja: '養豚・養鶏・衛生管理', en: 'Pig and poultry farming', ne: 'सुँगुर र कुखुरा पालन', my: 'ဝက်နှင့် ကြက်မွေးမြူရေး' },
      machinerySafety5S: { uz: 'Qishloq xo‘jaligi texnikasi va xavfsizlik (5S)', ja: '農業機械・安全衛生・5S', en: 'Machinery, safety, and 5S', ne: 'कृषि मेसिन, सुरक्षा र ५एस', my: 'စက်ယန္တရား၊ ဘေးကင်းရေးနှင့် 5S' }
    },
    automobile: {
      vehicleBody: { uz: 'Avtomobil turlari va kuzov', ja: '車両の種類・車体・外装', en: 'Vehicle types and body', ne: 'सवारीका प्रकार र बडी', my: 'ယာဉ်အမျိုးအစားနှင့် ကိုယ်ထည်' },
      engine: { uz: 'Dvigatel va sovutish tizimi', ja: 'エンジン・燃料・吸排気・冷却', en: 'Engine, fuel, and cooling', ne: 'इन्जिन र शीतलन प्रणाली', my: 'အင်ဂျင်နှင့် အအေးပေးစနစ်' },
      drivetrain: { uz: 'Transmissiya va osma', ja: '駆動系・トランスミッション・サスペンション', en: 'Drivetrain and suspension', ne: 'ड्राइभट्रेन र सस्पेन्सन', my: 'ပါဝါပို့လွှတ်မှုနှင့် ဆိုင်းထိန်းစနစ်' },
      brakesTires: { uz: 'Tormoz, shina va g‘ildirak', ja: 'ブレーキ・タイヤ・ホイール', en: 'Brakes, tires, and wheels', ne: 'ब्रेक, टायर र ह्वील', my: 'ဘရိတ်၊ တာယာနှင့် ဘီး' },
      electrical: { uz: 'Elektr jihozlari va datchiklar', ja: '電装・バッテリー・センサー・HV/EV', en: 'Electrics, battery, and sensors', ne: 'विद्युतीय उपकरण र सेन्सर', my: 'လျှပ်စစ်ပစ္စည်းနှင့် အာရုံခံကိရိယာ' },
      fluidsFasteners: { uz: 'Moylar, suyuqlik va detallar', ja: '油脂・液体・消耗品・締結部品', en: 'Oils, fluids, and fasteners', ne: 'तेल, तरल र फास्टनर', my: 'ဆီ၊ အရည်နှင့် တွယ်ဆက်ပစ္စည်း' },
      toolsEquipment: { uz: 'Asboblar va o‘lchov uskunalari', ja: '工具・設備・測定器', en: 'Tools and measuring instruments', ne: 'औजार र मापन उपकरण', my: 'ကိရိယာနှင့် တိုင်းတာရေးပစ္စည်း' },
      procedures: { uz: 'Ta’mirlash ishlari va amallar', ja: '整備作業・手順・動作', en: 'Maintenance procedures and actions', ne: 'मर्मत कार्य र प्रक्रिया', my: 'ပြုပြင်ထိန်းသိမ်းမှု လုပ်ငန်းစဉ်' },
      inspection: { uz: 'Texnik ko‘rik va qonunlar', ja: '車検・法規・書類・保険', en: 'Inspection, laws, and documents', ne: 'सवारी जाँच र कानुन', my: 'ယာဉ်စစ်ဆေးခြင်းနှင့် ဥပဒေ' },
      diagnosis: { uz: 'Nosozlik va diagnostika', ja: '故障・症状・原因診断', en: 'Faults, symptoms, and diagnosis', ne: 'खराबी र निदान', my: 'ချွတ်ယွင်းချက်နှင့် ရောဂါရှာဖွေခြင်း' },
      safetyService: { uz: 'Xavfsizlik va mijozlarga xizmat', ja: '安全・環境・職場・接客', en: 'Safety, workplace, and service', ne: 'सुरक्षा र ग्राहक सेवा', my: 'ဘေးကင်းရေးနှင့် ဖောက်သည်ဝန်ဆောင်မှု' },
      materialsBasics: { uz: 'Materiallar, birliklar va asosiy so‘zlar', ja: '材料・単位・形状・位置・基本語', en: 'Materials, units, and basics', ne: 'सामग्री, एकाइ र आधारभूत शब्द', my: 'ပစ္စည်း၊ ယူနစ်နှင့် အခြေခံစကားလုံး' },
      systemsWork: { uz: 'Tizim, viza va mehnat', ja: '制度・特定技能・雇用・生活', en: 'Systems, SSW, and employment', ne: 'प्रणाली, सीप र रोजगारी', my: 'စနစ်၊ ကျွမ်းကျင်မှုနှင့် အလုပ်အကိုင်' }
    },
    foodmanufacturing: {
      rawMaterials: { uz: 'Xom ashyo', ja: '原材料', en: 'Raw materials', ne: 'कच्चा पदार्थ', my: 'ကုန်ကြမ်းများ' },
      products: { uz: 'Mahsulotlar', ja: '製品', en: 'Products', ne: 'उत्पादनहरू', my: 'ထုတ်ကုန်များ' },
      manufacturing: { uz: 'Ishlab chiqarish jarayonlari', ja: '製造工程・加工方法', en: 'Manufacturing processes', ne: 'उत्पादन प्रक्रिया', my: 'ထုတ်လုပ်မှု လုပ်ငန်းစဉ်များ' },
      equipment: { uz: 'Mashina va jihozlar', ja: '機械・設備・器具', en: 'Machines and equipment', ne: 'मेसिन र उपकरण', my: 'စက်နှင့် ပစ္စည်းကိရိယာများ' },
      ingredients: { uz: 'Xom ashyo nazorati', ja: '原料・受入検査', en: 'Ingredient controls', ne: 'कच्चा पदार्थ जाँच', my: 'ကုန်ကြမ်း စစ်ဆေးခြင်း' },
      hygiene: { uz: 'Gigiyena va HACCP', ja: '衛生管理・HACCP', en: 'Hygiene and HACCP', ne: 'स्वच्छता र HACCP', my: 'သန့်ရှင်းရေးနှင့် HACCP' },
      quality: { uz: 'Sifat va yorliqlar', ja: '品質管理・表示', en: 'Quality and labeling', ne: 'गुणस्तर र लेबल', my: 'အရည်အသွေးနှင့် အညွှန်း' },
      safety: { uz: 'Mehnat xavfsizligi', ja: '労働安全・作業環境', en: 'Workplace safety', ne: 'कार्यस्थल सुरक्षा', my: 'လုပ်ငန်းခွင် ဘေးကင်းရေး' },
      process: { uz: 'Ishlab chiqarish jarayoni', ja: '製造工程', en: 'Production process', ne: 'उत्पादन प्रक्रिया', my: 'ထုတ်လုပ်မှု လုပ်ငန်းစဉ်' },
      workplace: { uz: 'Ish joyidagi iboralar', ja: '職場の表現・作業指示', en: 'Workplace phrases and instructions', ne: 'कार्यस्थलका वाक्यांश र निर्देशन', my: 'လုပ်ငန်းခွင် စကားစုများနှင့် ညွှန်ကြားချက်များ' },
      logistics: { uz: 'Qadoqlash va logistika', ja: '包装・物流・在庫', en: 'Packaging and logistics', ne: 'प्याकेजिङ र ढुवानी', my: 'ထုပ်ပိုးခြင်းနှင့် ပို့ဆောင်ရေး' },
      units: { uz: 'Birlik va miqdorlar', ja: '単位・数量・温度', en: 'Units and quantities', ne: 'एकाइ र परिमाण', my: 'ယူနစ်နှင့် ပမာဏ' },
      systems: { uz: 'Tizim va ish', ja: '制度・特定技能・雇用', en: 'Systems and employment', ne: 'प्रणाली र रोजगारी', my: 'စနစ်များနှင့် အလုပ်အကိုင်' },
      nutrients: { uz: 'Suv va oziq tarkibi', ja: '水・油脂・栄養成分', en: 'Water, fats, and nutrients', ne: 'पानी, बोसो र पोषक तत्त्व', my: 'ရေ၊ အဆီနှင့် အာဟာရဓာတ်များ' }
    },
    foodservice: {
      ingredients1: { uz: 'Mahsulotlar I', ja: '食材①', en: 'Ingredients 1', ne: 'खाद्य सामग्री १', my: 'အစားအစာ ပါဝင်ပစ္စည်း ၁' },
      ingredients2: { uz: 'Mahsulotlar II', ja: '食材②', en: 'Ingredients 2', ne: 'खाद्य सामग्री २', my: 'အစားအစာ ပါဝင်ပစ္စည်း ၂' },
      seasonings: { uz: 'Ziravor va ichimliklar', ja: '調味料・飲料・主食', en: 'Seasonings, drinks and staples', ne: 'मसला, पेय र मुख्य खाना', my: 'ဟင်းခတ်၊ အဖျော်ယမကာနှင့် အဓိကအစားအစာ' },
      preparation: { uz: 'Tayyorlash va pishirish', ja: '調理・動作・切り方', en: 'Preparation and cooking', ne: 'तयारी र पकाउने विधि', my: 'ပြင်ဆင်ခြင်းနှင့် ချက်ပြုတ်ခြင်း' },
      equipment: { uz: 'Oshxona jihozlari', ja: '調理器具・厨房設備', en: 'Kitchen tools and equipment', ne: 'भान्साका औजार र उपकरण', my: 'မီးဖိုချောင်သုံး ကိရိယာများ' },
      store: { uz: 'Idishlar va restoran', ja: '食器・店舗設備・店の種類', en: 'Tableware and restaurant types', ne: 'भाँडा र रेस्टुरेन्टका प्रकार', my: 'ပန်းကန်ခွက်ယောက်နှင့် စားသောက်ဆိုင်အမျိုးအစား' },
      service: { uz: 'Mijozlarga xizmat', ja: '接客・サービス用語', en: 'Customer service', ne: 'ग्राहक सेवा', my: 'ဖောက်သည် ဝန်ဆောင်မှု' },
      hygiene: { uz: 'Gigiyena va xavfsizlik', ja: '衛生管理・食中毒・安全', en: 'Hygiene and safety', ne: 'स्वच्छता र सुरक्षा', my: 'သန့်ရှင်းရေးနှင့် ဘေးကင်းရေး' },
      management: { uz: 'Restoran boshqaruvi', ja: '店舗管理・経営・労務', en: 'Restaurant management', ne: 'रेस्टुरेन्ट व्यवस्थापन', my: 'စားသောက်ဆိုင် စီမံခန့်ခွဲမှု' },
      dishes: { uz: 'Taom nomlari va ta’m', ja: '料理名・味・分量・特定技能', en: 'Dishes, taste and quantities', ne: 'परिकार, स्वाद र परिमाण', my: 'ဟင်းလျာ၊ အရသာနှင့် ပမာဏ' },
      additional: { uz: 'Qo‘shimcha atamalar', ja: '追加・職種・料理分類・栄養', en: 'Additional terms', ne: 'थप शब्दहरू', my: 'အပိုဝေါဟာရများ' }
    },
    lodging: {
      lodgingTypes: { uz: 'Turar joy va xonalar', ja: '宿泊施設・客室', en: 'Accommodation and rooms', ne: 'आवास र कोठाहरू', my: 'တည်းခိုခန်းနှင့် အခန်းများ' },
      reservations: { uz: 'Bron va qabul', ja: '予約・受付', en: 'Reservations and reception', ne: 'बुकिङ र स्वागत', my: 'ဘွတ်ကင်နှင့် ဧည့်ကြို' },
      guestService: { uz: 'Mehmonlarga xizmat', ja: '接客・サービス', en: 'Guest services', ne: 'अतिथि सेवा', my: 'ဧည့်သည်ဝန်ဆောင်မှု' },
      housekeeping: { uz: 'Tozalash va xona xizmati', ja: '清掃・客室整備', en: 'Housekeeping', ne: 'सरसफाइ र कोठा व्यवस्थापन', my: 'သန့်ရှင်းရေးနှင့် အခန်းပြင်ဆင်မှု' },
      meals: { uz: 'Ovqatlanish va taomlar', ja: '食事・料理', en: 'Meals and dining', ne: 'खाना र भोजन', my: 'အစားအစာနှင့် စားသောက်ခြင်း' },
      ryokanCulture: { uz: 'Ryokan va yapon madaniyati', ja: '旅館・日本文化', en: 'Ryokan and Japanese culture', ne: 'र्‍योकान र जापानी संस्कृति', my: 'ရိုကန်နှင့် ဂျပန်ယဉ်ကျေးမှု' },
      tourism: { uz: 'Sayohat va transport', ja: '観光・交通', en: 'Tourism and transport', ne: 'पर्यटन र यातायात', my: 'ခရီးသွားလုပ်ငန်းနှင့် သယ်ယူပို့ဆောင်ရေး' },
      safety: { uz: 'Xavfsizlik va gigiyena', ja: '安全・防災・衛生', en: 'Safety and hygiene', ne: 'सुरक्षा र स्वच्छता', my: 'ဘေးကင်းရေးနှင့် သန့်ရှင်းရေး' },
      work: { uz: 'Kasblar va ish tartibi', ja: '職種・勤務', en: 'Jobs and work', ne: 'पेशा र काम', my: 'အလုပ်အကိုင်နှင့် လုပ်ငန်း' },
      sales: { uz: 'Savdo va narxlar', ja: '販売・料金', en: 'Sales and prices', ne: 'बिक्री र मूल्य', my: 'အရောင်းနှင့် ဈေးနှုန်းများ' },
      systems: { uz: 'Tizimlar va qonunlar', ja: '制度・法律', en: 'Systems and laws', ne: 'प्रणाली र कानुन', my: 'စနစ်များနှင့် ဥပဒေများ' },
      basics: { uz: 'Raqamlar va asosiy so‘zlar', ja: '数字・基本語', en: 'Numbers and basics', ne: 'अङ्क र आधारभूत शब्द', my: 'ကိန်းဂဏန်းများနှင့် အခြေခံစကားလုံးများ' },
      additional: { uz: 'Qo‘shimcha atamalar', ja: 'その他の用語', en: 'Additional terms', ne: 'थप शब्दहरू', my: 'အပိုဝေါဟာရများ' }
    }
  };
  let copy = labels[language] || labels.ja;
  const groups = categories[sector] || {};
  const pageSize = 40;
  const elements = {
    search: document.getElementById('search'),
    category: document.getElementById('category'),
    list: document.querySelector('.vocabulary'),
    count: document.getElementById('count'),
    previous: document.getElementById('previous'),
    next: document.getElementById('next'),
    pageStatus: document.getElementById('pageStatus')
  };
  const reviewedTerms = [
    ...(window.SECTOR_REVIEWED_VOCABULARY?.[sector] || []),
    ...(sector === 'agriculture' ? (window.AGRICULTURE_VOCABULARY_1000 || []) : []),
    ...(sector === 'foodservice' ? (window.FOODSERVICE_VOCABULARY_1000 || []) : []),
    ...(sector === 'foodmanufacturing' ? (window.FOODMANUFACTURING_VOCABULARY_1000 || []) : []),
    ...(sector === 'lodging' ? (window.LODGING_VOCABULARY_1000 || []) : []),
    ...(sector === 'automobile' ? (window.AUTOMOBILE_VOCABULARY_1000 || []) : [])
  ];
  const reviewedCategories = new Map();
  const cardEntries = new Map();
  const cardSearchText = new Map();
  const cards = elements.list ? [...elements.list.querySelectorAll('.word')] : [];
  const existingTerms = new Set(cards.map(termText));
  const cardCategories = new Map();
  let currentPage = 1;
  let emptyMessageEl = null;

  const fc = {
    isFlashcardMode: false,
    index: 0,
    deck: [],
    flipped: false
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

    const card = fc.deck[fc.index];
    const catKey = cardCategories.get(card) || '';
    const catLabel = catKey ? categoryName(catKey) : '';

    const termEl = card.querySelector('.word__term');
    const termHtml = termEl ? termEl.innerHTML : '';
    const furiganaText = termEl ? Array.from(termEl.querySelectorAll('rt')).map((r) => r.textContent.trim()).join('') : '';

    const meaningEl = card.querySelector('.word__meaning');
    const meaningText = meaningEl ? (meaningEl.getAttribute(`data-${language}`) || meaningEl.getAttribute('data-uz') || meaningEl.textContent || '').trim() : '';

    const noteEl = card.querySelector('.word__note');
    const noteText = noteEl ? (noteEl.getAttribute(`data-${language}`) || noteEl.getAttribute('data-uz') || noteEl.textContent || '').trim() : '';

    if (fcCategory) fcCategory.textContent = catLabel;
    if (fcBackCategory) fcBackCategory.textContent = catLabel;
    if (fcCount) fcCount.textContent = t.counter(fc.index + 1, fc.deck.length);

    if (fcTerm) fcTerm.innerHTML = termHtml;
    if (fcFrontReading) fcFrontReading.textContent = furiganaText ? `【${furiganaText}】` : '';
    if (fcMeaning) fcMeaning.textContent = meaningText;
    const readingPrefix = language === 'ja' ? '読み: ' : (language === 'uz' ? 'Talaffuz: ' : 'Reading: ');
    if (fcReading) fcReading.textContent = furiganaText ? `${readingPrefix}${furiganaText}` : '';
    if (fcNote) fcNote.textContent = noteText;

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
        const pagerEl = document.querySelector('.pager');
        if (pagerEl) pagerEl.classList.add('is-hidden');

        flashcardArea.classList.remove('is-hidden');
        fc.deck = filteredCards();
        fc.index = 0;
        renderFlashcard();
      } else {
        viewFlashcardBtn.classList.remove('is-active');
        viewFlashcardBtn.setAttribute('aria-selected', 'false');
        viewListBtn.classList.add('is-active');
        viewListBtn.setAttribute('aria-selected', 'true');

        flashcardArea.classList.add('is-hidden');
        if (elements.list) elements.list.classList.remove('is-hidden');
        const pagerEl = document.querySelector('.pager');
        if (pagerEl) pagerEl.classList.remove('is-hidden');
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
        const card = fc.deck[fc.index];
        const catKey = cardCategories.get(card) || '';
        const catLabel = catKey ? categoryName(catKey) : '';
        const termEl = card.querySelector('.word__term');
        const termText = termEl ? (termEl.innerText || termEl.textContent || '').replace(/\s+/g, ' ').trim() : '';
        const furiganaText = termEl ? Array.from(termEl.querySelectorAll('rt')).map((r) => r.textContent.trim()).join('') : '';
        const meaningEl = card.querySelector('.word__meaning');
        const meaningText = meaningEl ? (meaningEl.getAttribute(`data-${language}`) || meaningEl.getAttribute('data-uz') || meaningEl.textContent || '').trim() : '';
        const noteEl = card.querySelector('.word__note');
        const noteText = noteEl ? (noteEl.getAttribute(`data-${language}`) || noteEl.getAttribute('data-uz') || noteEl.textContent || '').trim() : '';

        window.MistakeNotebook?.save({
          field: sector || 'agriculture',
          questionId: `vocab-${termText}`,
          prompt: `【単語】${termText}${furiganaText ? ` (${furiganaText})` : ''}`,
          correctAnswer: `${meaningText}${catLabel ? ` [${catLabel}]` : ''}`,
          explanation: noteText || `${termText}: ${meaningText}`
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

  function toHiragana(str) {
    if (!str) return '';
    return str.replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  }

  function toKatakana(str) {
    if (!str) return '';
    return str.replace(/[\u3041-\u3096]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60));
  }

  function normalizeText(str) {
    if (!str) return '';
    return str.normalize('NFKC').toLowerCase().trim();
  }

  function termText(card) {
    const term = card.querySelector('.word__term');
    if (!term) return '';
    const base = term.cloneNode(true);
    base.querySelectorAll('rt').forEach((reading) => reading.remove());
    return base.textContent.replace(/\s+/gu, '');
  }

  function categoryFor(card) {
    const term = termText(card);
    return reviewedCategories.get(term)
      || Object.entries(groups).find(([, terms]) => terms.includes(term))?.[0]
      || '';
  }

  function categoryName(key) {
    const cat = categoryLabels[sector]?.[key];
    if (!cat) return key;
    return cat[language] || cat.en || cat.ja || key;
  }

  function renderEntryCardCopy(card, entry) {
    let meaning = card.querySelector('.word__meaning');
    if (!meaning) {
      meaning = document.createElement('p');
      meaning.className = 'word__meaning';
      card.append(meaning);
    }
    let note = card.querySelector('.word__note');
    if (!note) {
      note = document.createElement('p');
      note.className = 'word__note';
      card.append(note);
    }

    if (language === 'ja') {
      if (entry.meaning && entry.meaning.ja) {
        meaning.textContent = entry.meaning.ja;
        note.textContent = (entry.note && entry.note.ja) || '';
      } else {
        meaning.textContent = `読み方：${entry.reading}`;
        note.textContent = entry.category ? `分野：${categoryName(entry.category)}` : '';
      }
    } else {
      meaning.textContent = entry.meaning?.[language] || entry.meaning?.uz || entry.meaning?.en || '';
      note.textContent = entry.note ? (entry.note[language] || entry.note.uz || entry.note.en || '') : '';
    }
    note.hidden = !note.textContent;
  }

  function buildSearchIndex(card) {
    const entry = cardEntries.get(card);
    const term = termText(card);
    const rt = card.querySelector('rt')?.textContent?.trim() || '';
    const reading = entry?.reading || rt;
    const cat = cardCategories.get(card) || '';
    const catLabels = categoryLabels[sector]?.[cat] || {};

    const pieces = [
      term,
      reading,
      toHiragana(term),
      toKatakana(term),
      toHiragana(reading),
      toKatakana(reading),
      catLabels.ja,
      catLabels.uz,
      catLabels.en,
      catLabels.ne,
      catLabels.my,
      entry?.meaning?.ja,
      entry?.meaning?.uz,
      entry?.meaning?.en,
      entry?.meaning?.ne,
      entry?.meaning?.my,
      entry?.note?.ja,
      entry?.note?.uz,
      entry?.note?.en,
      card.querySelector('.word__meaning')?.textContent,
      card.querySelector('.word__note')?.textContent
    ].filter(Boolean);

    return normalizeText(pieces.join(' '));
  }

  function appendReviewedTerms() {
    if (!elements.list) return;
    const reviewedMap = new Map();
    reviewedTerms.forEach((entry) => {
      reviewedMap.set(entry.term, entry);
      reviewedCategories.set(entry.term, entry.category);
    });

    // Also link pre-existing HTML cards to their reviewed entries
    cards.forEach((card) => {
      const term = termText(card);
      const match = reviewedMap.get(term);
      if (match) {
        cardEntries.set(card, match);
        if (match.category) {
          reviewedCategories.set(term, match.category);
        }
      }
    });

    reviewedTerms.forEach((entry) => {
      if (existingTerms.has(entry.term)) return;
      existingTerms.add(entry.term);

      const card = document.createElement('article');
      card.className = 'word';
      card.dataset.sourceId = entry.sourceId;

      const term = document.createElement('p');
      term.className = 'word__term';
      const ruby = document.createElement('ruby');
      ruby.append(document.createTextNode(entry.term));
      const reading = document.createElement('rt');
      reading.textContent = entry.reading;
      ruby.append(reading);
      term.append(ruby);

      const meaning = document.createElement('p');
      meaning.className = 'word__meaning';

      const note = document.createElement('p');
      note.className = 'word__note';

      card.append(term, meaning, note);
      renderEntryCardCopy(card, entry);

      elements.list.append(card);
      cards.push(card);
      cardEntries.set(card, entry);
    });
  }

  function prepareCards() {
    cards.forEach((card, index) => {
      const category = categoryFor(card);
      cardCategories.set(card, category);
      cardSearchText.set(card, buildSearchIndex(card));
      const meta = document.createElement('div');
      meta.className = 'word__meta';
      const number = document.createElement('span');
      number.textContent = `№ ${index + 1}`;
      const badge = document.createElement('span');
      badge.className = 'word__category';
      badge.textContent = category ? categoryName(category) : '';
      meta.append(number, badge);
      card.prepend(meta);
    });
  }

  function rebuildCategoryOptions() {
    if (!elements.category) return;
    const selected = elements.category.value;
    elements.category.replaceChildren();
    const all = document.createElement('option');
    all.value = '';
    all.textContent = copy.all;
    elements.category.append(all);
    Object.keys(groups).forEach((key) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = categoryName(key);
      elements.category.append(option);
    });
    elements.category.value = selected;
  }

  function updateStaticLabels() {
    copy = labels[language] || labels.ja;
    document.documentElement.lang = language;
    const pageLabels = window.__VOCAB_PAGE_LABELS__?.[language];
    if (pageLabels) {
      if (pageLabels.eyebrow) {
        const eyebrowEl = document.getElementById('eyebrow');
        if (eyebrowEl) eyebrowEl.textContent = pageLabels.eyebrow;
      }
      if (pageLabels.title) {
        document.title = pageLabels.title;
        const titleEl = document.getElementById('title');
        if (titleEl) titleEl.textContent = pageLabels.title;
      }
      const leadEl = document.getElementById('lead');
      if (leadEl && pageLabels.lead) leadEl.textContent = pageLabels.lead;
      const listTitleEl = document.getElementById('listTitle');
      const listHeading = pageLabels.list || pageLabels.listTitle;
      if (listTitleEl && listHeading) listTitleEl.textContent = listHeading;
      const backEl = document.getElementById('back');
      if (backEl && pageLabels.back) backEl.textContent = pageLabels.back;
    }
    const notebookLink = document.getElementById('notebookLink') || document.querySelector('.notebook-link');
    if (notebookLink) notebookLink.textContent = copy.notebook;

    const searchLabel = document.getElementById('searchLabel');
    if (searchLabel) searchLabel.textContent = copy.search;
    if (elements.search) elements.search.placeholder = copy.searchPlaceholder;
    const categoryLabel = document.getElementById('categoryLabel');
    if (categoryLabel) categoryLabel.textContent = copy.category;
    const filtersEl = document.querySelector('.filters');
    if (filtersEl) filtersEl.setAttribute('aria-label', copy.filters);
    const pagerEl = document.querySelector('.pager');
    if (pagerEl) pagerEl.setAttribute('aria-label', copy.pagination);
    if (elements.previous) elements.previous.textContent = copy.previous;
    if (elements.next) elements.next.textContent = copy.next;
    const langSelect = document.getElementById('language');
    if (langSelect) langSelect.setAttribute('aria-label', copy.languageLabel);
  }

  function updateAllCardsOnLanguageChange() {
    document.querySelectorAll('.vocabulary .word [data-uz]').forEach((item) => {
      const val = item.dataset[language] ?? item.dataset.ja ?? '';
      if (val) item.textContent = val;
    });

    cards.forEach((card) => {
      const catKey = cardCategories.get(card);
      const badge = card.querySelector('.word__category');
      if (badge) badge.textContent = catKey ? categoryName(catKey) : '';
    });

    cardEntries.forEach((entry, card) => {
      renderEntryCardCopy(card, entry);
    });

    cards.forEach((card) => {
      cardSearchText.set(card, buildSearchIndex(card));
    });

    updateFlashcardLabels();
    if (fc.isFlashcardMode) renderFlashcard();
  }

  function initializeControls() {
    updateStaticLabels();
    rebuildCategoryOptions();

    const languageNames = {
      uz: "O'zbek", ja: '日本語', en: 'English', ne: 'नेपाली', my: 'မြန်မာဘာသာ'
    };
    const langSelect = document.getElementById('language');
    if (langSelect) {
      ['ja', 'uz', 'en', 'ne', 'my'].forEach((locale) => {
        if (![...langSelect.options].some((opt) => opt.value === locale)) {
          const opt = document.createElement('option');
          opt.value = locale;
          opt.textContent = languageNames[locale] || locale;
          langSelect.append(opt);
        }
      });
      langSelect.value = language;
      langSelect.addEventListener('change', () => {
        const newLang = ['uz', 'ja', 'en', 'ne', 'my'].includes(langSelect.value) ? langSelect.value : 'ja';
        language = newLang;
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
        updateStaticLabels();
        rebuildCategoryOptions();
        updateAllCardsOnLanguageChange();
        render();
        window.ThemeManager?.updateUI();
      });
    }
    initFlashcardMode();
  }

  function filteredCards() {
    const rawQuery = elements.search ? elements.search.value : '';
    const query = normalizeText(rawQuery);
    const queryHira = toHiragana(query);
    const queryKata = toKatakana(query);
    let selectedCategory = elements.category ? elements.category.value : '';

    function matchesQuery(card) {
      if (!query) return true;
      const text = cardSearchText.get(card) || '';
      return text.includes(query)
        || (queryHira && text.includes(queryHira))
        || (queryKata && text.includes(queryKata));
    }

    let results = cards.filter((card) => {
      if (selectedCategory && cardCategories.get(card) !== selectedCategory) {
        return false;
      }
      return matchesQuery(card);
    });

    // If query was typed but gave 0 results inside the selected category,
    // auto-broaden search to all categories so the user finds the word!
    if (results.length === 0 && selectedCategory && query) {
      const allMatches = cards.filter(matchesQuery);
      if (allMatches.length > 0) {
        if (elements.category) elements.category.value = '';
        results = allMatches;
      }
    }

    return results;
  }

  function render() {
    const filtered = filteredCards();

    if (fc.isFlashcardMode) {
      fc.deck = filtered;
      if (fc.index >= fc.deck.length) fc.index = Math.max(0, fc.deck.length - 1);
      renderFlashcard();
      if (elements.count) elements.count.textContent = copy.count(filtered.length, cards.length);
      return;
    }

    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const start = (currentPage - 1) * pageSize;
    const visible = new Set(filtered.slice(start, start + pageSize));

    cards.forEach((card) => {
      const isVisible = visible.has(card);
      card.hidden = !isVisible;
      card.classList.toggle('is-hidden', !isVisible);
      card.style.display = isVisible ? '' : 'none';
    });

    if (elements.list) {
      if (filtered.length === 0) {
        if (!emptyMessageEl) {
          emptyMessageEl = document.createElement('div');
          emptyMessageEl.className = 'empty-message';
        }
        const noResultsText = {
          uz: 'Mos atama topilmadi. Boshqa so‘z bilan qidiring.',
          ja: '該当する単語が見つかりませんでした。別のキーワードをお試しください。',
          en: 'No matching terms found. Please try another keyword.',
          ne: 'कुनै शब्द फेला परेन।',
          my: 'ကိုက်ညီသော စကားလုံး မတွေ့ပါ။'
        }[language] || '該当する単語が見つかりませんでした。';
        emptyMessageEl.textContent = noResultsText;
        if (!elements.list.contains(emptyMessageEl)) {
          elements.list.append(emptyMessageEl);
        }
      } else if (emptyMessageEl && elements.list.contains(emptyMessageEl)) {
        emptyMessageEl.remove();
      }
    }

    if (elements.count) elements.count.textContent = copy.count(filtered.length, cards.length);
    if (elements.pageStatus) elements.pageStatus.textContent = copy.page(currentPage, pageCount);
    if (elements.previous) elements.previous.disabled = currentPage === 1;
    if (elements.next) elements.next.disabled = currentPage === pageCount;
  }

  if (elements.search) {
    elements.search.addEventListener('input', () => {
      currentPage = 1;
      render();
    });
  }
  if (elements.category) {
    elements.category.addEventListener('change', () => {
      currentPage = 1;
      render();
    });
  }
  if (elements.previous) {
    elements.previous.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage -= 1;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
  if (elements.next) {
    elements.next.addEventListener('click', () => {
      if (currentPage < Math.ceil(filteredCards().length / pageSize)) {
        currentPage += 1;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  appendReviewedTerms();
  prepareCards();
  initializeControls();
  render();
}());
