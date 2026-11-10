type Locale = 'en' | 'zh';

interface DetailPanel {
  title: string;
  body: string;
}

type TopicDetails = readonly [title: string, localTitle: string, description: string];

interface LocalizedContent {
  panels: Record<string, DetailPanel>;
  topics: Record<string, TopicDetails>;
  topicSectionLabel: string;
}

const localizedContent: Record<Locale, LocalizedContent> = {
 en:{
  panels:{
  'access-status':{title:'Registration is not open yet.',body:'<p>Account creation is unavailable on this page. You can explore the sources and access information while the live service is being connected.</p>'},
  professional:{title:'Professional access',body:'<p>Professional access is planned for projects, research questions, report editing and export. Applications are not available on this page yet.</p>'},
  sources:{title:'Connected to the original source.',body:'<p>NewsLLM brings reporting from seven Taiwanese public media sources into one research workspace.</p><p>Citation markers identify the publisher, date, and original article. Passage display depends on source access.</p>'},
  how:{title:'From reporting to research.',body:'<ol><li><strong>Sources.</strong> Explore the original reporting.</li><li><strong>Report.</strong> Read a structured answer.</li><li><strong>Evidence.</strong> Follow citation markers to available source passages and their context.</li></ol>'},
  modules:{title:'Research, with evidence in view.',body:'<p><strong>Report</strong><br>A structured answer with citations where source material is available.</p><p><strong>Evidence</strong><br>Open a citation to review its supporting passage.</p><p><strong>Sources</strong><br>Return to the original reporting.</p>'},
    privacy:{title:'Privacy, before launch.',body:'<p>The final privacy policy will be published before launch.</p><p class="dialog-note">This page contains no account or research submission form. Collection figures come from the September 2026 NewsLLM public media inventory.</p>'},
  terms:{title:'Preview terms and source use.',body:'<p>This page presents archive and product information. Account creation and research submission are unavailable here.</p><p>News articles and logos belong to their respective publishers. Search results and report citations should identify the publisher, publication date, and original link. The 6.8 million indexed-record count does not authorize public reproduction of every full article.</p><p>Excerpt display and reuse depend on each source’s rights and access terms. Open the original publisher page for the full article and follow that publisher’s terms for any reuse. Source-by-source permissions and final account terms will be published before the live service opens.</p>'}
},
  topics:{
 policy:['Policy & governance','政策與公共治理','Follow public decisions, institutions, and the reporting around them.'],
 politics:['Politics & elections','政治與選舉','Compare reported positions, electoral developments, and the questions they raise.'],
 economy:['Economy & industry','經濟與產業','Connect industry developments, economic questions, and their reported effects.'],
 society:['Society & daily life','社會與民生','Explore the reporting around people, communities, and everyday concerns.'],
 technology:['Technology & digital','科技與數位','Follow digital change through its public debates and local context.'],
 environment:['Environment & energy','環境與能源','Trace the connections between energy, the environment, and public decisions.'],
 education:['Education & culture','教育與文化','Read across learning, cultural life, and the stories that shape a shared context.'],
 health:['Health & public health','醫療與公共衛生','Keep health reporting, public responses, and supporting evidence together.'],
 international:['International & cross-strait','國際與兩岸','Explore international developments and cross-strait reporting in Taiwan’s context.']
},
  topicSectionLabel:'Explore by topic'
 },
 zh:{
  panels:{
  'access-status':{title:'一般會員',body:'<p>規劃可儲存素材、以唯讀方式閱讀報告，並申請進階權限。</p>'},
  professional:{title:'專業使用者',body:'<p>規劃可建立專案、提出研究問題、編輯並儲存報告版本，以及匯出研究成果。</p>'},
  sources:{title:'回到原始出處',body:'<p>NewsLLM 匯集台灣公共媒體與公共紀錄。報告引註應標示發布者、日期與原始連結；支持段落的展示依來源權利條件而定。</p>'},
  how:{title:'從報導到研究',body:'<ol><li>探索原始報導</li><li>閱讀研究報告</li><li>沿引註回到來源</li></ol>'},
  modules:{title:'讓證據留在視線裡',body:'<p>報告整理研究問題與各方說法；引註連結到原始發布來源。</p>'},
  privacy:{title:'隱私權',body:'<p>帳號及研究資料的使用，以服務的隱私權政策為準。</p>'},
  terms:{title:'資料引用',body:'<p>新聞文章與媒體標誌屬於各發布機構。閱讀全文及再次使用資料時，請遵守原發布媒體的規範。</p>'}
},
  topics:{
 policy:['政策與公共治理','政策與公共治理','從公共決策與制度出發，閱讀相關報導。'],
 politics:['政治與選舉','政治與選舉','對照不同政治立場與選舉發展，梳理公共討論關注的問題。'],
 economy:['經濟與產業','經濟與產業','連結產業發展與經濟議題，了解相關報導呈現的影響。'],
 society:['社會與民生','社會與民生','從人物與社區出發，閱讀貼近日常生活的相關報導。'],
 technology:['科技與數位','科技與數位','追蹤數位科技的發展，以及相關公共討論與在地脈絡。'],
 environment:['環境與能源','環境與能源','梳理能源、環境與公共決策之間的關聯。'],
 education:['教育與文化','教育與文化','連結教育與文化議題，閱讀形塑共同生活經驗的報導。'],
 health:['醫療與公共衛生','醫療與公共衛生','整理健康議題、公共應對與相關證據。'],
 international:['國際與兩岸','國際與兩岸','從台灣視角，閱讀國際情勢與兩岸相關報導。']
},
  topicSectionLabel:'議題探索'
 }
};
const pageContent: LocalizedContent = localizedContent[document.documentElement.lang.startsWith('zh') ? 'zh' : 'en'];

