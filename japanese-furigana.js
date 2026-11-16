(function () {
  'use strict';

  const KANJI = /[\u3400-\u4dbf\u4e00-\u9fff々]/;
  const ROMAJI = {
    kya:'きゃ', kyu:'きゅ', kyo:'きょ', gya:'ぎゃ', gyu:'ぎゅ', gyo:'ぎょ',
    sha:'しゃ', shu:'しゅ', sho:'しょ', ja:'じゃ', ji:'じ', ju:'じゅ', jo:'じょ',
    cha:'ちゃ', chu:'ちゅ', cho:'ちょ', nya:'にゃ', nyu:'にゅ', nyo:'にょ',
    hya:'ひゃ', hyu:'ひゅ', hyo:'ひょ', bya:'びゃ', byu:'びゅ', byo:'びょ',
    pya:'ぴゃ', pyu:'ぴゅ', pyo:'ぴょ', mya:'みゃ', myu:'みゅ', myo:'みょ',
    rya:'りゃ', ryu:'りゅ', ryo:'りょ', dya:'ぢゃ', dyu:'ぢゅ', dyo:'ぢょ',
    shi:'し', chi:'ち', tsu:'つ', dzu:'づ',
    she:'しぇ', che:'ちぇ', je:'じぇ', tsa:'つぁ', tsi:'つぃ', tse:'つぇ', tso:'つぉ',
    fa:'ふぁ', fi:'ふぃ', fe:'ふぇ', fo:'ふぉ', fya:'ふゃ', fyu:'ふゅ', fyo:'ふょ',
    ti:'てぃ', tu:'とぅ', di:'でぃ', du:'どぅ',
    wi:'うぃ', we:'うぇ', wo:'を', va:'ゔぁ', vi:'ゔぃ', vu:'ゔ', ve:'ゔぇ', vo:'ゔぉ',
    ka:'か', ki:'き', ku:'く', ke:'け', ko:'こ',
    ga:'が', gi:'ぎ', gu:'ぐ', ge:'げ', go:'ご',
    sa:'さ', si:'し', su:'す', se:'せ', so:'そ',
    za:'ざ', zi:'じ', zu:'ず', ze:'ぜ', zo:'ぞ',
    ta:'た', te:'て', to:'と', da:'だ', de:'で', do:'ど',
    na:'な', ni:'に', nu:'ぬ', ne:'ね', no:'の',
    ha:'は', hi:'ひ', fu:'ふ', he:'へ', ho:'ほ',
    ba:'ば', bi:'び', bu:'ぶ', be:'べ', bo:'ぼ',
    pa:'ぱ', pi:'ぴ', pu:'ぷ', pe:'ぺ', po:'ぽ',
    ma:'ま', mi:'み', mu:'む', me:'め', mo:'も',
    ya:'や', yu:'ゆ', yo:'よ',
    ra:'ら', ri:'り', ru:'る', re:'れ', ro:'ろ',
    wa:'わ', a:'あ', i:'い', u:'う', e:'え', o:'お'
  };

  const CATEGORY_READINGS = {
    '一般建設用語':'いっぱんけんせつようご',
    '建物の部分':'たてもののぶぶん',
    '建設資材・材料':'けんせつしざい・ざいりょう',
    '道具・工具':'どうぐ・こうぐ',
    '建設機械':'けんせつきかい',
    '職業・職種':'しょくぎょう・しょくしゅ',
    '工事の工程':'こうじのこうてい',
    '安全':'あんぜん',
    '寸法・単位':'すんぽう・たんい',
    '基礎・コンクリート工事':'きそ・コンクリートこうじ',
    '屋根工事':'やねこうじ',
    '内装仕上げ':'ないそうしあげ',
    '外構工事':'がいこうこうじ',
    '電気工事':'でんきこうじ',
    '給排水・衛生設備':'きゅうはいすい・えいせいせつび',
    '土木・道路・橋梁':'どぼく・どうろ・きょうりょう',
    '設計・図面':'せっけい・ずめん',
    '契約・書類':'けいやく・しょるい',
    '建物の種類':'たてもののしゅるい',
    '部屋の名称':'へやのめいしょう',
    '木工事':'もくこうじ',
    '溶接・金属工事':'ようせつ・きんぞくこうじ',
    '造園・ランドスケープ':'ぞうえん・ランドスケープ'
  };

  const COMMON_READINGS = {
    '次のうち':'つぎのうち',
    '分類される':'ぶんるいされる',
    '建設用語':'けんせつようご',
    // Authentic Tokutei Ginou exam prompts and stem vocabulary
    '最も':'もっとも',
    '適切':'てきせつ',
    '不適切':'ふてきせつ',
    '正しい':'ただしい',
    '正しく':'ただしく',
    '正解':'せいかい',
    '不正解':'ふせいかい',
    '誤り':'あやまり',
    '誤っている':'あやまっている',
    '誤りである':'あやまりである',
    '選びなさい':'えらびなさい',
    '選ぶ':'えらぶ',
    '選んで':'えらんで',
    '一つ':'ひとつ',
    '二つ':'ふたつ',
    '三つ':'みっつ',
    '次の説明':'つぎのせつめい',
    '次の中から':'つぎのなかから',
    '次':'つぎ',
    '説明':'せつめい',
    '当てはまる':'あてはまる',
    '専門用語':'せんもんようご',
    '用語':'ようご',
    '定義':'ていぎ',
    '基準':'きじゅん',
    '記述':'きじゅつ',
    '組み合わせ':'くみあわせ',
    '組合せ':'くみあわせ',
    '問題':'もんだい',
    '設問':'せつもん',
    '選択肢':'せんたくし',
    '理由':'りゆう',
    '原因':'げんいん',
    '対策':'たいさく',
    '対応':'たいおう',
    '処置':'しょち',
    '目的':'もくてき',
    '方法':'ほうほう',
    '手順':'てじゅん',
    '手順書':'てじゅんしょ',
    '点検表':'てんけんひょう',
    '取扱説明書':'とりあつかいせつめいしょ',
    '注意':'ちゅうい',
    '注意事項':'ちゅういじこう',
    '事項':'じこう',
    '項目':'こうもく',
    '危険':'きけん',
    '安全':'あんぜん',
    '防止':'ぼうし',
    '予防':'よぼう',
    '確認':'かくにん',
    '確認事項':'かくにんじこう',
    '点検':'てんけん',
    '整備':'せいび',
    '作業':'さぎょう',
    '作業者':'さぎょうしゃ',
    '作業場':'さぎょうじょう',
    '作業服':'さぎょうふく',
    '作業標準':'さぎょうひょうじゅん',
    '現場':'げんば',
    '判断':'はんだん',
    '実際':'じっさい',
    '業務':'ぎょうむ',
    '実務':'じつむ',
    '実務上':'じつむじょう',
    '実務作業':'じつむさぎょう',
    '作業現場':'さぎょうげんば',
    '業務手順':'ぎょうむてじゅん',
    '品質':'ひんしつ',
    '確保':'かくほ',
    '安全衛生':'あんぜんえいせい',
    '衛生':'えいせい',
    '最優先':'さいゆうせん',
    '優先':'ゆうせん',
    '標準':'ひょうじゅん',
    '効率的':'こうりつてき',
    '最初':'さいしょ',
    '最後':'さいご',
    '直ちに':'ただちに',
    '必ず':'かならず',
    '必要':'ひつよう',
    '不要':'ふよう',
    '重要':'じゅうよう',
    '使用':'しよう',
    '利用':'りよう',
    '保管':'ほかん',
    '管理':'かんり',
    '管理者':'かんりしゃ',
    '責任者':'せきにんしゃ',
    '担当者':'たんとうしゃ',
    '報告':'ほうこく',
    '連絡':'れんらく',
    '相談':'そうだん',
    '指示':'しじ',
    '従う':'したがう',
    '従って':'したがって',
    '行う':'おこなう',
    '行います':'おこないます',
    '行われ':'おこなわれ',
    '行い':'おこない',
    '行う場合':'おこなうばあい',
    '基づく':'もとづく',
    '基づいた':'もとづいた',
    '進める':'すすめる',
    '進め':'すすめ',
    '止める':'とめる',
    '止め':'とめ',
    '防ぐ':'ふせぐ',
    '防ぎます':'ふせぎます',
    '防ぎ':'ふせぎ',
    '守る':'まもる',
    '守り':'まもり',
    '分ける':'わける',
    '分け':'わけ',
    '避ける':'さける',
    '避け':'さけ',
    '置く':'おく',
    '置き':'おき',
    '保つ':'たもつ',
    '保ち':'たもち',
    '残す':'のこす',
    '残し':'のこし',
    '減らす':'へらす',
    '減らし':'へらし',
    '増やす':'ふやす',
    '増やし':'ふやし',
    '設ける':'もうける',
    '設け':'もうけ',
    '知らせる':'しらせる',
    '知らせ':'しらせ',
    '洗う':'あらう',
    '洗い':'あらい',
    '外す':'はずす',
    '外して':'はずして',
    '入れる':'いれる',
    '入れ':'いれ',
    '出す':'だす',
    '出し':'だし',
    '作る':'つくる',
    '作り':'つくり',
    '使う':'つかう',
    '使い':'つかい',
    '使います':'つかいます',
    '決める':'きめる',
    '決めた':'きめた',
    '状態':'じょうたい',
    '状況':'じょうきょう',
    '温度':'おんど',
    '湿度':'しつど',
    '時間':'じかん',
    '場合':'ばあい',
    '関係':'かんけい',
    '影響':'えいきょう',
    '効果':'こうか',
    '結果':'けっか',
    '装置':'そうち',
    '機器':'きき',
    '器具':'きぐ',
    '道具':'どうぐ',
    '工具':'こうぐ',
    '機械':'きかい',
    '材料':'ざいりょう',
    '部品':'ぶひん',
    '異常':'いじょう',
    '正常':'せいじょう',
    '清掃':'せいそう',
    '消毒':'しょうどく',
    '殺菌':'さっきん',
    '事故':'じこ',
    '災害':'さいがい',
    '救急':'きゅうきゅう',
    '応急':'おうきゅう',
    '手当':'てあて',
    '保護具':'ほごぐ',
    '保護帽':'ほごぼう',
    '安全帽':'あんぜんぼう',
    '安全靴':'あんぜんぐつ',
    '手袋':'てぶくろ',
    '合図':'あいず',
    '指差呼称':'しさこしょう',
    '整理':'せいり',
    '整頓':'せいとん',
    '清潔':'せいけつ',
    '習慣':'しゅうかん',
    '汚染':'おせん',
    '換気':'かんき',
    '空調':'くうちょう',
    '製造':'せいぞう',
    '提供':'ていきょう',
    '受入れ':'うけいれ',
    '保留':'ほりゅう',
    '記録':'きろく',
    '測定':'そくてい',
    '測定結果':'そくていけっか',
    '交換':'こうかん',
    '摩耗':'まもう',
    '燃料':'ねんりょう',
    '数量':'すうりょう',
    '人数':'にんずう',
    '食品':'しょくひん',
    '食材':'しょくざい',
    '加熱':'かねつ',
    '冷却':'れいきゃく',
    '冷蔵':'れいぞう',
    '冷凍':'れいとう',
    '解凍':'かいとう',
    '調味':'ちょうみ',
    '調理':'ちょうり',
    '盛付':'もりつけ',
    '配膳':'はいぜん',
    '下膳':'げぜん',
    '接客':'せっきゃく',
    '案内':'あんない',
    '予約':'よやく',
    '会計':'かいけい',
    '宿泊':'しゅくはく',
    '客室':'きゃくしつ',
    'お客様':'おきゃくさま',
    '料理':'りょうり',
    '場所':'ばしょ',
    '色':'いろ',
    '混ぜる':'まぜる',
    '混ざる':'まざる',
    '漏れ':'もれ',
    '漏れる':'もれる',
    '伝える':'つたえる',
    '伝え':'つたえ',
    '運ぶ':'はこぶ',
    '運び':'はこび',
    '容器':'ようき',
    '持つ':'もつ',
    '持ち':'もち',
    '変える':'かえる',
    '流す':'ながす',
    '流れ':'ながれ',
    '油':'あぶら',
    '傷':'きず',
    '作物':'さくもつ',
    '戻す':'もどす',
    '戻り':'もどり',
    '待つ':'まつ',
    '待ち':'まち',
    '聞く':'きく',
    '聞き':'きき',
    '触る':'さわる',
    '触れ':'ふれ',
    '開ける':'あける',
    '開き':'あき',
    '落とす':'おとす',
    '落ち':'おち',
    '移す':'うつす',
    '移し':'うつし',
    '本人':'ほんにん',
    '近く':'ちかく',
    '近づけ':'ちかづけ',
    '布':'ぬの',
    '厨房':'ちゅうぼう',
    '抜く':'ぬく',
    '抜き':'ぬき',
    '害虫':'がいちゅう',
    '起き':'おき',
    '起こす':'おこす',
    '新しい':'あたらしい',
    '希望':'きぼう',
    '乾燥':'かんそう',
    '変更':'へんこう',
    '書く':'かく',
    '書き':'かき',
    '疑い':'うたがい',
    '液':'えき',
    '皿':'さら',
    '情報':'じょうほう',
    '葉':'は',
    '車':'くるま',
    '始める':'はじめる',
    '始め':'はじめ',
    '拭く':'ふく',
    '拭き':'ふき',
    '調べる':'しらべる',
    '表面':'ひょうめん',
    '図面':'ずめん',
    '動く':'うごく',
    '動かし':'うごかし',
    '走る':'はしる',
    '走行':'そうこう',
    '衣服':'いふく',
    '履物':'はきもの',
    '足元':'あしもと',
    '頭上':'ずじょう',
    '高所':'こうしょ',
    '足場':'あしば',
    '墜落':'ついらく',
    '転落':'てんらく',
    '転倒':'てんとう',
    '挟まれ':'はさまれ',
    '巻き込まれ':'まきこまれ',
    '感電':'かんでん',
    '酸欠':'さんけつ',
    '熱中症':'ねっちゅうしょう',
    '水分':'すいぶん',
    '塩分':'えんぶん',
    '補給':'ほきゅう',
    '休憩':'きゅうけい',
    '氏名':'しめい',
    '連絡先':'れんらくさき',
    '事実':'じじつ',
    '周囲':'しゅうい',
    '通報':'つうほう',
    '防護':'ぼうご',
    '外側':'そとがわ',
    '内側':'うちがわ',
    '床':'ゆか',
    '何':'なに',
    '全て':'すべて',
    '手':'て',
    '他':'ほか',
    '別':'べつ',
    '人':'ひと',
    '者':'しゃ',
    '物':'もの',
    '主な':'おもな',
    '量':'りょう',
    '続ける':'つづける',
    '続け':'つづけ',
    '定めた':'さだめた',
    '定める':'さだめる',
    '専用':'せんよう',
    '対象':'たいしょう',
    '健康':'けんこう',
    '除く':'のぞく',
    '除き':'のぞき',
    '指定':'してい',
    '緊急':'きんきゅう',
    '禁止':'きんし',
    '原則':'げんそく',
    '例外':'れいがい',
    '役割':'やくわり',
    '基本':'きほん',
    ...CATEGORY_READINGS
  };

  const TERM_READING_OVERRIDES = {
    '繊維強化プラスチック防水':'せんいきょうかプラスチックぼうすい',
    '構内通信網配線':'こうないつうしんもうはいせん',
    'キャド図面':'キャドずめん'
  };

  let cachedReadingMap = null;

  function romajiToHiragana(value) {
    const source = String(value || '').toLowerCase().replace(/[-‐‑–—]/g, ' ');
    let result = '';
    let index = 0;
    while (index < source.length) {
      const rest = source.slice(index);
      const char = source[index];
      if (!/[a-z]/.test(char)) {
        result += char;
        index += 1;
        continue;
      }
      if (source.slice(index, index + 3) === 'tch') {
        result += 'っ';
        index += 1;
        continue;
      }
      if (char !== 'n' && /[bcdfghjklmpqrstvwxyz]/.test(char) && source[index + 1] === char) {
        result += 'っ';
        index += 1;
        continue;
      }
      if (char === 'n') {
        const next = source[index + 1] || '';
        if (next === "'" || next === '’') {
          result += 'ん';
          index += 2;
          continue;
        }
        if (next === 'n') {
          result += 'ん';
          index += /[aeiouy]/.test(source[index + 2] || '') ? 1 : 2;
          continue;
        }
        if (!next || /[^aeiouy]/.test(next)) {
          result += 'ん';
          index += 1;
          continue;
        }
      }
      let matched = false;
      for (const size of [3, 2, 1]) {
        const part = source.slice(index, index + size);
        if (ROMAJI[part]) {
          result += ROMAJI[part];
          index += size;
          matched = true;
          break;
        }
      }
      if (!matched) {
        result += char;
        index += 1;
      }
    }
    return result.replace(/\s+/g, ' ').trim();
  }

  function stripTrailingKana(term, reading) {
    let t = String(term || '');
    let r = String(reading || '');
    while (t.length > 0 && r.length > 0) {
      const lastT = t[t.length - 1];
      const lastR = r[r.length - 1];
      if (/[\u3040-\u309f]/.test(lastT) && lastT === lastR) {
        t = t.slice(0, -1);
        r = r.slice(0, -1);
      } else {
        break;
      }
    }
    return { term: t, reading: r };
  }

  function rubyNode(base, reading) {
    const text = String(base || '');
    if (!reading || !KANJI.test(text)) return document.createTextNode(text);
    const ruby = document.createElement('ruby');
    const rb = document.createElement('rb');
    const rt = document.createElement('rt');
    rb.textContent = text;
    rt.textContent = reading;
    ruby.append(rb, rt);
    return ruby;
  }

  function readingFor(term, romaji) {
    return TERM_READING_OVERRIDES[term] || romajiToHiragana(romaji);
  }

  function addEntry(map, rawTerm, rawReading) {
    const term = String(rawTerm || '').trim();
    const reading = String(rawReading || '').trim();
    if (!term || !reading || !KANJI.test(term)) return;
    const stripped = stripTrailingKana(term, reading);
    if (stripped.term && KANJI.test(stripped.term) && stripped.reading) {
      map.set(stripped.term, stripped.reading);
    }
    if (stripped.term === term) {
      map.set(term, reading);
    }
  }

  function readingMap() {
    if (cachedReadingMap) return cachedReadingMap;
    const map = new Map();

    for (const [term, reading] of Object.entries(COMMON_READINGS)) {
      addEntry(map, term, reading);
    }

    for (const [term, reading] of Object.entries(TERM_READING_OVERRIDES)) {
      map.set(term, reading);
    }

    if (typeof window !== 'undefined') {
      if (Array.isArray(window.CONSTRUCTION_VOCABULARY)) {
        const overrides = window.CONSTRUCTION_JAPANESE_ONLY_TERMS || {};
        window.CONSTRUCTION_VOCABULARY.forEach((entry) => {
          const reading = readingFor(entry.japanese, entry.romaji);
          if (entry.japanese && reading) addEntry(map, entry.japanese, reading);
          const replacement = overrides[entry.japanese];
          if (replacement && reading) addEntry(map, replacement, readingFor(replacement, entry.romaji));
        });
      }

      const standardVocabs = [
        window.AGRICULTURE_VOCABULARY_1000,
        window.AUTOMOBILE_VOCABULARY_1000,
        window.FOODMANUFACTURING_VOCABULARY_1000,
        window.FOODSERVICE_VOCABULARY_1000,
        window.LODGING_VOCABULARY_1000
      ];

      standardVocabs.forEach((list) => {
        if (Array.isArray(list)) {
          list.forEach((entry) => {
            if (entry && entry.term && entry.reading) {
              addEntry(map, entry.term, entry.reading);
            }
          });
        }
      });
    }

    cachedReadingMap = map;
    return cachedReadingMap;
  }

  function clearCache() {
    cachedReadingMap = null;
  }

  function setText(element, value, explicitReading) {
    const text = String(value || '');
    element.replaceChildren();
    if (explicitReading) {
      element.append(rubyNode(text, explicitReading));
      return;
    }
    const map = readingMap();
    const keys = [...map.keys()].filter((key) => text.includes(key)).sort((a, b) => b.length - a.length);
    if (!keys.length) {
      element.textContent = text;
      return;
    }
    let position = 0;
    while (position < text.length) {
      const match = keys.find((key) => text.startsWith(key, position));
      if (match) {
        element.append(rubyNode(match, map.get(match)));
        position += match.length;
      } else {
        const next = keys.reduce((nearest, key) => {
          const found = text.indexOf(key, position + 1);
          return found >= 0 && (nearest < 0 || found < nearest) ? found : nearest;
        }, -1);
        const end = next < 0 ? text.length : next;
        element.append(document.createTextNode(text.slice(position, end)));
        position = end;
      }
    }
  }

  window.JapaneseFurigana = Object.freeze({
    romajiToHiragana,
    readingFor,
    rubyNode,
    setText,
    stripTrailingKana,
    readingMap,
    clearCache,
    categoryReadings: Object.freeze(CATEGORY_READINGS)
  });
})();
