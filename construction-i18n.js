(function () {
  'use strict';

  window.CONSTRUCTION_CATEGORIES = [
    { id: 1, ja: '一般建設用語', uz: 'Umumiy qurilish atamalari', en: 'General construction terms', ne: 'सामान्य निर्माण शब्दहरू', my: 'ယေဘုယျ ဆောက်လုပ်ရေးဝေါဟာရများ' },
    { id: 2, ja: '建物の部分', uz: 'Bino qismlari', en: 'Parts of a building', ne: 'भवनका भागहरू', my: 'အဆောက်အအုံ အစိတ်အပိုင်းများ' },
    { id: 3, ja: '建設資材・材料', uz: 'Qurilish materiallari', en: 'Construction materials', ne: 'निर्माण सामग्री', my: 'ဆောက်လုပ်ရေး ပစ္စည်းများ' },
    { id: 4, ja: '道具・工具', uz: 'Asbob va uskunalar', en: 'Tools and equipment', ne: 'औजार र उपकरण', my: 'ကိရိယာများနှင့် စက်ကိရိယာများ' },
    { id: 5, ja: '建設機械', uz: 'Qurilish texnikasi', en: 'Construction machinery', ne: 'निर्माण मेसिनरी', my: 'ဆောက်လုပ်ရေး စက်ယန္တရားများ' },
    { id: 6, ja: '職業・職種', uz: 'Kasb va mutaxassisliklar', en: 'Occupations and trades', ne: 'पेशा र कामका प्रकार', my: 'အလုပ်အကိုင်နှင့် လက်မှုပညာ' },
    { id: 7, ja: '工事の工程', uz: 'Qurilish jarayonlari', en: 'Construction process', ne: 'निर्माण प्रक्रिया', my: 'ဆောက်လုပ်ရေးလုပ်ငန်း အဆင့်များ' },
    { id: 8, ja: '安全', uz: 'Xavfsizlik', en: 'Safety', ne: 'सुरक्षा', my: 'ဘေးကင်းရေး' },
    { id: 9, ja: '寸法・単位', uz: 'O‘lcham va birliklar', en: 'Dimensions and units', ne: 'आयाम र एकाइ', my: 'အတိုင်းအတာနှင့် ယူနစ်များ' },
    { id: 10, ja: '基礎・コンクリート工事', uz: 'Poydevor va beton ishlari', en: 'Foundation and concrete work', ne: 'जग र कङ्क्रिट काम', my: 'အုတ်မြစ်နှင့် ကွန်ကရစ်လုပ်ငန်း' },
    { id: 11, ja: '屋根工事', uz: 'Tom ishlari', en: 'Roofing work', ne: 'छानाको काम', my: 'ခေါင်မိုးလုပ်ငန်း' },
    { id: 12, ja: '内装仕上げ', uz: 'Ichki pardozlash', en: 'Interior finishing', ne: 'भित्री सजावट', my: 'အတွင်းပိုင်း အချောသတ်' },
    { id: 13, ja: '外構工事', uz: 'Tashqi hudud ishlari', en: 'Exterior and site work', ne: 'बाहिरी परिसरको काम', my: 'ပြင်ပဧရိယာလုပ်ငန်း' },
    { id: 14, ja: '電気工事', uz: 'Elektr ishlari', en: 'Electrical work', ne: 'विद्युतीय काम', my: 'လျှပ်စစ်လုပ်ငန်း' },
    { id: 15, ja: '給排水・衛生設備', uz: 'Suv, oqova va sanitariya jihozlari', en: 'Water, drainage and sanitary systems', ne: 'पानी, निकास र सरसफाइ उपकरण', my: 'ရေပေးဝေမှု၊ ရေမြောင်းနှင့် သန့်ရှင်းရေးစနစ်' },
    { id: 16, ja: '土木・道路・橋梁', uz: 'Fuqarolik, yo‘l va ko‘prik ishlari', en: 'Civil, road and bridge work', ne: 'सिभिल, सडक र पुलको काम', my: 'မြို့ပြ၊ လမ်းနှင့် တံတားလုပ်ငန်း' },
    { id: 17, ja: '設計・図面', uz: 'Loyiha va chizmalar', en: 'Design and drawings', ne: 'डिजाइन र रेखाचित्र', my: 'ဒီဇိုင်းနှင့် ပုံကြမ်းများ' },
    { id: 18, ja: '契約・書類', uz: 'Shartnoma va hujjatlar', en: 'Contracts and documents', ne: 'सम्झौता र कागजात', my: 'စာချုပ်နှင့် စာရွက်စာတမ်းများ' },
    { id: 19, ja: '建物の種類', uz: 'Bino turlari', en: 'Types of buildings', ne: 'भवनका प्रकार', my: 'အဆောက်အအုံ အမျိုးအစားများ' },
    { id: 20, ja: '部屋の名称', uz: 'Xona nomlari', en: 'Room names', ne: 'कोठाका नाम', my: 'အခန်းအမည်များ' },
    { id: 21, ja: '木工事', uz: 'Yog‘och ishlari', en: 'Carpentry work', ne: 'काठको काम', my: 'သစ်သားလုပ်ငန်း' },
    { id: 22, ja: '溶接・金属工事', uz: 'Payvandlash va metall ishlari', en: 'Welding and metal work', ne: 'वेल्डिङ र धातुको काम', my: 'ဂဟေဆော်ခြင်းနှင့် သတ္တုလုပ်ငန်း' },
    { id: 23, ja: '造園・ランドスケープ', uz: 'Obodonlashtirish va landshaft', en: 'Landscaping', ne: 'बगैँचा र भू-दृश्य', my: 'ရှုခင်းပြင်ဆင်ခြင်း' }
  ];

  window.CONSTRUCTION_JAPANESE_ONLY_TERMS = Object.freeze({
    'FRP防水': '繊維強化プラスチック防水',
    'LAN配線': '構内通信網配線',
    'CAD図面': 'キャド図面',
    'BIM': 'ビム'
  });
})();
