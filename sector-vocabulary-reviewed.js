(function expose(root) {
  'use strict';

  root.SECTOR_REVIEWED_VOCABULARY = Object.freeze({
    agriculture: [
      {
        term: '輪作', reading: 'りんさく', category: 'basics', sourceId: 'agr-crop-001',
        meaning: {
          uz: 'Almashlab ekish', ja: '同じ畑で異なる種類の作物を順番に育てること',
          en: 'Crop rotation', ne: 'बाली चक्र', my: 'သီးနှံ အလှည့်ကျ စိုက်ပျိုးခြင်း'
        },
        note: {
          uz: 'Almashlab ekish ayrim kasallik va zararkunandalar to‘planishini kamaytirishga yordam beradi.',
          ja: '作物の種類を順番に変えると、特定の病害虫が増えるのを抑えられます。',
          en: 'Changing crop families in sequence can help limit specific pests and diseases.',
          ne: 'बालीको परिवार पालैपालो लगाउँदा केही रोग र कीरा बढ्न कम हुन्छ।',
          my: 'သီးနှံမျိုးနွယ်များကို အလှည့်ကျစိုက်ခြင်းဖြင့် အချို့ရောဂါနှင့် ပိုးမွှားများကို လျှော့ချနိုင်သည်။'
        }
      },
      {
        term: '土壌のpH値', reading: 'どじょうのぴーえいちち', category: 'basics', sourceId: 'agr-crop-002',
        meaning: {
          uz: 'Tuproqning pH ko‘rsatkichi', ja: '土壌の酸性・アルカリ性を示す値',
          en: 'Soil pH value', ne: 'माटोको pH मान', my: 'မြေဆီလွှာ၏ pH တန်ဖိုး'
        },
        note: {
          uz: 'Tuproq pH qiymati o‘simlik oziqa moddalarini o‘zlashtirishiga ta’sir qiladi.',
          ja: '土壌のpHは、作物が養分を利用しやすいかどうかに関係します。',
          en: 'Soil pH affects how readily crops can use available nutrients.',
          ne: 'माटोको pH ले बालीले पोषक तत्त्व लिन सक्ने अवस्थालाई असर गर्छ।',
          my: 'မြေဆီလွှာ၏ pH သည် သီးနှံများ အာဟာရဓာတ် စုပ်ယူနိုင်မှုကို သက်ရောက်စေသည်။'
        }
      },
      {
        term: '光合成', reading: 'こうごうせい', category: 'basics', sourceId: 'agr-crop-004',
        meaning: {
          uz: 'Fotosintez', ja: '植物が光を使って養分を作る働き',
          en: 'Photosynthesis', ne: 'प्रकाश संश्लेषण', my: 'အလင်းဖြင့် အစာချက်လုပ်ခြင်း'
        },
        note: {
          uz: 'O‘simlik yorug‘lik, suv va karbonat angidriddan oziqa hosil qiladi.',
          ja: '植物は光、水、二酸化炭素を使って養分を作ります。',
          en: 'Plants use light, water, and carbon dioxide to make sugars.',
          ne: 'बिरुवाले प्रकाश, पानी र कार्बन डाइअक्साइड प्रयोग गरेर खाना बनाउँछ।',
          my: 'အပင်များသည် အလင်း၊ ရေနှင့် ကာဗွန်ဒိုင်အောက်ဆိုဒ်ကို အသုံးပြုပြီး အစာချက်လုပ်သည်။'
        }
      },
      {
        term: '元肥', reading: 'もとごえ', category: 'basics', sourceId: 'agr-crop-014',
        meaning: {
          uz: 'Ekishdan oldingi asosiy o‘g‘it', ja: '植付け前後に土へ施す肥料',
          en: 'Basal fertilizer', ne: 'बाली लगाउनुअघिको आधार मल', my: 'မစိုက်မီ အခြေခံမြေဩဇာ'
        },
        note: {
          uz: 'O‘g‘it turi va miqdorini ekin hamda tuproq ehtiyojiga qarab belgilang.',
          ja: '作物と土壌の状態に合わせて、肥料の種類と量を決めます。',
          en: 'Choose the fertilizer and rate for the crop and soil conditions.',
          ne: 'बाली र माटोको अवस्थाअनुसार मलको प्रकार र मात्रा छान्नुहोस्।',
          my: 'သီးနှံနှင့် မြေဆီလွှာအခြေအနေအလိုက် မြေဩဇာအမျိုးအစားနှင့် ပမာဏကို ရွေးပါ။'
        }
      },
      {
        term: '間引く', reading: 'まびく', category: 'growing', sourceId: 'agr-crop-005',
        meaning: {
          uz: 'Siyraklashtirmoq', ja: '育ちのよい苗を残して苗の数を減らすこと',
          en: 'To thin seedlings', ne: 'बिरुवा छाँटेर पातलो बनाउनु', my: 'ပျိုးပင်များကို ပါးအောင် ရွေးနုတ်ခြင်း'
        },
        note: {
          uz: 'Ortiqcha nihollarni olib, qolgan o‘simliklarga yetarli joy va oziqa qoldiring.',
          ja: '苗を適切な間隔にし、残した株の生育場所を確保します。',
          en: 'Remove extra seedlings so the remaining plants have enough room to grow.',
          ne: 'बाँकी बिरुवालाई बढ्न ठाउँ दिन अतिरिक्त बिरुवा हटाउनुहोस्।',
          my: 'ကျန်အပင်များ ကြီးထွားရန် နေရာရစေဖို့ ပိုနေသော ပျိုးပင်များကို ဖယ်ရှားပါ။'
        }
      },
      {
        term: '玄米', reading: 'げんまい', category: 'growing', sourceId: 'agri-text', sourcePage: 7,
        sourceUrl: 'https://asat-nca.jp/jp/images/ASAT_CF_jpn2.pdf',
        meaning: {
          uz: 'Jigarrang guruch', ja: 'もみ殻を取り除き、ぬか層を残した米',
          en: 'Brown rice', ne: 'खैरो चामल', my: 'ဆန်လုံးညို'
        },
        note: {
          uz: 'Jigarrang guruchdan kepak qatlami olib tashlansa, oq guruch hosil bo‘ladi.',
          ja: '玄米を精米すると、ぬか層が取り除かれて白米になります。',
          en: 'Polishing brown rice removes the bran layer and produces white rice.',
          ne: 'खैरो चामललाई मिलिङ गर्दा बोक्राको तह हटेर सेतो चामल बन्छ।',
          my: 'ဆန်လုံးညိုကို ဆန်ဖြူအောင် ကြိတ်ခွဲရာတွင် ဖွဲလွှာကို ဖယ်ရှားသည်။'
        }
      },
      {
        term: '精米', reading: 'せいまい', category: 'growing', sourceId: 'agri-text', sourcePage: 7,
        sourceUrl: 'https://asat-nca.jp/jp/images/ASAT_CF_jpn2.pdf',
        meaning: {
          uz: 'Guruchni oqlash', ja: '玄米からぬか層を取り除くこと',
          en: 'Rice polishing', ne: 'धान मिलिङ', my: 'ဆန်ဖြူအောင် ကြိတ်ခွဲခြင်း'
        },
        note: {
          uz: 'Guruchni oqlashda jigarrang guruchdan kepak qatlami ajratiladi.',
          ja: '精米によって玄米のぬか層を取り除き、白米にします。',
          en: 'Rice polishing removes the bran layer from brown rice to make white rice.',
          ne: 'धान मिलिङ गर्दा खैरो चामलको बोक्रा हटाएर सेतो चामल बनाइन्छ।',
          my: 'ဆန်ဖြူအောင် ကြိတ်ခွဲခြင်းဖြင့် ဆန်လုံးညိုမှ ဖွဲလွှာကို ဖယ်ရှားသည်။'
        }
      },
      {
        term: '脱穀', reading: 'だっこく', category: 'growing', sourceId: 'agri-text', sourcePage: 7,
        sourceUrl: 'https://asat-nca.jp/jp/images/ASAT_CF_jpn2.pdf',
        meaning: {
          uz: 'Donni poyadan ajratish', ja: '収穫した作物から穀粒を取り出す作業',
          en: 'Threshing', ne: 'दाना झार्ने काम', my: 'စပါးနှံမှ အစေ့ခွာခြင်း'
        },
        note: {
          uz: 'Guruch yetishtirishda o‘rimdan keyin donni boshoq yoki poyadan ajratadi.',
          ja: '稲作では、刈り取った稲から籾を取り出します。',
          en: 'In rice farming, threshing separates the grains from the harvested stalks.',
          ne: 'धान खेतीमा काटिएको बोटबाट दाना छुट्याइन्छ।',
          my: 'စပါးစိုက်ပျိုးရာတွင် ရိတ်သိမ်းထားသော ရိုးတံမှ အစေ့များကို ခွာထုတ်သည်။'
        }
      },
      {
        term: '根菜類', reading: 'こんさいるい', category: 'growing', sourceId: 'agri-text', sourcePage: 7,
        sourceUrl: 'https://asat-nca.jp/jp/images/ASAT_CF_jpn2.pdf',
        meaning: {
          uz: 'Ildizmevali ekinlar', ja: '根や地下茎を食用にする野菜の分類',
          en: 'Root vegetables', ne: 'जरा तरकारी', my: 'အမြစ်စား ဟင်းသီးဟင်းရွက်များ'
        },
        note: {
          uz: 'Sabzi va turp kabi, ildizi yoki yerosti poyasi iste’mol qilinadigan ekinlar shu turga kiradi.',
          ja: 'ニンジンやダイコンなど、根や地下茎を利用する野菜が含まれます。',
          en: 'This group includes crops such as carrots and daikon, whose roots or underground stems are eaten.',
          ne: 'गाजर र मुला जस्ता जरा वा भूमिगत डाँठ खाने बाली यस समूहमा पर्छन्।',
          my: 'မုန်လာဥနီနှင့် မုန်လာဥဖြူကဲ့သို့ အမြစ် သို့မဟုတ် မြေအောက်ပင်စည်ကို စားသုံးသော သီးနှံများ ပါဝင်သည်။'
        }
      },
      {
        term: '葉菜類', reading: 'ようさいるい', category: 'growing', sourceId: 'agri-text', sourcePage: 7,
        sourceUrl: 'https://asat-nca.jp/jp/images/ASAT_CF_jpn2.pdf',
        meaning: {
          uz: 'Bargli sabzavotlar', ja: '葉を食用にする野菜の分類',
          en: 'Leafy vegetables', ne: 'पात खाने तरकारी', my: 'အရွက်စား ဟင်းသီးဟင်းရွက်များ'
        },
        note: {
          uz: 'Karam va ismaloq kabi barglari iste’mol qilinadigan sabzavotlar shu turga kiradi.',
          ja: 'キャベツやホウレンソウなど、葉を利用する野菜が含まれます。',
          en: 'This group includes vegetables such as cabbage and spinach, whose leaves are eaten.',
          ne: 'बन्दा र पालुङ्गो जस्ता पात खाने तरकारी यस समूहमा पर्छन्।',
          my: 'ဂေါ်ဖီထုပ်နှင့် ဟင်းနုနွယ်ကဲ့သို့ အရွက်ကို စားသုံးသော ဟင်းသီးဟင်းရွက်များ ပါဝင်သည်။'
        }
      }
    ],
    automobile: [
      {
        term: 'サーモスタット', reading: 'さーもすたっと', category: 'vehicle', sourceId: 'aut-eng-003',
        meaning: {
          uz: 'Termostat', ja: '冷却水の流れを調整する部品',
          en: 'Thermostat', ne: 'थर्मोस्ट्याट', my: 'အပူချိန်ထိန်းကိရိယာ'
        },
        note: {
          uz: 'Sovitish suyuqligi haroratiga qarab dvigatelning sovitish tizimidagi oqimni boshqaradi.',
          ja: '冷却水の温度に応じて、冷却系統の流れを調整します。',
          en: 'It regulates coolant flow according to engine temperature.',
          ne: 'इन्जिनको तापक्रमअनुसार यसले शीतलकको बहाव मिलाउँछ।',
          my: 'အင်ဂျင်အပူချိန်အလိုက် အအေးခံရည် စီးဆင်းမှုကို ထိန်းညှိပေးသည်။'
        }
      },
      {
        term: 'オイルポンプ', reading: 'おいるぽんぷ', category: 'vehicle', sourceId: 'aut-eng-005',
        meaning: {
          uz: 'Moy nasosi', ja: 'エンジン内部へ潤滑油を送るポンプ',
          en: 'Oil pump', ne: 'तेल पम्प', my: 'အင်ဂျင်ဆီပန့်'
        },
        note: {
          uz: 'Dvigatel ishlaganda moyni kerakli qismlarga yetkazib, moylashga yordam beradi.',
          ja: 'エンジン各部へ潤滑油を送り、摩耗を抑えます。',
          en: 'It circulates lubricating oil to engine components.',
          ne: 'यसले इन्जिनका भागमा स्नेहक तेल पुर्‍याउँछ।',
          my: 'အင်ဂျင်အစိတ်အပိုင်းများသို့ ချောဆီကို လှည့်ပတ်ပို့ဆောင်ပေးသည်။'
        }
      },
      {
        term: 'スパークプラグ', reading: 'すぱーくぷらぐ', category: 'vehicle', sourceId: 'aut-eng-009',
        meaning: {
          uz: 'Uchqun shamchasi', ja: '火花で混合気に点火する部品',
          en: 'Spark plug', ne: 'स्पार्क प्लग', my: 'မီးပွားပလပ်'
        },
        note: {
          uz: 'Benzinli dvigatelda elektr uchquni orqali havo-yonilg‘i aralashmasini yoqadi.',
          ja: 'ガソリンエンジンで火花を発生させ、混合気に点火します。',
          en: 'It creates the spark that ignites the air-fuel mixture in a gasoline engine.',
          ne: 'पेट्रोल इन्जिनमा यसले हावा र इन्धनको मिश्रण सल्काउने झिल्का दिन्छ।',
          my: 'ဓာတ်ဆီအင်ဂျင်တွင် လေ-လောင်စာအရောကို မီးလောင်စေရန် မီးပွားထုတ်ပေးသည်။'
        }
      },
      {
        term: 'オルタネータ', reading: 'おるたねーた', category: 'vehicle', sourceId: 'aut-eng-011',
        meaning: {
          uz: 'Generator (alternator)', ja: 'エンジンの動力で発電する装置',
          en: 'Alternator', ne: 'अल्टरनेटर', my: 'အယ်လ်တာနေတာ'
        },
        note: {
          uz: 'Dvigatel ishlayotganda elektr energiyasi ishlab chiqarib, akkumulyatorni quvvatlaydi.',
          ja: 'エンジン作動中に発電し、バッテリなどへ電力を供給します。',
          en: 'It generates electricity while the engine runs and supplies the vehicle electrical system.',
          ne: 'इन्जिन चल्दा यसले बिजुली उत्पादन गरी ब्याट्री र विद्युतीय प्रणालीलाई आपूर्ति गर्छ।',
          my: 'အင်ဂျင်လည်ပတ်နေစဉ် လျှပ်စစ်ထုတ်လုပ်ပြီး ဘက်ထရီနှင့် လျှပ်စစ်စနစ်သို့ ပေးပို့သည်။'
        }
      },
      {
        term: 'ディーゼル微粒子フィルタ', reading: 'でぃーぜるびりゅうしふぃるた', category: 'vehicle', sourceId: 'aut-eng-013',
        meaning: {
          uz: 'Dizel zarrachalar filtri (DPF)', ja: '排気中のすすなどの粒子を捕集する装置',
          en: 'Diesel particulate filter (DPF)', ne: 'डिजेल कण फिल्टर (DPF)', my: 'ဒီဇယ်အမှုန်စစ်ကိရိယာ (DPF)'
        },
        note: {
          uz: 'Dizel dvigateli chiqindi gazidagi qurum zarrachalarini tutib qoladi.',
          ja: 'ディーゼル排気に含まれるすすなどを捕集します。',
          en: 'It traps soot and other particles from diesel exhaust.',
          ne: 'यसले डिजेलको धुवाँबाट कालो धुलो र अन्य कण समात्छ।',
          my: 'ဒီဇယ်အိတ်ဇောဓာတ်ငွေ့မှ ကျပ်ခိုးနှင့် အမှုန်များကို ဖမ်းယူသည်။'
        }
      },
      {
        term: 'ディファレンシャル', reading: 'でぃふぁれんしゃる', category: 'vehicle', sourceId: 'aut-cha-022',
        meaning: {
          uz: 'Differensial', ja: '左右の駆動輪へ動力を伝え、回転差を許容する装置',
          en: 'Differential', ne: 'डिफरेन्सियल', my: 'ဒစ်ဖရန်ရှယ်'
        },
        note: {
          uz: 'Burilish paytida chap va o‘ng yetakchi g‘ildiraklarning turlicha tezlikda aylanishiga imkon beradi.',
          ja: '旋回時に左右の駆動輪の回転速度の差を吸収します。',
          en: 'It allows the left and right drive wheels to rotate at different speeds when turning.',
          ne: 'घुम्दा बायाँ र दायाँ चलाउने पाङ्ग्रालाई फरक गतिमा घुम्न दिन्छ।',
          my: 'ကွေ့ရာတွင် ဘယ်ညာ မောင်းနှင်ဘီးများကို မတူညီသော အမြန်နှုန်းဖြင့် လည်ပတ်ခွင့်ပေးသည်။'
        }
      },
      {
        term: '等速ジョイント', reading: 'とうそくじょいんと', category: 'vehicle', sourceId: 'aut-cha-023',
        meaning: {
          uz: 'Teng tezlikli sharnir', ja: '角度が変わっても回転を伝える継手',
          en: 'Constant-velocity joint', ne: 'स्थिर-वेग जोइन्ट', my: 'အမြန်နှုန်းညီ အဆစ်'
        },
        note: {
          uz: 'Oldingi yetakchi g‘ildiraklar boshqarilganda ham uzatmadan kelgan aylanishni uzatadi.',
          ja: '操舵で角度が変化しても、駆動力を車輪へ伝えます。',
          en: 'It transmits drive to a wheel even as steering changes the joint angle.',
          ne: 'स्टेयरिङ गर्दा जोइन्टको कोण बदलिए पनि यसले पाङ्ग्रामा शक्ति पुर्‍याउँछ।',
          my: 'စတီယာရင်လှည့်၍ အဆစ်ထောင့်ပြောင်းသော်လည်း ဘီးသို့ မောင်းနှင်အား ပို့ပေးသည်။'
        }
      },
      {
        term: 'サスペンション', reading: 'さすぺんしょん', category: 'vehicle', sourceId: 'aut-cha-024',
        meaning: {
          uz: 'Osma tizim', ja: '車体と車輪をつなぎ、衝撃を和らげる装置',
          en: 'Suspension', ne: 'सस्पेन्सन', my: 'ဆိုင်းထိန်းစနစ်'
        },
        note: {
          uz: 'Yo‘l notekisliklaridan keladigan zarbani kamaytirib, g‘ildiraklarning yo‘l bilan aloqasini saqlaydi.',
          ja: '路面からの衝撃を和らげ、タイヤを路面に接地させます。',
          en: 'It absorbs road impacts and helps keep the tires in contact with the road.',
          ne: 'यसले सडकका धक्का कम गर्छ र टायरलाई सडकसँग सम्पर्कमा राख्न मद्दत गर्छ।',
          my: 'လမ်းမှတုန်ခါမှုများကို လျှော့ချပေးပြီး တာယာများကို လမ်းနှင့် ထိတွေ့နေစေသည်။'
        }
      },
      {
        term: 'ショックアブソーバ', reading: 'しょっくあぶそーば', category: 'vehicle', sourceId: 'aut-cha-025',
        meaning: {
          uz: 'Amortizator', ja: 'サスペンションの振動を減衰させる部品',
          en: 'Shock absorber', ne: 'शक एब्जर्बर', my: 'ရှော့ခ်စုပ်ကိရိယာ'
        },
        note: {
          uz: 'Prujina tebranishini so‘ndirib, avtomobilning barqaror harakatlanishiga yordam beradi.',
          ja: 'ばねの振動を抑え、車体の揺れを小さくします。',
          en: 'It dampens spring oscillations and reduces vehicle body movement.',
          ne: 'यसले स्प्रिङको कम्पन घटाएर गाडीको हल्लाइ कम गर्छ।',
          my: 'စပရိန်တုန်ခါမှုကို လျှော့ချပြီး ယာဉ်ကိုယ်ထည် လှုပ်ရှားမှုကို လျှော့ပေးသည်။'
        }
      },
      {
        term: '車台番号', reading: 'しゃだいばんごう', category: 'vehicle', sourceId: 'aut-ins-052',
        meaning: {
          uz: 'Shassi raqami', ja: '車両を識別するために車台へ付けられた番号',
          en: 'Chassis number', ne: 'च्यासिस नम्बर', my: 'ကိုယ်ထည်အမှတ်'
        },
        note: {
          uz: 'Ishni boshlashdan oldin avtomobil shassi raqamini topshiriq hujjatidagi ma’lumot bilan solishtiring.',
          ja: '作業前に車台番号と作業指示書の車両情報を照合します。',
          en: 'Before work, match the chassis number to the vehicle details on the work order.',
          ne: 'काम सुरु गर्नुअघि च्यासिस नम्बरलाई कार्य आदेशको सवारी विवरणसँग मिलाउनुहोस्।',
          my: 'အလုပ်မစမီ ကိုယ်ထည်အမှတ်ကို အလုပ်ညွှန်ကြားစာပါ ယာဉ်အချက်အလက်နှင့် တိုက်စစ်ပါ။'
        }
      }
    ],
    foodmanufacturing: [
      {
        term: '洗浄・消毒', reading: 'せんじょう・しょうどく', category: 'hygiene', sourceId: 'fm-fs-005',
        meaning: {
          uz: 'Yuvish va dezinfeksiya', ja: '汚れを落とし、必要に応じて微生物を減らす作業',
          en: 'Cleaning and disinfection', ne: 'धुने र कीटाणुमुक्त गर्ने काम', my: 'ဆေးကြောခြင်းနှင့် ပိုးသတ်ခြင်း'
        },
        note: {
          uz: 'Xom va tayyor mahsulot ishlarini almashtirganda jihoz hamda ish joyini belgilangan tartibda tozalang.',
          ja: '作業の切替え時は、器具や区域を手順に従って洗浄・消毒します。',
          en: 'Clean and disinfect equipment and work areas when switching tasks as required.',
          ne: 'काम बदल्दा प्रक्रियाअनुसार उपकरण र कार्यस्थल धुनुहोस् र कीटाणुमुक्त गर्नुहोस्।',
          my: 'လုပ်ငန်းပြောင်းလဲချိန်တွင် ကိရိယာနှင့် လုပ်ငန်းခွင်ကို သတ်မှတ်နည်းအတိုင်း ဆေးကြောပိုးသတ်ပါ။'
        }
      },
      {
        term: '防虫管理', reading: 'ぼうちゅうかんり', category: 'hygiene', sourceId: 'fm-fs-009',
        meaning: {
          uz: 'Hasharotlardan himoya nazorati', ja: '害虫の侵入や発生を防ぎ、状況を管理すること',
          en: 'Pest control', ne: 'कीरा नियन्त्रण', my: 'ပိုးမွှားကာကွယ်ထိန်းချုပ်မှု'
        },
        note: {
          uz: 'Zararkunanda izi topilsa, xomashyoni ajrating, qayd qiling va mas’ul xodimga xabar bering.',
          ja: '害虫の痕跡を見つけたら原料を隔離し、記録して責任者へ報告します。',
          en: 'If pest evidence is found, isolate nearby ingredients, record it, and notify the responsible person.',
          ne: 'कीराको सङ्केत भेटिएमा सामग्री अलग राख्नुहोस्, अभिलेख गर्नुहोस् र जिम्मेवार व्यक्तिलाई खबर गर्नुहोस्।',
          my: 'ပိုးမွှားလက္ခဏာတွေ့ပါက အနီးရှိကုန်ကြမ်းကို သီးခြားခွဲ၊ မှတ်တမ်းတင်ပြီး တာဝန်ရှိသူကို အကြောင်းကြားပါ။'
        }
      },
      {
        term: '水質', reading: 'すいしつ', category: 'process', sourceId: 'fm-fs-010',
        meaning: {
          uz: 'Suv sifatini tekshirish', ja: '使用する水が定めた品質基準を満たすか調べること',
          en: 'Water quality check', ne: 'पानीको गुणस्तर जाँच', my: 'ရေအရည်အသွေး စစ်ဆေးခြင်း'
        },
        note: {
          uz: 'Suv sifatini belgilangan usul va davriylikda tekshirib, natijalarni yozib boring.',
          ja: '決められた方法と頻度で水質を確認し、結果を記録します。',
          en: 'Check water quality at the specified frequency and record the results.',
          ne: 'तोकिएको विधि र समयमा पानीको गुणस्तर जाँचेर नतिजा अभिलेख गर्नुहोस्।',
          my: 'သတ်မှတ်ထားသော နည်းလမ်းနှင့် အကြိမ်ရေအတိုင်း ရေအရည်အသွေးကို စစ်ဆေးပြီး ရလဒ်မှတ်တမ်းတင်ပါ။'
        }
      },
      {
        term: '製造ロット', reading: 'せいぞうろっと', category: 'ingredients', sourceId: 'fm-fs-012',
        meaning: {
          uz: 'Ishlab chiqarish partiyasi', ja: '同じ条件で製造し、まとめて識別する製品の単位',
          en: 'Production lot', ne: 'उत्पादन लट', my: 'ထုတ်လုပ်မှုအသုတ်'
        },
        note: {
          uz: 'Partiya ma’lumotini xomashyo, ishlab chiqarish sanasi va jo‘natish qaydlari bilan bog‘lang.',
          ja: '原料、製造日、出荷先の記録を製造ロットと結び付けます。',
          en: 'Link each production lot to its ingredients, production date, and shipping records.',
          ne: 'उत्पादन लटलाई कच्चा पदार्थ, उत्पादन मिति र ढुवानी अभिलेखसँग जोड्नुहोस्।',
          my: 'ထုတ်လုပ်မှုအသုတ်ကို ကုန်ကြမ်း၊ ထုတ်လုပ်သည့်ရက်နှင့် ပို့ဆောင်မှုမှတ်တမ်းများနှင့် ချိတ်ဆက်ပါ။'
        }
      },
      {
        term: '是正措置', reading: 'ぜせいそち', category: 'process', sourceId: 'fm-hc-004',
        meaning: {
          uz: 'Tuzatish chorasi', ja: '管理基準から外れたときに問題へ対処する措置',
          en: 'Corrective action', ne: 'सुधारात्मक कदम', my: 'ပြုပြင်ဆောင်ရွက်မှု'
        },
        note: {
          uz: 'Me’yordan og‘ish aniqlansa, mahsulotni ajrating va tasdiqlangan tartib bo‘yicha choralar ko‘ring.',
          ja: '基準から外れた製品を保留し、定められた是正手順を開始します。',
          en: 'Hold affected product and follow the approved procedure when a limit is missed.',
          ne: 'मापदण्ड नाघेको उत्पादन रोक्नुहोस् र स्वीकृत सुधार प्रक्रिया अपनाउनुहोस्।',
          my: 'စံနှုန်းမမီသော ထုတ်ကုန်ကို ထိန်းသိမ်းထားပြီး အတည်ပြုထားသော ပြုပြင်ရေးလုပ်ထုံးလုပ်နည်းကို လိုက်နာပါ။'
        }
      },
      {
        term: '物理的危害要因', reading: 'ぶつりてききがいよういん', category: 'hygiene', sourceId: 'otaff-text', sourcePage: 3,
        sourceUrl: 'https://otaff1.jp/img/file/i_gakusyutext_jp.pdf',
        meaning: {
          uz: 'Jismoniy xavf omili', ja: '食品に混入してけがなどを起こす物理的な異物',
          en: 'Physical hazard', ne: 'भौतिक जोखिम', my: 'ရုပ်ပိုင်းဆိုင်ရာ အန္တရာယ်'
        },
        note: {
          uz: 'Shisha yoki metall bo‘lagi kabi jismlar mahsulotga tushmasligi uchun jarayonni nazorat qiling.',
          ja: 'ガラス片や金属片などが食品に混入しないように管理します。',
          en: 'Control the process to prevent objects such as glass or metal fragments from entering food.',
          ne: 'काँच वा धातुका टुक्रा खानामा नपसून् भनेर प्रक्रिया नियन्त्रण गर्नुहोस्।',
          my: 'ဖန်ကွဲ သို့မဟုတ် သတ္တုစများ အစားအစာထဲ မဝင်စေရန် လုပ်ငန်းစဉ်ကို ထိန်းချုပ်ပါ။'
        }
      },
      {
        term: '化学的危害要因', reading: 'かがくてききがいよういん', category: 'hygiene', sourceId: 'otaff-text', sourcePage: 3,
        sourceUrl: 'https://otaff1.jp/img/file/i_gakusyutext_jp.pdf',
        meaning: {
          uz: 'Kimyoviy xavf omili', ja: '食品に有害な影響を与える化学物質',
          en: 'Chemical hazard', ne: 'रासायनिक जोखिम', my: 'ဓာတုပစ္စည်းဆိုင်ရာ အန္တရာယ်'
        },
        note: {
          uz: 'Tozalash vositasi yoki pestitsid qoldig‘i oziq-ovqatga tushmasligini ta’minlang.',
          ja: '洗剤や農薬などの化学物質が食品に残らないようにします。',
          en: 'Prevent chemicals such as detergents or pesticide residues from contaminating food.',
          ne: 'साबुन वा कीटनाशकजस्ता रसायन खानामा नपरोस् भन्ने सुनिश्चित गर्नुहोस्।',
          my: 'ဆပ်ပြာ သို့မဟုတ် ပိုးသတ်ဆေးအကြွင်းအကျန်ကဲ့သို့ ဓာတုပစ္စည်းများ အစားအစာထဲ မရောက်စေရန် တားဆီးပါ။'
        }
      },
      {
        term: '生物的危害要因', reading: 'せいぶつてききがいよういん', category: 'hygiene', sourceId: 'otaff-text', sourcePage: 3,
        sourceUrl: 'https://otaff1.jp/img/file/i_gakusyutext_jp.pdf',
        meaning: {
          uz: 'Biologik xavf omili', ja: '食品の安全を損なう細菌やウイルスなど',
          en: 'Biological hazard', ne: 'जैविक जोखिम', my: 'ဇီဝဆိုင်ရာ အန္တရာယ်'
        },
        note: {
          uz: 'Kasallik qo‘zg‘atuvchi mikroblar mahsulotni ifloslantirmasligi va ko‘paymasligini nazorat qiling.',
          ja: '病原微生物が食品に付着・増殖しないように管理します。',
          en: 'Control contamination and growth of microorganisms that can make food unsafe.',
          ne: 'खाना असुरक्षित बनाउने सूक्ष्मजीवको संक्रमण र वृद्धि नियन्त्रण गर्नुहोस्।',
          my: 'အစားအစာကို အန္တရာယ်ဖြစ်စေသော ပိုးမွှားများ မကူးစက်၊ မပွားစေရန် ထိန်းချုပ်ပါ။'
        }
      },
      {
        term: '一般衛生管理', reading: 'いっぱんえいせいかんり', category: 'hygiene', sourceId: 'otaff-text', sourcePage: 3,
        sourceUrl: 'https://otaff1.jp/img/file/i_gakusyutext_jp.pdf',
        meaning: {
          uz: 'Umumiy gigiyena nazorati', ja: '食品を安全に製造するため日常的に行う衛生管理',
          en: 'General hygiene management', ne: 'सामान्य स्वच्छता व्यवस्थापन', my: 'အထွေထွေ သန့်ရှင်းရေးစီမံခန့်ခွဲမှု'
        },
        note: {
          uz: 'Korxona, jihozlar, xodimlar va xomashyo gigiyenasini muntazam tekshirishni o‘z ichiga oladi.',
          ja: '施設、設備、作業者、原材料などの日常的な衛生管理を行います。',
          en: 'It covers routine hygiene controls for facilities, equipment, workers, and ingredients.',
          ne: 'यसमा भवन, उपकरण, कामदार र कच्चा पदार्थको नियमित स्वच्छता नियन्त्रण पर्छ।',
          my: 'စက်ရုံ၊ ကိရိယာ၊ အလုပ်သမားနှင့် ကုန်ကြမ်းတို့၏ နေ့စဉ်သန့်ရှင်းရေး ထိန်းချုပ်မှု ပါဝင်သည်။'
        }
      },
      {
        term: '作業手順書', reading: 'さぎょうてじゅんしょ', category: 'process', sourceId: 'otaff-text', sourcePage: 4,
        sourceUrl: 'https://otaff1.jp/img/file/i_gakusyutext_jp.pdf',
        meaning: {
          uz: 'Ish tartibi yo‘riqnomasi', ja: '作業の順序や方法を定めた文書',
          en: 'Work procedure', ne: 'कार्यविधि पुस्तिका', my: 'လုပ်ငန်းအဆင့်ဆင့် ညွှန်ကြားစာ'
        },
        note: {
          uz: 'Mahsulot sifati va ish xavfsizligini saqlash uchun belgilangan tartibga rioya qiling.',
          ja: '作業者が同じ手順で安全に作業できるよう、決められた文書を確認します。',
          en: 'Follow the documented steps so work is performed consistently and safely.',
          ne: 'कामलाई एकरूप र सुरक्षित बनाउन लिखित प्रक्रियाका चरण पालना गर्नुहोस्।',
          my: 'လုပ်ငန်းကို တစ်သမတ်တည်းနှင့် ဘေးကင်းစွာ လုပ်ဆောင်ရန် စာရွက်စာတမ်းပါ အဆင့်များကို လိုက်နာပါ။'
        }
      }
    ],
    foodservice: [
      {
        term: '菌を付けない', reading: 'きんをつけない', category: 'hygiene', sourceId: 'fs-hy-002',
        meaning: {
          uz: 'Mikroblarni yuqtirmaslik', ja: '食品へ微生物を付けないようにすること',
          en: 'Prevent contamination', ne: 'जीवाणु सर्न नदिनु', my: 'ပိုးမွှား မကူးစက်စေရန်'
        },
        note: {
          uz: 'Qo‘lni yuving va xom mahsulot uchun ishlatilgan jihozni tayyor taomga aralashtirmang.',
          ja: '手洗いを行い、生の食材に使った器具を調理済み食品に使わないようにします。',
          en: 'Wash hands and keep utensils used for raw ingredients separate from cooked food.',
          ne: 'हात धुनुहोस् र काँचो सामग्रीका औजार पकाएको खानाबाट अलग राख्नुहोस्।',
          my: 'လက်ဆေးပြီး အသားစိမ်းအတွက်သုံးသော ကိရိယာကို ချက်ပြီးအစားအစာနှင့် မရောသုံးပါနှင့်။'
        }
      },
      {
        term: '増やさない', reading: 'ふやさない', category: 'hygiene', sourceId: 'fs-hy-002',
        meaning: {
          uz: 'Mikroblarning ko‘payishiga yo‘l qo‘ymaslik', ja: '微生物が増えやすい状態を避けること',
          en: 'Prevent microbial growth', ne: 'जीवाणु बढ्न नदिनु', my: 'ပိုးမွှားများ မပွားစေရန်'
        },
        note: {
          uz: 'Oziq-ovqatni belgilangan haroratda saqlab, xona haroratida uzoq qoldirmang.',
          ja: '食品は決められた温度で保管し、室温に長く置かないようにします。',
          en: 'Keep food at the specified temperature and avoid leaving it at room temperature.',
          ne: 'खाना तोकिएको तापक्रममा राख्नुहोस् र कोठाको तापक्रममा लामो समय नछोड्नुहोस्।',
          my: 'အစားအစာကို သတ်မှတ်အပူချိန်တွင်ထားပြီး အခန်းအပူချိန်၌ ကြာရှည်မထားပါနှင့်။'
        }
      },
      {
        term: '低温保管', reading: 'ていおんほかん', category: 'hygiene', sourceId: 'fs-pr-030',
        meaning: {
          uz: 'Past haroratda saqlash', ja: '食品を決められた低い温度で保管すること',
          en: 'Cold storage', ne: 'कम तापक्रममा भण्डारण', my: 'အပူချိန်နိမ့်တွင် သိုလှောင်ခြင်း'
        },
        note: {
          uz: 'Sovuqda saqlash talabi va harorat qaydlarini korxona belgilagan tartibda tekshiring.',
          ja: '保管温度を確認し、施設の手順に従って記録します。',
          en: 'Check storage temperatures and record them according to the facility procedure.',
          ne: 'भण्डारण तापक्रम जाँचेर संस्थाको प्रक्रियाअनुसार अभिलेख गर्नुहोस्।',
          my: 'သိုလှောင်အပူချိန်ကို စစ်ဆေးပြီး လုပ်ငန်း၏ လုပ်ထုံးလုပ်နည်းအတိုင်း မှတ်တမ်းတင်ပါ။'
        }
      },
      {
        term: '受入れを保留', reading: 'うけいれをほりゅう', category: 'service', sourceId: 'fs-hy-007',
        meaning: {
          uz: 'Qabulni vaqtincha to‘xtatish', ja: '基準を確認できるまで納品物の受入れを止めること',
          en: 'Hold a delivery pending inspection', ne: 'जाँच नभएसम्म आपूर्ति रोक्नु', my: 'စစ်ဆေးပြီးသည်အထိ ပစ္စည်းလက်ခံမှုကို ဆိုင်းငံ့ခြင်း'
        },
        note: {
          uz: 'Mahsulot harorati yoki holati me’yorga mos kelmasa, o‘lchovni qayd etib mas’ulga xabar bering.',
          ja: '納品物が基準外なら受入れを保留し、測定結果を記録して責任者へ報告します。',
          en: 'If a delivery fails a standard, hold it, record measurements, and notify the supervisor.',
          ne: 'आपूर्ति मापदण्डअनुसार नभए रोक्नुहोस्, मापन अभिलेख गर्नुहोस् र जिम्मेवार व्यक्तिलाई खबर गर्नुहोस्।',
          my: 'ပစ္စည်းသည် စံနှုန်းမမီပါက လက်ခံမှုရပ်ဆိုင်း၊ တိုင်းတာချက်မှတ်တမ်းတင်ပြီး ကြီးကြပ်သူကို အကြောင်းကြားပါ။'
        }
      },
      {
        term: '中心まで十分に加熱', reading: 'ちゅうしんまでじゅうぶんにかねつ', category: 'service', sourceId: 'fs-pr-029',
        meaning: {
          uz: 'Mahsulot markazigacha yetarlicha qizdirish', ja: '食品の中心部まで必要な加熱を行うこと',
          en: 'Heat thoroughly through the center', ne: 'खानाको बीचसम्म राम्ररी तताउनु', my: 'အစားအစာအလယ်အထိ လုံလောက်စွာ အပူပေးခြင်း'
        },
        note: {
          uz: 'Pishganini tashqi ko‘rinish bilangina emas, belgilangan mezon bo‘yicha tekshiring.',
          ja: '外観だけで判断せず、定められた基準で加熱状態を確認します。',
          en: 'Verify heating against the specified standard rather than judging by appearance alone.',
          ne: 'रूप हेरेर मात्र निर्णय नगरी तोकिएको मापदण्डअनुसार तताइ जाँच्नुहोस्।',
          my: 'အသွင်အပြင်ကိုသာ မကြည့်ဘဲ သတ်မှတ်စံနှုန်းအတိုင်း အပူပေးမှုကို စစ်ဆေးပါ။'
        }
      },
      {
        term: '顧客満足', reading: 'こきゃくまんぞく', category: 'service', sourceId: 'jfnet-texts', sourcePage: 6,
        sourceUrl: 'https://www.jfnet.or.jp/wp/wp-content/uploads/2025/09/230808jf_customer_service_text_ja_v1.1.pdf',
        meaning: {
          uz: 'Mijoz qoniqishi', ja: '提供された商品やサービスにお客様が満足している状態',
          en: 'Customer satisfaction', ne: 'ग्राहक सन्तुष्टि', my: 'ဖောက်သည်စိတ်ကျေနပ်မှု'
        },
        note: {
          uz: 'Xizmatni mijoz kutgan darajaga moslashtirish uchun fikr-mulohazalarni hisobga oling.',
          ja: 'お客様の期待や利用後の感想を踏まえて、サービスを改善します。',
          en: 'Use guest expectations and feedback to improve the service.',
          ne: 'ग्राहकको अपेक्षा र प्रतिक्रिया विचार गरेर सेवा सुधार गर्नुहोस्।',
          my: 'ဧည့်သည်၏ မျှော်လင့်ချက်နှင့် တုံ့ပြန်ချက်များကို အခြေခံ၍ ဝန်ဆောင်မှုကို တိုးတက်စေပါ။'
        }
      },
      {
        term: 'リピーター', reading: 'りぴーたー', category: 'service', sourceId: 'jfnet-texts', sourcePage: 6,
        sourceUrl: 'https://www.jfnet.or.jp/wp/wp-content/uploads/2025/09/230808jf_customer_service_text_ja_v1.1.pdf',
        meaning: {
          uz: 'Doimiy mijoz', ja: '同じ店を繰り返し利用するお客様',
          en: 'Repeat customer', ne: 'बारम्बार आउने ग्राहक', my: 'ထပ်ခါထပ်ခါ လာရောက်သည့် ဖောက်သည်'
        },
        note: {
          uz: 'Mamnun mijoz yana kelishi mumkin; xodimlar takroriy tashrifga olib keladigan xizmatni ko‘rsatsin.',
          ja: '満足したお客様に再び利用してもらえるよう、安定した接客を心がけます。',
          en: 'Provide consistent service that encourages satisfied customers to return.',
          ne: 'सन्तुष्ट ग्राहक फेरि आउन प्रोत्साहित हुने गरी निरन्तर राम्रो सेवा दिनुहोस्।',
          my: 'ကျေနပ်သော ဖောက်သည်များ ပြန်လာစေရန် တစ်သမတ်တည်း ကောင်းမွန်သော ဝန်ဆောင်မှုပေးပါ။'
        }
      },
      {
        term: '食中毒予防3原則', reading: 'しょくちゅうどくよぼうさんげんそく', category: 'hygiene', sourceId: 'jfnet-texts', sourcePage: 3,
        sourceUrl: 'https://www.jfnet.or.jp/wp/wp-content/uploads/2025/09/jf_hygiene_controls_text_ja_v1.2.pdf',
        meaning: {
          uz: 'Ovqatdan zaharlanishning oldini olish 3 qoidasi', ja: '食中毒予防の「つけない・ふやさない・やっつける」',
          en: 'Three rules for preventing food poisoning', ne: 'खाद्य विषाक्तता रोक्ने तीन नियम', my: 'အစာအဆိပ်သင့်ခြင်း ကာကွယ်ရေး စည်းမျဉ်းသုံးခု'
        },
        note: {
          uz: 'Mikroblarni ovqatga yuqtirmang, ko‘payishiga yo‘l qo‘ymang va pishirish orqali yo‘q qiling.',
          ja: '食品に付けず、増やさず、加熱などでやっつけることが基本です。',
          en: 'Keep germs off food, prevent them from multiplying, and destroy them through proper cooking.',
          ne: 'जीवाणु खानामा नलाग्ने, नबढ्ने र उचित पकाइबाट नष्ट हुने व्यवस्था गर्नुहोस्।',
          my: 'ပိုးမွှားများ အစားအစာထဲ မဝင်စေရန်၊ မပွားစေရန်နှင့် သင့်လျော်စွာချက်ပြုတ်၍ ဖယ်ရှားရန် အခြေခံထားပါ။'
        }
      },
      {
        term: '交差汚染', reading: 'こうさおせん', category: 'hygiene', sourceId: 'jfnet-texts', sourcePage: 3,
        sourceUrl: 'https://www.jfnet.or.jp/wp/wp-content/uploads/2025/09/jf_hygiene_controls_text_ja_v1.2.pdf',
        meaning: {
          uz: 'O‘zaro ifloslanish', ja: '食品や器具を介して汚染が別のものへ移ること',
          en: 'Cross-contamination', ne: 'एकअर्कामा दूषण सर्नु', my: 'အပြန်အလှန် ညစ်ညမ်းကူးစက်မှု'
        },
        note: {
          uz: 'Xom go‘sht va tayyor ovqat uchun alohida jihoz ishlatib, ish joylarini ajrating.',
          ja: '生の食材と加熱済み食品の器具や作業場所を分けて防止します。',
          en: 'Separate tools and work areas for raw ingredients and cooked food.',
          ne: 'काँचो सामग्री र पकाएको खानाका औजार तथा काम गर्ने ठाउँ अलग राख्नुहोस्।',
          my: 'အသားစိမ်းနှင့် ချက်ပြီးအစားအစာအတွက် ကိရိယာနှင့် လုပ်ငန်းနေရာများကို ခွဲထားပါ။'
        }
      },
      {
        term: '二次汚染', reading: 'にじおせん', category: 'hygiene', sourceId: 'jfnet-texts', sourcePage: 3,
        sourceUrl: 'https://www.jfnet.or.jp/wp/wp-content/uploads/2025/09/jf_hygiene_controls_text_ja_v1.2.pdf',
        meaning: {
          uz: 'Ikkilamchi ifloslanish', ja: '汚染された手や器具などから食品へ汚れが移ること',
          en: 'Secondary contamination', ne: 'दोस्रो चरणको दूषण', my: 'ဒုတိယအဆင့် ညစ်ညမ်းမှု'
        },
        note: {
          uz: 'Qo‘l, taxta yoki pichoq orqali zararli mikroblar boshqa mahsulotga o‘tishini oldini oling.',
          ja: '手指や器具から別の食品へ汚染が広がらないようにします。',
          en: 'Prevent harmful microbes from spreading to other food via hands or utensils.',
          ne: 'हात वा औजारबाट हानिकारक जीवाणु अर्को खानामा फैलिन नदिनुहोस्।',
          my: 'လက် သို့မဟုတ် ကိရိယာမှတစ်ဆင့် အန္တရာယ်ရှိပိုးမွှားများ အခြားအစားအစာသို့ မကူးစေရန် တားဆီးပါ။'
        }
      }
    ],
    lodging: [
      {
        term: '宿泊日', reading: 'しゅくはくび', category: 'reservations', sourceId: 'lod-001',
        meaning: {
          uz: 'Turar joyda qolish sanasi', ja: 'お客様が施設に宿泊する日',
          en: 'Stay date', ne: 'बसाइको मिति', my: 'တည်းခိုမည့်ရက်'
        },
        note: {
          uz: 'Bronni tekshirishda kelish va ketish sanalarini aniqlashtiring.',
          ja: '予約確認では、到着日と出発日を正確に確認します。',
          en: 'Confirm the arrival and departure dates when checking a reservation.',
          ne: 'बुकिङ जाँच्दा आगमन र प्रस्थान मिति स्पष्ट गर्नुहोस्।',
          my: 'ဘွတ်ကင်စစ်ဆေးရာတွင် ရောက်ရှိမည့်ရက်နှင့် ထွက်ခွာမည့်ရက်ကို အတည်ပြုပါ။'
        }
      },
      {
        term: '部屋タイプ', reading: 'へやたいぷ', category: 'lodgingTypes', sourceId: 'lod-001',
        meaning: {
          uz: 'Xona turi', ja: 'ベッド数や広さなどで分けた客室の種類',
          en: 'Room type', ne: 'कोठाको प्रकार', my: 'အခန်းအမျိုးအစား'
        },
        note: {
          uz: 'Mehmon istagan xona turi mavjudligini bron sanasi bilan birga tekshiring.',
          ja: '希望する客室の種類と、予約日の空室状況を確認します。',
          en: 'Check availability for the requested room type on the stay dates.',
          ne: 'बसाइ मितिमा चाहिएको कोठाको प्रकार उपलब्ध छ कि छैन जाँच्नुहोस्।',
          my: 'တည်းခိုမည့်ရက်တွင် တောင်းဆိုထားသော အခန်းအမျိုးအစား ရှိမရှိ စစ်ဆေးပါ။'
        }
      },
      {
        term: '予約内容', reading: 'よやくないよう', category: 'reservations', sourceId: 'lod-003',
        meaning: {
          uz: 'Bron tafsilotlari', ja: '予約者、宿泊日、人数、部屋などの予約情報',
          en: 'Reservation details', ne: 'बुकिङ विवरण', my: 'ဘွတ်ကင်အသေးစိတ်'
        },
        note: {
          uz: 'O‘zgartirish yoki bekor qilishdan oldin mehmon va bron ma’lumotlarini tasdiqlang.',
          ja: '変更や取消しの前に、お客様と予約情報を照合します。',
          en: 'Verify the guest and booking information before changing or canceling a reservation.',
          ne: 'परिवर्तन वा रद्द गर्नुअघि पाहुना र बुकिङ विवरण पुष्टि गर्नुहोस्।',
          my: 'ဘွတ်ကင်ပြင်ဆင်ခြင်း သို့မဟုတ် ပယ်ဖျက်ခြင်းမပြုမီ ဧည့်သည်နှင့် အချက်အလက်ကို အတည်ပြုပါ။'
        }
      },
      {
        term: '取消規定', reading: 'とりけしきてい', category: 'reservations', sourceId: 'lod-003',
        meaning: {
          uz: 'Bekor qilish qoidalari', ja: '予約を取り消す場合の条件や料金の決まり',
          en: 'Cancellation policy', ne: 'रद्द गर्ने नियम', my: 'ပယ်ဖျက်ခြင်းဆိုင်ရာ စည်းမျဉ်း'
        },
        note: {
          uz: 'Bronni bekor qilishda amal qiladigan shartlar va to‘lovni mehmonlarga tushuntiring.',
          ja: '取消しの条件と料金を確認し、お客様に分かりやすく説明します。',
          en: 'Explain the applicable cancellation terms and charges clearly to the guest.',
          ne: 'रद्द गर्दा लाग्ने सर्त र शुल्क पाहुनालाई स्पष्ट रूपमा बताउनुहोस्।',
          my: 'ပယ်ဖျက်ခြင်းဆိုင်ရာ စည်းကမ်းနှင့် အခကြေးငွေကို ဧည့်သည်အား ရှင်းလင်းစွာ ပြောပြပါ။'
        }
      },
      {
        term: '旅券の提示', reading: 'りょけんのていじ', category: 'reservations', sourceId: 'lod-005',
        meaning: {
          uz: 'Pasportni ko‘rsatish', ja: '旅券を担当者に見せること',
          en: 'Presenting a passport', ne: 'राहदानी देखाउनु', my: 'နိုင်ငံကူးလက်မှတ် ပြသခြင်း'
        },
        note: {
          uz: 'Xorijiy mehmonlarni ro‘yxatga olishda pasportni ko‘rib, belgilangan tartibda ma’lumotni qayd eting.',
          ja: '外国人のお客様の宿泊手続きでは、規定に従って旅券を確認・記録します。',
          en: 'For foreign guests, check and record passport details as required by the procedure.',
          ne: 'विदेशी पाहुनाको दर्ता गर्दा प्रक्रियाअनुसार राहदानी जाँचेर विवरण राख्नुहोस्।',
          my: 'နိုင်ငံခြားဧည့်သည် စာရင်းသွင်းရာတွင် လုပ်ထုံးလုပ်နည်းအတိုင်း နိုင်ငံကူးလက်မှတ်ကို စစ်ဆေးမှတ်တမ်းတင်ပါ။'
        }
      },
      {
        term: '販売手数料', reading: 'はんばいてすうりょう', category: 'sales', sourceId: 'lod-022',
        meaning: {
          uz: 'Sotuv komissiyasi', ja: '販売の仲介や取引に対して支払う手数料',
          en: 'Sales commission', ne: 'बिक्री कमिसन', my: 'အရောင်းကော်မရှင်ကြေး'
        },
        note: {
          uz: 'Xona va ovqat xizmatlari narxini belgilashda bron kanali uchun to‘lanadigan komissiyani hisobga oling.',
          ja: '宿泊プランの原価や収益を確認するとき、販売経路に応じた手数料を考慮します。',
          en: 'Account for channel fees when reviewing the cost and revenue of a lodging plan.',
          ne: 'बसाइ योजनाको लागत र आम्दानी जाँच्दा बिक्री माध्यमको कमिसन समावेश गर्नुहोस्।',
          my: 'တည်းခိုအစီအစဉ်၏ ကုန်ကျစရိတ်နှင့် ဝင်ငွေကို စစ်ဆေးရာတွင် အရောင်းလမ်းကြောင်းအလိုက် အခကြေးငွေကို ထည့်တွက်ပါ။'
        }
      },
      {
        term: '在庫配分', reading: 'ざいこはいぶん', category: 'sales', sourceId: 'lod-024',
        meaning: {
          uz: 'Mavjud o‘rinlarni taqsimlash', ja: '販売先や時期に応じて客室在庫を割り当てること',
          en: 'Inventory allocation', ne: 'उपलब्ध कोठा बाँडफाँट', my: 'အခန်းလက်ကျန် ခွဲဝေခြင်း'
        },
        note: {
          uz: 'Talab va savdo kanallarini hisobga olib, har bir kanalga ajratiladigan xonalarni rejalashtiring.',
          ja: '需要や販売先に合わせて、各販売経路へ割り当てる客室数を計画します。',
          en: 'Plan how many rooms to assign to each sales channel based on demand.',
          ne: 'मागअनुसार प्रत्येक बिक्री माध्यमलाई छुट्याउने कोठाको सङ्ख्या योजना गर्नुहोस्।',
          my: 'ဝယ်လိုအားအလိုက် အရောင်းလမ်းကြောင်းတစ်ခုစီသို့ ခွဲဝေမည့် အခန်းအရေအတွက်ကို စီစဉ်ပါ။'
        }
      },
      {
        term: '利用時間', reading: 'りようじかん', category: 'additional', sourceId: 'lod-025',
        meaning: {
          uz: 'Foydalanish vaqti', ja: '施設やサービスを利用できる時間',
          en: 'Hours of use', ne: 'प्रयोग गर्ने समय', my: 'အသုံးပြုနိုင်သည့် အချိန်'
        },
        note: {
          uz: 'Xizmatdan foydalanish vaqti va qo‘shimcha to‘lov shartlarini mehmonlarga aniq ko‘rsating.',
          ja: '施設やサービスの利用時間と追加料金の条件を正確に案内します。',
          en: 'Clearly state service hours and any conditions for extra charges.',
          ne: 'सेवा प्रयोग गर्ने समय र थप शुल्कका सर्त स्पष्ट रूपमा बताउनुहोस्।',
          my: 'ဝန်ဆောင်မှုအသုံးပြုချိန်နှင့် အပိုကြေးဆိုင်ရာ စည်းကမ်းများကို ရှင်းလင်းစွာ ဖော်ပြပါ။'
        }
      },
      {
        term: '利用目的', reading: 'りようもくてき', category: 'additional', sourceId: 'lod-027',
        meaning: {
          uz: 'Foydalanish maqsadi', ja: '施設や情報を何のために利用するかという目的',
          en: 'Purpose of use', ne: 'प्रयोगको उद्देश्य', my: 'အသုံးပြုရသည့် ရည်ရွယ်ချက်'
        },
        note: {
          uz: 'Shaxsiy ma’lumotni yig‘ishdan oldin undan nima maqsadda foydalanilishini tushuntiring.',
          ja: '個人情報を扱う前に、利用目的を説明し必要な同意を確認します。',
          en: 'Explain why personal information will be used and obtain required consent.',
          ne: 'व्यक्तिगत जानकारी प्रयोग गर्नुअघि उद्देश्य बताउनुहोस् र आवश्यक सहमति लिनुहोस्।',
          my: 'ကိုယ်ရေးအချက်အလက်ကို မသုံးမီ အသုံးပြုရမည့်ရည်ရွယ်ချက်ကို ရှင်းပြပြီး လိုအပ်သော သဘောတူညီချက်ကို ရယူပါ။'
        }
      },
      {
        term: '代替案', reading: 'だいたいあん', category: 'guestService', sourceId: 'lod-014',
        meaning: {
          uz: 'Muqobil taklif', ja: '当初の案が難しい場合に代わりとして示す案',
          en: 'Alternative option', ne: 'वैकल्पिक उपाय', my: 'အစားထိုးရွေးချယ်စရာ'
        },
        note: {
          uz: 'So‘ralgan xizmatni taqdim etib bo‘lmasa, imkoniyat va qoidaga mos boshqa yechimni taklif qiling.',
          ja: '希望どおりの対応が難しいときは、施設の手順に沿った別の方法を提案します。',
          en: 'If the requested service is unavailable, offer another option that follows facility procedures.',
          ne: 'मागेको सेवा उपलब्ध नभए संस्थाको प्रक्रियाअनुसार अर्को विकल्प दिनुहोस्।',
          my: 'တောင်းဆိုထားသော ဝန်ဆောင်မှု မရနိုင်ပါက လုပ်ငန်းစည်းမျဉ်းနှင့် ကိုက်ညီသော အခြားနည်းလမ်းကို အကြံပြုပါ။'
        }
      }
    ]
  });
}(typeof globalThis !== 'undefined' ? globalThis : this));
