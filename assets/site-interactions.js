const SCROLL_OFFSET_PX = 12;
const MAX_NAVIGATION_DURATION_MS = 650;
const MIN_NAVIGATION_DURATION_MS = 260;
const COUNT_ANIMATION_DURATION_MS = 1650;
const CHAPTER_IDS = ['timeline', 'perspectives', 'impact', 'numbers', 'coverage', 'chain'];

const dialog=document.querySelector('.detail-dialog');
const heading=document.querySelector('#dialog-heading');
const content=document.querySelector('#dialog-content');
let opener;
const panels=pageContent.panels;
document.querySelectorAll('[data-panel]').forEach(button=>button.addEventListener('click',()=>{
  const panel=panels[button.dataset.panel];if(!panel)return;
  opener=button;heading.textContent=panel.title;content.innerHTML=panel.body;
  document.querySelector('.navigation').classList.remove('is-open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
  
  dialog.showModal();
  const form=content.querySelector('.query-form');
  if(form)form.addEventListener('submit',event=>{event.preventDefault();const value=form.elements.query.value.trim();if(value)form.querySelector('.status-message').textContent='Question prepared: '+value;});
}));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>opener?.focus());
const relatedWork=document.querySelector('.related-work');
document.addEventListener('click',event=>{if(relatedWork?.open&&!relatedWork.contains(event.target))relatedWork.open=false;});
const menu=document.querySelector('.menu-toggle');
menu.addEventListener('click',()=>{const isOpen=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!isOpen));document.querySelector('.navigation').classList.toggle('is-open',!isOpen);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(relatedWork?.open){relatedWork.open=false;relatedWork.querySelector('summary').focus();}document.querySelector('.navigation').classList.remove('is-open');menu.setAttribute('aria-expanded','false');}});

 const sectionNav=document.querySelector('.section-nav');
 const sectionNavList=sectionNav.querySelector('.section-nav-list');

// One cancellable scroll animation drives section links and chapter jumps.
let navigationFrame=0;
function cancelNavigation(){cancelAnimationFrame(navigationFrame);navigationFrame=0;}
 function goToSection(id,instant=false){
  const section=document.getElementById(id);if(!section)return;
  cancelNavigation();
  document.querySelector('.navigation').classList.remove('is-open');menu.setAttribute('aria-expanded','false');
  const headerHeight=document.querySelector('.header').getBoundingClientRect().height;
  const chapter=id.startsWith('module-');
  const target=chapter?section:section.querySelector('.section-meta, .overline')||section;
  const offset=headerHeight+SCROLL_OFFSET_PX;
  const from=window.scrollY,to=Math.min(document.documentElement.scrollHeight-innerHeight,Math.max(0,target.getBoundingClientRect().top+from-offset));
   if(instant||reducedMotion.matches||Math.abs(to-from)<2){window.scrollTo({top:to,behavior:'instant'});return;}
  const duration=Math.min(MAX_NAVIGATION_DURATION_MS,MIN_NAVIGATION_DURATION_MS+Math.abs(to-from)*.018),start=performance.now();
  function travel(time){
    const p=Math.min(1,(time-start)/duration),ease=p*p*p*(p*(p*6-15)+10);
    window.scrollTo({top:from+(to-from)*ease,behavior:'instant'});
    if(p<1)navigationFrame=requestAnimationFrame(travel);else navigationFrame=0;
  }
  navigationFrame=requestAnimationFrame(travel);
}
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const id=link.getAttribute('href').slice(1);if(!id||link.classList.contains('skip-link')||!document.getElementById(id))return;
  event.preventDefault();goToSection(id);
}));
window.addEventListener('wheel',cancelNavigation,{passive:true});window.addEventListener('touchstart',cancelNavigation,{passive:true});
window.addEventListener('pointerdown',cancelNavigation,{passive:true});
window.addEventListener('keydown',event=>{if(['PageUp','PageDown','Home','End','ArrowUp','ArrowDown','Escape'].includes(event.key))cancelNavigation();});
 window.addEventListener('load',()=>{const id=decodeURIComponent(location.hash.slice(1));if(id&&document.getElementById(id))requestAnimationFrame(()=>goToSection(id,true));});
 window.addEventListener('hashchange',()=>{const id=decodeURIComponent(location.hash.slice(1));if(id&&document.getElementById(id))goToSection(id,true);});

