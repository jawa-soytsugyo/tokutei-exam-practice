/*
 * Tokutei Ginou mock-question generator.
 *
 * Each sector features 290 authentic Tokutei Ginou exam practice questions:
 * - 90 Core Subject & Practical Questions (基本・学科実技 90問)
 * - 90 Standard Application & Rule-based Questions (実務標準・応用 90問)
 * - 90 Workplace Scenario Practical Judgment Questions (現場実務・状況判断 90問)
 * - 20 Technical Term Definition Questions (重要専門用語の定義 20問)
 * Total: 290 questions per sector (1,740 total across 6 sectors).
 */
(function expose(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.SectorQuestionGenerator = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function createApi() {
  "use strict";

  const REQUIRED_BLUEPRINT_COUNT = 90;
  const TERM_DEFINITIONS_COUNT = 20;
  const QUESTIONS_PER_SECTOR = 290;
  const SUPPORTED_LANGUAGES = Object.freeze(["uz", "ja", "en", "ne", "my"]);
  const OPTION_COUNTS = Object.freeze({
    foodmanufacturing: 3,
    foodservice: 3,
    lodging: 3
  });
  const JAPANESE_CHARACTER = /[\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF\u3005\u3006\u30F6]/u;
  const BROKEN_GLYPH = /[\u25A0\uFFFD]/u;

  const SCENARIO_PREFIXES = Object.freeze([
    "現場での実務作業において、",
    "作業現場の安全と品質を確保するための判断として、",
    "実際の業務手順に従って作業を行う場合、",
    "現場の安全衛生を最優先とした対応として、",
    "作業標準に基づいた適切な判断として、",
    "業務を安全かつ効率的に進めるための確認事項として、"
  ]);

  const SECTOR_TERM_DEFINITIONS = Object.freeze({
  "construction": [
    {
      "category": "共通基礎",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「コンクリート打設後、十分な強度が得られるまで適切な温度と湿度を保ち保護する作業」",
      "correctJa": "養生",
      "distractorsJa": [
        "墨出し",
        "根切り",
        "玉掛け"
      ],
      "explanation": {
        "ja": "養生（ようじょう）は、コンクリートが硬化するまで適切な温度と湿潤状態を保つ保護管理です。",
        "uz": "Yojo (parvarishlash) — beton qotib yetarli mustahkamlikka erishguncha uni nam va haroratini saqlab himoya qilish jarayonidir.",
        "en": "Curing (Yojo) is the process of maintaining satisfactory moisture and temperature in concrete until it reaches adequate strength.",
        "ne": "कंक्रीट कडा नहुन्जेलसम्म उपयुक्त तापक्रम र चिस्यान कायम राख्ने कामलाई योोजो (Curing) भनिन्छ।",
        "my": "ကွန်ကရစ်မာကျောပြီး သင့်လျော်သော ခိုင်ခံ့မှုရသည်အထိ အပူချိန်နှင့် အစိုဓာတ်ကို ထိန်းသိမ်းခြင်းကို Curing (Yojo) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "建築・実技",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「図面に基づいて、柱や壁などの位置や高さを現場の床や壁に墨や線で実寸大に書き記す作業」",
      "correctJa": "墨出し",
      "distractorsJa": [
        "型枠組立",
        "配筋",
        "地業"
      ],
      "explanation": {
        "ja": "墨出し（すみだし）は、図面の寸法を現場の床や壁に実物大で印付けする基準線引き作業です。",
        "uz": "Sumidashi — chizma asosida ustun va devorlarning aniq o‘lchamlarini qurilish joyiga siyoh bilan chizish amaliyotidir.",
        "en": "Marking (Sumidashi) is the task of drawing full-scale reference lines on site floors and walls according to blueprints.",
        "ne": "नक्सा अनुसार भवनका स्तम्भ र भित्ताहरूको नाप जमिनमा मसीले कोर्ने कार्यलाई सुमिदासी भनिन्छ।",
        "my": "ဒီဇိုင်းပုံစံအတိုင်း အဆောက်အအုံတိုင်များနှင့် နံရံနေရာများကို ဆောက်လုပ်ရေးကြမ်းပြင်တွင် မင်ဖြင့် တိုင်းတာရေးဆွဲခြင်းကို Sumidashi ဟုခေါ်သည်။"
      }
    },
    {
      "category": "土木・実技",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「基礎や地下構造物を築造するために、地盤を所定の深さまで掘削する作業」",
      "correctJa": "根切り",
      "distractorsJa": [
        "埋め戻し",
        "盛土",
        "杭打ち"
      ],
      "explanation": {
        "ja": "根切り（ねぎり）は、建物の基礎や地下躯体を施工するために地盤を掘り下げる土工事です。",
        "uz": "Negiri — poydevor qurish uchun yerni belgilangan chuqurlikda qazish (kovlash) ishlari.",
        "en": "Excavation (Negiri) is the digging work to excavate ground down to the required depth for foundation construction.",
        "ne": "जग निर्माणका लागि जमिन खन्ने कार्यलाई नेगिरी (Excavation) भनिन्छ।",
        "my": "ဖောင်ဒေးရှင်းတည်ဆောက်ရန် မြေပြင်ကို သတ်မှတ်ထားသောအနက်အထိ တူးဖော်ခြင်းကို Negiri ဟုခေါ်သည်။"
      }
    },
    {
      "category": "安全衛生",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「クレーンなどのフックにワイヤーロープやスリングを用いて荷を掛けたり外したりする作業」",
      "correctJa": "玉掛け",
      "distractorsJa": [
        "揚重",
        "荷締め",
        "足場組立"
      ],
      "explanation": {
        "ja": "玉掛け（たまかけ）は、クレーンのフックにワイヤーロープ等で荷を安全に取り付け・取り外す有資格業務です。",
        "uz": "Tamakake — kran ilgagiga po‘lat arqon yoki tasma yordamida yuklarni xavfsiz ilish va yechish amaliyotidir.",
        "en": "Slinging (Tamakake) is the qualified task of hooking and unhooking loads to crane hooks using wire ropes or slings.",
        "ne": "क्रेनको हुकमा तार वा डोरीले सामान सुरक्षित रूपमा बाँध्ने र फुकाउने कार्यलाई तामाकाके भनिन्छ।",
        "my": "ကရိန်းချိတ်တွင် ဝါယာကြိုးဖြင့် ကုန်ပစ္စည်းများကို လုံခြုံစွာ ချိတ်ဆွဲခြင်းနှင့် ဖြုတ်ခြင်းကို Tamakake ဟုခေါ်သည်။"
      }
    },
    {
      "category": "建築・学科",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「設計図に従って、鉄筋を所定の位置、間隔、かぶり厚さで配置・結束する作業」",
      "correctJa": "配筋",
      "distractorsJa": [
        "型枠締め",
        "圧接",
        "継手"
      ],
      "explanation": {
        "ja": "配筋（はいきん）は、構造図面通りに鉄筋を所定の間隔で配置して結束線で固定する作業です。",
        "uz": "Haikin — konstruksiya chizmasi bo‘yicha armaturalarni belgilangan masofa va tartibda joylashtirib bog‘lash ishi.",
        "en": "Rebar arrangement (Haikin) is the process of positioning and tying steel reinforcing bars according to structural drawings.",
        "ne": "नक्सा अनुसार रडहरूलाई तोकिएको स्थान र दूरीमा बाँध्ने कार्यलाई हाइकिन भनिन्छ।",
        "my": "ဒီဇိုင်းအတိုင်း သံချောင်းများကို သတ်မှတ်အကွာအဝေးဖြင့် စီတန်းချည်နှောင်ခြင်းကို Haikin ဟုခေါ်သည်။"
      }
    },
    {
      "category": "共通基礎",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「鉄筋コンクリートにおいて、鉄筋の表面からコンクリート外表面までの最短距離」",
      "correctJa": "かぶり厚さ",
      "distractorsJa": [
        "有効せい",
        "定着長さ",
        "重ね継手"
      ],
      "explanation": {
        "ja": "かぶり厚さは、鉄筋の防錆や耐火性能を確保するためのコンクリート表面から鉄筋外側までの厚みです。",
        "uz": "Kaburi atsusa — armaturani zanglash va yong‘indan saqlash uchun beton sirtidan armatura yuzasigacha bo‘lgan masofa.",
        "en": "Cover thickness (Kaburi atsusa) is the distance between the outer surface of concrete and the nearest steel reinforcement.",
        "ne": "कंक्रीटको बाहिरी सतहदेखि रडको सतहसम्मको मोटाइलाई काबुरी आचुसा भनिन्छ।",
        "my": "ကွန်ကရစ်မျက်နှာပြင်မှ သံချောင်းအထိ အကွာအဝေးကို Cover thickness (Kaburi atsusa) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "建築・実技",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「流し込んだフレッシュコンクリートが固まるまで、所定の形状と寸法を保つための仮設の枠」",
      "correctJa": "型枠",
      "distractorsJa": [
        "支保工",
        "桟木",
        "セパレーター"
      ],
      "explanation": {
        "ja": "型枠（かたわく）は、生コンクリートを流し込んで固まるまで形状を保持する仮設の型です。",
        "uz": "Katawaku (opalubka) — beton quyilgach u qotgunicha belgilangan shakl va o‘lchamni ushlab turadigan qolip.",
        "en": "Formwork (Katawaku) is the temporary mold into which fresh concrete is poured to maintain required shape until hardening.",
        "ne": "कंक्रीट नजम्दासम्म आकार कायम राख्न प्रयोग गरिने अस्थायी फर्मालाई कातावाकु भनिन्छ।",
        "my": "ကွန်ကရစ်မမာမီ သတ်မှတ်ပုံစံအတိုင်း ထိန်းထားပေးသော ပုံစံခွက်ကို Katawaku (Formwork) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "安全衛生",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「型枠やトンネル掘削面などが倒壊しないように下や側面から支持する仮設の支柱や骨組み」",
      "correctJa": "支保工",
      "distractorsJa": [
        "先行足場",
        "壁つなぎ",
        "巾木"
      ],
      "explanation": {
        "ja": "支保工（しほこう）は、上部構造や土砂の崩壊を防ぐために設置する仮設の支えです。",
        "uz": "Shihoko (tirgich tizimi) — qoliplar yoki tuproq o‘pirilib tushmasligi uchun o‘rnatiladigan vaqtinchalik tayanch ustunlar.",
        "en": "Shoring / Falsework (Shihoko) is the temporary structural support system preventing collapse of formwork or excavated ground.",
        "ne": "फर्मा वा सुरुङ भत्किन नदिन तलबाट दिइने अस्थायी टेकोलाई सिहोकोउ भनिन्छ।",
        "my": "ကွန်ကရစ်ပုံစံခွက် သို့မဟုတ် မြေပြိုကျမှုမဖြစ်စေရန် ထောက်ကန်ထားသော အထောက်အကူပြုတိုင်ကို Shihoko ဟုခေါ်သည်။"
      }
    },
    {
      "category": "共通基礎",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「基礎や床スラブのコンクリート天端に直接引かれる、柱や壁の中心線・基準線の墨」",
      "correctJa": "地墨",
      "distractorsJa": [
        "逃げ墨",
        "親墨",
        "陸墨"
      ],
      "explanation": {
        "ja": "地墨（じずみ）は、床面スラブや基礎コンクリート上に直接引く基準線・壁位置の墨線です。",
        "uz": "Jizumi — beton pol yoki poydevor yuzasiga to‘g‘ridan-to‘g‘ri chiziladigan asosiy o‘q va devor chiziqlari.",
        "en": "Floor reference line (Jizumi) is the primary reference line snapped directly on concrete slab floors or foundation tops.",
        "ne": "कंक्रीटको भुइँमा सिधै कोरिने मुख्य आधार रेखालाई जिजुमी भनिन्छ।",
        "my": "ကွန်ကရစ်ကြမ်းပြင်ပေါ်တွင် တိုက်ရိုက်ဆွဲထားသော အဓိကဗဟိုလိုင်းကို Jizumi ဟုခေါ်သည်။"
      }
    },
    {
      "category": "土木・学科",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「擁壁や土留め構造物の背面にたまる地下水を外部に速やかに排出するためのパイプや穴」",
      "correctJa": "水抜孔",
      "distractorsJa": [
        "伸縮目地",
        "打継目地",
        "止水板"
      ],
      "explanation": {
        "ja": "水抜孔（みずぬきあな）は、擁壁背面の水圧を下げて壁の倒壊を防ぐための排水用パイプです。",
        "uz": "Mizunukiana — devor orqasidagi yer osti suvi bosimini pasaytirish va devor qulashining oldini olish uchun suv chiqarish teshigi.",
        "en": "Weep hole (Mizunukiana) is a drainage pipe or hole allowing accumulated groundwater behind retaining walls to escape.",
        "ne": "पर्खाल पछाडि जम्मा भएको पानी बाहिर निकाल्न राखिएको प्वाललाई मिजुनुकी भनिन्छ।",
        "my": "ရေဖိအားလျော့ချရန် အကာအရံနံရံနောက်ဘက်မှ ရေထုတ်ပိုက်ကို Weep hole (Mizunuki) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "建築・学科",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「工事着工時に、建物の正確な位置、高さ、直角水平を出すために敷地周囲に設ける仮設の木枠」",
      "correctJa": "遣り方",
      "distractorsJa": [
        "地縄張り",
        "境界標",
        "水準点"
      ],
      "explanation": {
        "ja": "遣り方（やりかた）は、工事着工前に建物の配置や水平高さを正確に決めるための仮設木杭・貫の囲いです。",
        "uz": "Yarikata — bino qurilishi boshlanishida to‘g‘ri balandlik, burchak va joylashuvni belgilash uchun qoqiladigan yog‘och ramka.",
        "en": "Batter boards / profile boards (Yarikata) are temporary wooden frames erected around building perimeters to fix exact levels and corners.",
        "ne": "भवन निर्माण सुरु गर्दा उचाइ र सिमाना यकिन गर्न वरिपरि बनाइने काठको फ्रेमलाई यारिकाता भनिन्छ।",
        "my": "အဆောက်အအုံ စတင်ဆောက်လုပ်ရာတွင် အမြင့်နှင့် အနေအထားကို တိကျစွာသတ်မှတ်ရန် သစ်သားဘောင်ကို Yarikata ဟုခေါ်သည်။"
      }
    },
    {
      "category": "土木・実技",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「ローラーやランマーなどの機械を用いて、土や砕石を締め固めて密度を高める作業」",
      "correctJa": "転圧",
      "distractorsJa": [
        "整地",
        "すき取り",
        "残土処分"
      ],
      "explanation": {
        "ja": "転圧（てんあつ）は、重機で土や路盤材に圧力をかけて空気の隙間を減らし、地盤を強固にする作業です。",
        "uz": "Ten'atsu (zichlash) — maxsus mashinalar (katok, rammer) yordamida tuproq yoki shag‘alni zichlab mustahkamlash jarayoni.",
        "en": "Compaction (Ten'atsu) is mechanical tamping or rolling of soil and gravel to increase ground density and load-bearing capacity.",
        "ne": "माटो वा गिट्टीलाई रोलरले थिचेर बलियो बनाउने कामलाई तेनआचु (Compaction) भनिन्छ।",
        "my": "မြေပြင် သို့မဟုတ် ကျောက်စရစ်များကို စက်ဖြင့် ဖိသိပ်ကျစ်လစ်စေခြင်းကို Ten'atsu (Compaction) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "建築・実技",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「コンクリートの表面を削ったり、余分な部分を壊して形を整えたりする作業」",
      "correctJa": "はつり",
      "distractorsJa": [
        "目粗し",
        "モルタル塗り",
        "左官仕上げ"
      ],
      "explanation": {
        "ja": "はつり（斫り）は、硬化したコンクリートの不要部分を削岩機やタガネで削り取ったり整えたりする作業です。",
        "uz": "Hatsuri — qotgan betonning ortiqcha qismini mexanik asboblar bilan qirqib yoki urib tekislash amaliyotidir.",
        "en": "Chipping / Chiseling (Hatsuri) is the task of chipping away excess hardened concrete to shape or adjust surfaces.",
        "ne": "कडा कंक्रीटको अनावश्यक भागलाई फुटाउने वा खुर्किने कामलाई हाचुरी भनिन्छ।",
        "my": "မာကျောပြီးသော ကွန်ကရစ် အပိုအစိတ်အပိုင်းများကို တူ သို့မဟုတ် ကိရိယာဖြင့် ဖဲ့ထုတ်ခြင်းကို Hatsuri ဟုခေါ်သည်။"
      }
    },
    {
      "category": "安全衛生",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「高所作業において、作業床からの墜落による労働者の危険を防止するための保護具（フルハーネス型など）」",
      "correctJa": "墜落制止用器具",
      "distractorsJa": [
        "親綱緊張器",
        "昇降用手すり",
        "落下物防止ネット"
      ],
      "explanation": {
        "ja": "墜落制止用器具（安全帯・フルハーネス）は、高所からの転落墜落を防ぎ身体を確実に保持する個人保護具です。",
        "uz": "Qulashdan himoyalanish moslamasi (Full-harness) — balandlikda ishlaganda qulab tushish xavfidan saqlovchi shaxsiy himoya vositasi.",
        "en": "Fall arrest system (Tsuiraku seishi yo kigu) is personal protective equipment such as a full harness preventing falls from heights.",
        "ne": "उचाइमा काम गर्दा खस्नबाट जोगाउने सुरक्षा बेल्टलाई चुइराकु सेइसी योउ किगु भनिन्छ।",
        "my": "အမြင့်တွင် အလုပ်လုပ်ရာ၌ ပြုတ်ကျမှုမှ ကာကွယ်ပေးသော ခန္ဓာကိုယ်ချည် အကာအကွယ်ပစ္စည်း (Full Harness) ကို ခေါ်သည်။"
      }
    },
    {
      "category": "安全衛生",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「組立足場が風圧や偏心荷重で倒壊・変形するのを防ぐため、足場と建物躯体を緊結する金物」",
      "correctJa": "壁つなぎ",
      "distractorsJa": [
        "筋交い",
        "ジャッキベース",
        "単管クランプ"
      ],
      "explanation": {
        "ja": "壁つなぎ（かべつなぎ）は、風や作業荷重による外部足場の倒壊を防ぐため、建物の壁と足場を連結固定する部材です。",
        "uz": "Kabetsunagi — tashqi lesalarning shamol yoki og‘irlik ta’sirida qulamasligi uchun binoning mustahkam devoriga bog‘lovchi metall mahkamlagich.",
        "en": "Wall tie (Kabetsunagi) is a rigid hardware anchor securing scaffolding to the permanent building structure against wind loads.",
        "ne": "खट (Scaffolding) ढल्न नदिन भवनको पर्खालसँग बाँध्ने धातुको पार्टलाई काबेचुनागी भनिन्छ।",
        "my": "ငြမ်းများ လေဒဏ်ကြောင့် ပြိုကျမှုမရှိစေရန် အဆောက်အအုံနံရံနှင့် ချိတ်ဆက်ထားသော ပစ္စည်းကို Kabetsunagi ဟုခေါ်သည်။"
      }
    },
    {
      "category": "土木・実技",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「構造物や基礎の施工完了後、掘削した土を再び元の穴に戻して締め固める作業」",
      "correctJa": "埋め戻し",
      "distractorsJa": [
        "盛土",
        "整地",
        "表土剥ぎ"
      ],
      "explanation": {
        "ja": "埋め戻し（うめもどし）は、基礎工事などの掘削箇所に土を戻して層ごとに転圧・充填する作業です。",
        "uz": "Umemodoshi — poydevor qurib bo‘lingach, qazilgan chuqurga tuproqni qayta to‘kib qatlam-qatlam zichlash ishlari.",
        "en": "Backfilling (Umemodoshi) is the process of refilling and compacting excavated soil around completed foundations.",
        "ne": "पर्खाल वा जग बनेपछि खनेको माटो फेरि भरेर थिच्ने कामलाई उमेमोदोसी भनिन्छ।",
        "my": "ဖောင်ဒေးရှင်းတည်ဆောက်ပြီးနောက် တူးထားသောကျင်းထဲသို့ မြေပြန်လည်ဖြည့်သွင်းခြင်းကို Umemodoshi (Backfilling) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "安全衛生",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「建設中の床や壁に設備配管や階段のために設けられた穴で、墜落防止用の手すりや蓋が必要な箇所」",
      "correctJa": "開口部",
      "distractorsJa": [
        "吹抜け",
        "点検口",
        "スリーブ"
      ],
      "explanation": {
        "ja": "開口部（かいこうぶ）は、床や壁の穴・隙間であり、作業員の墜落を防ぐため手すりや安全カバーの設置が義務付けられています。",
        "uz": "Kaikobu (ochiq teshiklar) — pol yoki devordagi qulash xavfi mavjud ochiq joylar bo‘lib, to‘siq yoki qopqoq bilan yopilishi shart.",
        "en": "Opening (Kaikobu) refers to holes in floors or walls requiring guardrails or safety covers to prevent worker falls.",
        "ne": "भुइँ वा भित्तामा रहेको खुला प्वाल जहाँबाट खस्ने जोखिम हुन्छ, त्यसलाई काइकोउबु भनिन्छ।",
        "my": "ကြမ်းပြင် သို့မဟုတ် နံရံရှိ ပြုတ်ကျနိုင်သည့် အပေါက်နေရာများကို Kaikobu (Opening) ဟုခေါ်ပြီး အကာအရံတပ်ရမည်။"
      }
    },
    {
      "category": "共通基礎",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「工場で練り混ぜられ、アジテータ車で工事現場に未凝固の状態で配達される生コンクリート」",
      "correctJa": "レディーミクストコンクリート",
      "distractorsJa": [
        "現場練りコンクリート",
        "モルタル",
        "セメントペースト"
      ],
      "explanation": {
        "ja": "レディーミクストコンクリート（生コン）は、JIS工場で製造されアジテータトラックで現場に運ばれる固まる前のコンクリートです。",
        "uz": "Tayyor beton (Ready-mixed concrete) — zavodda tayyorlanib, beton qoruvchi mashinada (mikser) hali qotmagan holda olib kelinadigan qorishma.",
        "en": "Ready-mixed concrete is factory-batched unhardened concrete delivered to construction sites by agitator trucks.",
        "ne": "कारखानामा मिसाएर गाडीमा ओसारेर ल्याइने ताजा कंक्रीटलाई रेडी-मिक्स्ड कंक्रीट भनिन्छ।",
        "my": "စက်ရုံတွင် ရောစပ်ပြီး ကားဖြင့် သယ်ယူပို့ဆောင်ပေးသော အဆင်သင့် ကွန်ကရစ်ဖျော်ရည်ကို Ready-mixed concrete ဟုခေါ်သည်။"
      }
    },
    {
      "category": "建築・学科",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「コンクリート打設時に棒状バイブレーターなどを用いて気泡を抜き、密実なコンクリートにする作業」",
      "correctJa": "締固め",
      "distractorsJa": [
        "コテ均し",
        "粗均し",
        "表面仕上げ"
      ],
      "explanation": {
        "ja": "締固め（しめかため）は、バイブレーターの振動でコンクリート内の空洞や空気泡を追い出し、鉄筋まわりに充填する作業です。",
        "uz": "Shimekatame (vibratsiyalash) — vibrator yordamida yangi quyilgan beton ichidagi havo pufakchalarini chiqarib uni zichlashtirish.",
        "en": "Consolidation / Compaction (Shimekatame) is vibrating fresh concrete to expel entrapped air bubbles and ensure solid filling around rebar.",
        "ne": "कंक्रीट हाल्दा भित्रको हावा फालेर कसिलो बनाउने कार्यलाई सिमेकातामे भनिन्छ।",
        "my": "ကွန်ကရစ်လောင်းရာတွင် လေခိုမှုမရှိစေရန် တုန်ခါစက်ဖြင့် ဖိသိပ်ကျစ်လစ်စေခြင်းကို Shimekatame ဟုခေါ်သည်။"
      }
    },
    {
      "category": "共通基礎",
      "promptJa": "次の説明に当てはまる建設現場の専門用語はどれですか。「敷地内の建物の位置や高さを測定する基準となる、工事中動かない強固な場所に設けた基準点」",
      "correctJa": "ベンチマーク",
      "distractorsJa": [
        "三角点",
        "境界プレート",
        "通り芯"
      ],
      "explanation": {
        "ja": "ベンチマーク（基準点）は、工事期間中に建物の位置や高さを正確に測定・管理するために設置する不動の基準点です。",
        "uz": "Benchmark (kombinatsion nuqta) — butun qurilish davomida binoning balandligi va o‘rnini o‘lchashda asos bo‘ladigan qo‘zg‘almas nuqta.",
        "en": "Benchmark (BM) is a permanent, immovable reference mark on site used for measuring elevations and building layout.",
        "ne": "निर्माण अवधिभर उचाइ र नाप लिने मुख्य स्थिर आधार बिन्दुलाई बेन्चमार्क भनिन्छ।",
        "my": "ဆောက်လုပ်ရေးကာလတစ်လျှောက် အမြင့်နှင့် နေရာကို တိုင်းတာရန် သတ်မှတ်ထားသော အတည်တကျ အမှတ်အသားကို Benchmark ဟုခေါ်သည်။"
      }
    }
  ],
  "agriculture": [
    {
      "category": "crop_management",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「苗床やポットで育てた健康な苗を、最終的に収穫する本畑やハウスの畝に植え付ける作業」",
      "correctJa": "定植",
      "distractorsJa": [
        "播種",
        "仮植",
        "間引き"
      ],
      "explanation": {
        "ja": "定植（ていしょく）は、育苗した健康な苗を本畑に本植えする作業です。",
        "uz": "Teishoku (ekish) — ko‘chatxonada yetishtirilgan sog‘lom ko‘chatlarni doimiy dalaga o‘tqazish ishi.",
        "en": "Planting / Transplanting (Teishoku) is the operation of planting raised seedlings into the main field or greenhouse bed.",
        "ne": "हुर्काइएका बिरुवाहरूलाई मुख्य खेत वा ग्रीनहाउसमा रोप्ने कामलाई तेइसोकु भनिन्छ।",
        "my": "ပျိုးထောင်ထားသော ကျန်းမာသည့် ပျိုးပင်များကို အပြီးသတ် စိုက်ခင်းသို့ ပြောင်းရွှေ့စိုက်ပျိုးခြင်းကို Teishoku ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_management",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「作物の主枝や側枝の先端の芽を摘み取り、脇芽の発生や果実の肥大を促す作業」",
      "correctJa": "摘心",
      "distractorsJa": [
        "摘花",
        "摘果",
        "葉かき"
      ],
      "explanation": {
        "ja": "摘心（てきしん・ピンチ）は、茎の先端の芽を摘み取って側枝の生長や果実の充実を促す栽培管理です。",
        "uz": "Tekishin (uchini chilpish) — poyaning uchki kurtagini uzib, yon shoxlar o‘sishi va mevalarning semirishini rag‘batlantirish.",
        "en": "Pinching / Topping (Tekishin) is removing the terminal shoot of a plant to encourage side shoots and fruit development.",
        "ne": "पात वा डाँठको टुप्पो टिपेर छेउका हाँगा र फल बढाउने कार्यलाई तेकिसिन भनिन्छ।",
        "my": "အသီးကြီးထွားစေရန်နှင့် ဘေးကိုင်းများထွက်စေရန် ထိပ်ဖျားအညွန့်ကို ဖြတ်တောက်ခြင်းကို Tekishin ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_foundations",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「作物の葉の表面に直接、液体肥料や微量要素を散布して速やかに吸収させる施肥方法」",
      "correctJa": "葉面散布",
      "distractorsJa": [
        "元肥",
        "追肥",
        "土壌灌注"
      ],
      "explanation": {
        "ja": "葉面散布（ようめんさんぷ）は、根の吸収が衰えた時などに葉から直接養分を吸収させる施肥方法です。",
        "uz": "Yomensanpu — suyuq o‘g‘itni to‘g‘ridan-to‘g‘ri barg yuzasiga purkab, o‘simlikka tezda singdirish usuli.",
        "en": "Foliar application (Yomen sampu) is spraying liquid fertilizer directly onto leaves for rapid nutrient absorption.",
        "ne": "पातको सतहमा तरल मल छर्केर छिटो पोषक तत्व लिने विधिलाई योमेन सान्पु भनिन्छ।",
        "my": "အရွက်မျက်နှာပြင်သို့ အရည်မြေဩဇာကို တိုက်ရိုက်ဖျန်းပေးသော နည်းလမ်းကို Foliar application (Yomen sampu) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_foundations",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「同じ圃場に異なる種類の作物を年や季節ごとに順番に栽培し、連作障害を防ぐ農法」",
      "correctJa": "輪作",
      "distractorsJa": [
        "単作",
        "混作",
        "密植"
      ],
      "explanation": {
        "ja": "輪作（りんさく）は、地力の消耗や病害虫の多発（連作障害）を防ぐため複数の作物を順繰りに栽培する方法です。",
        "uz": "Rinsaku (navbatlab ekish) — tuproq unumdorligini saqlash va kasalliklarning oldini olish uchun ekinlarni navbatma-navbat ekish.",
        "en": "Crop rotation (Rinsaku) is the practice of growing different crops sequentially on the same land to avoid soil degradation.",
        "ne": "माटोको उर्वराशक्ति जोगाउन फरक-फरक बाली पालैपालो लगाउने विधिलाई रिन्साकु (Crop rotation) भनिन्छ।",
        "my": "မြေဆီလွှာပျက်စီးမှုနှင့် ပိုးမွှားဒဏ်မှ ကာကွယ်ရန် သီးနှံများကို အလှည့်ကျစိုက်ပျိုးခြင်းကို Rinsaku (Crop rotation) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_management",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「密生して生えた苗のうち、生育の悪いものや余分なものを抜き取り、株間を適正に保つ作業」",
      "correctJa": "間引き",
      "distractorsJa": [
        "芽かき",
        "剪定",
        "整枝"
      ],
      "explanation": {
        "ja": "間引き（まびき）は、苗同士の光や養分の競合を防ぐため、良好な苗を残して他を抜き取る作業です。",
        "uz": "Mabiki (yaganalash) — zich o‘sgan nihollarning zaiflarini sug‘urib olib, qolganlariga yetarli joy va yorug‘lik yaratish.",
        "en": "Thinning (Mabiki) is the removal of surplus or weak seedlings to provide optimal spacing for remaining plants.",
        "ne": "बाक्लो गरी उम्रेका बिरुवाहरूमध्ये कमजोर बिरुवा उखेलेर दूरी कायम गर्ने कामलाई माबिकी भनिन्छ।",
        "my": "ပင်ကြားအကွာအဝေး မှန်ကန်စေရန် ပျိုးပင်ငယ်များအနက် အားနည်းသောအပင်များကို နုတ်ပယ်ခြင်းကို Mabiki ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_foundations",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「均一で丈夫な苗を育てるため、温度や水分を管理した苗床やセルトレイで一定期間育てる作業」",
      "correctJa": "育苗",
      "distractorsJa": [
        "催芽",
        "活着",
        "追熟"
      ],
      "explanation": {
        "ja": "育苗（いくびょう）は、本畑に定植するまでの初期成育を保護された環境で健全に育てる作業です。",
        "uz": "Ikubyo (ko‘chat yetishtirish) — urug‘dan unib chiqqan nihollarni dalaga ekkuncha nazorat ostida parvarishlash.",
        "en": "Seedling raising / Nursery (Ikubyo) is growing young plants under controlled conditions until they are ready for planting.",
        "ne": "खेतमा सार्नुअघि बिरुवालाई सुरक्षित नर्सरीमा हुर्काउने कार्यलाई इकुब्योउ भनिन्छ।",
        "my": "စိုက်ခင်းသို့ မပြောင်းရွှေ့မီ ပျိုးပင်များကို စနစ်တကျ ပြုစုပျိုးထောင်ခြင်းကို Ikubyo ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_management",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「作物の根元に周囲の土を寄せ盛り、倒伏を防ぎ不定根の発生や地下部の肥大を促す作業」",
      "correctJa": "培土",
      "distractorsJa": [
        "深耕",
        "砕土",
        "鎮圧"
      ],
      "explanation": {
        "ja": "培土（ばいど・土寄せ）は、作物の株元に土を集めて支え、ジャガイモの緑化防止や根張りを助ける作業です。",
        "uz": "Baido (tagini yumshatib tuproq tortish) — o‘simlik yiqilib tushmasligi va ildizi yaxshi rivojlanishi uchun atrofdan tuproq uyish.",
        "en": "Hilling / Ridging (Baido) is mounding soil around the base of plants to prevent lodging and encourage healthy roots.",
        "ne": "बिरुवा ढल्न नदिन जराको फेदमा माटो थुपार्ने कामलाई बाइदो (Hilling) भनिन्छ।",
        "my": "အပင်မလဲစေရန်နှင့် အမြစ်များ ကောင်းစွာဖွံ့ဖြိုးစေရန် အပင်ရင်းသို့ မြေဆွတင်ပေးခြင်းကို Baido ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_management",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「果樹などの不要な枝を切り落とし、日当たりや風通しを改善して良質な果実を実らせる作業」",
      "correctJa": "剪定",
      "distractorsJa": [
        "環状はく皮",
        "人工授粉",
        "袋かけ"
      ],
      "explanation": {
        "ja": "剪定（せんてい）は、樹形を整えて光の通りを良くし、毎年安定した高品質な果実を収穫するための枝切り作業です。",
        "uz": "Sentei (butash) — mevali daraxtlarning keraksiz shoxlarini kesib, quyosh nuri va havo aylanishini yaxshilash.",
        "en": "Pruning (Sentei) is cutting away unwanted branches to control plant shape, enhance sunlight exposure, and improve fruit yield.",
        "ne": "फलफूलका अनावश्यक हाँगाहरू काटेर हावा र घाम छिर्ने बनाउने कामलाई सेन्तेइ भनिन्छ।",
        "my": "အသီးကောင်းစွာသီးစေရန်နှင့် နေရောင်လေဝင်လေထွက်ကောင်းစေရန် သစ်ကိုင်းများကို ဖြတ်တောက်ရှင်းလင်းခြင်းကို Sentei ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_foundations",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「家畜の糞尿や稲わら、落ち葉などの有機物を微生物の力で発酵・腐熟させた土壌改良資材」",
      "correctJa": "堆肥",
      "distractorsJa": [
        "化学肥料",
        "化成肥料",
        "単肥"
      ],
      "explanation": {
        "ja": "堆肥（たいひ・コンポスト）は、有機物が微生物により分解されたもので、土壌の保水性や団粒構造を改善します。",
        "uz": "Taihi (chirindi / kompost) — hayvon go‘ngi va organik qoldiqlarning chirishi natijasida hosil bo‘ladigan unumdor tabiiy o‘g‘it.",
        "en": "Compost (Taihi) is decomposed organic matter such as livestock manure and straw that improves soil structure and fertility.",
        "ne": "गोबर, पात र पराल कुहाएर बनाइएको जैविक मललाई ताइही (Compost) भनिन्छ।",
        "my": "တိရစ္ဆာန်မစင်နှင့် သစ်ရွက်ခြောက်များကို ဆွေးမြည့်စေပြီး ပြုလုပ်ထားသော သဘာဝမြေဩဇာကို Taihi (Compost) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "safety_hygiene",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「ビニールハウス内の温度・湿度の上昇を防ぎ、新鮮な空気や二酸化炭素を取り入れるため窓を開閉する作業」",
      "correctJa": "換気",
      "distractorsJa": [
        "遮光",
        "暖房",
        "密閉"
      ],
      "explanation": {
        "ja": "換気（かんき）は、ハウス内の高温多湿による病気の発生を防ぎ、光合成に必要なCO2を供給する重要な環境管理です。",
        "uz": "Kanki (shamollatish) — issiqxonadagi yuqori harorat va namlikni pasaytirish hamda toza havo kiritish uchun darchalarni ochish.",
        "en": "Ventilation (Kanki) is opening vents to regulate greenhouse temperature and humidity and replenish carbon dioxide.",
        "ne": "ग्रीनहाउसभित्रको तापक्रम र चिस्यान मिलाउन झ्याल ढोका खोलेर हावा फेर्ने कामलाई कान्की भनिन्छ।",
        "my": "ဖန်လုံအိမ်အတွင်း အပူချိန်နှင့် အစိုဓာတ်ကို ထိန်းညှိရန် လေဝင်လေထွက် ပြုလုပ်ပေးခြင်းကို Kanki ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_management",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「強い直射日光による葉焼けや地温の過度な上昇を防ぐため、遮光ネットや寒冷紗を張る作業」",
      "correctJa": "遮光",
      "distractorsJa": [
        "被覆",
        "マルチング",
        "トンネル被覆"
      ],
      "explanation": {
        "ja": "遮光（しゃこう）は、夏季の強い日差しを和らげ、作物への高温ストレスや日焼け被害を防ぐ対策です。",
        "uz": "Shako (soyadash) — yozgi kuchli quyosh nurlaridan ekinlarni himoya qilish uchun maxsus to‘rlar tortish.",
        "en": "Shading (Shako) is using shade cloths or nets to protect crops from intense sunlight and heat stress.",
        "ne": "अत्यधिक कडा घामबाट जोगाउन जालीले छायाँ बनाउने कार्यलाई साकोउ भनिन्छ।",
        "my": "ပြင်းထန်သော နေရောင်ဒဏ်မှ ကာကွယ်ရန် အရိပ်ရစမတ်ကွက်များ တပ်ဆင်ခြင်းကို Shading (Shako) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_foundations",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「うねの表面をポリエチレンフィルムなどで覆い、土壌水分の保持、地温調節、雑草抑制を行う方法」",
      "correctJa": "マルチング",
      "distractorsJa": [
        "べたがけ",
        "トンネル栽培",
        "覆土"
      ],
      "explanation": {
        "ja": "マルチングは、フィルムシートで畝を覆うことで乾燥防止、地温の確保、雨による泥はねと雑草を防ぎます。",
        "uz": "Mulchalash (Mulching) — yer namligini saqlash, begona o‘tlarni bosish va tuproq haroratini ushlab turish uchun egatni plyonka bilan qoplash.",
        "en": "Mulching (Maruchingu) is covering soil ridges with plastic film to retain moisture, control soil temperature, and suppress weeds.",
        "ne": "माटोको चिस्यान जोगाउन र झार उम्रन नदिन प्लास्टिकले ड्याङ छोप्ने विधिलाई मल्चिङ भनिन्छ।",
        "my": "မြေအစိုဓာတ်ထိန်းရန်နှင့် ပေါင်းပင်မပေါက်စေရန် ပလတ်စတစ်ဖြင့် မြေဖုံးအုပ်ခြင်းကို Mulching (Maruchingu) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_management",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「トマトやキュウリなどの茎やつるを支柱やネットに結びつけて固定し、倒伏を防ぎ受光を良くする作業」",
      "correctJa": "誘引",
      "distractorsJa": [
        "摘葉",
        "つる下ろし",
        "芽かき"
      ],
      "explanation": {
        "ja": "誘引（ゆういん）は、つる性作物の茎を紐やテープで支柱に留め、植物が倒れず上へ伸びるように誘導する作業です。",
        "uz": "Yuin (bog‘lab yo‘naltirish) — pomidor yoki bodring poyalarini tirgakka ip bilan bog‘lab, to‘g‘ri o‘sishini ta’minlash.",
        "en": "Tying / Guiding (Yuin) is securing plant stems or vines to stakes or trellises to support upright growth and sunlight exposure.",
        "ne": "लहरे बालीका डाँठहरूलाई टेको वा डोरीमा बाँधेर सिधा बनाउने कामलाई युइन भनिन्छ।",
        "my": "ခရမ်းချဉ်၊ သခွားပင်ကဲ့သို့သော အပင်များကို တိုင်တွင် တွဲချည်ပေးခြင်းကို Tying (Yuin) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_foundations",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「作物の生育段階に合わせて、元肥の効き目が落ちてきた時期に追加で施す肥料」",
      "correctJa": "追肥",
      "distractorsJa": [
        "元肥",
        "寒肥",
        "礼肥"
      ],
      "explanation": {
        "ja": "追肥（ついひ）は、作物の成長や着果の進行に応じて必要な栄養を追加補給する施肥です。",
        "uz": "Tsuitohi (qo‘shimcha oziqlantirish) — o‘simlik o‘sish davrida asosiy o‘g‘it kuchi kamayganda qo‘shimcha beriladigan o‘g‘it.",
        "en": "Topdressing / Side dressing (Tsuitohi) is supplementary fertilizer applied during crop growth as base nutrients deplete.",
        "ne": "बाली हुर्कंदै जाँदा थप पोषक तत्व दिन पछि हालिने मललाई चुइही भनिन्छ।",
        "my": "အပင်ကြီးထွားချိန်တွင် ထပ်ဆောင်းကျွေးပေးသော မြေဩဇာကို Topdressing (Tsuitohi) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_management",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「移植・定植された苗が新しい土壌に根を伸ばし、自力で水分や養分を吸収して正常に成長し始めること」",
      "correctJa": "活着",
      "distractorsJa": [
        "発芽",
        "開花",
        "登熟"
      ],
      "explanation": {
        "ja": "活着（かっちゃく）は、移植された苗の根が土壌に定着し、自活して生長を再開する重要な段階です。",
        "uz": "Katchaku (ildiz otish / ko‘karish) — ko‘chirib o‘tqazilgan ko‘chatning yangi yerga ildiz yoyib, o‘sa boshlashi.",
        "en": "Root taking / Establishment (Katchaku) is the state when transplanted seedlings establish roots in new soil and resume active growth.",
        "ne": "खेतमा सारिएको बिरुवाले नयाँ माटोमा जरा गाडेर सप्रन सुरु गर्नुलाई काच्चाकु भनिन्छ।",
        "my": "စိုက်ပျိုးပြီးသော ပျိုးပင်သည် မြေဆီလွှာတွင် အမြစ်တွယ်၍ ပြန်လည်ရှင်သန်ကြီးထွားလာခြင်းကို Katchaku ဟုခေါ်သည်။"
      }
    },
    {
      "category": "safety_hygiene",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「農薬使用基準において、収穫物に農薬が残留しないよう定められた収穫前日数制限」",
      "correctJa": "使用時期",
      "distractorsJa": [
        "希釈倍率",
        "使用量",
        "散布回数"
      ],
      "explanation": {
        "ja": "農薬の使用時期（収穫前日数）は、食品衛生法上の残留農薬基準を守るために「収穫○日前まで」と厳格に定められています。",
        "uz": "Foydalanish muddati (hosildan oldingi kunlar) — hosilda pestitsid qoldig‘i qolmasligi uchun belgilangan muddat.",
        "en": "Pre-harvest interval / Application timing (Shiyo jiki) is the legally mandated period before harvest during which pesticide application must stop.",
        "ne": "बाली भित्र्याउनुभन्दा कति दिनअघिसम्म विषादी छर्न पाइन्छ भन्ने तोकिएको अवधिलाई सियोउ जिकी भनिन्छ।",
        "my": "ပိုးသတ်ဆေး အကြွင်းအကျန်မရှိစေရန် သီးနှံမရိတ်သိမ်းမီ ဆေးဖျန်းခွင့် ကန့်သတ်ရက်ကို Pre-harvest interval ဟုခေါ်သည်။"
      }
    },
    {
      "category": "harvest_postharvest",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「収穫直後の野菜や果物を急速に冷却し、呼吸熱を抑えて鮮度低下を防ぐ処理」",
      "correctJa": "予冷",
      "distractorsJa": [
        "選別",
        "調製",
        "追熟"
      ],
      "explanation": {
        "ja": "予冷（よれい）は、収穫直後の品温を急速に下げて呼吸を抑制し、出荷・輸送中の鮮度を長持ちさせる技術です。",
        "uz": "Yorei (dastlabki sovutish) — yig‘ib olingan meva-sabzavotlarning issig‘ini darhol pasaytirib, uzoq vaqt yangi saqlash jarayoni.",
        "en": "Precooling (Yorei) is rapid cooling of freshly harvested produce to remove field heat and retard spoilage during transport.",
        "ne": "बाली टिपेपछि ताजापन कायम राख्न तुरुन्तै चिसो बनाउने प्रविधिलाई योरेइ भनिन्छ।",
        "my": "ရိတ်သိမ်းပြီး သီးနှံများကို လတ်ဆတ်မှုထိန်းထားရန် ချက်ချင်းအအေးခံပေးခြင်းကို Precooling (Yorei) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "crop_management",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「確実な着果や奇形果の防止を図るため、採取した花粉を筆や専用器具で雌しべの柱頭につける作業」",
      "correctJa": "人工授粉",
      "distractorsJa": [
        "摘花",
        "受粉樹混植",
        "ホルモン処理"
      ],
      "explanation": {
        "ja": "人工授粉（じんこうじゅふん）は、自然受粉が不足しやすい果樹や施設栽培で、手作業により確実に受粉させる作業です。",
        "uz": "Sun'iy changlatish (Jinko jufun) — meva tugishini kafolatlash uchun gulchangni qo‘lda urug‘chiga tekkizish.",
        "en": "Artificial pollination (Jinko jufun) is the hand transfer of pollen onto flower stigmas to ensure fruit set and proper shape.",
        "ne": "फल राम्रोसँग लाग्नका लागि हातले परागसेचन गराउने कार्यलाई जिन्कोउ जुफुन भनिन्छ।",
        "my": "အသီးကောင်းစွာသီးစေရန် ပန်းဝတ်မှုန်ကို လူဖြင့် တိုက်ရိုက်ကူးပေးခြင်းကို Artificial pollination (Jinko jufun) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "safety_hygiene",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「太陽熱や蒸気、登録薬剤を用いて土壌中の病原菌、線虫、害虫、雑草の種子を死滅させる作業」",
      "correctJa": "土壌消毒",
      "distractorsJa": [
        "客土",
        "土壌改良",
        "深耕"
      ],
      "explanation": {
        "ja": "土壌消毒（どじょうしょうどく）は、土壌伝染性の病害虫を予防するため、作付け前に土壌を清浄化する処理です。",
        "uz": "Tuproqni zararsizlantirish (Dojo shodoku) — ekin ekishdan oldin tuproqdagi zararli mikroblar va qurtlarni yo‘q qilish.",
        "en": "Soil disinfection (Dojo shodoku) is treating soil with solar heat, steam, or approved chemicals to eliminate soil-borne pests and pathogens.",
        "ne": "माटोमा भएका कीटाणु र झारका बीउ मार्न गरिने उपचारलाई दोजोउ स्योउदोकु भनिन्छ।",
        "my": "မြေဆီလွှာအတွင်းရှိ ရောဂါပိုးများနှင့် ပိုးမွှားများကို သေစေရန် ပိုးသတ်ခြင်းကို Soil disinfection (Dojo shodoku) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "harvest_postharvest",
      "promptJa": "次の説明に当てはまる農業の専門用語はどれですか。「水稲や穀類で、開花受精した種実（米粒）にデンプンなどの炭水化物が蓄積されて充実・成熟していく過程」",
      "correctJa": "登熟",
      "distractorsJa": [
        "出穂",
        "分げつ",
        "幼穂形成"
      ],
      "explanation": {
        "ja": "登熟（とうじゅく）は、受精後の米粒に光合成産物が送り込まれ、デンプンが詰まって硬く実っていく成熟期間です。",
        "uz": "Tojuku (don to‘lishishi) — sholi va boshoqli ekinlarda don ichiga kraxmal to‘lib, pishib yetilish davri.",
        "en": "Ripening / Grain filling (Tojuku) is the process in cereal crops where starch accumulates in grains until full maturity.",
        "ne": "धानको दानामा दूध पसेर चामल कडा भई पाक्ने प्रक्रियालाई तोउजुकु भनिन्छ।",
        "my": "စပါးစေ့အတွင်း ကစီဓာတ်များပြည့်ဝလာပြီး ရင့်မှည့်လာသော အဆင့်ကို Grain filling / Ripening (Tojuku) ဟုခေါ်သည်။"
      }
    }
  ],
  "foodservice": [
    {
      "category": "hygiene-management",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「入荷日や製造日の古い食材から先に使用し、期限切れや品質劣化を防ぐ在庫管理の基本原則」",
      "correctJa": "先入れ先出し",
      "distractorsJa": [
        "まとめ出し",
        "都度発注"
      ],
      "explanation": {
        "ja": "先入れ先出し（FIFO）は、古い食材を先に使って期限切れや廃棄ロスを防ぐ基本原則です。",
        "uz": "Birinchi kelganni birinchi ishlatish (FIFO) — eskirgan mahsulotlarni oldinroq ishlatib, muddat o‘tishining oldini olish qoidasi.",
        "en": "First-In, First-Out (FIFO / Saki-ire Saki-dashi) is using older stock first to prevent spoilage and waste.",
        "ne": "पहिले आएको सामान पहिले प्रयोग गरेर म्याद गुज्रन नदिने नियमलाई साकी-इरे साकी-दासी (FIFO) भनिन्छ।",
        "my": "အရင်ရောက်သော ကုန်ပစ္စည်းကို အရင်အသုံးပြုသည့် သိုလှောင်မှုစီမံခန့်ခွဲရေးမူကို FIFO (Saki-ire Saki-dashi) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "hygiene-management",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「加熱調理において、肉や魚の中心部（最も火が通りにくい部分）の温度を測るための専用温度計」",
      "correctJa": "中心温度計",
      "distractorsJa": [
        "表面温度計",
        "放射温度計"
      ],
      "explanation": {
        "ja": "中心温度計（芯温計）は、食材の中心温度を直接測定し、安全な加熱殺菌温度に達したか確認する計器です。",
        "uz": "Markaziy harorat o‘lchagich — go‘sht va baliqning o‘rtasidagi haroratni o‘lchab, bakteriyalar nobud bo‘lganini tekshiradigan termometr.",
        "en": "Core food thermometer (Chushin ondokei) measures the internal temperature at the center of cooked food to ensure thorough killing of bacteria.",
        "ne": "खानाको भित्री केन्द्र भागको तापक्रम नापेर कीटाणु मरेको यकिन गर्ने थर्मोमिटरलाई चुसिन ओन्दोकेइ भनिन्छ।",
        "my": "အစားအစာ၏ အတွင်းဗဟိုအပူချိန်ကို တိုင်းတာ၍ ပိုးသတ်မှုပြည့်မီခြင်း ရှိမရှိ စစ်ဆေးသော သာမိုမီတာကို Core food thermometer ဟုခေါ်သည်။"
      }
    },
    {
      "category": "hygiene-management",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「生の肉や魚を触った手指・器具を介して、病原菌が加熱済みの食品やサラダに付着して広がる現象」",
      "correctJa": "二次汚染",
      "distractorsJa": [
        "初期汚染",
        "自然汚染"
      ],
      "explanation": {
        "ja": "二次汚染（交差汚染）は、生肉の細菌などが手やまな板を通じて安全な食品にうつる現象です。",
        "uz": "Ikkilamchi ifloslanish — xom go‘shtdagi bakteriyalar qo‘l yoki pichoq orqali tayyor ovqatga o‘tib zaharlanish keltirib chiqarishi.",
        "en": "Cross-contamination / Secondary contamination (Niji osen) is the transfer of harmful bacteria from raw foods to cooked or ready-to-eat foods.",
        "ne": "काँचो मासुका कीटाणुहरू हात वा चक्कुमार्फत पाकेको खानामा सर्नुलाई दोस्रो प्रदूषण (Secondary contamination) भनिन्छ।",
        "my": "အစိမ်းမှ အာဟာရပိုးမွှားများ လက် သို့မဟုတ် စဉ်းတီတုံးမှတစ်ဆင့် အခြားအစားအစာသို့ ကူးစက်ခြင်းကို Cross-contamination (Niji osen) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "hygiene-management",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「卵、乳、小麦、えび、かに、落花生、そばなど、人に食物アレルギー反応を引き起こす原因物質」",
      "correctJa": "特定原材料（アレルゲン）",
      "distractorsJa": [
        "食品添加物",
        "細菌性毒素"
      ],
      "explanation": {
        "ja": "特定原材料は、重篤なアレルギー症状を引き起こす恐れがあるため法令で表示が義務付けられている品目です。",
        "uz": "Allergenlar (maxsus xomashyolar) — tuxum, sut, bug‘doy kabi insonlarda kuchli allergiya qo‘zg‘atishi mumkin bo‘lgan oziq-ovqat moddalari.",
        "en": "Food allergens / Specified raw materials are substances like eggs, milk, and wheat capable of triggering severe allergic reactions.",
        "ne": "अण्डा, दूध, गहुँ जस्ता मानिसमा एलर्जी गराउने खाद्य पदार्थलाई एलर्जी तत्व (Allergen) भनिन्छ।",
        "my": "ဥ၊ နို့၊ ဂျုံကဲ့သို့သော ဓာတ်မတည့်မှုဖြစ်စေနိုင်သည့် ဓာတ်မတည့်ပစ္စည်းများ (Allergens) ကို ခေါ်သည်။"
      }
    },
    {
      "category": "customer-service",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「ナイフ、フォーク、スプーンなど、客が食事をする際に手で扱う金属製食器の総称」",
      "correctJa": "カトラリー",
      "distractorsJa": [
        "テーブルウェア",
        "グラスウェア"
      ],
      "explanation": {
        "ja": "カトラリー（cutlery）は、ナイフ、フォーク、スプーンなど洋食で用いる金属製金物器具の総称です。",
        "uz": "Katlari (Cutlery) — pichoq, sanchqi, qoshiq kabi ovqatlanishda ishlatiladigan oshxona anjomlarining umumiy nomi.",
        "en": "Cutlery (Katorari) refers to eating utensils including knives, forks, and spoons used by guests at tables.",
        "ne": "चक्कु, काँटा, चम्चा जस्ता खाना खान प्रयोग गरिने भाँडाहरूलाई कटलरी भनिन्छ।",
        "my": "ဓား၊ ခက်ရင်း၊ ဇွန်းကဲ့သို့သော စားသောက်ရာတွင် အသုံးပြုသည့် အသုံးအဆောင်များကို Cutlery (Katorari) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "customer-service",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「料理が並んだカウンターから、客が自分の好みの料理を自由に選んで取り分けるセルフサービスの食事形式」",
      "correctJa": "ビュッフェ",
      "distractorsJa": [
        "コース料理",
        "アラカルト"
      ],
      "explanation": {
        "ja": "ビュッフェ（バイキング）は、客が並べられた料理から自由に選んで食べる食べ放題・セルフ形式の食事提供法です。",
        "uz": "Byuffe (shved stoli) — mehmonlar peshtaxtaga qo‘yilgan taomlardan o‘zlari xohlaganini tanlab oladigan xizmat shakli.",
        "en": "Buffet (Byuffe) is a self-service meal format where guests choose and serve themselves from a selection of displayed dishes.",
        "ne": "राखिएका परिकारहरूबाट पाहुनाले आफैँ छानेर लिने सेवा विधिलाई बुफे (Buffet) भनिन्छ।",
        "my": "ခင်းကျင်းထားသော အစားအစာများအနက် မိမိကြိုက်နှစ်သက်ရာကို ကိုယ်တိုင်ရွေးချယ်စားသုံးသည့် ပုံစံကို Buffet (Byuffe) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "food-preparation",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「料理の品質、原価、見た目の統一を保つため、1食あたりの食材の重量や盛り付け量を厳密に計量・管理すること」",
      "correctJa": "ポーション管理",
      "distractorsJa": [
        "ロス管理",
        "棚卸管理"
      ],
      "explanation": {
        "ja": "ポーション管理は、1皿あたりの提供量・計量を標準化し、味の均一化とコストコントロールを図る手法です。",
        "uz": "Porsiya nazorati — har bir taomning sifati, tannarxi va tashqi ko‘rinishi bir xil bo‘lishi uchun vaznini qat'iy o‘lchash.",
        "en": "Portion control (Poshon kanri) is strictly measuring serving sizes per dish to maintain consistent quality, presentation, and food costs.",
        "ne": "खानाको गुणस्तर र लागत ठीक राख्न प्रति भागको परिमाण तौलेर व्यवस्थापन गर्ने कामलाई पोर्सन कन्ट्रोल भनिन्छ।",
        "my": "အရည်အသွေးနှင့် ကုန်ကျစရိတ်ကို ထိန်းညှိရန် တစ်ပွဲစာ အလေးချိန်ကို တိကျစွာတိုင်းတာခြင်းကို Portion control ဟုခေါ်သည်။"
      }
    },
    {
      "category": "customer-service",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「客が食事を終えた後のテーブルから、空いた皿、グラス、シルバーなどを片付ける作業」",
      "correctJa": "バッシング",
      "distractorsJa": [
        "セッティング",
        "ドリンカー"
      ],
      "explanation": {
        "ja": "バッシング（bussing）は、食べ終わった食器やグラスをテーブルから手早く下げて片付ける作業です。",
        "uz": "Bashing (idishlarni yig‘ishtirish) — mehmonlar ovqatlanib bo‘lgach, stoldagi bo‘shagan likopcha va stakanlarni yig‘ib olish.",
        "en": "Bussing (Basshingu) is clearing soiled dishes, glassware, and flatware from guest tables during or after a meal.",
        "ne": "पाहुनाले खाइसकेपछि टेबलबाट खाली भाँडाहरू सफा गरेर उठाउने कार्यलाई बासिङ भनिन्छ।",
        "my": "ဧည့်သည်စားသောက်ပြီးနောက် စားပွဲပေါ်ရှိ အသုံးပြုပြီး ပန်းကန်၊ ခွက်များကို သိမ်းဆည်းရှင်းလင်းခြင်းကို Bussing ဟုခေါ်သည်။"
      }
    },
    {
      "category": "hygiene-management",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「単にゴミや汚れを清掃するだけでなく、店舗や厨房を常に衛生的で清潔な状態に維持すること」",
      "correctJa": "クレンリネス",
      "distractorsJa": [
        "クリーニング",
        "ホスピタリティ"
      ],
      "explanation": {
        "ja": "クレンリネス（cleanliness）は、単なる清掃を超えて、衛生的に保たれ磨き上げられた状態を維持する理念です。",
        "uz": "Krenlines (doimiy tozalik) — shunchaki supurish emas, balki oshxona va zalni doimo gigiyenik toza saqlash madaniyati.",
        "en": "Cleanliness (Kurenrinesu) means maintaining an impeccably hygienic, sanitary, and polished standard across premises.",
        "ne": "फोहोर मात्र नहर्टाई सधैँ स्वच्छ र कीटाणुरहित वातावरण कायम राख्ने कामलाई क्लिनलिनेस भनिन्छ।",
        "my": "သန့်ရှင်းရေးရုံသာမက ဆိုင်နှင့် မီးဖိုချောင်ကို အမြဲတမ်း သန့်ရှင်းသပ်ရပ်အောင် ထိန်းသိမ်းခြင်းကို Cleanliness ဟုခေါ်သည်။"
      }
    },
    {
      "category": "customer-service",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「ハンディ端末等を用いて客の注文を入力し、厨房やレジへ自動送信する電子機器システム」",
      "correctJa": "オーダーエントリーシステム",
      "distractorsJa": [
        "POSレジシステム",
        "予約管理システム"
      ],
      "explanation": {
        "ja": "オーダーエントリーシステム（OES）は、客席で受けた注文を無線で厨房プリンター等へ即座に伝達する仕組みです。",
        "uz": "Buyurtma kiritish tizimi (OES) — xizmat ko‘rsatuvchi tomonidan kiritilgan buyurtmani oshxonaga avtomatik uzatuvchi tizim.",
        "en": "Order Entry System (OES) is a digital handheld system sending orders taken at tables directly and instantly to the kitchen.",
        "ne": "पाहुनाको अर्डरलाई तुरुन्तै भान्सामा पठाउने विद्युतीय यन्त्र प्रणालीलाई अर्डर इन्ट्री सिस्टम भनिन्छ।",
        "my": "ဧည့်သည်၏ အော်ဒါများကို မီးဖိုချောင်သို့ တိုက်ရိုက်ပို့ပေးသော အီလက်ထရွန်းနစ် စနစ်ကို Order Entry System ဟုခေါ်သည်။"
      }
    },
    {
      "category": "hygiene-management",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「大量調理施設衛生管理マニュアルで定められている、一般的な食中毒菌を死滅させる中心部加熱基準」",
      "correctJa": "中心部75℃で1分間以上",
      "distractorsJa": [
        "中心部60℃で30秒間以上",
        "中心部100℃で10秒間以上"
      ],
      "explanation": {
        "ja": "中心部が75℃以上で1分間以上加熱することで、大腸菌やサルモネラ菌などの一般的な病原菌が死滅します。",
        "uz": "Markaziy qismi 75℃ haroratda kamida 1 daqiqa — ovqat markazidagi xavfli mikroblarni yo‘q qilishning rasmiy me'yori.",
        "en": "Core temperature of 75°C for at least 1 minute is the standard Japanese sanitation benchmark for cooking meats to kill pathogens.",
        "ne": "मासुको भित्री भाग कम्तीमा ७५ डिग्रीमा १ मिनेटसम्म पकाउनु कीटाणु मार्ने मुख्य मापदण्ड हो।",
        "my": "ရောဂါပိုးများကို သေစေရန် အစားအစာ၏ ဗဟိုအပူချိန် ၇၅ ဒီဂရီဖြင့် အနည်းဆုံး ၁ မိနစ် အပူပေးရမည်။"
      }
    },
    {
      "category": "customer-service",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「レストランで客に提供されるナイフ、フォーク、スプーンなどの金属製食器を指す業界用語」",
      "correctJa": "シルバー",
      "distractorsJa": [
        "チャイナ",
        "クリスタル"
      ],
      "explanation": {
        "ja": "シルバー（silverware）は、洋食レストランにおいてナイフやフォークなどの金属製食器類全般を指す呼称です。",
        "uz": "Silver (metall idish-tovoqlar) — restoranda pichoq, vilka va qoshiqlarni ifodalovchi sohaviy atama.",
        "en": "Silver / Silverware refers generally to dining flatware such as metal knives, forks, and spoons in restaurants.",
        "ne": "रेस्टुरेन्टमा चक्कु, काँटा, चम्चा जस्ता धातुका सामानलाई बोलिने बोलीचालीको भाषालाई सिल्भर भनिन्छ।",
        "my": "စားသောက်ဆိုင်များတွင် ဓား၊ ခက်ရင်း၊ ဇွန်း စသည့် သတ္တုပစ္စည်းများကို Silver ဟု အလွယ်ခေါ်ဆိုသည်။"
      }
    },
    {
      "category": "customer-service",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「コース料理などのセットではなく、客がメニューの中から好みの料理を一品ずつ自由に注文する単品料理」",
      "correctJa": "アラカルト",
      "distractorsJa": [
        "プリフィクス",
        "デギュスタシオン"
      ],
      "explanation": {
        "ja": "アラカルト（a la carte）は、あらかじめ決まったコースではなく、1品単位で自由に選んで注文できる料理です。",
        "uz": "A la carte (alohida taomnoma) — majmuaviy menyu emas, balki mijoz o‘zi yoqtirgan taomlarni bittalab tanlab buyurtma qilishi.",
        "en": "A la carte refers to ordering individual dishes listed separately on a menu rather than an entire fixed-price set menu.",
        "ne": "सेट खाना नभई मेनुबाट आफूलाई मनपर्ने परिकार एउटा-एउटा गरी छानेर अर्डर गर्ने विधिलाई आलाकार्ट भनिन्छ।",
        "my": "တွဲဖက် မီနူးမဟုတ်ဘဲ သီးခြားစီ တစ်ပွဲချင်း ရွေးချယ်မှာယူနိုင်သော ဟင်းပွဲပုံစံကို A la carte ဟုခေါ်သည်။"
      }
    },
    {
      "category": "customer-service",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「ホールとキッチンの間にあり、飲み物やデザートの準備、シルバーやグラスの管理を行う作業場所」",
      "correctJa": "パントリー",
      "distractorsJa": [
        "デシャップ",
        "ウォッシュ場"
      ],
      "explanation": {
        "ja": "パントリー（pantry）は、客席に近いバックヤードで、ドリンク作成や食器準備などを効率よく行うスペースです。",
        "uz": "Pantri (xizmat ko‘rsatish xonasi) — zal va oshxona o‘rtasida joylashgan, ichimliklar va idish-tovoqlar tayyorlanadigan xona.",
        "en": "Pantry (Pantori) is a service prep area between kitchen and dining hall used for drink making, desserts, and staging silverware.",
        "ne": "होल र भान्साको बीचमा पेय पदार्थ र भाँडाकुँडा तयार गर्ने ठाउँलाई प्यान्ट्री भनिन्छ।",
        "my": "စားသောက်ခန်းနှင့် မီးဖိုချောင်အကြား အအေးနှင့် ပန်းကန်ခွက်ယောက်များ ပြင်ဆင်ရာနေရာကို Pantry ဟုခေါ်သည်။"
      }
    },
    {
      "category": "food-preparation",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「厨房と接客の境界にあり、完成した料理の最終チェック（異物混入・温度・品名）を行い配膳する場所」",
      "correctJa": "デシャップ",
      "distractorsJa": [
        "バックスペース",
        "ストックルーム"
      ],
      "explanation": {
        "ja": "デシャップは、調理された料理をホールスタッフへ受け渡し、盛り付けや注文内容の整合性を確認する重要ステーションです。",
        "uz": "Deshap (taom topshirish joyi) — oshxonadan chiqqan tayyor taomlar tekshirilib, ofitsiantlarga tarqatiladigan joy.",
        "en": "Dish-up / Pass counter (Deshappu) is the boundary counter between kitchen and front-of-house where finished dishes are checked and plated.",
        "ne": "तयार भएको खानाको अन्तिम जाँच गरी पाहुनालाई पुर्याउन सर्भरलाई दिने ठाउँलाई देस्याप्पु भनिन्छ।",
        "my": "ဟင်းပွဲများ ဧည့်သည်ထံသို့ မရောက်မီ နောက်ဆုံးစစ်ဆေးပြီး ဝိတ်တာထံ ပေးပို့သော နေရာကို Deshappu ဟုခေါ်သည်။"
      }
    },
    {
      "category": "customer-service",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「料理や飲み物、グラスを客席へ運んだり、使用済み食器を下げたりする際に用いる平らなお盆」",
      "correctJa": "トレイ",
      "distractorsJa": [
        "サービスプレート",
        "カスターセット"
      ],
      "explanation": {
        "ja": "トレイ（お盆）は、グラスや料理を安全に安定して運ぶための配膳器具で、両手や片手で水平に保持します。",
        "uz": "Trey (podnos) — ichimliklar va taomlarni xavfsiz olib yurish hamda bo‘sh idishlarni yig‘ish uchun ishlatiladigan patnis.",
        "en": "Tray (Torei) is a flat, shallow serving vessel used by servers to carry foods, beverages, and cleared dishes safely.",
        "ne": "खाना वा पेय पदार्थ टेबलसम्म बोक्न प्रयोग गरिने समतल ट्रे (थाल) लाई तोरेइ भनिन्छ।",
        "my": "အစားအစာနှင့် အအေးခွက်များကို သယ်ဆောင်ရာတွင် အသုံးပြုသော လင်ဗန်းကို Tray (Torei) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "hygiene-management",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「細菌性食中毒を防ぐための基本原則『付けない、増やさない、やっつける（殺す）』の総称」",
      "correctJa": "食中毒予防の3原則",
      "distractorsJa": [
        "食中毒の3大要因",
        "衛生管理の3要素"
      ],
      "explanation": {
        "ja": "食中毒予防の3原則（清潔・迅速冷却・十分な加熱）は、外食厨房で最も徹底される基本衛生規範です。",
        "uz": "Ovqatdan zaharlanishning oldini olish 3 qoidasi: mikroblarni yuqtirmaslik, ko‘paytirmaslik va ularni yo‘q qilish.",
        "en": "Three Principles of Food Poisoning Prevention: 'Do not contaminate, do not multiply, and destroy by heating.'",
        "ne": "खाना विषाक्तता रोक्ने ३ सिद्धान्त: कीटाणु नसार्ने, बढ्न नदिने र तताएर मार्ने।",
        "my": "အစားအစာ အဆိပ်သင့်မှုကာကွယ်ရေး အခြေခံ ၃ ချက်: ပိုးမကူးစေရန်၊ ပိုးမပွားစေရန်နှင့် အပူပေးသတ်ရန်။"
      }
    },
    {
      "category": "hygiene-management",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「二枚貝の生食や感染者の手指を介して感染し、激しい下痢や嘔吐を引き起こす、アルコールが効きにくいウイルス」",
      "correctJa": "ノロウイルス",
      "distractorsJa": [
        "カンピロバクター",
        "サルモネラ菌"
      ],
      "explanation": {
        "ja": "ノロウイルスは感染力が非常に強く、アルコール消毒が効きにくいため、次亜塩素酸ナトリウムや85℃以上の加熱で失活させます。",
        "uz": "Norovirus — juda yuqumli bo‘lib, kuchli ichburug‘ va qusish keltirib chiqaradigan, oddiy spirt ta’sir qilmaydigan virus.",
        "en": "Norovirus is an extremely infectious pathogen causing vomiting and diarrhea, resistant to standard alcohol disinfection.",
        "ne": "झाडापखाला र बान्ता गराउने अत्यन्तै संक्रामक भाइरस जसलाई अल्कोहलले मार्न सक्दैन, त्यसलाई नोरोभाइरस भनिन्छ।",
        "my": "ပြင်းထန်သော ဝမ်းလျှောအန်ခြင်းကို ဖြစ်စေပြီး အရက်ပြန်ဖြင့် မသေနိုင်သော ပြင်းထန်ဗိုင်းရပ်စ်ကို Norovirus ဟုခေါ်သည်။"
      }
    },
    {
      "category": "hygiene-management",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「手洗い後や器具清掃後に、手指やまな板の微生物を殺菌するためにエタノール製剤を噴霧する作業」",
      "correctJa": "アルコール消毒",
      "distractorsJa": [
        "水拭き仕上げ",
        "乾拭き仕上げ"
      ],
      "explanation": {
        "ja": "アルコール消毒は、水分の付着していない清潔な手指や調理器具にエタノールを噴射して微生物を低減させる処理です。",
        "uz": "Spirtli dezinfeksiya — qo‘l yuvilgandan yoki asboblar tozalangandan keyin mikroblarni yo‘qotish uchun spirt purkash.",
        "en": "Alcohol sanitization is spraying ethanol solution onto clean, dry hands or surfaces to reduce microbiological contamination.",
        "ne": "हात धोएपछि वा भाँडा सफा गरेपछि कीटाणु मार्न अल्कोहल छर्कने कामलाई अल्कोहल डिसइन्फेक्सन भनिन्छ।",
        "my": "လက်ဆေးပြီးနောက် သို့မဟုတ် ပစ္စည်းများဆေးပြီးနောက် ရောဂါပိုးများကို သေစေရန် အရက်ပြန်ဖျန်းခြင်းကို Alcohol disinfection ဟုခေါ်သည်။"
      }
    },
    {
      "category": "customer-service",
      "promptJa": "次の説明に当てはまる外食業の専門用語はどれですか。「新メニューの提供前に、スタッフ全員が実際に試食して味や食材、アレルギー情報を把握する勉強会」",
      "correctJa": "メニューテイスティング",
      "distractorsJa": [
        "テーブルセッティング",
        "カトラリー磨き"
      ],
      "explanation": {
        "ja": "メニューテイスティング（試食会）は、接客スタッフが味付けやおすすめポイント、アレルギー情報を熟知するために不可欠な研修です。",
        "uz": "Menyu degustatsiyasi — xodimlar yangi taomlarning ta'mi, tarkibi va allergenlarini aniq bilish uchun o‘tkaziladigan sinov ta'mini totib ko‘rish.",
        "en": "Menu tasting is a staff session sampling new dishes to master flavor profiles, ingredients, and allergy information before serving guests.",
        "ne": "नयाँ परिकारको स्वाद र बनावट बुझ्न कर्मचारीहरूले खाएर सिक्ने विधिलाई मेनु टेस्टिङ भनिन्छ।",
        "my": "ဟင်းပွဲအသစ်များ၏ အရသာနှင့် ပါဝင်ပစ္စည်းများကို သိရှိစေရန် ဝန်ထမ်းများ မြည်းစမ်းလေ့လာခြင်းကို Menu tasting ဟုခေါ်သည်။"
      }
    }
  ],
  "foodmanufacturing": [
    {
      "category": "haccp",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「原料受入から最終製品出荷までの全工程で危害要因を分析し、重要管理点を連続監視・記録する衛生管理手法」",
      "correctJa": "HACCP（ハサップ）",
      "distractorsJa": [
        "ISO9001（品質規格）",
        "5S活動"
      ],
      "explanation": {
        "ja": "HACCP（ハサップ）は、製造工程全体における危害を分析・特定し、重点的に連続管理して食品の安全を担保する国際手法です。",
        "uz": "HACCP — xomashyo qabul qilishdan boshlab tayyor mahsulotgacha bo‘lgan barcha bosqichlarda xavfni tahlil qilib, muhim nuqtalarni doimiy nazorat qiluvchi tizim.",
        "en": "HACCP is a systematic preventive approach to food safety addressing biological, chemical, and physical hazards through Critical Control Points.",
        "ne": "कच्चा पदार्थदेखि अन्तिम उत्पादनसम्मका जोखिम विश्लेषण गरी सुरक्षा सुनिश्चित गर्ने अन्तर्राष्ट्रिय विधिलाई HACCP भनिन्छ।",
        "my": "ကုန်ကြမ်းမှ ကုန်ချောအထိ အန္တရာယ်ရှိသော အချက်များကို စနစ်တကျ စောင့်ကြည့်ထိန်းချုပ်သည့် စနစ်ကို HACCP ဟုခေါ်သည်။"
      }
    },
    {
      "category": "haccp",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「HACCPシステムにおいて、食品の安全性を確保するために危害の発生を防止・排除・低減する必須管理工程」",
      "correctJa": "重要管理点（CCP）",
      "distractorsJa": [
        "適正製造規範（GMP）",
        "標準作業手順（SOP）"
      ],
      "explanation": {
        "ja": "CCP（Critical Control Point）は、加熱殺菌や金属検出など、食品安全危害を許容レベルまで除去・防止するための重要管理点です。",
        "uz": "Muhim nazorat nuqtasi (CCP) — oziq-ovqat xavfsizligini ta'minlash uchun qat'iy nazorat qilinadigan pishirish yoki metall tekshirish bosqichi.",
        "en": "Critical Control Point (CCP) is a specific operational step where control must be applied to prevent, eliminate, or reduce a food safety hazard.",
        "ne": "खानाको सुरक्षा जोखिम हटाउन अनिवार्य नियन्त्रण गरिने मुख्य विन्दुलाई महत्वपुर्ण नियन्त्रण विन्दु (CCP) भनिन्छ।",
        "my": "အစားအစာ ဘေးကင်းစေရန် အဓိကထား ထိန်းချုပ်စောင့်ကြည့်ရသော အချက်ကို Critical Control Point (CCP) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "food-safety",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「清潔区域と非清潔区域の間で、作業者の移動や器具・空気を介して微生物や異物が製品に移行・混入すること」",
      "correctJa": "交差汚染",
      "distractorsJa": [
        "初期汚染",
        "局所汚染"
      ],
      "explanation": {
        "ja": "交差汚染（クロスコンタミネーション）は、手洗いや履物の履き替え、ゾーニングの不徹底により未加熱品から製品へ汚染が広がる現象です。",
        "uz": "O‘zaro ifloslanish (Cross-contamination) — iflos zonadan toza zonaga ishchilar yoki asboblar orqali mikroblar o‘tib ketishi.",
        "en": "Cross-contamination is the physical movement or transfer of harmful bacteria or allergens from one person, object, or place to another.",
        "ne": "अस्वच्छ ठाउँबाट स्वच्छ ठाउँमा कामदार वा औजारमार्फत कीटाणु सर्नुलाई क्रस कन्ट्यामिनेसन (Cross-contamination) भनिन्छ।",
        "my": "မသန့်ရှင်းသော နေရာမှ သန့်ရှင်းသော နေရာသို့ အလုပ်သမား သို့မဟုတ် ကိရိယာမှတစ်ဆင့် ပိုးမွှားကူးစက်ခြင်းကို Cross-contamination ဟုခေါ်သည်။"
      }
    },
    {
      "category": "process-control",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「食品製造ラインを通過する包装前後の製品中に、金属片（鉄やステンレス等）が混入していないか自動検査する装置」",
      "correctJa": "金属検出機",
      "distractorsJa": [
        "X線検査機",
        "重量選別機"
      ],
      "explanation": {
        "ja": "金属検出機は、磁界の変化を利用して製品内の微小な鉄や非鉄金属片を非接触で高精度に検知する装置です。",
        "uz": "Metall aniqlagich — konveyerdan o‘tayotgan oziq-ovqat mahsulotlari ichida metall parchalari yo‘qligini tekshiruvchi uskuna.",
        "en": "Metal detector is an inspection system detecting ferrous and non-ferrous metallic contaminants within packaged or bulk food products.",
        "ne": "उत्पादन भित्र धातुका टुक्राहरू परेका छन् कि छैनन् भनी पत्ता लगाउने मेसिनलाई मेटल डिटेक्टर भनिन्छ।",
        "my": "အစားအသောက်အတွင်းသို့ သတ္တုအပိုင်းအစများ ပါဝင်မှုရှိမရှိ စစ်ဆေးပေးသော စက်ကို Metal detector ဟုခေါ်သည်။"
      }
    },
    {
      "category": "general-hygiene",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「納品された原材料の品名、数量、賞味期限、外観、包装の破損、温度、異物付着などを荷受け時に確認する検査」",
      "correctJa": "原料受入検査",
      "distractorsJa": [
        "出荷前検査",
        "工程内検査"
      ],
      "explanation": {
        "ja": "原料受入検査は、製造開始前に不適格な原材料を工場内に入れないための最初の防壁となる検査です。",
        "uz": "Xomashyoni qabul qilish tekshiruvi — zavodga kelgan mahsulotlarning sifati, yaroqlilik muddati va haroratini kirishdayoq tekshirish.",
        "en": "Receiving inspection is the initial verification of delivered raw materials for temperature, packaging integrity, expiry dates, and cleanliness.",
        "ne": "कारखानामा आइपुगेका कच्चा पदार्थहरूको म्याद, गुणस्तर र तापक्रम सुरुमै जाँच गर्ने कार्यलाई कच्चा पदार्थ प्राप्ति जाँच भनिन्छ।",
        "my": "ကုန်ကြမ်းများ စက်ရုံသို့ ရောက်ရှိလာချိန်တွင် အရည်အသွေးနှင့် အပူချိန်ကို အစောဆုံးစစ်ဆေးခြင်းကို Receiving inspection ဟုခေါ်သည်။"
      }
    },
    {
      "category": "food-safety",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「特定原材料を含む製品の製造後、ラインの洗浄不足により次に製造する製品に意図せず微量混入すること」",
      "correctJa": "アレルゲン交差接触",
      "distractorsJa": [
        "意図的添加",
        "賞味期限偽装"
      ],
      "explanation": {
        "ja": "アレルゲン交差接触（コンタミネーション）は、微量でもアレルギー患者に健康被害を及ぼすため、徹底したライン洗浄と切替確認が必要です。",
        "uz": "Allergenlarning kutilmagan aralashishi — liniya yaxshi yuvilmagani sababli keyingi mahsulotga allergen moddalarning o‘tib qolishi.",
        "en": "Allergen cross-contact occurs when an allergen is inadvertently transferred from a food containing an allergen to a food that does not.",
        "ne": "पहिलेको उत्पादनको एलर्जी गराउने तत्व राम्रोसँग नपखाल्दा अर्को उत्पादनमा मिसिनुलाई एलर्जी क्रस-सम्पर्क भनिन्छ।",
        "my": "စက်လိုင်း သန့်ရှင်းမှု မပြည့်စုံသဖြင့် ဓာတ်မတည့်ပစ္စည်းများ မတော်တဆ ကူးစက်ပါဝင်သွားခြင်းကို Allergen cross-contact ဟုခေါ်သည်။"
      }
    },
    {
      "category": "occupational-safety",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「ベルトコンベア、ミキサー、ロール機などの回転部に、作業者の衣服や手、髪が引き込まれて負傷する労働災害」",
      "correctJa": "挟まれ・巻き込まれ災害",
      "distractorsJa": [
        "転倒災害",
        "墜落災害"
      ],
      "explanation": {
        "ja": "挟まれ・巻き込まれ災害は、回転機の稼働中に掃除や点検を行った際に発生しやすく、必ず機械を停止してから作業します。",
        "uz": "Qisilib / o‘ralib qolish jarohati — konveyer yoki mikser kabi aylanuvchi qismlarga ishchining kiyimi yoki qo‘li kirib ketishi.",
        "en": "Caught-in / Entanglement accidents occur when clothing, hair, or limbs are drawn into operating rotating parts like rollers and mixers.",
        "ne": "घुम्ने मेसिन वा कन्भेयर बेल्टमा हात वा कपडा अड्किएर हुने दुर्घटनालाई अड्किने/बेरिने दुर्घटना भनिन्छ।",
        "my": "လည်ပတ်နေသော စက်ယန္တရားများအတွင်းသို့ အဝတ်အစား သို့မဟုတ် လက်များ ညှပ်မိဆွဲသွင်းခံရသည့် မတော်တဆမှုကို ခေါ်သည်။"
      }
    },
    {
      "category": "process-control",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「同一の原料・ライン・時間帯で製造され、品質が均一とみなされる製品の識別管理単位」",
      "correctJa": "製造ロット",
      "distractorsJa": [
        "賞味期限表示",
        "品名コード"
      ],
      "explanation": {
        "ja": "製造ロット（Lot）は、万一製品に異常が見つかった際に、問題のある範囲を迅速に特定して回収するために管理されます。",
        "uz": "Ishlab chiqarish loti (Partiya) — bir xil sharoitda tayyorlangan va sifat jihatidan bir xil deb hisoblanadigan mahsulotlar to‘plami.",
        "en": "Production lot / Batch is a defined quantity of uniform product manufactured under the same conditions for tracking and quality assurance.",
        "ne": "एउटै अवस्थामा उत्पादन गरिएको उत्पादनहरूको समूहलाई प्रोडक्सन लट (Production lot) भनिन्छ।",
        "my": "တူညီသော အခြေအနေအောက်တွင် ထုတ်လုပ်ထားသော ကုန်ပစ္စည်းအစုအဝေးကို Production lot (Batch) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "food-safety",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「原材料の調達から製造、加工、流通、販売までの履歴を、ロット番号などを通じて追跡・遡及できる仕組み」",
      "correctJa": "トレーサビリティ",
      "distractorsJa": [
        "オートメーション",
        "インスペクション"
      ],
      "explanation": {
        "ja": "トレーサビリティ（追跡可能性）は、製品の原料産地や製造履歴を記録により追跡できるようにする信頼性確保の仕組みです。",
        "uz": "Treysabiliti (Kuzatuvchanlik) — xomashyodan tortib xaridorgacha bo‘lgan barcha bosqichlarni qaydlar orqali tekshirish imkoniyati.",
        "en": "Traceability is the ability to track and trace any food product and its ingredients through all stages of production, processing, and distribution.",
        "ne": "कच्चा पदार्थदेखि बजारसम्म सामान कुन-कुन प्रक्रियाबाट गयो भनी खोजी गर्न सक्ने प्रणालीलाई ट्रेसिबिलिटी भनिन्छ।",
        "my": "ကုန်ကြမ်းမှ ကုန်ချောအထိ ထုတ်လုပ်မှု အဆင့်ဆင့်ကို ပြန်လည်ခြေရာခံစစ်ဆေးနိုင်သည့် စနစ်ကို Traceability ဟုခေါ်သည်။"
      }
    },
    {
      "category": "general-hygiene",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「配管やタンク、充填機などの装置を分解することなく、洗浄液や温水を自動循環させて内部を洗浄・殺菌するシステム」",
      "correctJa": "定置洗浄（CIP）",
      "distractorsJa": [
        "手分解洗浄（COP）",
        "乾式清掃"
      ],
      "explanation": {
        "ja": "CIP（Clean-In-Place）は、装置を解体せずに薬品や熱湯を密閉循環させ、内部の汚れを洗い流す自動衛生技術です。",
        "uz": "Joyida yuvish (CIP) — quvurlar va idishlarni qismlarga ajratmasdan, ichidan maxsus eritmalar yordamida avtomatik yuvish.",
        "en": "Cleaning-in-Place (CIP) is an automated method of cleaning internal surfaces of pipes, vessels, and filters without disassembly.",
        "ne": "पाइप वा ट्याङ्की नखोलीकन भित्रैबाट औषधि र पानी घुमाएर सफा गर्ने स्वचालित प्रणालीलाई CIP भनिन्छ।",
        "my": "ပိုက်လိုင်းများနှင့် စက်ပစ္စည်းများကို ဖြုတ်စရာမလိုဘဲ အလိုအလျောက် သန့်စင်ပေးသည့် စနစ်ကို Cleaning-in-Place (CIP) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "general-hygiene",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「HACCPの前提条件となる、施設・設備の衛生、従業員の衛生教育、防虫防鼠、水質管理などの基本的な衛生活動」",
      "correctJa": "一般衛生管理プログラム（PRP）",
      "distractorsJa": [
        "経営管理計画",
        "生産性向上計画"
      ],
      "explanation": {
        "ja": "一般衛生管理（前提条件プログラム: PRP）は、HACCPを効果的に機能させるための土台となる工場の基本衛生ルールです。",
        "uz": "Umumiy gigiyena dasturi (PRP) — HACCP tizimining asosi bo‘lib, tozalik, zararkunandalardan himoya va shaxsiy gigiyenani o‘z ichiga oladi.",
        "en": "Prerequisite Programs (PRP) / Good Hygiene Practices are foundational sanitation conditions necessary for the effective execution of HACCP.",
        "ne": "HACCP प्रभावकारी बनाउन आवश्यक पर्ने सफाइ, कीट नियन्त्रण र आधारभूत नियमलाई सामान्य सरसफाइ कार्यक्रम (PRP) भनिन्छ।",
        "my": "HACCP စနစ် ကောင်းစွာအလုပ်လုပ်နိုင်ရန် အခြေခံဖြစ်သော သန့်ရှင်းရေးနှင့် ပိုးမွှားကာကွယ်ရေး စည်းမျဉ်းများကို Prerequisite Programs (PRP) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "general-hygiene",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「爪ブラシと薬用石鹸を用いて指先、爪の間、指背、手首まで念入りに2度洗いし、流水で流してペーパーで拭く手洗い法」",
      "correctJa": "衛生手洗い",
      "distractorsJa": [
        "流水のみのすすぎ洗い",
        "アルコール噴霧のみ"
      ],
      "explanation": {
        "ja": "衛生手洗いは、食中毒菌やウイルスの付着をなくすため、マニュアルに従い時間をかけて物理的に擦り洗いする基本動作です。",
        "uz": "Gigiyenik qo‘l yuvish — tirnoq cho‘tkasi va maxsus sovun bilan barmoqlar, tirnoq osti va bilaklarni yaxshilab ikki marta yuvish.",
        "en": "Hygienic handwashing is a strict two-stage procedure using brush and antiseptic soap to thoroughly scrub fingers, nails, and wrists.",
        "ne": "नङको ब्रस र साबुन प्रयोग गरी नङ, औंला र नाडीसम्म दुई पटक मिचेर धुने विधिलाई स्वच्छता हात धुने विधि भनिन्छ।",
        "my": "လက်သည်းကြားနှင့် လက်ကောက်ဝတ်အထိ ဘရက်ရှ်နှင့် ဆပ်ပြာသုံး၍ စနစ်တကျ ၂ ကြိမ် သန့်စင်ဆေးကြောခြင်းကို Hygienic handwashing ဟုခေါ်သည်။"
      }
    },
    {
      "category": "general-hygiene",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「クリーンルームや製造室の入口で、高速の清浄空気を吹き付けて作業者の衣服に付着した毛髪やホコリを除去する設備」",
      "correctJa": "エアーシャワー",
      "distractorsJa": [
        "パスボックス",
        "手洗いシンク"
      ],
      "explanation": {
        "ja": "エアーシャワーは、清浄区域への入室前に強風のHEPAろ過空気を吹き付け、服についたチリや髪の毛を吹き飛ばす装置です。",
        "uz": "Havo dushi (Air shower) — ishlab chiqarish xonasiga kirishdan oldin kiyimdagi chang va sochlarni kuchli toza havo bilan puflab tozalovchi moslama.",
        "en": "Air shower is a specialized enclosed chamber blowing high-velocity HEPA-filtered air to de-dust personnel entering clean production areas.",
        "ne": "कारखानाभित्र पस्नुअघि लुगामा लागेको कपाल र धुलो उडाउन हावाको तीव्र झोका दिने कोठालाई एयर सावर भनिन्छ।",
        "my": "ထုတ်လုပ်မှုအခန်းအတွင်း မဝင်မီ အဝတ်အစားရှိ ဖုန်နှင့် ဆံပင်များကို လေပြင်းဖြင့် မှုတ်ထုတ်ရှင်းလင်းပေးသော အခန်းကို Air shower ဟုခေါ်သည်။"
      }
    },
    {
      "category": "general-hygiene",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「製造室に入室する直前に、作業衣に付着した抜け毛や糸くずを粘着シートで転がして取り除く清掃器具」",
      "correctJa": "粘着ローラー",
      "distractorsJa": [
        "静電気除去ブラシ",
        "毛落としスプレー"
      ],
      "explanation": {
        "ja": "粘着ローラー（コロコロ）は、作業衣全体の毛髪や糸くずを2人1組などで転がして確実に吸着・除去する器具です。",
        "uz": "Yopishqoq rolik — xonaga kirishdan oldin maxsus kiyimdagi to‘kilgan soch va iplarni yopishtirib olib tashlash asbobi.",
        "en": "Sticky roller / Adhesive lint roller is a manual cleaning tool rolled across garments to capture loose hairs, lint, and particles before room entry.",
        "ne": "कामदारको पोसाकमा टाँसिएका कपाल र धागोका टुक्राहरू हटाउन प्रयोग गरिने टाँसिने रोलरलाई एड्हेसिभ रोलर भनिन्छ।",
        "my": "အလုပ်ဝတ်စုံတွင် ကပ်နေသော ဆံပင်နှင့် ချည်မျှင်များကို လှိမ့်၍ ဖယ်ရှားပေးသော ကော်ပါသည့် ဒလိမ့်တုံးကို Sticky roller ဟုခေါ်သည်။"
      }
    },
    {
      "category": "food-safety",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「食品の製造工程において、毛髪、昆虫、金属片、プラスチック、ガラスなどの本来食品に含まれない物質が混入すること」",
      "correctJa": "異物混入",
      "distractorsJa": [
        "成分規格違反",
        "表示間違い"
      ],
      "explanation": {
        "ja": "異物混入は、消費者の健康被害や信頼失墜を招くため、網・フィルター・各種検出機で徹底的に防止すべき事故です。",
        "uz": "Begona jismlarning tushishi — mahsulot ichiga soch, hasharot, metall yoki shisha kabi kutilmagan moddalarning tushib qolishi.",
        "en": "Foreign body contamination refers to the accidental introduction of undesirable extraneous materials such as hair, insects, metal, or glass.",
        "ne": "खानाभित्र कपाल, किरा, धातु वा सिसा जस्ता नचाहिने बाहिरी वस्तु पर्नुलाई बाहिरी वस्तु मिसावट भनिन्छ।",
        "my": "အစားအသောက်ထဲသို့ ဆံပင်၊ အင်းဆက်၊ သတ္တု သို့မဟုတ် မှန်စသည့် မလိုလားအပ်သော အရာများ ပါဝင်သွားခြင်းကို Foreign body contamination ဟုခေါ်သည်။"
      }
    },
    {
      "category": "general-hygiene",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「清潔区域の気圧を非清潔区域より高く保ち、ドア開閉時に外部の汚染された空気やホコリ・虫の侵入を防ぐ空調制御」",
      "correctJa": "陽圧管理",
      "distractorsJa": [
        "陰圧管理",
        "自然換気"
      ],
      "explanation": {
        "ja": "陽圧管理（ポジティブプレッシャー）は、室内の気圧を高めて外気が内側へ逆流するのを防ぐ空気清浄化の手法です。",
        "uz": "Musbat bosim nazorati — toza xona havo bosimini yuqori ushlab, eshik ochilganda tashqi iflos havo va hasharotlar kirmasligini ta'minlash.",
        "en": "Positive pressure control maintains higher air pressure inside clean zones so air flows outward, preventing ingress of airborne contaminants.",
        "ne": "ढोका खोल्दा बाहिरको फोहोर हावा भित्र नपसोस् भनेर भित्रको हावाको चाप बढी राख्ने विधिलाई पोजिटिभ प्रेसर भनिन्छ।",
        "my": "တံခါးဖွင့်ချိန်တွင် အပြင်မှ ဖုန်နှင့် အင်းဆက်များ မဝင်စေရန် အတွင်းလေဖိအားကို ပိုမိုမြင့်မားစွာ ထိန်းထားခြင်းကို Positive pressure control ဟုခေါ်သည်။"
      }
    },
    {
      "category": "process-control",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「X線の透過率の違いを利用して、金属だけでなくガラス、硬質プラスチック、骨、石などの異物を非破壊で検出する装置」",
      "correctJa": "X線異物検査機",
      "distractorsJa": [
        "磁力選別機",
        "近赤外線分析計"
      ],
      "explanation": {
        "ja": "X線検査機は、金属検出機では見つけられないガラス、石、骨、樹脂などの密度差を画像処理で検知する高度な検査装置です。",
        "uz": "Rentgen (X-ray) tekshiruv uskunasi — nafaqat metall, balki shisha, suyak va tosh kabi begona jismlarni ham aniqlab beruvchi zamonaviy apparat.",
        "en": "X-ray inspection system uses X-ray density imaging to detect non-metallic contaminants like glass, stone, dense plastic, and bone fragments.",
        "ne": "एक्स-रेको माध्यमबाट धातु मात्र नभई सिसा, ढुङ्गा र हड्डी जस्ता वस्तुहरू पत्ता लगाउने यन्त्रलाई एक्स-रे इन्स्पेक्सन मेसिन भनिन्छ।",
        "my": "သတ္တုသာမက မှန်၊ အရိုးနှင့် ကျောက်ခဲကဲ့သို့သော အရာများကိုပါ ဓာတ်မှန်ရိုက်၍ စစ်ဆေးပေးသော စက်ကို X-ray inspection system ဟုခေါ်သည်။"
      }
    },
    {
      "category": "food-safety",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「定められた方法で保存した場合に、製品本来のすべての品質が十分に保たれると認められる期限（おいしく食べられる期限）」",
      "correctJa": "賞味期限",
      "distractorsJa": [
        "消費期限",
        "製造年月日"
      ],
      "explanation": {
        "ja": "賞味期限（ベストビフォー）は、比較的日持ちする食品で品質が十分に保たれる期限であり、過ぎても直ちに安全でなくなるわけではありません。",
        "uz": "Shomi kigen (Eng yaxshi ta'm muddati) — mahsulotning mazasi va sifati to‘liq saqlanib qoladigan tavsiya etilgan muddat.",
        "en": "Best-before date (Shomi kigen) indicates the period during which all expected quality attributes of an unopened food product remain intact.",
        "ne": "खानाको स्वाद र गुणस्तर राम्रोसँग कायम रहने सिफारिस गरिएको अवधिलाई सोउमी किगेन (Best-before) भनिन्छ।",
        "my": "အရသာနှင့် အရည်အသွေး ကောင်းမွန်စွာ ထိန်းသိမ်းထားနိုင်သော သတ်မှတ်ရက်စွဲကို Best-before date (Shomi kigen) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "food-safety",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「傷みやすい食品について、定められた方法で保存した場合に、腐敗や劣化に伴う衛生上の危険が生じないと認められる安全期限」",
      "correctJa": "消費期限",
      "distractorsJa": [
        "賞味期限",
        "品質保持期限"
      ],
      "explanation": {
        "ja": "消費期限（ユーズバイ）は、弁当や生菓子などの傷みやすい食品に表示され、安全に食べられる期限のため過ぎたものは飲食を避けます。",
        "uz": "Shohi kigen (Yaroqlilik muddati) — tez buziladigan ovqatlarning xavfsiz iste'mol qilinishi mumkin bo‘lgan so‘nggi kuni (undan keyin yeb bo‘lmaydi).",
        "en": "Use-by / Expiry date (Shohi kigen) marks the deadline beyond which perishable foods pose health risks and should not be eaten.",
        "ne": "छिट्टै बिग्रने खानाहरू सुरक्षित रूपमा खान सकिने अन्तिम म्यादलाई सोउही किगेन (Use-by date) भनिन्छ।",
        "my": "ပျက်စီးလွယ်သော အစားအစာများကို ဘေးကင်းစွာ စားသုံးနိုင်သည့် နောက်ဆုံးရက်စွဲကို Expiry date (Shohi kigen) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "food-safety",
      "promptJa": "次の説明に当てはまる飲食料品製造業の専門用語はどれですか。「原材料や製品の微生物増殖を防ぐため、冷蔵品（10℃以下等）や冷凍品（-15℃以下等）の規定温度を常時維持・記録すること」",
      "correctJa": "温度管理",
      "distractorsJa": [
        "常温管理",
        "急速解凍"
      ],
      "explanation": {
        "ja": "温度管理は、食中毒菌が増殖しやすい危険温度帯（10℃〜60℃）を避け、冷やすまたは熱く保つ最重要管理項目です。",
        "uz": "Haroratni nazorat qilish — oziq-ovqat mahsulotlarini buzilmasligi uchun sovutgich yoki muzlatkich haroratini me'yorda saqlash va qayd etish.",
        "en": "Temperature control is the continuous monitoring of storage conditions to prevent microorganisms from entering their rapid growth zone (10°C–60°C).",
        "ne": "कीटाणु बढ्न नदिन चिस्यान वा फ्रिजको तापक्रम नियम अनुसार नाप्ने र राख्ने कार्यलाई तापक्रम नियन्त्रण भनिन्छ।",
        "my": "အစားအစာများ မပျက်စီးစေရန် သတ်မှတ်ထားသော အအေးခန်းအပူချိန်ကို စဉ်ဆက်မပြတ် စောင့်ကြည့်ထိန်းသိမ်းခြင်းကို Temperature control ဟုခေါ်သည်။"
      }
    }
  ],
  "lodging": [
    {
      "category": "安全衛生・基礎知識",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「清掃スタッフが客室を清掃・メイクした後に、不備や清掃残しがないか責任者が最終確認・点検する作業」",
      "correctJa": "インスペクション",
      "distractorsJa": [
        "ルームメイク",
        "ターンダウン"
      ],
      "explanation": {
        "ja": "インスペクション（客室点検）は、客室販売前に清掃不備や設備故障がないかを管理者が厳しくチェックする最終点検です。",
        "uz": "Inspeksiya (xona tekshiruvi) — tozalash xodimlari ishini tugatgach, xona mehmon uchun tayyorligini rahbar tomonidan tekshirish.",
        "en": "Room inspection is the final quality check by a supervisor to ensure cleaned guest rooms meet all cleanliness and amenity standards.",
        "ne": "कोठा सफा गरिसकेपछि पाहुनाका लागि तयार छ कि छैन भनी सुपरभाइजरले अन्तिम जाँच गर्ने कामलाई इन्स्पेक्सन भनिन्छ।",
        "my": "အခန်းသန့်ရှင်းရေးပြီးနောက် ဧည့်သည်အသုံးပြုရန် အဆင်သင့်ဖြစ်မဖြစ် တာဝန်ခံမှ နောက်ဆုံးစစ်ဆေးခြင်းကို Room inspection ဟုခေါ်သည်။"
      }
    },
    {
      "category": "フロント業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「歯ブラシ、シャンプー、カミソリ、スリッパなど、客の快適な滞在のために客室に備え付けられた消耗品の総称」",
      "correctJa": "アメニティ",
      "distractorsJa": [
        "リネン",
        "ファシリティ"
      ],
      "explanation": {
        "ja": "アメニティグッズは、宿泊客が手ぶらでも快適に過ごせるよう客室に提供される日用品・アメニティ類の総称です。",
        "uz": "Ameniti (qulaylik buyumlari) — mehmonxona xonasida mehmonlar uchun bepul beriladigan tish cho‘tkasi, shampun va shippak kabi narsalar.",
        "en": "Amenities (Ameniti) are complimentary personal care items provided in guest rooms, such as toothbrushes, shampoo, and slippers.",
        "ne": "होटलको कोठामा पाहुनाका लागि राखिएका टुथब्रस, साबुन र चप्पल जस्ता सामग्रीहरूलाई एमेनिटीज भनिन्छ।",
        "my": "ဧည့်သည်များ သက်တောင့်သက်သာရှိစေရန် အခန်းတွင်း ထားရှိပေးသော သွားတိုက်တံ၊ ခေါင်းလျှော်ရည်စသည့် အသုံးအဆောင်များကို Amenities ဟုခေါ်သည်။"
      }
    },
    {
      "category": "フロント業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「シーツ、デュベカバー、ピローケース、バスタオル、フェイスタオルなど、ホテルで使用される布製品・寝具類の総称」",
      "correctJa": "リネン",
      "distractorsJa": [
        "ガウン",
        "カーテン"
      ],
      "explanation": {
        "ja": "リネン類は、客室のベッドやバスルームで使われるシーツやタオル等の繊維製品の総称で、定期的にクリーニングされます。",
        "uz": "Linen (oq choyshablar) — mehmonxona xonalarida ishlatiladigan choyshab, yostiq jildi va sochiq kabi matoli buyumlar.",
        "en": "Linen refers collectively to sheets, duvet covers, pillowcases, and towels supplied for guest room bedding and baths.",
        "ne": "होटलमा प्रयोग हुने तन्ना, तकियाको खोल र तौलिया जस्ता कपडाहरूलाई लिनन भनिन्छ।",
        "my": "ဟိုတယ်အခန်းများတွင် အသုံးပြုသော အိပ်ယာခင်း၊ ခေါင်းအုံးစွပ်နှင့် မျက်နှာသုတ်ပုဝါများကို Linen ဟုခေါ်သည်။"
      }
    },
    {
      "category": "フロント業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「チェックイン時に宿泊客が氏名、住所、電話番号、パスポート番号（外国人）等を記入する宿泊台帳カード」",
      "correctJa": "レジストレーションカード",
      "distractorsJa": [
        "バウチャー",
        "インボイス"
      ],
      "explanation": {
        "ja": "レジストレーションカード（宿帳）は、旅館業法に基づき宿泊客の身元確認と宿泊記録を残すための公式用紙です。",
        "uz": "Ro‘yxatdan o‘tish kartasi (Reg-card) — mehmon kelganda ismi, manzili va pasport raqamini yozadigan rasmiy blanka.",
        "en": "Registration card (Reg card) is the guest check-in form collecting legal registration details like name, contact info, and passport data.",
        "ne": "होटलमा चेक-इन गर्दा पाहुनाले आफ्नो नाम, ठेगाना र राहदानी विवरण भर्ने कार्डलाई रजिस्ट्रेसन कार्ड भनिन्छ।",
        "my": "ဟိုတယ်သို့ ရောက်ရှိချိန်တွင် ဧည့်သည်၏ အမည်၊ နိုင်ငံကူးလက်မှတ်အချက်အလက်များ ဖြည့်သွင်းရသော စာရွက်ကို Registration card ဟုခေါ်သည်။"
      }
    },
    {
      "category": "フロント業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「チェックイン前やチェックアウト後に、宿泊客の手荷物やコートを預かり保管するホテルのサービスカウンター」",
      "correctJa": "クローク",
      "distractorsJa": [
        "コンシェルジュ",
        "ベルデスク"
      ],
      "explanation": {
        "ja": "クローク（手荷物一時預かり所）は、客が身軽に行動できるよう荷物を預かりタグで管理するフロント付帯施設です。",
        "uz": "Klok (garderob / yuk saqlash) — mehmonlarning sumka va paltolarini vaqtincha saqlab beradigan xizmat burchagi.",
        "en": "Cloakroom / Baggage check (Kuroku) is the hotel counter holding luggage and coats temporarily for guests before check-in or after checkout.",
        "ne": "चेक-इन अघि वा चेक-आउट पछि पाहुनाको झोला र कोटहरू सुरक्षित राखिदिने काउन्टरलाई क्लोक भनिन्छ।",
        "my": "အခန်းမဝင်မီ သို့မဟုတ် အခန်းထွက်ပြီးနောက် ဧည့်သည်၏ အိတ်များကို ခေတ္တအပ်နှံသိမ်းဆည်းရာနေရာကို Cloakroom (Kuroku) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "接客業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「観光案内、レストランの予約、劇場のチケット手配など、客の様々な要望や相談に総合的に応じる専門スタッフ」",
      "correctJa": "コンシェルジュ",
      "distractorsJa": [
        "ドアマン",
        "フロントクラーク"
      ],
      "explanation": {
        "ja": "コンシェルジュは、「よろず相談役」としてホテルの内外を問わず客のあらゆるリクエストに柔軟に対応するプロフェッショナルです。",
        "uz": "Konsyerj (Concierge) — mehmonlarga shahar bo‘ylab sayohat, restoran band qilish va boshqa barcha istaklarini bajarishda yordam beruvchi mutaxassis.",
        "en": "Concierge assists guests with diverse requests, including travel advice, dining reservations, and ticketing.",
        "ne": "पाहुनालाई घुम्ने ठाउँको जानकारी दिने, टिकट बुकिङ गरिदिने र व्यक्तिगत सहयोग गर्ने विशेषज्ञ कर्मचारीलाई कन्सिएर्ज भनिन्छ।",
        "my": "ဧည့်သည်များအတွက် ခရီးသွားလမ်းညွှန်ပေးခြင်း၊ စားသောက်ဆိုင်ကြိုတင်ဘိုကင်လုပ်ပေးခြင်းတို့ကို ကူညီပေးသော ဝန်ထမ်းကို Concierge ဟုခေါ်သည်။"
      }
    },
    {
      "category": "レストランサービス業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「客からの電話注文に応じて、料理や飲料を客室まで運んでテーブルに配膳するサービス」",
      "correctJa": "ルームサービス",
      "distractorsJa": [
        "ケータリング",
        "ミニバー"
      ],
      "explanation": {
        "ja": "ルームサービス（インルームダイニング）は、客室でプライベートに食事を楽しめるホテルならではのサービスです。",
        "uz": "Xonaga xizmat ko‘rsatish (Room service) — mehmonning buyurtmasiga ko‘ra ovqat va ichimliklarni to‘g‘ridan-to‘g‘ri xonasiga yetkazib berish.",
        "en": "Room service (In-room dining) is the delivery and serving of meals and drinks directly inside guests' private rooms.",
        "ne": "पाहुनाको कोठामा खाना र पेय पदार्थ पुर्याएर सेवा दिने कामलाई रुम सर्भिस भनिन्छ।",
        "my": "ဧည့်သည်၏ အခန်းတွင်းသို့ အစားအသောက်များကို တိုက်ရိုက်ပို့ဆောင်ပေးသော ဝန်ဆောင်မှုကို Room service ဟုခေါ်သည်။"
      }
    },
    {
      "category": "安全衛生・基礎知識",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「夕方から夜にかけて、客が就寝しやすいようにベッドカバーを外し、枕元を整え、照明を落とす夕方の客室整えサービス」",
      "correctJa": "ターンダウン",
      "distractorsJa": [
        "アウト清掃",
        "ステイ清掃"
      ],
      "explanation": {
        "ja": "ターンダウンサービスは、高級ホテルなどで夕刻にベッドを就寝可能な状態に整え、快眠を促す心遣いサービスです。",
        "uz": "Turndown (yotishga tayyorlash) — kechqurun mehmon qulay uxlashi uchun to‘shak yopqichini ochib, yostiqni to‘g‘rilab qo‘yish xizmati.",
        "en": "Turndown service is the evening housekeeping service of turning down bed linens, dimming lights, and preparing the room for sleep.",
        "ne": "साँझपख पाहुना सुत्न सजिलो होस् भनेर ओछ्यान मिलाउने र कोठा तयार गर्ने सेवालाई टर्नडाउन भनिन्छ।",
        "my": "ညဘက် ဧည့်သည်အိပ်စက်ရန် အဆင်ပြေစေရန် အိပ်ယာကို ပြင်ဆင်ပေးသော ညနေပိုင်း အခန်းဝန်ဆောင်မှုကို Turndown service ဟုခေါ်သည်။"
      }
    },
    {
      "category": "フロント業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「到着した宿泊客をフロントで出迎え、宿泊カードの記入、本人確認、鍵（カードキー）の引き渡しを行う手続き」",
      "correctJa": "チェックイン",
      "distractorsJa": [
        "チェックアウト",
        "リロケーション"
      ],
      "explanation": {
        "ja": "チェックインは、ホテルの第一印象を決める最重要手続きで、正確な登録と笑顔での丁寧な案内が求められます。",
        "uz": "Check-in (ro‘yxatdan o‘tib kirish) — kelgan mehmonni kutib olib, hujjatlarini to‘ldirish va xona kalitini topshirish jarayoni.",
        "en": "Check-in is the arrival procedure where guest identities are verified, registration is completed, and room keys are issued.",
        "ne": "होटल पुगेपछि पाहुनाको परिचय खुलाएर कोठाको साँचो लिने प्रक्रियालाई चेक-इन भनिन्छ।",
        "my": "ဧည့်သည်ရောက်ရှိချိန်တွင် အချက်အလက်များစစ်ဆေးပြီး အခန်းသော့လွှဲပြောင်းပေးအပ်သည့် လုပ်ငန်းစဉ်ကို Check-in ဟုခေါ်သည်။"
      }
    },
    {
      "category": "フロント業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「滞在を終えた宿泊客がルームキーを返却し、客室付けの飲食代などを精算して出発する手続き」",
      "correctJa": "チェックアウト",
      "distractorsJa": [
        "ノーショー",
        "アーリーチェックイン"
      ],
      "explanation": {
        "ja": "チェックアウトは、鍵の回収、未払金（ミニバーやレストラン利用分）の精算を行い、感謝を伝えて見送る出発手続きです。",
        "uz": "Check-out (chiqish / hisob-kitob) — mehmon ketishida kalitni qaytarib, qo‘shimcha xizmatlar pulini to‘lab jo‘nab ketishi.",
        "en": "Check-out is the departure procedure involving key return, billing settlement, and bidding farewell to departing guests.",
        "ne": "बसाइ सकेर पाहुनाले साँचो फिर्ता गरी हिसाब मिलाएर बिदा हुने प्रक्रियालाई चेक-आउट भनिन्छ।",
        "my": "တည်းခိုမှုပြီးဆုံးချိန်တွင် အခန်းသော့ပြန်အပ်၍ ငွေစာရင်းရှင်းလင်းကာ ထွက်ခွာခြင်းကို Check-out ဟုခေါ်သည်။"
      }
    },
    {
      "category": "フロント業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「宿泊の予約をしている客が、キャンセルの事前連絡がないままチェックイン当日に現れないこと」",
      "correctJa": "ノーショー",
      "distractorsJa": [
        "キャンセル待ち",
        "オーバーブッキング"
      ],
      "explanation": {
        "ja": "ノーショー（無断不泊）は、事前の連絡なく客が来ないことで、規定のキャンセル料が請求される対象となります。",
        "uz": "No-show (kelmay qolish) — mehmon xonani oldindan band qilib, ogohlantirmasdan kelmay qolishi.",
        "en": "No-show refers to a reservation where the guest neither cancels nor arrives at the hotel on the booked check-in date.",
        "ne": "बुकिङ गरेर पनि कुनै जानकारी नदिई पाहुना नआउने स्थितिलाई नो-सो (No-show) भनिन्छ।",
        "my": "အခန်းကြိုတင်မှာထားသော်လည်း အကြောင်းမကြားဘဲ လာရောက်တည်းခိုခြင်းမရှိခြင်းကို No-show ဟုခေါ်သည်။"
      }
    },
    {
      "category": "企画・広報業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「当日の直前キャンセルを見込んで、実際の客室数よりも多くの予約を受け付けるホテル運営の手法」",
      "correctJa": "オーバーブッキング",
      "distractorsJa": [
        "ダブルブッキング",
        "アップグレード"
      ],
      "explanation": {
        "ja": "オーバーブッキング（過剰予約）は、キャンセル率を統計的に見越して稼働率を最大化するために行う経営手法です。",
        "uz": "Overbooking (ortiqcha band qilish) — bekor bo‘lishini hisobga olib, xonalar sonidan ko‘proq buyurtma qabul qilish.",
        "en": "Overbooking is the deliberate practice of accepting more reservations than available rooms to offset anticipated cancellations.",
        "ne": "रद्द हुनसक्ने अनुमान गरी कोठाको सङ्ख्याभन्दा धेरै बुकिङ लिने विधिलाई ओभरबुकिङ भनिन्छ।",
        "my": "ဧည့်သည်ပယ်ဖျက်မှုကို ကြိုတင်တွက်ဆ၍ ရှိသောအခန်းအရေအတွက်ထက် ပိုမိုဘိုကင်လက်ခံခြင်းကို Overbooking ဟုခေါ်သည်။"
      }
    },
    {
      "category": "安全衛生・基礎知識",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「ホテルのベッドメイキングで広く使われている、清潔なカバーで羽毛布団全体をすっぽり包み込むスタイルの寝具」",
      "correctJa": "デュベ",
      "distractorsJa": [
        "スプレッド",
        "シーツ"
      ],
      "explanation": {
        "ja": "デュベスタイルは、羽毛布団を袋状のカバーで覆うため衛生的で、ベッドメイクが美しく仕上がる主流の寝具様式です。",
        "uz": "Dyuve (Duvet) — oq qoplamali qulay momiq ko‘rpa bo‘lib, zamonaviy mehmonxonalarda to‘shak tayyorlashning asosiy usuli.",
        "en": "Duvet (Dyube) is a quilt or down comforter encased in a washable removable cover, standard in modern hotel bedmaking.",
        "ne": "सिरकलाई सफा खोलभित्र हालेर ओछ्याइने आधुनिक शैलीको ओछ्यानलाई डुभेट (Duvet) भनिन्छ।",
        "my": "ဂွမ်းစောင် သို့မဟုတ် မွေ့ယာကို အိတ်စွပ်သန့်သန့်ဖြင့် ဖုံးအုပ်ပြင်ဆင်သည့် အိပ်ယာပုံစံကို Duvet ဟုခေါ်သည်။"
      }
    },
    {
      "category": "安全衛生・基礎知識",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「客室内の小さな冷蔵庫に有料のビール、ジュース、スナック類をあらかじめ常備しておく設備」",
      "correctJa": "ミニバー",
      "distractorsJa": [
        "ドリンクバー",
        "ワインセラー"
      ],
      "explanation": {
        "ja": "ミニバーは、客室で手軽に飲み物を楽しめる冷蔵設備で、チェックアウト時に利用分を自己申告または自動精算します。",
        "uz": "Minibar — xonada pulli ichimliklar va yengil tamaddilar saqlanadigan kichik muzlatgich.",
        "en": "Minibar is a small refrigerator in a guest room stocked with drinks and snacks charged upon consumption at checkout.",
        "ne": "कोठाभित्र पेय पदार्थ र खाजाहरू राखिएको सानो फ्रिजलाई मिनीबार भनिन्छ।",
        "my": "အခန်းတွင်းရှိ အခပေးအအေးနှင့် မုန့်များထားရှိသော ရေခဲသေတ္တာငယ်ကို Minibar ဟုခေါ်သည်။"
      }
    },
    {
      "category": "フロント業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「ホテル側の都合や会員特典により、客が予約した部屋よりも広い部屋や上位ランクの部屋を追加料金なしで提供すること」",
      "correctJa": "アップグレード",
      "distractorsJa": [
        "ダウングレード",
        "リロケーション"
      ],
      "explanation": {
        "ja": "アップグレードは、満室時の部屋繰りやロイヤルカスタマーへのサービスとして、より良い客室へ無料で変更することです。",
        "uz": "Apgreyd (yuqori toifaga ko‘tarish) — mehmon xonasini qo‘shimcha to‘lovsiz yaxshiroq yoki kattaroq xonaga bepul almashtirib berish.",
        "en": "Upgrade refers to reassigning a guest to a superior category of room without charging any additional fee.",
        "ne": "पाहुनाले बुक गरेको भन्दा राम्रो र ठूलो कोठा बिना अतिरिक्त शुल्क उपलब्ध गराउनुलाई अपग्रेड भनिन्छ।",
        "my": "ဧည့်သည်ဘိုကင်လုပ်ထားသော အခန်းထက် ပိုမိုကောင်းမွန်သည့် အခန်းသို့ အခမဲ့ပြောင်းလဲပေးခြင်းကို Upgrade ဟုခေါ်သည်။"
      }
    },
    {
      "category": "接客業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「ホテルのエントランスに常駐し、客の送迎車のドアを開閉し、荷物の積み下ろしや出迎え・見送りを行うスタッフ」",
      "correctJa": "ドアマン",
      "distractorsJa": [
        "ベルボーイ",
        "ポーター"
      ],
      "explanation": {
        "ja": "ドアマンは、エントランスでお客様を最初にお迎えし、車両の誘導やドアサービスを行うホテルの「顔」となる職種です。",
        "uz": "Doorman (Eshikbon) — mehmonxona kirish eshigi oldida turib mashina eshigini ochadigan va yuklarga yordam beradigan xodim.",
        "en": "Doorman greets arriving and departing guests, opens vehicle and entrance doors, and assists with hailing transportation.",
        "ne": "होटलको मुख्य ढोकामा बसेर पाहुनालाई स्वागत गर्ने र गाडीको ढोका खोलिदिने कर्मचारीलाई डोरम्यान भनिन्छ।",
        "my": "ဟိုတယ်အဝင်ဝတွင် ဧည့်သည်များအား ကြိုဆိုနှုတ်ဆက်ပြီး ကားတံခါးဖွင့်ပေးသော ဝန်ထမ်းကို Doorman ဟုခေါ်သည်။"
      }
    },
    {
      "category": "フロント業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「各客室が『空室』『滞在中』『清掃中』『点検済』のどの状態にあるかをフロントや客室係が一目で把握できる管理表示」",
      "correctJa": "ルームインジケーター",
      "distractorsJa": [
        "キーボックス",
        "ルームナンバープレート"
      ],
      "explanation": {
        "ja": "ルームインジケーター（客室状況表示）は、客室のステータスをリアルタイムで共有し、清掃と販売を連動させるシステムです。",
        "uz": "Xona ko‘rsatkichi (Room indicator) — qaysi xona bo‘sh, qaysi biri tozalanayotganini ko‘rsatib turuvchi elektron boshqaruv paneli.",
        "en": "Room status indicator tracks the real-time operational state of each room (vacant, occupied, cleaning, inspected).",
        "ne": "कुन कोठा खाली छ वा सफा हुँदैछ भनी देखाउने प्रणालीलाई रुम इन्डिकेटर भनिन्छ।",
        "my": "အခန်းလွတ်၊ သန့်ရှင်းဆဲ၊ အသုံးပြုဆဲ စသည့် အခြေအနေများကို စောင့်ကြည့်ပြသပေးသော စနစ်ကို Room indicator ဟုခေါ်သည်။"
      }
    },
    {
      "category": "接客業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「チェックイン時や客室案内時に、大浴場や朝食会場の場所・営業時間、避難経路などを客に丁寧に説明すること」",
      "correctJa": "館内案内",
      "distractorsJa": [
        "市内観光案内",
        "ルームオーダー"
      ],
      "explanation": {
        "ja": "館内案内（インフォメーション）は、宿泊客がホテル施設を快適かつ安全に利用できるように正確に情報提供する業務です。",
        "uz": "Mehmonxona bo‘ylab yo‘naltirish — nonushta joyi, vanna va favqulodda chiqish yo‘llari haqida mehmonga tushuntirish berish.",
        "en": "Hotel facility guidance informs guests about operating hours, amenities, restaurants, and safety exits upon arrival.",
        "ne": "होटलका सुविधाहरू जस्तै नुहाउने ठाउँ, बिहानी खाजा र आपत्कालीन बाटोबारे पाहुनालाई जानकारी गराउने कार्यलाई कान्नाई आन्नाइ भनिन्छ।",
        "my": "မနက်စာစားချိန်၊ ရေချိုးခန်းနှင့် အရေးပေါ်ထွက်ပေါက်များအကြောင်း ဧည့်သည်အား ရှင်းပြလမ်းညွှန်ခြင်းကို အဆောက်အအုံလမ်းညွှန် (Kannai annai) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "安全衛生・基礎知識",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「火災や地震などの緊急時に安全に避難できるよう、各客室のドア内側に掲示されている避難経路図」",
      "correctJa": "避難経路図",
      "distractorsJa": [
        "非常ベル",
        "防災センター"
      ],
      "explanation": {
        "ja": "避難経路図は、非常時にどの階段や非常口を通って屋外へ脱出すべきかを客室ごとに明示した重要な安全掲示です。",
        "uz": "Evakuatsiya xaritasi — yong‘in yoki zilzila paytida qaysi eshikdan qochish kerakligini ko‘rsatuvchi xona eshigidagi xarita.",
        "en": "Evacuation route map is posted behind guest room doors indicating immediate escape paths and fire exit locations.",
        "ne": "आपतकालीन अवस्थामा सुरक्षित भाग्न कोठाको ढोका पछाडि टाँसिएको नक्सालाई इभाकुएसन म्याप भनिन्छ।",
        "my": "မီးဘေး သို့မဟုတ် ငလျင်ဖြစ်ချိန်တွင် အရေးပေါ်ထွက်ပြေးနိုင်ရန် အခန်းတံခါးအတွင်းဘက်တွင် ကပ်ထားသော မြေပုံကို Evacuation route map ဟုခေါ်သည်။"
      }
    },
    {
      "category": "接客業務",
      "promptJa": "次の説明に当てはまる宿泊業の専門用語はどれですか。「相手の気持ちを先回りして察し、心を込めて気配りや歓迎の心を提供する日本の伝統的な接客精神」",
      "correctJa": "おもてなし",
      "distractorsJa": [
        "マナー",
        "ルール"
      ],
      "explanation": {
        "ja": "おもてなしは、見返りを求めずにお客様を心から歓迎し、期待以上の快適さと感動を提供する日本の接客文化の神髄です。",
        "uz": "Omotenashi (yaponcha mehmondo‘stlik) — mehmonga samimiy ko‘ngil bilan, uning istaklarini oldindan sezib xizmat ko‘rsatish san'ati.",
        "en": "Omotenashi embodies traditional Japanese hospitality: anticipating guest needs selflessly with utmost care and warmth.",
        "ne": "पाहुनाको भावना बुझेर मनैदेखि गरिने जापानी मौलिक आतिथ्य सत्कारलाई ओमोतेनासी भनिन्छ।",
        "my": "ဧည့်သည်၏ လိုအပ်ချက်ကို ကြိုတင်သိရှိနားလည်ပြီး စိတ်ရင်းဖြင့် နွေးထွေးစွာ ကြိုဆိုဧည့်ခံသော ဂျပန်ရိုးရာဧည့်ဝတ်ကျေပွန်မှုကို Omotenashi ဟုခေါ်သည်။"
      }
    }
  ],
  "automobile": [
    {
      "category": "tools_measurement",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「ホイールナットやシリンダーヘッドボルトなどを、規定された締付力で正確に締め付けるための専用測定工具」",
      "correctJa": "トルクレンチ",
      "distractorsJa": [
        "インパクトレンチ",
        "スピンナハンドル",
        "メガネレンチ"
      ],
      "explanation": {
        "ja": "トルクレンチは、ボルトやナットの締め過ぎや緩みを防ぎ、メーカー規定値通りのトルクで締結する測定工具です。",
        "uz": "Tork kaliti (Torque wrench) — bolt va gaykalarni belgilangan aniq kuch (moment) bilan qotirish uchun o‘lchovli kalit.",
        "en": "Torque wrench is a precision tool used to apply a specific torque to a fastener such as a wheel nut or cylinder head bolt.",
        "ne": "नट र बोल्टहरूलाई तोकिएको नापमा कस्न प्रयोग गरिने विशेष औजारलाई टर्क रेन्च भनिन्छ।",
        "my": "ဘီးနပ်များနှင့် ဘိုလူးများကို သတ်မှတ်ထားသော အားဖြင့် တိကျစွာကြပ်ပေးသည့် အထူးကိရိယာကို Torque wrench ဟုခေါ်သည်။"
      }
    },
    {
      "category": "tools_measurement",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「ブレーキディスクの振れや軸の曲がり、バックラッシなどの微細な変位（0.01mm単位）を測定する針式測定器」",
      "correctJa": "ダイヤルゲージ",
      "distractorsJa": [
        "マイクロメーター",
        "ノギス",
        "シリンダーゲージ"
      ],
      "explanation": {
        "ja": "ダイヤルゲージは、スピンドルの微小な動きを拡大してダイヤルの指針で読み取る精密比較測定器です。",
        "uz": "Dialsifat o‘lchagich (Dial gauge) — tormoz diski qimirlashi yoki val egilishini 0.01 mm aniqlikda o‘lchaydigan asbob.",
        "en": "Dial gauge / Dial indicator is a precision measuring instrument used to measure small axial or radial deflections and runout in 0.01 mm increments.",
        "ne": "डिस्क वा साफ्टको थोरै पनि बाङ्गोपन ०.०१ मिमीमा नाप्ने मिटरलाई डायल गेज भनिन्छ।",
        "my": "ဘရိတ်ဒစ်ပြားနှင့် ဝင်ရိုးများ၏ သေးငယ်သော တုန်ခါယိုင်နဲ့မှုကို ၀.၀၁ မီလီမီတာအထိ တိုင်းတာပေးသော ကိရိယာကို Dial gauge ဟုခေါ်သည်။"
      }
    },
    {
      "category": "engine_systems",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「クランクシャフトの回転をカムシャフトに正確に伝達し、吸排気バルブの開閉時期を同期させるゴム製ベルト」",
      "correctJa": "タイミングベルト",
      "distractorsJa": [
        "ファンベルト",
        "オルタネーターベルト",
        "パワステベルト"
      ],
      "explanation": {
        "ja": "タイミングベルトは、ピストンと吸排気バルブの運動を狂いなく同期させる歯付きの重要ベルトです。",
        "uz": "Tayming remeni (Timing belt) — tirsakli val aylanishini taqsimlash valiga uzatib, klapanlar ochilib-yopilishini muvofiqlashtiruvchi tishli tasmali kamar.",
        "en": "Timing belt synchronizes the rotation of the crankshaft and the camshaft so that engine valves open and close at proper times.",
        "ne": "इन्जिनका भल्भहरू ठीक समयमा खोल्न र बन्द गर्न घुमाउने दाँतेदार बेल्टलाई टाइमिङ बेल्ट भनिन्छ।",
        "my": "အင်ဂျင်အဆို့ရှင်များ ဖွင့်ချိန်ပိတ်ချိန် တိကျစေရန် ခရိုင်းရှပ်နှင့် ကမ်ရှပ်ကို တွဲဖက်လည်ပတ်စေသော သိုင်းကြိုးကို Timing belt ဟုခေါ်သည်။"
      }
    },
    {
      "category": "chassis_systems",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「ディスクブレーキにおいて、ブレーキディスクを両側から挟み込んで摩擦力により車輪の回転を止める摩擦材」",
      "correctJa": "ブレーキパッド",
      "distractorsJa": [
        "ブレーキローター",
        "ブレーキキャリパー",
        "ブレーキシュー"
      ],
      "explanation": {
        "ja": "ブレーキパッドは、キャリパー内のピストンに押されてディスクローターを圧着・制動する消耗品部品です。",
        "uz": "Tormoz kolodkasi (Brake pad) — diskli tormozda g‘ildirakni to‘xtatish uchun diskni siqib to‘xtatadigan ishqalanuvchi qism.",
        "en": "Brake pads are the friction components pressed against brake discs by calipers to slow or stop wheel rotation.",
        "ne": "गाडी रोक्नका लागि ब्रेक डिस्कलाई थिच्ने घर्षण सामग्रीलाई ब्रेक प्याड भनिन्छ।",
        "my": "ဘီးလည်ပတ်မှုကို ရပ်တန့်စေရန် ဘရိတ်ဒစ်ပြားကို ဖိညှပ်ပေးသည့် ပွတ်တိုက်ပစ္စည်းကို Brake pad ဟုခေါ်သည်။"
      }
    },
    {
      "category": "engine_systems",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「エンジンオイルが循環する際に、摩耗した金属粉やスラッジ、不純物をろ過して油を清浄に保つ部品」",
      "correctJa": "オイルフィルター",
      "distractorsJa": [
        "エアクリーナー",
        "フューエルフィルター",
        "オイルパン"
      ],
      "explanation": {
        "ja": "オイルフィルター（エレメント）は、エンジンオイル中の微細な異物を捕集してエンジン各部の摩耗を防ぐフィルターです。",
        "uz": "Moy filtri (Oil filter) — motor moyi aylanganda ichidagi metall kukunlari va kirlarni ushlab qolib, tozalovchi qism.",
        "en": "Oil filter cleans engine oil by removing metallic particles, sludge, and contaminants to prevent engine wear.",
        "ne": "इन्जिन आयलमा भएको फोहोर र धातुका कणहरू छानेर सफा राख्ने पार्टलाई आयल फिल्टर भनिन्छ।",
        "my": "အင်ဂျင်ဝိုင်အတွင်းရှိ သတ္တုမှုန်များနှင့် အညစ်အကြေးများကို စစ်ထုတ်ပေးသော အစိတ်အပိုင်းကို Oil filter ဟုခေါ်သည်။"
      }
    },
    {
      "category": "engine_systems",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「エンジンの燃焼室に吸入される空気中の砂、ホコリ、ゴミを捕集してシリンダーの摩耗を防ぐフィルター」",
      "correctJa": "エアクリーナー",
      "distractorsJa": [
        "ポーレンフィルター",
        "キャビンフィルター",
        "オイルキャッチ"
      ],
      "explanation": {
        "ja": "エアクリーナー（エアエレメント）は、エンジン内部に吸い込まれる大気中の異物をろ過して燃焼効率を保つ装置です。",
        "uz": "Havo filtri (Air cleaner) — dvigatel ichiga kiruvchi havodagi chang va qumlarni ushlab qolib, silindrni himoyalovchi filtr.",
        "en": "Air cleaner / Air filter screens out dust and foreign matter from ambient air drawn into the engine cylinders.",
        "ne": "इन्जिनभित्र छिर्ने हावामा भएको धुलो र बालुवा रोक्ने फिल्टरलाई एयर क्लिनर भनिन्छ।",
        "my": "အင်ဂျင်အတွင်းသို့ ဝင်ရောက်လာသော လေထဲမှ ဖုန်နှင့် အညစ်အကြေးများကို စစ်ထုတ်ပေးသော လေစစ်ကို Air cleaner ဟုခေါ်သည်။"
      }
    },
    {
      "category": "engine_systems",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「エンジン冷却水の温度に応じて自動で弁を開閉し、冷却水をラジエーターに循環させて適正水温を保つ弁装置」",
      "correctJa": "サーモスタット",
      "distractorsJa": [
        "ウォーターポンプ",
        "ラジエーターキャップ",
        "水温センサー"
      ],
      "explanation": {
        "ja": "サーモスタットは、冷間時の早期暖機と温間時のオーバーヒート防止のため、水温に応じて冷却流路を切り替える自動弁です。",
        "uz": "Termostat — motor sovutish suvi haroratiga qarab avtomatik ochilib-yopilib, haroratni bir xilda ushlab turuvchi klapan.",
        "en": "Thermostat is a heat-activated valve regulating coolant flow between engine and radiator to maintain optimal operating temperature.",
        "ne": "इन्जिनको पानीको तापक्रम अनुसार आफैँ खुल्ने र बन्द हुने भल्भलाई थर्मोस्टाट भनिन्छ।",
        "my": "အင်ဂျင်အအေးခံရေ အပူချိန်အလိုက် အလိုအလျောက် ပွင့်ပိတ်ပေးသော အပူချိန်ထိန်းအဆို့ရှင်ကို Thermostat ဟုခေါ်သည်။"
      }
    },
    {
      "category": "engine_systems",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「エンジンの回転力によって発電し、走行中の電装品に電力を供給するとともにバッテリーを充電する交流発電機」",
      "correctJa": "オルタネーター",
      "distractorsJa": [
        "スターターモーター",
        "イグニッションコイル",
        "インバーター"
      ],
      "explanation": {
        "ja": "オルタネーター（ダイナモ）は、交流電力を発電して直流に変換し、車両の全電気負荷とバッテリー充電を担う発電機です。",
        "uz": "Alternator (Generator) — motor kuchi bilan aylanib elektr toki ishlab chiqaruvchi va akkumulyatorni zaryadlovchi uskuna.",
        "en": "Alternator generates alternating current driven by the engine, converting it to direct current to power electrics and recharge the battery.",
        "ne": "इन्जिन घुम्दा बिजुली उत्पादन गरी ब्याट्री चार्ज गर्ने जेनेरेटरलाई अल्टरनेटर भनिन्छ।",
        "my": "အင်ဂျင်လည်ပတ်အားဖြင့် လျှပ်စစ်ထုတ်လုပ်ပေးပြီး ဘက်ထရီကို ပြန်လည်အားသွင်းပေးသော မီးဒိုင်နမိုကို Alternator ဟုခေါ်သည်။"
      }
    },
    {
      "category": "engine_systems",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「エンジンを始動させるために、バッテリーの電力でフライホイールを強制的に回転させる直流電動機（セルモーター）」",
      "correctJa": "スターターモーター",
      "distractorsJa": [
        "オルタネーター",
        "ディストリビューター",
        "リレー"
      ],
      "explanation": {
        "ja": "スターターモーターは、キースイッチ操作でピニオンギアを噛み合わせ、エンジンが自立回転するまでクランキングする電動機です。",
        "uz": "Starter motor (Starter) — dvigatelni o‘t oldirish uchun akkumulyator kuchi bilan maxovikni aylantirib beruvchi motor.",
        "en": "Starter motor cranks the engine flywheel using battery power to initiate internal combustion and start the engine.",
        "ne": "इन्जिन सुरु गर्नका लागि ब्याट्रीको बलले इन्जिन घुमाउने मोटरलाई स्टार्टर मोटर भनिन्छ।",
        "my": "အင်ဂျင်စတင်လည်ပတ်နိုင်ရန် ဘက်ထရီစွမ်းအင်ဖြင့် စတင်လှည့်ပေးသော မော်တာကို Starter motor ဟုခေါ်သည်။"
      }
    },
    {
      "category": "inspection_adjustment",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「車両の直進安定性やタイヤの偏摩耗防止のため、前後の車輪の角度（トー、キャンバー等）を適正に整える調整」",
      "correctJa": "ホイールアライメント",
      "distractorsJa": [
        "ホイールバランス",
        "タイヤローテーション",
        "トレッド調整"
      ],
      "explanation": {
        "ja": "ホイールアライメントは、サスペンションやステアリングの角度を測定・調整して直進走行性と偏摩耗防止を図る作業です。",
        "uz": "Razval-sxojdeniye (Wheel alignment) — g‘ildiraklarning turish burchaklarini to‘g‘rilab, mashina to‘g‘ri yurishi va shina yeyilishini oldini olish.",
        "en": "Wheel alignment is adjusting suspension angles (toe, camber, caster) to ensure straight-line tracking and prevent uneven tire wear.",
        "ne": "गाडी सिधा गुड्न र टायर नघिस्रियोस् भनी पाङ्ग्राको कोण मिलाउने कामलाई ह्वील अलाइनमेन्ट भनिन्छ।",
        "my": "ကားဖြောင့်တန်းစွာ မောင်းနှင်နိုင်ရန်နှင့် တာယာမညီမညာ ပွန်းစားမှုမဖြစ်စေရန် ဘီးထောင့်များကို ချိန်ညှိခြင်းကို Wheel alignment ဟုခေါ်သည်။"
      }
    },
    {
      "category": "chassis_systems",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「ブレーキペダルを踏んだ油圧をキャリパーやホイールシリンダーに伝達する非鉱物油系の作動油」",
      "correctJa": "ブレーキフルード",
      "distractorsJa": [
        "パワステフルード",
        "エンジンオイル",
        "CVTフルード"
      ],
      "explanation": {
        "ja": "ブレーキフルード（ブレーキ液）は、吸湿性があり沸点低下によるペーパーロック現象を防ぐため定期交換が必要な油圧作動液です。",
        "uz": "Tormoz suyuqligi (Brake fluid) — tormoz bosilganda bosimni g‘ildirak tormoz silindrlariga yetkazib beruvchi maxsus suyuqlik.",
        "en": "Brake fluid is the hydraulic fluid transmitting foot pedal pressure through the brake lines to calipers and wheel cylinders.",
        "ne": "ब्रेक थिच्दा त्यसको चाप पाङ्ग्रासम्म पुर्याउने विशेष तेललाई ब्रेक फ्लुइड भनिन्छ।",
        "my": "ဘရိတ်နင်းချိန်တွင် ဖိအားကို ဘရိတ်ဆလင်ဒါများထံ ပို့ဆောင်ပေးသော ဘရိတ်ဆီကို Brake fluid ဟုခေါ်သည်။"
      }
    },
    {
      "category": "engine_systems",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「凍結防止剤や防錆剤が配合され、冬場の凍結や冷却系統のサビを防ぐ長寿命の不凍冷却液」",
      "correctJa": "LLC（ロングライフクーラント）",
      "distractorsJa": [
        "ウォッシャー液",
        "バッテリー補充液",
        "エアコンオイル"
      ],
      "explanation": {
        "ja": "LLC（不凍液）は、エチレングリコールを主成分として冷却水の凍結破損と金属部分の腐食・錆を防ぐ冷却液です。",
        "uz": "Tosol / Antifriz (LLC) — qishda muzlab qolmaydigan va dvigatel sovutish tizimini zanglashdan asraydigan uzoq muddatli suyuqlik.",
        "en": "Long Life Coolant (LLC) / Antifreeze prevents engine freeze-up in winter and inhibits corrosion throughout the cooling system.",
        "ne": "जाडोमा पानी जम्न नदिने र इन्जिनमा खिया लाग्न नदिने कूलन्टलाई LLC भनिन्छ।",
        "my": "အအေးဒဏ်ကြောင့် အင်ဂျင်ရေခဲခြင်းနှင့် သံချေးတက်ခြင်းမှ ကာကွယ်ပေးသော အအေးခံအရည်ကို Long Life Coolant (LLC) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "engine_systems",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「ガソリンエンジンのシリンダー内で、高電圧を受けて火花を飛ばし圧縮された混合気に点火する部品」",
      "correctJa": "スパークプラグ",
      "distractorsJa": [
        "グロープラグ",
        "インジェクター",
        "ディストリビューター"
      ],
      "explanation": {
        "ja": "スパークプラグ（点火プラグ）は、イグニッションコイルの高電圧で中心電極間に火花放電を起こして燃焼を開始させる部品です。",
        "uz": "Svecha (Spark plug) — benzinli dvigatel silindrida siqilgan yoqilg‘i aralashmasini chaqmoq uchquni bilan yondirib beruvchi qism.",
        "en": "Spark plug delivers electric spark across its electrode gap to ignite the compressed air-fuel mixture in gasoline engine cylinders.",
        "ne": "पेट्रोल इन्जिनभित्र हावा र इन्धनको मिश्रणलाई आगो सल्काउन झिल्का दिने पार्टलाई स्पार्क प्लग भनिन्छ।",
        "my": "ဓာတ်ဆီအင်ဂျင်အတွင်းရှိ လေနှင့်လောင်စာအရောအနှောကို မီးပွားပေး၍ ပေါက်ကွဲစေသော ပလပ်ကို Spark plug ဟုခေါ်သည်။"
      }
    },
    {
      "category": "practical_judgment",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「車両のOBDコネクタに接続し、電子制御ECUが記録した故障コード（DTC）の読み取りやデータ確認を行う外部診断機」",
      "correctJa": "スキャンツール",
      "distractorsJa": [
        "サーキットテスター",
        "オシロスコープ",
        "タイミングライト"
      ],
      "explanation": {
        "ja": "スキャンツール（故障診断機）は、車両のコンピュータと通信して自己診断結果や各センサーの数値を表示する必須ツールです。",
        "uz": "Skaner (Scan tool) — avtomobil kompyuteriga ulanib, nosozlik kodlarini o‘qiydigan va datchiklar ko‘rsatkichini tekshiradigan apparat.",
        "en": "Scan tool / Diagnostic scanner connects to the OBD-II port to read Diagnostic Trouble Codes (DTCs) and live vehicle sensor data.",
        "ne": "गाडीको कम्प्युटरसँग जोडेर खराबी पत्ता लगाउने विद्युतीय यन्त्रलाई स्क्यान टुल भनिन्छ।",
        "my": "ကားကွန်ပျူတာနှင့် ချိတ်ဆက်၍ ချွတ်ယွင်းချက်ကုဒ်များကို ဖတ်ရှုစစ်ဆေးပေးသော ကိရိယာကို Scan tool ဟုခေါ်သည်။"
      }
    },
    {
      "category": "safety_materials",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「ガレージジャッキで車体を持ち上げた後、作業中の安全を確保するために車両の下に噛ませる固定用支持台」",
      "correctJa": "リジッドラック",
      "distractorsJa": [
        "油圧パンタジャッキ",
        "ホイールチョーク",
        "輪止め"
      ],
      "explanation": {
        "ja": "リジッドラック（ウマ）は、ジャッキアップされた車両の下に潜って作業する際に車体落下を防ぐための強固な安全支持具です。",
        "uz": "Rijid rak (Tirgich / Uma) — domkrat bilan ko‘tarilgan mashina tagida xavfsiz ishlash uchun qo‘yiladigan temir tayanch.",
        "en": "Rigid rack / Jack stand (Uma) is a mechanical support stand placed under a jacked-up vehicle to safely support its weight during service.",
        "ne": "ज्याकले गाडी उचालेपछि सुरक्षित रूपमा अड्याउन मुनि राखिने स्ट्यान्डलाई रिजिड र्याक भनिन्छ।",
        "my": "ကားကို ဂျိုက်ဖြင့် မပြီးနောက် အောက်တွင် လုံခြုံစွာ အလုပ်လုပ်နိုင်ရန် ထောက်ကန်ထားသော အထောက်အကူစင်ကို Jack stand (Rigid rack) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "safety_materials",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「自動車用リフトで車体を上昇させた後、油圧配管の破損などによる急激な降下を防ぐ機械的落下防止装置」",
      "correctJa": "安全ロック機構",
      "distractorsJa": [
        "ジャッキアーム伸長",
        "タイヤ接地確認",
        "輪止め設置"
      ],
      "explanation": {
        "ja": "リフトの安全ロック（機械的爪）は、リフト上昇後に爪を確実に噛み合わせることで油圧抜けによる落下事故を確実に防ぎます。",
        "uz": "Xavfsizlik qulf mexanizmi — avtomobil liftda ko‘tarilgach, gidravlika ishlamay qolsa ham mashina tushib ketmasligini ta'minlovchi mexanik qulf.",
        "en": "Safety lock mechanism is the mechanical locking ratchet preventing a vehicle lift from accidentally dropping if hydraulic pressure fails.",
        "ne": "लिफ्टमा गाडी उचालेपछि तेलको प्रेसर घटे पनि खस्न नदिने मेकानिकल लकलाई सुरक्षा लक भनिन्छ।",
        "my": "ကားမ တင်စက် (Lift) ဖြင့် ကားကို မပြီးနောက် ပြုတ်ကျမှုမဖြစ်စေရန် ထိန်းထားပေးသော စက်ပိုင်းဆိုင်ရာ လုံခြုံရေးသော့ကို Safety lock ဟုခေါ်သည်။"
      }
    },
    {
      "category": "chassis_systems",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「ブレーキ配管内に混入した空気（エア）を抜いてペダルの踏みごたえの悪化（ベーパーロック）を防ぐ専用作業」",
      "correctJa": "ブレーキエア抜き",
      "distractorsJa": [
        "オイルチェンジャー",
        "バキュームテスター",
        "フルード注入器"
      ],
      "explanation": {
        "ja": "ブレーキのエア抜き（ブリーディング）は、配管内の空気を排出して油圧伝達を正常にし、ブレーキの効きを確保する作業です。",
        "uz": "Tormoz havosini chiqarish (Air bleeding) — tormoz trubkalariga kirib qolgan havoni chiqarib, tormoz yaxshi ishlashini ta'minlash.",
        "en": "Brake bleeding is the procedure of purging trapped air bubbles from hydraulic brake lines to ensure firm pedal feel and braking force.",
        "ne": "ब्रेकको पाइपभित्र पसेको हावा निकालेर ब्रेक कसिलो बनाउने कामलाई ब्रेक एयर ब्लीडिङ भनिन्छ।",
        "my": "ဘရိတ်ပိုက်လိုင်းအတွင်း လေခိုနေခြင်းကို ထုတ်ပယ်၍ ဘရိတ်ကောင်းစွာမိစေရန် ပြုလုပ်ခြင်းကို Brake bleeding ဟုခေါ်သည်။"
      }
    },
    {
      "category": "tools_measurement",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「本尺と副尺（バーニヤ）を用いて、部品の外径、内径、深さ、段差を0.05mm単位で測定できる多機能測定器」",
      "correctJa": "ノギス",
      "distractorsJa": [
        "マイクロメーター",
        "シックネスゲージ",
        "直尺"
      ],
      "explanation": {
        "ja": "ノギス（バーニヤキャリパー）は、外側ジョウ・内側ジョウ・デプスバーを備え、1台で多様な寸法を迅速に測定できる基本工具です。",
        "uz": "Shtangentsirkul (Vernier caliper) — detallarning tashqi va ichki diametri, chuqurligini 0.05 mm aniqlikda o‘lchaydigan asbob.",
        "en": "Vernier caliper (Nogisu) is a versatile measuring instrument measuring outer diameter, inner diameter, depth, and step dimensions.",
        "ne": "सामानको बाहिरी, भित्री व्यास र गहिराइ नाप्न सकिने बहुउपयोगी नाप्ने औजारलाई नोगिस (Vernier caliper) भनिन्छ।",
        "my": "အစိတ်အပိုင်းများ၏ အပြင်အချင်း၊ အတွင်းအချင်းနှင့် အနက်ကို ၀.၀၅ မီလီမီတာအထိ တိုင်းတာနိုင်သော ကိရိယာကို Vernier caliper (Nogisu) ဟုခေါ်သည်။"
      }
    },
    {
      "category": "tools_measurement",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「精密に加工された様々な厚さの金属薄板を隙間に差し込み、バルブクリアランスやプラグギャップを測る測定器」",
      "correctJa": "シックネスゲージ",
      "distractorsJa": [
        "ピッチゲージ",
        "ラジアスゲージ",
        "ハイトゲージ"
      ],
      "explanation": {
        "ja": "シックネスゲージ（すきまゲージ）は、リーフと呼ばれる薄板を隙間に挿入し、適度な抜き差しの抵抗感で隙間寸法を測る工具です。",
        "uz": "Shchup (Thickness gauge) — klapan oralig‘i yoki svecha tirqishini o‘lchash uchun turli qalinlikdagi yupqa metall plastinkalar to‘plami.",
        "en": "Feeler gauge / Thickness gauge (Shikkunesu geji) consists of thin steel blades of calibrated thicknesses used to measure fine clearances and gaps.",
        "ne": "सानो खाली ठाउँ (ग्याप) नाप्न प्रयोग गरिने विभिन्न मोटाइका पातलो पाताहरूको औजारलाई थिकनेस गेज भनिन्छ।",
        "my": "အင်ဂျင်အဆို့ရှင်နှင့် ပလပ်ကြားရှိ သေးငယ်သော ကွာဟချက်ကို တိုင်းတာရန် အသုံးပြုသော သတ္တုပြားငယ်များကို Feeler gauge ဟုခေါ်သည်။"
      }
    },
    {
      "category": "inspection_adjustment",
      "promptJa": "次の説明に当てはまる自動車整備の専門用語はどれですか。「タイヤの溝の深さが法令基準の1.6mm以下になるとトレッド面に現れ、使用限界を知らせる摩耗限度表示」",
      "correctJa": "スリップサイン",
      "distractorsJa": [
        "プラットフォーム",
        "ロードインデックス",
        "サイドウォール"
      ],
      "explanation": {
        "ja": "スリップサインは、タイヤ溝の残りが1.6mmに達すると溝が途切れて現れる表示で、1箇所でも出ると車検に合格せず使用禁止となります。",
        "uz": "Slip sign (Sirpanish belgisi) — shina tishlari 1.6 mm dan kam qolganda paydo bo‘lib, shinani zudlik bilan almashtirish kerakligini bildiruvchi belgi.",
        "en": "Tread wear indicator / Slip sign appears on the tire tread surface when groove depth reaches the legal minimum of 1.6 mm.",
        "ne": "टायर घिसिएर १.६ मिमी भन्दा कम हुँदा देखिने चेतावनी चिन्हलाई स्लिप साइन भनिन्छ।",
        "my": "တာယာပန်းပွင့် အနက် ၁.၆ မီလီမီတာအောက် ရောက်သွားပါက ပေါ်လာသော သတိပေးအမှတ်အသားကို Tread wear indicator (Slip sign) ဟုခေါ်သည်။"
      }
    }
  ]
});

  function fail(message) {
    throw new Error(`[sector-question-generator] ${message}`);
  }

  function text(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function assertJapanese(value, context) {
    const normalized = text(value);
    if (!normalized) fail(`${context} must not be empty.`);
    if (BROKEN_GLYPH.test(normalized)) fail(`${context} contains a broken glyph.`);
    if (!JAPANESE_CHARACTER.test(normalized)) {
      fail(`${context} must contain Japanese text: "${normalized}".`);
    }
    return normalized;
  }

  function hashText(value) {
    let hash = 2166136261;
    const source = String(value);
    for (let index = 0; index < source.length; index += 1) {
      hash ^= source.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function randomFrom(seed) {
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
    const random = randomFrom(seed);
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function transformEndingPrompt(prompt) {
    const base = prompt.replace(/。$/u, "");
    if (/(?:最も適切なものはどれですか|適切なものはどれですか|適切なのはどれですか)$/u.test(base)) {
      return base.replace(/(?:最も適切なものはどれですか|適切なものはどれですか|適切なのはどれですか)$/u, "正しいものを一つ選びなさい。");
    } else if (/(?:正しいものはどれですか|正しい説明はどれですか)$/u.test(base)) {
      return base.replace(/(?:正しいものはどれですか|正しい説明はどれですか)$/u, "適切なものを一つ選びなさい。");
    } else if (/はどれですか$/u.test(base)) {
      return base.replace(/はどれですか$/u, "として、正しいものを一つ選びなさい。");
    } else if (/(?:どうしますか|何をしますか|どう直しますか)$/u.test(base)) {
      return base.replace(/(?:どうしますか|何をしますか|どう直しますか)$/u, "場合、適切な対応を一つ選びなさい。");
    } else if (/(?:何ですか|何に使いますか|何を基準にしますか)$/u.test(base)) {
      return base.replace(/(?:何ですか|何に使いますか|何を基準にしますか)$/u, "について、正しいものを一つ選びなさい。");
    } else {
      return `実務上の基準として、${prompt}`;
    }
  }

  function transformToScenarioPrompt(prompt, index) {
    const clean = prompt.replace(/^特定技能1号の業務において、/g, "").replace(/^現場の実務において、/g, "");
    const prefix = SCENARIO_PREFIXES[index % SCENARIO_PREFIXES.length];
    return `${prefix}${clean}`;
  }

  function normalizeSource(source, index, sector) {
    if (!source || typeof source !== "object" || Array.isArray(source)) {
      fail(`${sector} source ${index + 1} must be an object.`);
    }
    const id = text(source.id);
    const organization = text(source.organization);
    const title = text(source.title);
    const url = text(source.url);
    if (!id || !organization || !title || !/^https:\/\//u.test(url)) {
      fail(`${sector} source ${index + 1} requires id, organization, title, and an HTTPS URL.`);
    }
    return { id, organization, title, url };
  }

  function normalizeBlueprint(blueprint, index, data, sourceIds) {
    if (!blueprint || typeof blueprint !== "object" || Array.isArray(blueprint)) {
      fail(`${data.sector} blueprint ${index + 1} must be an object.`);
    }

    const id = text(blueprint.id);
    const category = text(blueprint.category);
    const promptJa = assertJapanese(blueprint.promptJa, `${data.sector} ${id || index + 1} promptJa`);
    const correctJa = assertJapanese(blueprint.correctJa, `${data.sector} ${id || index + 1} correctJa`);
    const distractorsJa = Array.isArray(blueprint.distractorsJa)
      ? blueprint.distractorsJa.map((item, distractorIndex) => (
        assertJapanese(item, `${data.sector} ${id || index + 1} distractor ${distractorIndex + 1}`)
      ))
      : [];
    const explanation = blueprint.explanation && typeof blueprint.explanation === "object"
      ? blueprint.explanation
      : {};
    const references = Array.isArray(blueprint.sourceIds) && blueprint.sourceIds.length
      ? blueprint.sourceIds.map(text)
      : [...sourceIds].slice(0, 1);

    if (!id || !category) fail(`${data.sector} blueprint ${index + 1} requires id and category.`);
    if (distractorsJa.length < 5) fail(`${data.sector} ${id} requires at least five distractors.`);
    if (new Set([correctJa, ...distractorsJa]).size !== distractorsJa.length + 1) {
      fail(`${data.sector} ${id} contains duplicate answer options.`);
    }
    if (!text(explanation.ja) || !text(explanation.uz) || !text(explanation.en) || !text(explanation.ne)) {
      fail(`${data.sector} ${id} requires ja, uz, en, and ne explanations.`);
    }
    if (BROKEN_GLYPH.test(Object.values(explanation).join(" "))) {
      fail(`${data.sector} ${id} explanation contains a broken glyph.`);
    }
    for (const sourceId of references) {
      if (!sourceIds.has(sourceId)) fail(`${data.sector} ${id} references unknown source "${sourceId}".`);
    }

    return {
      id,
      category,
      type: text(blueprint.type) || "knowledge",
      difficulty: text(blueprint.difficulty) || "standard",
      promptJa,
      correctJa,
      distractorsJa,
      explanation: {
        ja: text(explanation.ja),
        uz: text(explanation.uz),
        en: text(explanation.en),
        ne: text(explanation.ne),
        my: text(explanation.my) || text(explanation.en)
      },
      sourceIds: references
    };
  }

  function validateDataset(input) {
    if (!input || typeof input !== "object" || Array.isArray(input)) {
      fail("Sector data must be an object.");
    }
    const sector = text(input.sector);
    const titleJa = assertJapanese(input.titleJa, `${sector || "sector"} titleJa`);
    if (!sector) fail("Sector data requires a sector key.");
    if (!Array.isArray(input.sources) || !input.sources.length) {
      fail(`${sector} requires at least one official source.`);
    }
    const sources = input.sources.map((source, index) => normalizeSource(source, index, sector));
    const sourceIds = new Set(sources.map(source => source.id));
    if (sourceIds.size !== sources.length) fail(`${sector} source ids must be unique.`);
    if (!Array.isArray(input.blueprints) || input.blueprints.length !== REQUIRED_BLUEPRINT_COUNT) {
      fail(`${sector} requires exactly ${REQUIRED_BLUEPRINT_COUNT} blueprints; received ${input.blueprints?.length || 0}.`);
    }
    const data = { sector, titleJa, version: Number(input.version) || 1 };
    const blueprints = input.blueprints.map((blueprint, index) => (
      normalizeBlueprint(blueprint, index, data, sourceIds)
    ));
    const ids = new Set(blueprints.map(item => item.id));
    if (ids.size !== blueprints.length) fail(`${sector} blueprint ids must be unique.`);
    const promptKeys = new Set(blueprints.map(item => `${item.promptJa}\u0000${item.correctJa}`));
    if (promptKeys.size !== blueprints.length) fail(`${sector} contains duplicate prompt/answer blueprints.`);

    return Object.freeze({ ...data, sources, blueprints });
  }

  function localizedExplanation(blueprint, language) {
    const detail = text(blueprint.explanation[language] || blueprint.explanation.en);
    return language === "ja"
      ? detail
      : `${blueprint.correctJa} — ${detail}`;
  }

  function optionCountForSector(sector) {
    return OPTION_COUNTS[sector] || 4;
  }

  function generate(input, language, configuration) {
    const data = validateDataset(input);
    const lang = String(language || "").toLowerCase();
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      fail(`Unsupported language "${language}". Use ${SUPPORTED_LANGUAGES.join(", ")}.`);
    }
    const seed = Number.isInteger(configuration?.seed) ? configuration.seed : 20260816;
    const optionCount = optionCountForSector(data.sector);
    const questions = [];

    // Group 1 — 90 Core Exam Questions (sequence 1..90)
    data.blueprints.forEach((blueprint, blueprintIndex) => {
      const distractors = optionCount === 3
        ? [blueprint.distractorsJa[0], blueprint.distractorsJa[1]]
        : [blueprint.distractorsJa[0], blueprint.distractorsJa[1], blueprint.distractorsJa[2]];
      const optionSeed = hashText(`${seed}:${data.sector}:${blueprint.id}:1`);
      questions.push({
        id: `${data.sector}-mock-${blueprint.id}-v01`,
        sector: data.sector,
        blueprintId: blueprint.id,
        variant: 1,
        group: "core_90",
        subType: "core_knowledge",
        categoryId: blueprint.category,
        topic: blueprint.category,
        type: blueprint.type,
        difficulty: blueprint.difficulty,
        language: lang,
        prompt: blueprint.promptJa,
        correct: blueprint.correctJa,
        distractors,
        options: shuffled([blueprint.correctJa, ...distractors], optionSeed),
        explanation: localizedExplanation(blueprint, lang),
        sourceIds: [...blueprint.sourceIds],
        reviewStatus: "generated-practice-variant",
        sequence: blueprintIndex + 1
      });
    });

    // Group 2 — 90 Standard Application & Rule-based Questions (sequence 91..180)
    data.blueprints.forEach((blueprint, blueprintIndex) => {
      const prompt = transformEndingPrompt(blueprint.promptJa);
      const distractors = optionCount === 3
        ? [blueprint.distractorsJa[2], blueprint.distractorsJa[3]]
        : [blueprint.distractorsJa[1], blueprint.distractorsJa[3], blueprint.distractorsJa[4]];
      const optionSeed = hashText(`${seed}:${data.sector}:${blueprint.id}:2`);

      questions.push({
        id: `${data.sector}-mock-${blueprint.id}-v02`,
        sector: data.sector,
        blueprintId: blueprint.id,
        variant: 2,
        group: "applied_200",
        subType: "standard_application",
        categoryId: blueprint.category,
        topic: blueprint.category,
        type: blueprint.type,
        difficulty: blueprint.difficulty,
        language: lang,
        prompt,
        correct: blueprint.correctJa,
        distractors,
        options: shuffled([blueprint.correctJa, ...distractors], optionSeed),
        explanation: localizedExplanation(blueprint, lang),
        sourceIds: [...blueprint.sourceIds],
        reviewStatus: "generated-practice-variant",
        sequence: REQUIRED_BLUEPRINT_COUNT + blueprintIndex + 1
      });
    });

    // Group 3 — 90 Workplace Scenario Practical Judgment Questions (sequence 181..270)
    data.blueprints.forEach((blueprint, blueprintIndex) => {
      const prompt = transformToScenarioPrompt(blueprint.promptJa, blueprintIndex);
      const distractors = optionCount === 3
        ? [blueprint.distractorsJa[3], blueprint.distractorsJa[4]]
        : [blueprint.distractorsJa[2], blueprint.distractorsJa[3], blueprint.distractorsJa[4]];
      const optionSeed = hashText(`${seed}:${data.sector}:${blueprint.id}:3`);
      questions.push({
        id: `${data.sector}-mock-${blueprint.id}-v03`,
        sector: data.sector,
        blueprintId: blueprint.id,
        variant: 3,
        group: "applied_200",
        subType: "practical_scenario",
        categoryId: blueprint.category,
        topic: blueprint.category,
        type: blueprint.type,
        difficulty: blueprint.difficulty,
        language: lang,
        prompt,
        correct: blueprint.correctJa,
        distractors,
        options: shuffled([blueprint.correctJa, ...distractors], optionSeed),
        explanation: localizedExplanation(blueprint, lang),
        sourceIds: [...blueprint.sourceIds],
        reviewStatus: "generated-practice-variant",
        sequence: REQUIRED_BLUEPRINT_COUNT * 2 + blueprintIndex + 1
      });
    });

    // Group 4 — 20 Official Exam Technical Term Definition Questions (sequence 271..290)
    const sectorDefs = SECTOR_TERM_DEFINITIONS[data.sector] || [];
    if (sectorDefs.length !== TERM_DEFINITIONS_COUNT) {
      fail(`${data.sector} requires ${TERM_DEFINITIONS_COUNT} term definitions; received ${sectorDefs.length}.`);
    }
    sectorDefs.forEach((termDef, termIndex) => {
      const distractors = termDef.distractorsJa.slice(0, optionCount - 1);
      const optionSeed = hashText(`${seed}:${data.sector}:termdef:${termIndex + 1}`);
      const detail = text(termDef.explanation[lang] || termDef.explanation.en);
      const explanation = lang === "ja"
        ? detail
        : `${termDef.correctJa} — ${detail}`;
      questions.push({
        id: `${data.sector}-term-def-${String(termIndex + 1).padStart(2, "0")}`,
        sector: data.sector,
        blueprintId: `term-def-${termIndex + 1}`,
        variant: 4,
        group: "applied_200",
        subType: "term_definition",
        categoryId: termDef.category,
        topic: termDef.category,
        type: "knowledge",
        difficulty: "standard",
        language: lang,
        prompt: termDef.promptJa,
        correct: termDef.correctJa,
        distractors,
        options: shuffled([termDef.correctJa, ...distractors], optionSeed),
        explanation,
        sourceIds: [...data.sources.slice(0, 1).map(s => s.id)],
        reviewStatus: "generated-practice-variant",
        sequence: REQUIRED_BLUEPRINT_COUNT * 3 + termIndex + 1
      });
    });

    if (questions.length !== QUESTIONS_PER_SECTOR) {
      fail(`${data.sector} generated ${questions.length} questions instead of ${QUESTIONS_PER_SECTOR}.`);
    }
    if (new Set(questions.map(question => question.id)).size !== questions.length) {
      fail(`${data.sector} generated duplicate question ids.`);
    }
    if (new Set(questions.map(question => question.prompt)).size !== questions.length) {
      fail(`${data.sector} generated duplicate prompts.`);
    }
    return questions;
  }

  return Object.freeze({
    REQUIRED_BLUEPRINT_COUNT,
    TERM_DEFINITIONS_COUNT,
    QUESTIONS_PER_SECTOR,
    SUPPORTED_LANGUAGES,
    OPTION_COUNTS,
    optionCountForSector,
    validateDataset,
    generate
  });
}));
