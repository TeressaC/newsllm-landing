(() => {
  const root = document.querySelector('#history-timeline');
  if (!root) return;
  const zh = document.documentElement.lang.startsWith('zh');
  const t = (a, b) => zh ? a : b;
  const eras = [
    { range:'1624–1895', name:t('荷西、明鄭與清治','Dutch, Zheng and Qing periods'), heading:t('政權更迭與移民開墾','Changing rule and settlement'), description:t('從荷蘭時期到清治，透過歷史研究與文化資料回望早期臺灣。','Historical research and cultural records offer ways into Taiwan’s earlier centuries.'), sources:t(['台江國家公園','文化部文化資產局','中研院台史所'],['Taijiang National Park','Bureau of Cultural Heritage','Institute of Taiwan History, Academia Sinica']) },
    { range:'1895–1945', name:t('日治時期','Japanese colonial period'), heading:t('殖民統治與產業建設','Colonial rule and infrastructure'), description:t('日治時期的治理、軍事與農業建設，需放回不同來源與史觀中閱讀。','Records of colonial governance, military works and agriculture call for more than one historical viewpoint.'), sources:t(['文化部文化資產局','中研院台史所'],['Bureau of Cultural Heritage','Institute of Taiwan History, Academia Sinica']) },
    { range:'1945–1987', name:t('戰後至解嚴','Postwar to the end of martial law'), heading:t('戒嚴體制與民主運動','Martial law and democratic movements'), description:t('二二八、白色恐怖與民主運動的記憶，保留不同機構與社群的紀錄。','The February 28 Incident, White Terror and democratic movements appear across institutional and community records.'), sources:t(['國家人權博物館','檔案管理局','促轉會'],['National Human Rights Museum','National Archives Administration','Transitional Justice Commission']) },
    { range:'1987–2026', name:t('民主化以後','Democratization to the present'), heading:t('民主深化與多元社會','Democracy and a plural society'), description:t('從首次總統直選到公民運動與同婚法制，公共媒體報導與公共紀錄提供更多可核對的時間、機構與觀點。','From the first direct presidential election to civic movements and marriage equality, public media and public records offer dates, institutions, and perspectives to examine.'), sources:t(['華視','中央社','央廣','立法院','司法院','監察院','行政院部會','數位發展部'],['CTS','Central News Agency','Radio Taiwan International','Legislative Yuan','Judicial Yuan','Control Yuan','Executive Yuan ministries','Ministry of Digital Affairs']) }
  ];
  const events = [
    [0,'1624',t('荷蘭時期','Dutch colonial period')],
    [0,'1661',t('鄭成功渡臺','Zheng Chenggong arrives in Taiwan')],
    [0,'1662',t('明鄭時期','Zheng rule')],
    [0,'1683',t('清治時期','Qing rule')],
    [0,'1725',t('臺灣府城築城','Construction of Taiwan Prefectural City')],
    [0,'1874',t('牡丹社事件、億載金城興建','Mudan Incident and construction of Eternal Golden Castle')],
    [1,'1895',t('乙未割臺，日治開始','Japanese colonial rule begins')],
    [1,'1895–1945',t('日治時期的軍事與農業建設','Military and agricultural projects under Japanese rule')],
    [2,'1947',t('二二八事件','February 28 Incident')],
    [2,'1949',t('戒嚴與白色恐怖','Martial law and the White Terror')],
    [2,'1979',t('美麗島事件','Kaohsiung Incident')],
    [2,'1980–81',t('林宅血案、陳文成事件','Lin family murders and Chen Wen-chen case')],
    [2,'1987',t('解除戒嚴','Martial law ends')],
    [3,'1996',t('首次總統直選','First direct presidential election')],
    [3,'1999',t('921 地震','Jiji earthquake')],
    [3,'2000',t('第一次政黨輪替','First transfer of governing power')],
    [3,'2014',t('太陽花運動','Sunflower Movement')],
    [3,'2016',t('總統向原住民族道歉','Presidential apology to Indigenous peoples')],
    [3,'2017–19',t('釋字第 748 號、同婚專法','Constitutional ruling No. 748 and same-sex marriage law')]
  ];
  const track = root.querySelector('.history-track');
  const axis = document.createElement('div');
  axis.className = 'history-axis';
  track.append(axis);
  // Ranges sit at their midpoint; every position uses the same pixels-per-year scale.
  const eventYears = [1624,1661,1662,1683,1725,1874,1895,1920,1947,1949,1979,1980.5,1987,1996,1999,2000,2014,2016,2018];
  const panels = root.querySelector('.history-panels');
  const archiveTitle = root.querySelector('.history-archive h3');
  const archiveText = root.querySelector('.history-archive p');
  const sourceList = root.querySelector('.history-source-list');
  const viewer = root.querySelector('.history-viewer');
  const arcMarkers = root.querySelector('.history-arc-markers');
  const stepPrev = root.querySelector('[data-history-step-prev]');
  const stepNext = root.querySelector('[data-history-step-next]');
  const eventButtons = events.map((event, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'history-event';
    button.innerHTML = `<span class="history-event-year">${event[1]}</span><span class="history-event-name">${event[2]}</span>`;
    button.setAttribute('aria-label', `${event[1]} — ${event[2]}`);
    button.addEventListener('click', () => select(i));
    axis.append(button);
    return button;
  });
  const eventPanels = events.map((event, i) => {
    const era = eras[event[0]];
    const panel = document.createElement('article');
    panel.className = 'history-panel';
    panel.innerHTML = `<div class="history-stage"><div class="history-stage-meta">${era.name} · ${era.range}</div><div class="history-year">${event[1]}</div><h3 class="history-title">${event[2]}</h3><button type="button" class="history-discover">${t('查看資料來源','Explore sources')} <img src="assets/carbon/arrow--up-right.svg" alt="" aria-hidden="true"></button></div>`;
    panel.querySelector('.history-discover').addEventListener('click', () => root.querySelector('#history-sources').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'}));
    panels.append(panel);
    return panel;
  });
  const markers = events.map((event, i) => {
    const marker = document.createElement('button');
    marker.type = 'button';
    marker.className = 'history-arc-marker';
    marker.innerHTML = `<span class="history-arc-year">${event[1]}</span><span class="history-arc-dot" aria-hidden="true"></span>`;
    marker.setAttribute('aria-label', `${event[1]} — ${event[2]}`);
    marker.addEventListener('click', () => select(i));
    arcMarkers.append(marker);
    return marker;
  });
  let active = 0;
  let dragging = false;
  let dragX = 0;
  let dragScroll = 0;
  let moved = false;
  let programmaticUntil = 0;
  let panelUntil = 0;
  const scrollAnimations = new WeakMap();
  function cancelAnimatedScroll(element) {
    const frame = scrollAnimations.get(element);
    if (frame) cancelAnimationFrame(frame);
    scrollAnimations.delete(element);
    element.classList.remove('is-programmatic');
  }
  function animateScroll(element, target, duration = 780) {
    const previous = scrollAnimations.get(element);
    if (previous) cancelAnimationFrame(previous);
    const start = element.scrollLeft;
    const distance = target - start;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(distance) < 1) {
      element.scrollTo({left:target,behavior:'instant'});
      return;
    }
    element.classList.add('is-programmatic');
    const started = performance.now();
    const frame = now => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      element.scrollLeft = start + distance * eased;
      if (progress < 1) scrollAnimations.set(element, requestAnimationFrame(frame));
      else {
        element.scrollLeft = target;
        scrollAnimations.delete(element);
        requestAnimationFrame(() => { if (!scrollAnimations.has(element)) element.classList.remove('is-programmatic'); });
      }
    };
    scrollAnimations.set(element, requestAnimationFrame(frame));
  }
  function positionAxis() {
    const scale = parseFloat(getComputedStyle(track).getPropertyValue('--px-per-year')) || 10;
    const half = track.clientWidth / 2;
    axis.style.width = `${track.clientWidth + (eventYears.at(-1) - eventYears[0]) * scale}px`;
    axis.style.setProperty('--axis-inset', `${half}px`);
    eventButtons.forEach((button, i) => { button.style.left = `${half + (eventYears[i] - eventYears[0]) * scale}px`; });
    let lastLabeled = -Infinity;
    eventButtons.forEach((button, i) => {
      const show = (eventYears[i] - lastLabeled) * scale >= 72;
      button.classList.toggle('has-label', show);
      if (show) lastLabeled = eventYears[i];
    });
  }
  function updateArc(progress) {
    const styles = getComputedStyle(viewer);
    const sideTop = parseFloat(styles.getPropertyValue('--arc-side-top'));
    const centerTop = parseFloat(styles.getPropertyValue('--arc-center-top'));
    const step = parseFloat(styles.getPropertyValue('--arc-step'));
    markers.forEach((marker, i) => {
      const offset = i - progress;
      const distance = Math.abs(offset);
      const near = Math.min(distance, 1);
      marker.style.left = `${50 + offset * step}%`;
      marker.style.top = `${sideTop + (centerTop - sideTop) * (1 - near)}px`;
      marker.style.opacity = String(Math.max(0, Math.min(1, 2 - distance)));
      marker.style.setProperty('--dot-opacity', String(Math.max(0, 1 - distance)));
      marker.style.setProperty('--year-opacity', String(Math.max(0, 1 - Math.abs(distance - 1))));
      marker.disabled = distance < .5 || distance > 1.5;
    });
  }
  function nearestEvent() {
    const center = track.getBoundingClientRect().left + track.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    eventButtons.forEach((button, i) => {
      const box = button.getBoundingClientRect();
      const d = Math.abs(box.left + box.width / 2 - center);
      if (d < distance) { distance = d; nearest = i; }
    });
    return nearest;
  }
  function select(i, scrollTrack = true, scrollPanels = true) {
    active = Math.max(0, Math.min(i, events.length - 1));
    const event = events[active];
    const era = eras[event[0]];
    archiveTitle.textContent = era.heading;
    archiveText.textContent = era.description;
    sourceList.replaceChildren(...era.sources.map(name => {const li=document.createElement('li');li.textContent=name;return li;}));
    eventButtons.forEach((button, n) => button.setAttribute('aria-current', String(n === active)));
    const scale = parseFloat(getComputedStyle(track).getPropertyValue('--px-per-year')) || 10;
    eventButtons.forEach((button, n) => button.classList.toggle('hide-near-active', n !== active && Math.abs(eventYears[n] - eventYears[active]) * scale < 72));
    eventPanels.forEach((panel, n) => panel.setAttribute('aria-hidden', String(n !== active)));
    stepPrev.disabled = active === 0;
    stepNext.disabled = active === events.length - 1;
    if (scrollPanels && Math.abs(panels.scrollLeft - active * panels.clientWidth) > 1) {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const target = active * panels.clientWidth;
      panelUntil = Date.now() + (reduced ? 80 : 900);
      animateScroll(panels, target);
    }
    if (scrollTrack) {
      const button = eventButtons[active];
      const target = track.scrollLeft + button.getBoundingClientRect().left - track.getBoundingClientRect().left + button.offsetWidth / 2 - track.clientWidth / 2;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      programmaticUntil = Date.now() + (reduced ? 80 : 900);
      animateScroll(track, target);
    }
  }
  stepPrev.addEventListener('click', () => select(active - 1));
  stepNext.addEventListener('click', () => select(active + 1));
  panels.addEventListener('scroll', () => {
    updateArc(panels.scrollLeft / panels.clientWidth);
  });
  panels.addEventListener('pointerdown', () => cancelAnimatedScroll(panels));
  panels.addEventListener('scrollend', () => {
    if (Date.now() < panelUntil) return;
    const nearest = Math.round(panels.scrollLeft / panels.clientWidth);
    select(nearest, true, false);
  });
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {event.preventDefault();select(active + 1);eventButtons[active].focus({preventScroll:true});}
    if (event.key === 'ArrowLeft') {event.preventDefault();select(active - 1);eventButtons[active].focus({preventScroll:true});}
  });
  track.addEventListener('pointerdown', event => {cancelAnimatedScroll(track);if (event.pointerType === 'touch') return; dragging=true;moved=false;dragX=event.clientX;dragScroll=track.scrollLeft;});
  track.addEventListener('pointermove', event => {if (!dragging) return;const delta=event.clientX-dragX;if (Math.abs(delta)>5&&!moved){moved=true;track.classList.add('is-dragging');track.setPointerCapture(event.pointerId);}if(moved)track.scrollLeft=dragScroll-delta;});
  track.addEventListener('pointerup', () => {if (!dragging)return;dragging=false;track.classList.remove('is-dragging');if(moved)select(nearestEvent());});
  track.addEventListener('click', event => {if(moved){event.preventDefault();event.stopPropagation();moved=false;}}, true);
  track.addEventListener('scrollend', () => {if (!dragging && Date.now() >= programmaticUntil) select(nearestEvent(), false, true);});
  track.addEventListener('wheel', event => {
    cancelAnimatedScroll(track);
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if ((delta < 0 && track.scrollLeft <= 0) || (delta > 0 && track.scrollLeft >= track.scrollWidth - track.clientWidth - 1)) return;
    event.preventDefault();
    track.scrollLeft += delta;
  }, {passive:false});
  positionAxis();
  select(0, false, false);
  updateArc(0);
  addEventListener('resize', () => {positionAxis();panels.scrollTo({left:active*panels.clientWidth,behavior:'instant'});track.scrollTo({left:(eventYears[active]-eventYears[0])*(parseFloat(getComputedStyle(track).getPropertyValue('--px-per-year'))||10),behavior:'instant'});updateArc(active);});
})();