function initializeWorkflowTabs() {
// Workflow steps remain navigable without screenshot assets.
function selectTab(group,value,focus=false){
  const tabs=[...group.querySelectorAll('[role="tab"]')];
  const selected=tabs.find(tab=>tab.dataset.tab===value);if(!selected)return;
  tabs.forEach(tab=>{const active=tab===selected;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
  group.querySelectorAll('[data-tab-panel]').forEach(panel=>panel.hidden=panel.dataset.tabPanel!==value);
  if(focus)selected.focus();
}
document.querySelectorAll('[data-tab-group]').forEach(group=>{
  const tabs=[...group.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>selectTab(group,tab.dataset.tab));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;
      else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+tabs.length)%tabs.length;
      else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;
      event.preventDefault();selectTab(group,tabs[next].dataset.tab,true);
    });
  });
});
}
initializeWorkflowTabs();

const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const chapterKeys=CHAPTER_IDS;
const chapterAnchors=chapterKeys.map(key=>document.getElementById('module-'+key));
const chapterCards=[...document.querySelectorAll('[data-chapter]')];
const previous=document.querySelector('[data-rail-prev]'),next=document.querySelector('[data-rail-next]');
const railCounter=document.querySelector('.rail-counter');
let moduleIndex=-1;
function reflectChapter(index){
  if(index===moduleIndex)return;moduleIndex=index;
  if(railCounter)railCounter.innerHTML=String(index+1).padStart(2,'0')+' <i>/ 06</i>';
  if(previous)previous.disabled=index===0;if(next)next.disabled=index===chapterKeys.length-1;
}
previous?.addEventListener('click',()=>goToSection('module-'+chapterKeys[Math.max(0,moduleIndex-1)]));
next?.addEventListener('click',()=>goToSection('module-'+chapterKeys[Math.min(chapterKeys.length-1,moduleIndex+1)]));
chapterCards.forEach((card,i)=>{card.style.setProperty('--chapter-offset',i*3+'px');card.style.setProperty('--chapter-index',String(i+1));});
reflectChapter(0);

function initializeTopicExplorer() {
const carbonTopicIcons={policy:'policy',politics:'group',economy:'chart--column',society:'user--multiple',technology:'network--public',environment:'earth',education:'book',health:'health-cross',international:'globe'};
const carbonIconPath=key=>'assets/carbon-thin/'+carbonTopicIcons[key]+'.svg';
document.querySelectorAll('.topic-entry').forEach(button=>{
  const oldIcon=button.querySelector('svg'),icon=document.createElement('img');
  icon.alt='';icon.setAttribute('aria-hidden','true');icon.hidden=true;
  icon.onload=()=>{icon.hidden=false;oldIcon.remove()};
  icon.onerror=()=>{icon.hidden=true;oldIcon.hidden=false};
  oldIcon.after(icon);icon.src='assets/carbon/'+carbonTopicIcons[button.dataset.topic]+'.svg';
});
const oldMainIcon=document.querySelector('.topic-main-icon'),mainIcon=document.createElement('img');
mainIcon.className='topic-main-icon';mainIcon.alt='';mainIcon.setAttribute('aria-hidden','true');mainIcon.hidden=true;
mainIcon.onload=()=>{mainIcon.hidden=false;oldMainIcon.remove()};
mainIcon.onerror=()=>{mainIcon.hidden=true;mainIcon.after(oldMainIcon);oldMainIcon.hidden=false};
oldMainIcon.after(mainIcon);mainIcon.src=carbonIconPath('policy');
const topicData=pageContent.topics;
const topicButtons=[...document.querySelectorAll('[data-topic]')],topicDisplay=document.querySelector('.topic-display');
topicButtons.forEach((button,index)=>button.addEventListener('click',()=>{
  const key=button.dataset.topic,data=topicData[key];
  topicButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  oldMainIcon.querySelector('use').setAttribute('href','#topic-'+key);oldMainIcon.hidden=false;mainIcon.hidden=true;
  mainIcon.src=carbonIconPath(key);
  document.querySelector('#topic-name').textContent=data[0];
  document.querySelector('#topic-description').textContent=data[2];document.querySelector('#topic-number').textContent=String(index+1).padStart(2,'0')+' / '+pageContent.topicSectionLabel;
  topicDisplay.classList.remove('is-changing');void topicDisplay.offsetWidth;topicDisplay.classList.add('is-changing');
}));

}
initializeTopicExplorer();

