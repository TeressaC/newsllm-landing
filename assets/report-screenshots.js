const isTraditionalChinese = document.documentElement.lang.startsWith('zh');
const PRODUCT_SHOT_DIRECTORY = 'assets/product-shots/';

const reportExamples = [
  { selector: '#workflow-ask .shot-placeholder', file: 'workflow-ask-answer.png', altZh: '梅花鹿農損補償問題與 NewsLLM 回答', altEn: 'A question about sika deer crop-loss compensation and the NewsLLM answer', eager: true },
  { selector: '#workflow-report .shot-placeholder', file: 'workflow-report.png', altZh: '梅花鹿野放後農損補償研究報告的標題與摘要', altEn: 'Title and summary of a report on crop-loss compensation after sika deer release' },
  { selector: '#workflow-evidence .shot-placeholder', file: 'workflow-follow.png', altZh: '依來源與時間篩選報導集合', altEn: 'Filter reporting collections by source and date' },
  { selector: '#module-timeline + .module-slide .module-shot .shot-placeholder', file: 'module-timeline.png', altZh: '梅花鹿議題的事件與報導時間線', altEn: 'A timeline of events and reporting about Formosan sika deer' },
  { selector: '#module-perspectives + .module-slide .module-shot .shot-placeholder', file: 'module-perspectives.webp', altZh: '並列梅花鹿野放議題的不同觀點與引註', altEn: 'Side-by-side perspectives and citations on sika deer release' },
  { selector: '#module-impact + .module-slide .module-shot .shot-placeholder', file: 'module-impact.webp', altZh: '農民、墾管處與地方政府對農損補償的說法', altEn: 'Reported views from farmers and agencies on crop loss compensation' },
  { selector: '#module-numbers + .module-slide .module-shot .shot-placeholder', file: 'workflow-ask.jpg', altZh: '資料庫中的媒體來源篇數與議題分布', altEn: 'Source counts and topic distribution in the archive' },
  { selector: '#module-coverage + .module-slide .module-shot .shot-placeholder', file: 'module-coverage.webp', altZh: '不同觀點與報導日期的時間分布', altEn: 'A timeline of viewpoints and reporting dates' },
  { selector: '#module-chain + .module-slide .module-shot .shot-placeholder', file: 'workflow-follow.png', altZh: '依來源與時間篩選報導集合', altEn: 'Filter reporting collections by source and date' },
  { selector: '.evidence-shot .motion-card', file: 'follow-source.png', altZh: '梅花鹿報導詳情、來源與相關報導', altEn: 'An article detail with its source and related reporting' }
];

function createReportFigure(example) {
  const figure = document.createElement('figure');
  figure.className = 'report-example';
  const image = document.createElement('img');
  image.src = PRODUCT_SHOT_DIRECTORY + example.file;
  image.alt = isTraditionalChinese ? example.altZh : example.altEn;
  image.loading = example.eager ? 'eager' : 'lazy';
  image.decoding = 'async';
  figure.append(image);
  return figure;
}

reportExamples.forEach(example => {
  document.querySelector(example.selector)?.replaceWith(createReportFigure(example));
});

const evidenceCaption = document.querySelector('.evidence-shot .image-caption');
if (evidenceCaption) {
  evidenceCaption.textContent = isTraditionalChinese
    ? '梅花鹿專題：查看報導來源與相關文章。'
    : 'A sika deer topic: inspect the source and related articles.';
}
