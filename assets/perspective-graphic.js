/**
 * Perspective & Sovereignty Graphic Interactivity
 * Supporting bilingual Chinese & English
 */
(function() {
  const isZh = document.documentElement.lang.startsWith('zh');

  // Grounding insights for Three Dimensions (Slide 22)
  const dimensionInsights = {
    // 01 民主
    law: {
      tagZh: '01 民主 · 法律',
      tagEn: '01 Democracy · Law',
      zh: '<strong>法律與釋憲裁判：</strong>收錄司法院裁判書、憲法法庭判決與全國法規資料庫，提供法律推論與正當程序的大前提。',
      en: '<strong>Judicial Records & Statutes:</strong> Indexed from Judicial Yuan rulings, Constitutional Court judgments, and statutory databases to ground legal reasoning in verifiable due process.'
    },
    politics: {
      tagZh: '01 民主 · 政治',
      tagEn: '01 Democracy · Politics',
      zh: '<strong>立法院公報與議事錄：</strong>收錄國會議事公報、黨團協商與法案審查歷程，保留不同政黨政策立場的原文記錄。',
      en: '<strong>Legislative Gazettes:</strong> Parliamentary transcripts, committee discussions, and bill reviews preserving verbatim stances from across the political spectrum.'
    },
    government: {
      tagZh: '01 民主 · 政府',
      tagEn: '01 Democracy · Government',
      zh: '<strong>中央施政與行政紀錄：</strong>總統府與行政院公報、部會施政白皮書及開放資料，呈現公共決策與行政沿革。',
      en: '<strong>Executive Records & Gazettes:</strong> Presidential Office and Executive Yuan gazettes, policy white papers, and open government data documenting administrative decisions.'
    },
    military: {
      tagZh: '01 民主 · 軍事',
      tagEn: '01 Democracy · Defense',
      zh: '<strong>國防歷史與安全戰略：</strong>國防部公開出版品、軍史檔案與區域安全分析，呈現台灣海防與防衛韌性脈絡。',
      en: '<strong>Defense History & Security:</strong> Public military archives, official historical records, and strategic security analyses tracing Taiwan’s defense posture.'
    },
    diplomacy: {
      tagZh: '01 民主 · 外交',
      tagEn: '01 Democracy · Diplomacy',
      zh: '<strong>外交條約與國際合作：</strong>外交部雙邊合作協定、國際公報與涉外歷史文獻，記錄台灣在國際社會的實質連結。',
      en: '<strong>Treaties & Foreign Relations:</strong> Bilateral agreements, international gazettes, and diplomatic records documenting Taiwan’s substantive global engagement.'
    },

    // 02 文化
    literature: {
      tagZh: '02 文化 · 文學',
      tagEn: '02 Culture · Literature',
      zh: '<strong>台灣文學作家與書寫：</strong>台灣文學館典藏作家文本、詩歌與小說，呈現跨世代對土地、離散與認同的心靈描繪。',
      en: '<strong>Taiwan Literature:</strong> Archives from the National Museum of Taiwan Literature, capturing generational reflections on identity, diaspora, and homeland.'
    },
    art: {
      tagZh: '02 文化 · 藝術',
      tagEn: '02 Culture · Art',
      zh: '<strong>視覺藝術與當代典藏：</strong>國立台灣美術館、台北市立美術館典藏詮釋與評析，保存台灣美術現代化與當代創作視野。',
      en: '<strong>Visual Arts:</strong> Collections from the National Taiwan Museum of Fine Arts and TFAM, chronicling the modernization and contemporary vision of Taiwanese fine art.'
    },
    history: {
      tagZh: '02 文化 · 歷史',
      tagEn: '02 Culture · History',
      zh: '<strong>中研院史料與地方志：</strong>中央研究院臺灣史研究所檔案、荷西/清治/日治官文書與民間契約，構成厚實的時間縱深。',
      en: '<strong>Historical Archives:</strong> Academia Sinica Institute of Taiwan History records, land deeds, and colonial documents providing four centuries of temporal depth.'
    },
    music: {
      tagZh: '02 文化 · 音樂',
      tagEn: '02 Culture · Music',
      zh: '<strong>傳藝戲曲與常民歌謠：</strong>傳統藝術中心音像資料、南北管、歌仔戲及原住民族古調，記錄口傳與唱腔中的文化密碼。',
      en: '<strong>Traditional Music & Opera:</strong> Center for Traditional Arts sound recordings, Taiwanese opera, Beiguan, and Indigenous chants carrying oral tradition.'
    },
    religion: {
      tagZh: '02 文化 · 宗教',
      tagEn: '02 Culture · Religion',
      zh: '<strong>民俗信仰與歲時祭儀：</strong>媽祖遶境、王爺醮典、原住民族豐年祭與多元信仰研究，映照台灣社會的凝聚力與信仰寬容。',
      en: '<strong>Faith & Rituals:</strong> Mazu pilgrimages, Wangye boat ceremonies, Indigenous harvest festivals, and studies reflecting religious pluralism and community cohesion.'
    },
    language: {
      tagZh: '02 文化 · 語言',
      tagEn: '02 Culture · Language',
      zh: '<strong>多元母語與語料庫：</strong>16 族原住民族語新聞、公視台語台、客家電視台語料及辭典，守護全球商用大模型忽視的少數語言。',
      en: '<strong>Multilingual Corpora:</strong> 16 Indigenous language corpora, Taiwanese Hokkien, and Hakka news corpora and dictionaries preserving linguistic diversity neglected by global LLMs.'
    },

    // 03 經濟
    livelihood: {
      tagZh: '03 經濟 · 民生',
      tagEn: '03 Economy · Livelihood',
      zh: '<strong>農漁物價與產地生活：</strong>農業部試驗研究、漁業署 27 年新聞檔案與產銷物價紀錄，呈現最真實的餐桌與土地連結。',
      en: '<strong>Agriculture & Fisheries:</strong> Ministry of Agriculture research, 27 years of Fisheries Agency records, and market price series reflecting daily livelihood.'
    },
    daily: {
      tagZh: '03 經濟 · 日常',
      tagEn: '03 Economy · Daily Life',
      zh: '<strong>公共媒體即時報導：</strong>中央社、公視等 30 年累積的 682 萬篇公媒新聞，記錄台灣常民社會的日常變遷與集體記憶。',
      en: '<strong>Public Media Journalism:</strong> 6.82 million articles from CNA, PTS, and five other public outlets recording daily life and public sentiment across 30 years.'
    },
    industry: {
      tagZh: '03 經濟 · 產業',
      tagEn: '03 Economy · Industry',
      zh: '<strong>半導體與關鍵供應鏈：</strong>工研院技術報告、竹科發展歷程與中小企業經貿檔案，勾勒台灣在全球高科技產業的關鍵樞紐。',
      en: '<strong>Semiconductors & Supply Chains:</strong> ITRI reports, Hsinchu Science Park archives, and trade documents detailing Taiwan’s critical hub in global manufacturing.'
    },
    food: {
      tagZh: '03 經濟 · 美食',
      tagEn: '03 Economy · Food',
      zh: '<strong>風土小吃與飲食文化：</strong>在地夜市研究、產地食材考證與台菜歷史脈絡，記錄台灣多元融合的常民滋味。',
      en: '<strong>Culinary Culture:</strong> Night market studies, local terroir documentation, and Taiwanese culinary history capturing the fusion of local tastes.'
    },
    technology: {
      tagZh: '03 經濟 · 科技',
      tagEn: '03 Economy · Technology',
      zh: '<strong>數位治理與開源生態：</strong>數位發展部開放資料、g0v 公民科技專案與開源技術社群文獻，展現台灣開放協作的數位主權實踐。',
      en: '<strong>Digital Governance:</strong> Open data initiatives, g0v civic tech records, and open-source contributions highlighting collaborative digital sovereignty.'
    }
  };

  function initGraphic() {
    // 1. Tab switching
    const tabBtns = document.querySelectorAll('.sov-tab-btn');
    const panels = document.querySelectorAll('.sov-view-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.getAttribute('data-target-view');
        tabBtns.forEach(b => {
          const isActive = b === btn;
          b.classList.toggle('is-active', isActive);
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        panels.forEach(p => {
          const isActive = p.getAttribute('data-view') === targetView;
          p.classList.toggle('is-active', isActive);
        });
      });
    });

    // 2. Interactive node selection in Three Dimensions
    const nodeItems = document.querySelectorAll('.sov-node-item');
    const insightTag = document.querySelector('#dimension-insight-tag');
    const insightBody = document.querySelector('#dimension-insight-body');

    nodeItems.forEach(item => {
      const key = item.getAttribute('data-node-key');
      if (!key || !dimensionInsights[key]) return;

      const activateNode = () => {
        nodeItems.forEach(n => n.classList.remove('is-active'));
        item.classList.add('is-active');

        const data = dimensionInsights[key];
        if (insightTag) {
          insightTag.textContent = isZh ? data.tagZh : data.tagEn;
        }
        if (insightBody) {
          insightBody.innerHTML = isZh ? data.zh : data.en;
        }
      };

      item.addEventListener('mouseenter', activateNode);
      item.addEventListener('focus', activateNode);
      item.addEventListener('click', activateNode);
    });

    // 3. Interactive cross-hover in Four Layers Graphic
    const arcLayers = document.querySelectorAll('.arc-layer');
    const diamondPins = document.querySelectorAll('.gold-diamond-pin');
    const guideLines = document.querySelectorAll('.gold-guide-line');
    const cards = document.querySelectorAll('.hierarchy-card');

    function highlightLayer(level) {
      arcLayers.forEach(arc => {
        arc.classList.toggle('is-highlighted', arc.getAttribute('data-level') === String(level));
      });
      diamondPins.forEach(pin => {
        pin.classList.toggle('is-highlighted', pin.getAttribute('data-level') === String(level));
      });
      guideLines.forEach(line => {
        line.style.strokeWidth = line.getAttribute('data-level') === String(level) ? '2.5' : '1.5';
      });
      cards.forEach(card => {
        card.classList.toggle('is-active', card.getAttribute('data-level') === String(level));
      });
    }

    function clearHighlight() {
      arcLayers.forEach(arc => arc.classList.remove('is-highlighted'));
      diamondPins.forEach(pin => pin.classList.remove('is-highlighted'));
      guideLines.forEach(line => line.style.strokeWidth = '1.5');
      cards.forEach(card => card.classList.remove('is-active'));
    }

    cards.forEach(card => {
      const level = card.getAttribute('data-level');
      card.addEventListener('mouseenter', () => highlightLayer(level));
      card.addEventListener('mouseleave', clearHighlight);
    });

    arcLayers.forEach(arc => {
      const level = arc.getAttribute('data-level');
      arc.addEventListener('mouseenter', () => highlightLayer(level));
      arc.addEventListener('mouseleave', clearHighlight);
    });

    diamondPins.forEach(pin => {
      const level = pin.getAttribute('data-level');
      pin.addEventListener('mouseenter', () => highlightLayer(level));
      pin.addEventListener('mouseleave', clearHighlight);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGraphic);
  } else {
    initGraphic();
  }
})();