function initializeEntranceMotion() {
// Masked headline entrances are one coordinated motion rather than small fades.
document.querySelectorAll('.line-reveal>span').forEach((line,index)=>{
  const inner=document.createElement('i');inner.textContent=line.textContent;line.replaceChildren(inner);
  line.style.setProperty('--line-delay',((index%2)*110)+'ms');
});
if('IntersectionObserver' in window&&!reducedMotion.matches){
  document.body.classList.add('motion-ready');
  const entrances=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');entrances.unobserve(entry.target);}
  }),{threshold:.08,rootMargin:'0px 0px -10px 0px'});
  document.querySelectorAll('.line-reveal,.scroll-reveal').forEach(el=>entrances.observe(el));
  const counts=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target,total=Number(el.dataset.count),digits=Number(el.dataset.decimals),start=performance.now();
    function tick(time){const progress=Math.min(1,(time-start)/COUNT_ANIMATION_DURATION_MS);const eased=1-Math.pow(1-progress,3);el.textContent=(total*eased).toFixed(digits);if(progress<1)requestAnimationFrame(tick);}
    requestAnimationFrame(tick);counts.unobserve(el);
  }),{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(el=>counts.observe(el));
}
}
initializeEntranceMotion();

function initializeScrollScene() {
const waveOrigin=document.querySelector('.source-section');
const parallax=[...document.querySelectorAll('[data-parallax]')],readingLines=[...document.querySelectorAll('[data-read-line]')];
const pageHeader=document.querySelector('.header'),ambientCurrent=document.querySelector('.ambient-current');
 const sectionStops=[...document.querySelectorAll('[data-section-label]')];
 const sectionButtons=[...sectionNavList.querySelectorAll('a[href^="#"]')];
 function updateSectionNav(){
   const threshold=pageHeader.getBoundingClientRect().height+110;
   let current=0;
   sectionStops.forEach((section,index)=>{if(section.getBoundingClientRect().top<=threshold)current=index;});
   const selected=sectionStops[current];
   sectionButtons.forEach(button=>{if(button.getAttribute('href')==='#'+selected.id)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');});
 }
let sceneFrame=0,layoutDirty=true,layout=null;
const clamp=(value,low=0,high=1)=>Math.max(low,Math.min(high,value));
function measureScene(){
  const y=window.scrollY;
  const chapterTop=pageHeader.getBoundingClientRect().height+12;
  layout={
    waveStart:waveOrigin.getBoundingClientRect().top+y,
    chapters:chapterAnchors.map(anchor=>anchor.getBoundingClientRect().top+y),
    chapterHeights:chapterCards.map(card=>card.offsetHeight),chapterTop
  };
  document.querySelector('.modules-section').style.setProperty('--chapter-top',chapterTop+'px');
  layoutDirty=false;
}
function updateScene(time){
  sceneFrame=0;if(layoutDirty||!layout)measureScene();
  const y=window.scrollY,height=innerHeight;
  pageHeader.classList.toggle('is-scrolled',y>36);
   updateSectionNav();
  const currentReveal=clamp((y-layout.waveStart)/(height*.85));
  ambientCurrent.style.setProperty('--current-reveal',currentReveal.toFixed(3));
  readingLines.forEach(line=>line.classList.toggle('is-read',line.getBoundingClientRect().top<height*.78));
  if(!reducedMotion.matches){
    parallax.forEach(el=>{
      const rect=el.getBoundingClientRect(),last=Number(el.dataset.lastDrift||0),base=rect.top-last+rect.height/2;
      if(rect.bottom<-130||rect.top>height+130)return;
      const shift=clamp((height/2-base)*Number(el.dataset.parallax),-65,65);
      el.style.setProperty('--drift',shift.toFixed(2)+'px');el.dataset.lastDrift=String(shift);
    });
  }
  let active=0;
  layout.chapters.forEach((position,i)=>{if(position-y<layout.chapterTop+65)active=i;});
  reflectChapter(active);
  chapterCards.forEach((card,i)=>{
    const nextPosition=layout.chapters[i+1];
    const fold=nextPosition===undefined?0:clamp((layout.chapterTop+layout.chapterHeights[i]+22-(nextPosition-y))/(layout.chapterHeights[i]+22));
    card.style.setProperty('--chapter-scale',String(reducedMotion.matches?1:1-fold*.045));
    card.style.setProperty('--image-pressure',String(reducedMotion.matches?1:1-fold*.025));
  });

}
function scheduleScene(){if(!sceneFrame)sceneFrame=requestAnimationFrame(updateScene);}
function refreshScene(){layoutDirty=true;scheduleScene();}
window.addEventListener('scroll',scheduleScene,{passive:true});window.addEventListener('resize',refreshScene,{passive:true});
window.addEventListener('load',refreshScene,{once:true});document.fonts?.ready.then(refreshScene);
reducedMotion.addEventListener('change',()=>{parallax.forEach(el=>{el.style.removeProperty('--drift');delete el.dataset.lastDrift;});refreshScene();});
refreshScene();
}
initializeScrollScene();
