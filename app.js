/* ============================================================
   Review — Frame.io-style review, minimalist build (no backend)
   Metadata in localStorage; media blobs in IndexedDB.
   ============================================================ */
'use strict';

const I = {
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z"/></svg>',
  pause:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>',
  reply:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17l-5-5 5-5"/><path d="M4 12h11a5 5 0 0 1 5 5v1"/></svg>',
  fprev:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 5 8 12l10 7zM6 5h2v14H6z"/></svg>',
  fnext:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5l10 7L6 19zM16 5h2v14h-2z"/></svg>',
  loop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  fs:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>',
  draw:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/></svg>',
  range:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4H5v16h3M16 4h3v16h-3"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 16-5-5L5 20"/></svg>',
  video:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/></svg>',
  compare:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><rect x="3" y="6" width="6" height="12" rx="1"/><rect x="15" y="6" width="6" height="12" rx="1"/></svg>',
  smile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke-linecap="round"/><path d="M9 9h.01M15 9h.01" stroke-linecap="round"/></svg>',
  up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 9l5-5 5 5"/><path d="M12 4v12"/></svg>',
  vol:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>',
  mute:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>',
};

const TEAM = ['You','Ridhii','Manohar','Suraj','Deepika','Vidhi'];
const EMOJIS = ['👍','❤️','✅','👀','🎉'];
const AVC = ['#4F46E5','#16A34A','#0EA5E9','#D97706','#DB2777','#7C3AED'];
function av(name,cls){ name=name||'?'; let h=0; for(const c of name) h=(h*31+c.charCodeAt(0))>>>0; const col=AVC[h%AVC.length];
  return `<span class="avatar ${cls||''}" style="background:${col}" title="${esc(name)}">${name.slice(0,name==='You'?2:1).toUpperCase()}</span>`; }

const STATUS = { 'In review':'st-review', 'Changes requested':'st-changes', 'Approved':'st-approved' };

/* ---------- storage ---------- */
const LS='review-studio'; let DB=null; const mem=new Map();
function openDB(){ return new Promise(r=>{ try{ const q=indexedDB.open('review-media',1); q.onupgradeneeded=()=>q.result.createObjectStore('m'); q.onsuccess=()=>{DB=q.result;r(1);}; q.onerror=()=>{DB=null;r(0);}; }catch(e){r(0);} }); }
function idbPut(k,b){ return new Promise(r=>{ if(!DB){mem.set(k,b);return r(1);} try{const t=DB.transaction('m','readwrite');t.objectStore('m').put(b,k);t.oncomplete=()=>r(1);t.onerror=()=>{mem.set(k,b);r(1);};}catch(e){mem.set(k,b);r(1);} }); }
function idbGet(k){ return new Promise(r=>{ if(mem.has(k))return r(mem.get(k)); if(!DB)return r(null); try{const t=DB.transaction('m','readonly').objectStore('m').get(k);t.onsuccess=()=>r(t.result||null);t.onerror=()=>r(null);}catch(e){r(null);} }); }
function idbDel(k){ mem.delete(k); if(DB){try{DB.transaction('m','readwrite').objectStore('m').delete(k);}catch(e){}} }

let state = { assets:[], currentUser:'You' };
function save(){ try{ localStorage.setItem(LS,JSON.stringify(state)); }catch(e){} }
function load(){ try{ const r=localStorage.getItem(LS); if(r){state=JSON.parse(r);return 1;} }catch(e){} return 0; }

/* ---------- helpers ---------- */
let _i=0; function uid(p){ _i++; return (p||'id')+Date.now().toString(36)+_i; }
function $(s,r){ return (r||document).querySelector(s); }
function $all(s,r){ return Array.from((r||document).querySelectorAll(s)); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function mmss(t){ t=Math.max(0,Math.floor(t||0)); return Math.floor(t/60)+':'+String(t%60).padStart(2,'0'); }
function smpte(t,fps){ fps=fps||30; t=Math.max(0,t||0); const h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=Math.floor(t%60),f=Math.floor((t%1)*fps); const p=n=>String(n).padStart(2,'0'); return `${p(h)}:${p(m)}:${p(s)}:${p(f)}`; }
function me(){ return state.currentUser; }
function asset(id){ return state.assets.find(a=>a.id===id); }
function activeVer(a){ return (a.versions||[]).find(v=>v.id===a.activeVersionId)||a.versions[a.versions.length-1]; }
function open(v){ return v&&v.comments?v.comments.filter(c=>!c.resolved).length:0; }
function hasMedia(v){ return !!(v&&(v.dataURL||v.blobKey)); }
function timeAgo(ts){ const s=Math.floor((Date.now()-ts)/1000); if(s<60)return'now'; const m=Math.floor(s/60); if(m<60)return m+'m'; const h=Math.floor(m/60); if(h<24)return h+'h'; return Math.floor(h/24)+'d'; }

/* ---------- seed ---------- */
function gimg(a,b,label){ const c=document.createElement('canvas');c.width=640;c.height=400;const g=c.getContext('2d');
  const gr=g.createLinearGradient(0,0,640,400);gr.addColorStop(0,a);gr.addColorStop(1,b);g.fillStyle=gr;g.fillRect(0,0,640,400);
  g.fillStyle='rgba(255,255,255,.92)';g.font='600 32px Inter,sans-serif';g.fillText(label||'',34,372);return c.toDataURL('image/jpeg',.82); }
function ver(label,kind){ return {id:uid('v'),label,kind:kind||null,dataURL:null,blobKey:null,duration:null,comments:[]}; }
function cmt(author,body,o){ o=o||{}; return {id:uid('c'),author,body,t:o.t??null,inOut:o.inOut||null,point:o.point||null,drawing:o.drawing||null,reactions:o.reactions||{},resolved:!!o.resolved,mentions:o.mentions||[],replies:o.replies||[],createdAt:Date.now()-(o.ago||0)}; }

function seed(){
  const a1v = ver('V1','video');
  a1v.comments = [
    cmt('Ridhii','Wordmark looks stretched — keep the aspect ratio here.',{t:2,ago:9e6,reactions:{'👍':['Manohar']}}),
    cmt('Manohar','Logo colour should be the navy, not black. @Ridhii does this match the deck?',{t:4,mentions:['Ridhii'],ago:6e6,replies:[{id:uid('r'),author:'Ridhii',body:'Yes, navy please.',createdAt:Date.now()-3e6}]}),
  ];
  const a2v = ver('V1','image'); a2v.dataURL=gimg('#b8451f','#7a1d10','Diwali Hero');
  a2v.comments=[ cmt('Deepika','Discount badge is hard to read — add a dark plate behind it.',{point:{x:66,y:38},ago:2e6}),
    cmt('Suraj','Cropping the diya in a touch — see sketch.',{point:{x:30,y:60},ago:1e6,drawing:[[{x:.18,y:.5},{x:.3,y:.4},{x:.42,y:.55},{x:.5,y:.45}]]}) ];
  const a3v = ver('V1','image'); a3v.dataURL=gimg('#0C3A6B','#0a2547','Logo Lockup');
  a3v.comments=[ cmt('Deepika','Clean. Approved.',{resolved:true,ago:2e7,reactions:{'✅':['Suraj','Vidhi']}}) ];

  state.assets=[
    {id:uid('a'),title:'Brand Film',status:'In review',versions:[a1v],activeVersionId:a1v.id,createdAt:Date.now()},
    {id:uid('a'),title:'Diwali Hero',status:'Changes requested',versions:[a2v],activeVersionId:a2v.id,createdAt:Date.now()-1e6},
    {id:uid('a'),title:'Logo Lockup',status:'Approved',versions:[a3v],activeVersionId:a3v.id,createdAt:Date.now()-2e6},
  ];
  save();
}

/* ---------- boot / route ---------- */
let cur=null;
(async function(){ await openDB(); if(!load()||!state.assets||!state.assets.length) seed();
  if(!TEAM.includes(state.currentUser)) state.currentUser='You';
  wire(); renderUser(); route(); window.addEventListener('hashchange',route); })();

function route(){ const m=(location.hash||'').match(/^#\/a\/([^/?]+)/);
  if(m&&asset(decodeURIComponent(m[1]))){ const q=new URLSearchParams((location.hash.split('?')[1]||'')); openReview(decodeURIComponent(m[1]),{v:q.get('v'),t:q.get('t')?+q.get('t'):null,c:q.get('c')}); }
  else showLibrary(); }

function wire(){
  $('#backBtn').innerHTML=I.back; $('#backBtn').onclick=()=>{location.hash='';};
  $('#newBtn').innerHTML=I.plus+'New review'; $('#newBtn').onclick=newReview;
  $('#exportBtn').innerHTML=I.download;
  $('#shareBtn').innerHTML=I.link+'Share'; $('#requestBtn').textContent='Request changes'; $('#approveBtn').innerHTML=I.check+'Approve';
  $('#compareBtn').innerHTML=I.compare+'Compare';
  $('#addVersionLabel span').innerHTML=I.plus+'New version';
  $('#playBtn').innerHTML=I.play; $('#frameBack').innerHTML=I.fprev; $('#frameFwd').innerHTML=I.fnext; $('#loopBtn').innerHTML=I.loop; $('#fsBtn').innerHTML=I.fs; $('#muteBtn').innerHTML=I.vol;
  $('#drawToggle').innerHTML=I.draw+'Draw'; $('#pinToggle').innerHTML=I.pin+'Pin'; $('#rangeToggle').innerHTML=I.range+'Range';
  $('#userBtn').onclick=(e)=>{e.stopPropagation(); const m=$('#userMenu'); m.hidden=!m.hidden; if(!m.hidden) renderUserMenu();};
  document.addEventListener('click',()=>{$('#userMenu').hidden=true;});
  $('#userMenu').onclick=e=>e.stopPropagation();
  document.addEventListener('keydown',onKey);
}
function renderUser(){ $('#userBtn').innerHTML=av(me()); }
function renderUserMenu(){ const m=$('#userMenu');
  m.innerHTML=`<div class="menu-head">Comment as (demo)</div>`+TEAM.map(n=>`<div class="menu-row ${n===me()?'active':''}" data-u="${esc(n)}">${av(n,'avatar-sm')}<span>${esc(n)}</span></div>`).join('');
  $all('.menu-row',m).forEach(r=>r.onclick=()=>{state.currentUser=r.dataset.u;save();renderUser();m.hidden=true;if(!$('#reviewView').hidden)openReview(cur.assetId,{v:cur.versionId});else renderLibrary();}); }

/* ---------- library ---------- */
function showLibrary(){ $('#reviewView').hidden=true; $('#libraryView').hidden=false; $('#backBtn').hidden=true; $('#crumb').textContent='';
  $('#reviewActions').hidden=true; $('#presence').hidden=true; $('#newBtn').hidden=false;
  if(cur&&cur.mediaURL){try{URL.revokeObjectURL(cur.mediaURL);}catch(e){}} cur=null; renderLibrary(); }
function renderLibrary(){
  $('#libSub').textContent=`${state.assets.length} items · signed in as ${me()}`;
  const g=$('#libGrid'), empty=$('#libEmpty');
  empty.hidden=true; g.hidden=false;
  let html=`<div class="lib-card new" id="newCard">${I.up}<span>New review</span></div>`;
  html+=state.assets.map(a=>{ const v=activeVer(a),n=open(v);
    const media = hasMedia(v)?(v.dataURL?`<img alt="" src="${v.dataURL}">`:(v.thumb?`<img alt="" src="${v.thumb}">`:`<span class="ph">${a.versions.some(x=>x.kind==='video')?I.video:I.image}</span>`))
      :`<span class="ph">${v&&v.kind==='video'?I.video:I.image}</span>`;
    return `<div class="lib-card" data-id="${a.id}"><div class="lc-media">${media}
      ${(v&&v.kind==='video'&&hasMedia(v))?`<span class="lc-play">${I.play}</span>`:''}
      <span class="lc-badge">${esc(a.status)}</span></div>
      <div class="lc-body"><div class="lc-title">${esc(a.title)}</div>
      <div class="lc-meta"><span>${a.versions.length} ${a.versions.length>1?'versions':'version'}</span>
      <span class="lc-open ${n?'':'zero'}">${n?n+' open':'0 open'}</span></div></div></div>`;
  }).join('');
  g.innerHTML=html;
  $('#newCard').onclick=newReview;
  $all('.lib-card[data-id]',g).forEach(c=>c.onclick=()=>{location.hash='#/a/'+encodeURIComponent(c.dataset.id);});
}
function newReview(){
  const card=modal('New review',`<div class="field"><label>Title</label><input id="nrTitle" placeholder="e.g. Brand Film"></div>
    <p class="muted">You'll upload the image or video on the next screen.</p>`,
    `<button class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary" id="nrGo">Create</button>`);
  $('#nrTitle',card).focus();
  $('#nrGo',card).onclick=()=>{ const t=$('#nrTitle',card).value.trim()||'Untitled review'; const v=ver('V1',null);
    const a={id:uid('a'),title:t,status:'In review',versions:[v],activeVersionId:v.id,createdAt:Date.now()};
    state.assets.unshift(a); save(); closeModal(); location.hash='#/a/'+encodeURIComponent(a.id); };
}

/* ---------- review ---------- */
async function openReview(id,deep){ const a=asset(id); if(!a){location.hash='';return;} deep=deep||{};
  $('#libraryView').hidden=true; $('#reviewView').hidden=false; $('#backBtn').hidden=false; $('#newBtn').hidden=true;
  $('#reviewActions').hidden=false; $('#presence').hidden=false; $('#crumb').textContent=a.title;
  const v=(deep.v&&a.versions.find(x=>x.id===deep.v))||activeVer(a); a.activeVersionId=v.id;
  if(cur&&cur.mediaURL){try{URL.revokeObjectURL(cur.mediaURL);}catch(e){}}
  cur={assetId:id,versionId:v.id,mediaEl:null,mediaURL:null,pendingPin:null,pendingDrawing:null,drawMode:false,pinMode:false,rangeAnchor:null,compare:false,activeDrawing:null,canvas:null,ctx:null,pendingT:deep.t??null,pendingC:deep.c||null,speed:1};
  renderStatus(a); renderPresence(); renderVersions(a); renderFilters(a,v);
  await renderStage(a,v); renderThread(a,v); wireComposer(a,v); wireActions(a);
  $('#exportBtn').onclick=()=>exportFeedback(a);
  $('#shareBtn').onclick=()=>shareModal(a,v);
  $('#addVersionInput').onchange=e=>upload(e.target.files[0],a,'version');
  $('#compareBtn').hidden=a.versions.length<2;
  $('#compareBtn').onclick=()=>{cur.compare=!cur.compare;$('#compareBtn').classList.toggle('active',cur.compare);renderStage(a,activeVer(a)).then(()=>{renderThread(a,activeVer(a));});};
}
function renderStatus(a){ const b=$('#statusBadge'); b.className='status-badge '+(STATUS[a.status]||''); b.innerHTML=`<span class="dot" style="background:currentColor"></span>${esc(a.status)}`; }
function renderPresence(){ const others=TEAM.filter(n=>n!==me()).slice(0,3); $('#presence').innerHTML=av(me(),'avatar-sm')+others.map(n=>av(n,'avatar-sm')).join(''); }
function renderVersions(a){ const t=$('#versionTabs');
  t.innerHTML=a.versions.map(v=>`<button class="vtab ${v.id===a.activeVersionId?'active':''}" data-v="${v.id}">${esc(v.label)}${open(v)?'<span class="vdot"></span>':''}</button>`).join('');
  $all('.vtab',t).forEach(b=>b.onclick=()=>openReview(a.id,{v:b.dataset.v})); }

async function mediaURL(v){ if(v.dataURL)return v.dataURL; if(v.blobKey){const b=await idbGet(v.blobKey);if(b)return URL.createObjectURL(b);} return null; }

async function renderStage(a,v){
  const stage=$('#stage'); stage.className='stage'; stage.innerHTML=''; cur.mediaEl=null; cur.canvas=null;
  // compare cell
  const cell2=$('#stage2Cell');
  if(cur.compare&&a.versions.length>=2){ const prev=a.versions[a.versions.indexOf(v)-1]||a.versions[0]; const pv=prev===v?a.versions[0]:prev;
    cell2.hidden=false; $('#stage2Label').textContent=pv.label+' (compare)'; const s2=$('#stage2'); s2.innerHTML=''; const u2=await mediaURL(pv);
    s2.innerHTML = u2 ? (pv.kind==='video'?`<video src="${u2}" controls></video>`:`<img alt="" src="${u2}">`) : `<div class="stage-empty">No media</div>`;
  } else cell2.hidden=true;

  const url=await mediaURL(v); cur.mediaURL=(url&&url.startsWith('blob:'))?url:null;
  if(!url){ $('#controls').hidden=true;
    stage.innerHTML=`<div class="stage-empty"><div class="up">${I.up}</div><div>Nothing to review yet</div>
      <div class="upload-row"><label class="btn btn-primary">${I.up}Upload image or video<input type="file" accept="image/*,video/*" hidden id="firstUp"></label>
      ${v.kind==='video'?`<button class="btn btn-ghost" id="sampleClip">Load sample clip</button>`:`<button class="btn btn-ghost" id="sampleImg">Sample image</button>`}</div></div>`;
    $('#firstUp',stage).onchange=e=>upload(e.target.files[0],a,'first');
    if($('#sampleImg',stage))$('#sampleImg',stage).onclick=()=>{v.kind='image';v.dataURL=gimg('#1e6f4f','#0b3a28','Sample');save();openReview(a.id);};
    if($('#sampleClip',stage))$('#sampleClip',stage).onclick=()=>sampleClip(a,v);
    return; }

  if(v.kind==='video'){
    stage.innerHTML=`<video id="media" src="${url}" preload="metadata"></video>`;
    const vid=$('#media',stage); cur.mediaEl=vid; addCanvas(stage); $('#controls').hidden=false;
    stage.classList.add('has-video');
    const cp=document.createElement('button'); cp.className='center-play'; cp.innerHTML=I.play; stage.appendChild(cp); cp.onclick=()=>vid.play();
    vid.addEventListener('loadedmetadata',()=>{v.duration=vid.duration;$('#timeline').setAttribute('aria-valuemax',Math.floor(vid.duration));renderMarkers(v);jump();sizeCanvas();});
    vid.addEventListener('timeupdate',()=>{const p=vid.duration?vid.currentTime/vid.duration*100:0;$('#timeProgress').style.width=p+'%';$('#playhead').style.left=p+'%';$('#timecode').textContent=smpte(vid.currentTime);});
    vid.addEventListener('play',()=>{$('#playBtn').innerHTML=I.pause;stage.classList.add('playing');}); vid.addEventListener('pause',()=>{$('#playBtn').innerHTML=I.play;stage.classList.remove('playing');});
    vid.addEventListener('click',()=>{ if(cur.drawMode||cur.pinMode)return; vid.paused?vid.play():vid.pause(); });
    $('#playBtn').onclick=()=>vid.paused?vid.play():vid.pause();
    $('#frameBack').onclick=()=>{vid.pause();vid.currentTime=Math.max(0,vid.currentTime-1/30);};
    $('#frameFwd').onclick=()=>{vid.pause();vid.currentTime=Math.min(vid.duration||1e9,vid.currentTime+1/30);};
    $('#loopBtn').onclick=()=>{vid.loop=!vid.loop;$('#loopBtn').classList.toggle('active',vid.loop);};
    $('#speedBtn').onclick=()=>{const arr=[1,1.5,2,0.5];cur.speed=arr[(arr.indexOf(cur.speed)+1)%arr.length];vid.playbackRate=cur.speed;$('#speedBtn').textContent=cur.speed+'×';};
    $('#fsBtn').onclick=()=>{(stage.requestFullscreen?stage.requestFullscreen():null);};
    const mute=$('#muteBtn'),volEl=$('#volume'); mute.innerHTML=I.vol; volEl.value=vid.volume;
    mute.onclick=()=>{vid.muted=!vid.muted;mute.innerHTML=vid.muted?I.mute:I.vol;mute.classList.toggle('active',vid.muted);};
    volEl.oninput=()=>{vid.volume=+volEl.value;vid.muted=+volEl.value===0;mute.innerHTML=vid.muted?I.mute:I.vol;};
    const tl=$('#timeline'),th=$('#timeHover');
    tl.onclick=e=>{if(cur.drawMode||cur.pinMode)return;const r=e.currentTarget.getBoundingClientRect();const tt=(e.clientX-r.left)/r.width*(vid.duration||0);vid.currentTime=tt;cur.pendingPin={kind:'time',t:tt};pinChip();toast('Add a comment at '+mmss(tt)+' below.');};
    tl.onmousemove=e=>{const r=tl.getBoundingClientRect();const f=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));th.hidden=false;th.style.left=(f*100)+'%';th.textContent=mmss(f*(vid.duration||0));};
    tl.onmouseleave=()=>{th.hidden=true;};
  } else {
    $('#controls').hidden=true; stage.classList.add('is-canvas');
    stage.innerHTML=`<img id="media" alt="${esc(a.title)}" src="${url}">`; cur.mediaEl=$('#media',stage); addCanvas(stage);
    stage.onclick=e=>{ if(cur.drawMode||cur.pinMode||e.target.id!=='media')return; const r=e.target.getBoundingClientRect();
      cur.pendingPin={kind:'point',x:Math.round((e.clientX-r.left)/r.width*100),y:Math.round((e.clientY-r.top)/r.height*100)};
      renderPins(v); pinChip(); $('#commentInput').focus(); };
    renderPins(v);
  }
  sizeCanvas(); jump();
}

/* ---------- draw canvas ---------- */
function addCanvas(stage){ const c=document.createElement('canvas'); c.className='drawCanvas'; c.style.pointerEvents='none'; stage.appendChild(c); cur.canvas=c; cur.ctx=c.getContext('2d');
  let drawing=false,stroke=null;
  c.addEventListener('pointerdown',e=>{
    if(cur.pinMode){ dropPin(e); return; }
    if(!cur.drawMode)return; drawing=true; stroke=[]; (cur.pendingDrawing=cur.pendingDrawing||[]).push(stroke); addPt(e,stroke); paint();
  });
  c.addEventListener('pointermove',e=>{ if(!drawing)return; addPt(e,stroke); paint(); });
  window.addEventListener('pointerup',()=>{drawing=false;});
  function addPt(e,st){ const r=c.getBoundingClientRect(); st.push({x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height}); }
  function dropPin(e){ const m=cur.mediaEl, r=(m||c).getBoundingClientRect();
    let x=(e.clientX-r.left)/r.width*100, y=(e.clientY-r.top)/r.height*100; x=Math.max(0,Math.min(100,x)); y=Math.max(0,Math.min(100,y));
    cur.pendingPin={kind:'point',x:Math.round(x),y:Math.round(y),t:(m&&m.tagName==='VIDEO')?m.currentTime:null};
    setPinMode(false); renderPins(activeVer(asset(cur.assetId))); pinChip(); $('#commentInput').focus(); }
}
function sizeCanvas(){ const c=cur.canvas; if(!c)return; c.width=c.clientWidth; c.height=c.clientHeight; paint(); }
function paint(){ const c=cur.canvas; if(!c)return; const g=cur.ctx; g.clearRect(0,0,c.width,c.height);
  const sets=[]; if(cur.activeDrawing) sets.push([cur.activeDrawing,'#4F46E5']); if(cur.pendingDrawing) sets.push([cur.pendingDrawing,'#4F46E5']);
  g.lineWidth=3; g.lineCap='round'; g.lineJoin='round';
  sets.forEach(([strokes,col])=>{ g.strokeStyle=col; (strokes||[]).forEach(st=>{ if(!st.length)return; g.beginPath(); st.forEach((p,i)=>{const x=p.x*c.width,y=p.y*c.height;i?g.lineTo(x,y):g.moveTo(x,y);}); g.stroke(); }); }); }
function updateTool(){ const active=cur.drawMode||cur.pinMode; const c=cur.canvas; if(c)c.style.pointerEvents=active?'auto':'none';
  const st=$('#stage'); if(st){st.classList.toggle('tool-active',active);}
  const d=$('#drawToggle'),p=$('#pinToggle'); if(d)d.classList.toggle('on',cur.drawMode); if(p)p.classList.toggle('on',cur.pinMode); }
function setDrawMode(on){ cur.drawMode=on; if(on)cur.pinMode=false; if(!on)cur.pendingDrawing=null; updateTool(); paint(); }
function setPinMode(on){ cur.pinMode=on; if(on)cur.drawMode=false; updateTool(); }

function renderMarkers(v){ const w=$('#markers'); if(!v.duration){w.innerHTML='';return;} const show=cur.filter==='resolved';
  w.innerHTML=v.comments.filter(c=>c.t!=null&&(cur.filter!=='resolved'?!c.resolved||cur.filter==='all':c.resolved)).filter(c=>visible(c)).map(c=>{
    const left=Math.min(100,Math.max(0,c.t/v.duration*100));
    return `<span class="marker ${c.resolved?'resolved':''}" data-c="${c.id}" style="left:${left}%"><span class="tip">${esc(c.author)}: ${esc(c.body.slice(0,36))}</span></span>`;}).join('');
  $all('.marker',w).forEach(m=>m.onclick=ev=>{ev.stopPropagation();const c=v.comments.find(x=>x.id===m.dataset.c);if(c&&cur.mediaEl){cur.mediaEl.currentTime=c.t;}selectNote(c.id);});
}
function renderPins(v){ const st=$('#stage'); $all('.point-pin',st).forEach(p=>p.remove()); let i=0;
  v.comments.filter(c=>c.point&&visible(c)).forEach(c=>{i++;const el=document.createElement('span');el.className='point-pin '+(c.resolved?'resolved':'');el.style.left=c.point.x+'%';el.style.top=c.point.y+'%';el.textContent=i;el.dataset.c=c.id;el.onclick=e=>{e.stopPropagation();selectNote(c.id);};st.appendChild(el);});
  if(cur.pendingPin&&cur.pendingPin.kind==='point'){const el=document.createElement('span');el.className='point-pin pending';el.style.left=cur.pendingPin.x+'%';el.style.top=cur.pendingPin.y+'%';el.textContent='+';st.appendChild(el);} }

function visible(c){ if(cur.filter==='open')return !c.resolved; if(cur.filter==='resolved')return c.resolved; if(cur.filter==='mine')return c.author===me()||(c.mentions||[]).includes(me()); return true; }

/* ---------- filters ---------- */
function renderFilters(a,v){
  cur.filter=cur.filter||'open';
  const all=v.comments.length, op=open(v), res=all-op, mine=v.comments.filter(c=>c.author===me()||(c.mentions||[]).includes(me())).length;
  const tabs=[['open','Open',op],['all','All',all],['resolved','Resolved',res],['mine','Mine',mine]];
  $('#filters').innerHTML=tabs.map(([k,l,n])=>`<button class="filter ${cur.filter===k?'active':''}" data-f="${k}">${l}<span class="cnt">${n}</span></button>`).join('');
  $all('#filters .filter').forEach(b=>b.onclick=()=>{cur.filter=b.dataset.f;renderThread(a,activeVer(a));});
}

/* ---------- thread ---------- */
function renderThread(a,v){
  renderFilters(a,v);
  const list=$('#threadList'); const items=v.comments.filter(visible);
  if(!items.length){ list.innerHTML=`<div class="thread-empty">${cur.filter==='open'?'No open comments — all caught up.':'No comments here yet.'}<br>${v.kind==='video'?'Move to a moment and type below':'Click the image, or just type'} to add one.</div>`; }
  else list.innerHTML=items.map(c=>noteHTML(v,c)).join('');
  $all('.note',list).forEach(n=>wireNote(n,a,v));
  if(v.kind==='video'){renderMarkers(v);renderPins(v);} else renderPins(v);
  renderVersions(a);
}
function chip(c){ if(c.inOut)return `<span class="note-chip" data-jump>${mmss(c.inOut.a)}–${mmss(c.inOut.b)}</span>`;
  if(c.t!=null)return `<span class="note-chip" data-jump>${I.play}${mmss(c.t)}</span>`;
  if(c.point)return `<span class="note-chip point" data-jump>spot</span>`; return `<span class="note-chip point">general</span>`; }
function mentions(b){ return esc(b).replace(/@([A-Za-z]+)/g,(m,n)=>TEAM.find(x=>x.toLowerCase()===n.toLowerCase())?`<span class="mention">@${esc(n)}</span>`:m); }
function reactRow(c){ const r=c.reactions||{}; const chips=Object.keys(r).filter(k=>r[k].length).map(k=>`<button class="react ${r[k].includes(me())?'on':''}" data-emoji="${k}">${k}<span class="rc">${r[k].length}</span></button>`).join('');
  return `<span class="react-row">${chips}<button class="react add-react" data-add>${I.smile}</button></span>`; }
function noteHTML(v,c){ const reps=(c.replies||[]).map(r=>`<div class="reply"><b>${esc(r.author)}</b> ${mentions(r.body)}</div>`).join('');
  const draw=c.drawing?`<div class="note-thumb"><svg viewBox="0 0 100 60" preserveAspectRatio="none">${c.drawing.map(s=>`<polyline fill="none" stroke="#4F46E5" stroke-width="1.4" points="${s.map(p=>(p.x*100).toFixed(1)+','+(p.y*60).toFixed(1)).join(' ')}"/>`).join('')}</svg></div>`:'';
  return `<div class="note ${c.resolved?'resolved':''}" data-c="${c.id}">
    <div class="note-top">${av(c.author,'avatar-sm')}<span class="note-author">${esc(c.author)}</span>${chip(c)}<span class="note-when">${timeAgo(c.createdAt)}</span></div>
    <div class="note-body">${mentions(c.body)}</div>${draw}
    <div class="note-foot">${reactRow(c)}<span class="spacer"></span>
      <button class="txt reply-toggle">${I.reply}Reply</button>
      <button class="txt resolve ${c.resolved?'done':''}">${I.check}${c.resolved?'Resolved':'Resolve'}</button></div>
    ${reps?`<div class="replies">${reps}</div>`:''}
    <div class="reply-box" hidden><input placeholder="Reply…"><button class="btn btn-soft btn-sm">Send</button></div></div>`; }
function wireNote(node,a,v){ const c=v.comments.find(x=>x.id===node.dataset.c); if(!c)return;
  const j=$('[data-jump]',node); if(j)j.onclick=()=>{ const tt=c.inOut?c.inOut.a:c.t;
    if(tt!=null){ if(cur.mediaEl&&cur.mediaEl.tagName==='VIDEO'){cur.mediaEl.currentTime=tt;selectNote(c.id);}else toast('Load the video to jump there.'); }
    else selectNote(c.id); };
  $('.resolve',node).onclick=()=>{c.resolved=!c.resolved;save();renderThread(a,v);renderLibrarySilently();toast(c.resolved?'Marked resolved':'Reopened');};
  const rt=$('.reply-toggle',node),rb=$('.reply-box',node); rt.onclick=()=>{rb.hidden=!rb.hidden;if(!rb.hidden)$('input',rb).focus();};
  const send=()=>{const val=$('input',rb).value.trim();if(!val)return;(c.replies=c.replies||[]).push({id:uid('r'),author:me(),body:val,createdAt:Date.now()});save();renderThread(a,v);};
  $('.btn',rb).onclick=send; $('input',rb).onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();send();}};
  $all('.react[data-emoji]',node).forEach(b=>b.onclick=()=>toggleReact(c,b.dataset.emoji,a,v));
  $('[data-add]',node).onclick=(e)=>{e.stopPropagation();reactPalette(node,c,a,v);};
}
function toggleReact(c,emoji,a,v){ const r=c.reactions=c.reactions||{}; r[emoji]=r[emoji]||[]; const i=r[emoji].indexOf(me()); if(i>=0)r[emoji].splice(i,1);else r[emoji].push(me()); if(!r[emoji].length)delete r[emoji]; save(); renderThread(a,v); }
function reactPalette(node,c,a,v){ const old=$('.rpal',node); if(old){old.remove();return;} const pal=document.createElement('span'); pal.className='react-row rpal';
  pal.innerHTML=EMOJIS.map(e=>`<button class="react" data-e="${e}">${e}</button>`).join(''); $('.react-row',node).appendChild(pal);
  $all('[data-e]',pal).forEach(b=>b.onclick=ev=>{ev.stopPropagation();toggleReact(c,b.dataset.e,a,v);}); }
function selectNote(cid){ $all('.note').forEach(n=>n.classList.toggle('active',n.dataset.c===cid)); const node=$(`.note[data-c="${cid}"]`); if(node)node.scrollIntoView({block:'nearest',behavior:'smooth'});
  const v=activeVer(asset(cur.assetId)); const c=v.comments.find(x=>x.id===cid); cur.activeDrawing=c&&c.drawing?c.drawing:null;
  if(c&&c.t!=null&&cur.mediaEl&&cur.mediaEl.tagName==='VIDEO')cur.mediaEl.currentTime=c.t; paint(); }

/* ---------- composer ---------- */
function parseM(t){ const s=new Set(); (t.match(/@([A-Za-z]+)/g)||[]).forEach(k=>{const n=k.slice(1);const p=TEAM.find(x=>x.toLowerCase()===n.toLowerCase());if(p&&p!==me())s.add(p);}); return Array.from(s); }
function pinChip(){ const el=$('#pinChip'); const p=cur.pendingPin;
  if(cur.rangeAnchor!=null){el.hidden=false;el.innerHTML=`In ${mmss(cur.rangeAnchor)} → set out`;return;}
  if(p&&p.kind==='time'){el.hidden=false;el.innerHTML=`At ${mmss(p.t)} <button id="rePin">change</button>`;$('#rePin').onclick=rePin;}
  else if(p&&p.kind==='range'){el.hidden=false;el.innerHTML=`${mmss(p.a)}–${mmss(p.b)} <button id="rePin">clear</button>`;$('#rePin').onclick=()=>{cur.pendingPin=null;pinChip();};}
  else if(p&&p.kind==='point'){el.hidden=false;el.innerHTML=`Pinned to a spot <button id="rePin">change</button>`;$('#rePin').onclick=()=>{cur.pendingPin=null;renderPins(activeVer(asset(cur.assetId)));toast('Click the image to re-pin.');pinChip();};}
  else el.hidden=true; }
function rePin(){ const v=activeVer(asset(cur.assetId)); if(v.kind==='video'&&cur.mediaEl){cur.pendingPin={kind:'time',t:cur.mediaEl.currentTime};} pinChip(); }
function wireComposer(a,v){ const ta=$('#commentInput'),post=$('#postBtn'),menu=$('#mentionMenu');
  cur.pendingPin=null;cur.pendingDrawing=null;cur.rangeAnchor=null;cur.pinMode=false;setDrawMode(false);setPinMode(false);$('#rangeToggle').classList.remove('on');pinChip();ta.value='';post.disabled=true;cur.activeDrawing=null;paint();
  ta.onfocus=()=>{ if(!cur.pendingPin&&!cur.rangeAnchor&&v.kind==='video'&&cur.mediaEl){cur.pendingPin={kind:'time',t:cur.mediaEl.currentTime};pinChip();} };
  ta.oninput=()=>{post.disabled=!ta.value.trim();mention(ta,menu);};
  ta.onkeydown=e=>{ if(!menu.hidden){if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();moveM(menu,e.key==='ArrowDown'?1:-1);return;}if(e.key==='Enter'){e.preventDefault();pickM(ta,menu);return;}if(e.key==='Escape'){menu.hidden=true;return;}}
    if((e.metaKey||e.ctrlKey)&&e.key==='Enter'){e.preventDefault();doPost(a,v);} };
  post.onclick=()=>doPost(a,v);
  $('#drawToggle').onclick=()=>{setDrawMode(!cur.drawMode);if(cur.drawMode&&v.kind==='video'&&cur.mediaEl&&!cur.pendingPin){cur.pendingPin={kind:'time',t:cur.mediaEl.currentTime};pinChip();}};
  $('#pinToggle').onclick=()=>{ if(!hasMedia(v)){toast('Upload media first.');return;} setPinMode(!cur.pinMode); if(cur.pinMode)toast(v.kind==='video'?'Click the frame to drop a pin.':'Click the image to drop a pin.'); };
  $('#rangeToggle').onclick=()=>{ if(v.kind!=='video'||!cur.mediaEl){toast('Ranges are for video.');return;}
    if(cur.rangeAnchor==null){cur.rangeAnchor=cur.mediaEl.currentTime;cur.pendingPin=null;$('#rangeToggle').classList.add('on');pinChip();}
    else{const b=cur.mediaEl.currentTime;cur.pendingPin={kind:'range',a:Math.min(cur.rangeAnchor,b),b:Math.max(cur.rangeAnchor,b)};cur.rangeAnchor=null;$('#rangeToggle').classList.remove('on');pinChip();} };
}
function doPost(a,v){ const ta=$('#commentInput'),body=ta.value.trim(); if(!body)return; const p=cur.pendingPin;
  const c=cmt(me(),body,{ t:p?(p.kind==='time'?p.t:p.kind==='range'?p.a:p.kind==='point'?(p.t??null):null):null, inOut:p&&p.kind==='range'?{a:p.a,b:p.b}:null,
    point:p&&p.kind==='point'?{x:p.x,y:p.y}:null, drawing:cur.pendingDrawing&&cur.pendingDrawing.length?cur.pendingDrawing:null });
  c.mentions=parseM(body); v.comments.push(c);
  ta.value='';$('#postBtn').disabled=true;cur.pendingPin=null;cur.pendingDrawing=null;setDrawMode(false);pinChip();
  if(cur.filter==='resolved')cur.filter='open';
  save();renderThread(a,v);renderLibrarySilently();
  const node=$(`.note[data-c="${c.id}"]`);if(node)node.scrollIntoView({block:'center'});
}
function mention(ta,menu){ const pos=ta.selectionStart,m=ta.value.slice(0,pos).match(/@([A-Za-z]*)$/); if(!m){menu.hidden=true;return;}
  cur.mStart=pos-m[1].length-1; const q=m[1].toLowerCase(); const opts=TEAM.filter(n=>n.toLowerCase().startsWith(q)&&n!==me());
  if(!opts.length){menu.hidden=true;return;} menu.innerHTML=opts.map((n,i)=>`<div class="mention-opt ${i?'':'active'}" data-n="${esc(n)}">${av(n,'avatar-sm')}<span>${esc(n)}</span></div>`).join(''); menu.hidden=false;
  $all('.mention-opt',menu).forEach(o=>o.onmousedown=e=>{e.preventDefault();insM(ta,menu,o.dataset.n);}); }
function moveM(menu,d){ const o=$all('.mention-opt',menu);let i=o.findIndex(x=>x.classList.contains('active'));o[i]&&o[i].classList.remove('active');i=(i+d+o.length)%o.length;o[i].classList.add('active'); }
function pickM(ta,menu){ const a=$('.mention-opt.active',menu)||$('.mention-opt',menu); if(a)insM(ta,menu,a.dataset.n); }
function insM(ta,menu,n){ const pos=ta.selectionStart;ta.value=ta.value.slice(0,cur.mStart)+'@'+n+' '+ta.value.slice(pos);menu.hidden=true;ta.focus();$('#postBtn').disabled=!ta.value.trim(); }

/* ---------- actions ---------- */
function wireActions(a){
  $('#approveBtn').onclick=()=>{const v=activeVer(a),o=open(v);const go=()=>{a.status='Approved';save();renderStatus(a);renderLibrarySilently();toast('Approved');};
    if(o>0){modal('Approve with open comments?',`<p>${o} ${o===1?'comment is':'comments are'} still open. Approve anyway?</p>`,`<button class="btn btn-ghost" data-close>Keep reviewing</button><button class="btn btn-primary" id="apy">Approve</button>`);$('#apy').onclick=()=>{closeModal();go();};}else go();};
  $('#requestBtn').onclick=()=>{a.status='Changes requested';save();renderStatus(a);renderLibrarySilently();toast('Sent back for changes');};
}

/* ---------- upload / sample / versions ---------- */
const MAX_UPLOAD_MB = 500;   // demo cap (file is held in your browser). Hosted version (Mux) has no practical limit.
async function upload(file,a,mode){ if(!file)return;
  if(file.size>MAX_UPLOAD_MB*1024*1024){toast(`This demo caps files at ${MAX_UPLOAD_MB} MB. The hosted version streams any size — see launch/INTEGRATION.md.`);return;}
  if(file.size>80*1024*1024){toast('Large file — kept in your browser for the demo; it may take a moment.');}
  if(!/^image\//.test(file.type)&&!/^video\//.test(file.type)){toast('Couldn’t read that file. Try a different one.');return;}
  const kind=/^video\//.test(file.type)?'video':'image'; const key=uid('b'); await idbPut(key,file);
  let v; if(mode==='version'&&a.versions.length&&hasMedia(activeVer(a))){v=ver('V'+(a.versions.length+1),kind);a.versions.push(v);a.activeVersionId=v.id;}else{v=activeVer(a);v.kind=kind;}
  v.blobKey=key;v.dataURL=null;v.duration=null; try{v.thumb=await thumb(kind,file);}catch(e){}
  if(a.status==='Approved')a.status='In review'; save(); openReview(a.id,{v:v.id}); toast(mode==='version'?`Uploaded ${v.label}`:'Uploaded');
}
function thumb(kind,file){ return new Promise((res,rej)=>{ const u=URL.createObjectURL(file);
  if(kind==='image'){const im=new Image();im.onload=()=>{res(draw(im,im.width,im.height));URL.revokeObjectURL(u);};im.onerror=rej;im.src=u;}
  else{const vd=document.createElement('video');vd.muted=true;vd.src=u;vd.onloadeddata=()=>{vd.currentTime=Math.min(.5,(vd.duration||1)*.25);};vd.onseeked=()=>{res(draw(vd,vd.videoWidth,vd.videoHeight));URL.revokeObjectURL(u);};vd.onerror=rej;} });
  function draw(s,w,h){const c=document.createElement('canvas');c.width=320;c.height=200;const g=c.getContext('2d');const r=Math.max(320/w,200/h);g.drawImage(s,(320-w*r)/2,(200-h*r)/2,w*r,h*r);return c.toDataURL('image/jpeg',.7);} }
function sampleClip(a,v){ if(typeof MediaRecorder==='undefined'||!HTMLCanvasElement.prototype.captureStream){toast('This browser can’t make a sample — upload your own.');return;}
  toast('Recording an 8s sample clip…'); const c=document.createElement('canvas');c.width=640;c.height=360;const g=c.getContext('2d');const stream=c.captureStream(30);let rec;
  try{rec=new MediaRecorder(stream,{mimeType:'video/webm'});}catch(e){toast('Recorder unavailable — upload your own.');return;}
  const ch=[];rec.ondataavailable=e=>{if(e.data.size)ch.push(e.data);};const t0=performance.now();
  (function f(){const t=(performance.now()-t0)/1000;g.fillStyle='#0b1f3a';g.fillRect(0,0,640,360);g.save();g.translate(320,190);g.rotate(t*.6);g.fillStyle='#4F46E5';g.fillRect(-55,-55,110,110);g.restore();g.fillStyle='#fff';g.textAlign='center';g.font='700 40px Inter,sans-serif';g.fillText('BRAND FILM',320,70);g.font='500 16px Inter';g.fillStyle='rgba(255,255,255,.7)';g.fillText(t.toFixed(1)+'s',320,330);if(performance.now()-t0<8000)requestAnimationFrame(f);else rec.stop();})();
  rec.onstop=async()=>{const blob=new Blob(ch,{type:'video/webm'});const key=uid('b');await idbPut(key,blob);v.kind='video';v.blobKey=key;v.dataURL=null;v.duration=8;try{v.thumb=await thumb('video',blob);}catch(e){}save();openReview(a.id);toast('Sample clip loaded');};
  rec.start();
}

/* ---------- share / export ---------- */
function shareModal(a,v){ let url=location.origin+location.pathname+'#/a/'+encodeURIComponent(a.id)+'?v='+v.id; if(cur.mediaEl&&cur.mediaEl.tagName==='VIDEO')url+='&t='+Math.floor(cur.mediaEl.currentTime);
  modal('Share for review',`<div class="field"><label>Review link</label><div class="share-link"><input id="shareUrl" value="${esc(url)}" readonly><button class="btn btn-primary" id="copyUrl">Copy</button></div></div>
    <p class="muted">Anyone with the link can watch and comment. (In production: toggle password, expiry, and download — see INTEGRATION.md.)</p>`,
    `<button class="btn btn-ghost" data-close>Done</button>`);
  $('#copyUrl').onclick=()=>{const i=$('#shareUrl');i.select();copy(i.value);toast('Link copied');}; }
function copy(t){ if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).catch(()=>fb()); else fb(); function fb(){const x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();try{document.execCommand('copy');}catch(e){}x.remove();} }
/* ---------- export: turn comments into NLE timeline markers ---------- */
function tc(sec,fps){ sec=Math.max(0,sec||0); var f=Math.round(sec*fps); var p=function(n){return String(n).padStart(2,'0');};
  return p(Math.floor(f/(fps*3600)))+':'+p(Math.floor(f/(fps*60))%60)+':'+p(Math.floor(f/fps)%60)+':'+p(f%fps); }
function expTime(c){ return c.t!=null?c.t:(c.inOut?c.inOut.a:0); }
function expSorted(v){ return v.comments.slice().sort(function(x,y){return expTime(x)-expTime(y);}); }
function dl(name,content,mime){ var b=new Blob([content],{type:mime||'text/plain'}); var u=URL.createObjectURL(b); var el=document.createElement('a'); el.href=u; el.download=name; el.click(); URL.revokeObjectURL(u); }
function csvCell(s){ return '"'+String(s==null?'':s).replace(/"/g,'""')+'"'; }
function oneLine(s){ return String(s==null?'':s).replace(/[\r\n]+/g,' '); }

function genTXT(a,v){ var L=['Feedback — '+a.title+' ('+v.label+')','Status: '+a.status,''];
  v.comments.forEach(function(c){ var loc=c.inOut?('['+mmss(c.inOut.a)+'-'+mmss(c.inOut.b)+']'):(c.t!=null?('['+mmss(c.t)+']'):(c.point?'[spot]':'[general]'));
    L.push((c.resolved?'[x]':'[ ]')+' '+loc+' '+c.author+': '+c.body); (c.replies||[]).forEach(function(r){L.push('      ↳ '+r.author+': '+r.body);}); });
  return L.join('\n'); }
function genCSV(a,v,fps){ var L=['Number,Timecode,Seconds,Author,Comment,Type,Resolved'];
  expSorted(v).forEach(function(c,i){ var type=c.inOut?'range':(c.t!=null?'time':(c.point?'spot':'general'));
    L.push([i+1,tc(expTime(c),fps),expTime(c).toFixed(2),csvCell(c.author),csvCell(c.body),type,c.resolved?'yes':'no'].join(',')); });
  return L.join('\n'); }
function genEDL(a,v,fps){ var L=['TITLE: '+a.title.toUpperCase()+' — CUE FEEDBACK','FCM: NON-DROP FRAME','']; var n=0;
  expSorted(v).forEach(function(c){ n++; var rin=tc(expTime(c),fps), rout=tc(expTime(c)+1/fps,fps); var txt=oneLine(c.author+': '+c.body);
    L.push(String(n).padStart(3,'0')+'  AX       V     C        00:00:00:00 00:00:00:01 '+rin+' '+rout);
    L.push('* '+txt);
    L.push('* LOC: '+rin+' RED '+txt.slice(0,60)); L.push(''); });
  return L.join('\n'); }
function genFCPXML(a,v,fps){ var total=0; v.comments.forEach(function(c){ total=Math.max(total,expTime(c)); }); total=Math.round((total+5)*fps);
  var fd='1/'+fps+'s';
  var markers=expSorted(v).map(function(c){ return '            <marker start="'+(Math.round(expTime(c)*fps)+'/'+fps+'s')+'" duration="'+fd+'" value="'+esc(oneLine(c.author+': '+c.body))+'"/>'; }).join('\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE fcpxml>\n<fcpxml version="1.10">\n'+
    '  <resources>\n    <format id="r1" name="Cue '+fps+'p" frameDuration="'+fd+'" width="1920" height="1080"/>\n  </resources>\n'+
    '  <library>\n    <event name="Cue Feedback">\n      <project name="'+esc(a.title)+' — feedback">\n'+
    '        <sequence format="r1" tcStart="0s" tcFormat="NDF">\n          <spine>\n'+
    '            <gap name="Feedback" offset="0s" start="0s" duration="'+total+'/'+fps+'s">\n'+markers+'\n            </gap>\n'+
    '          </spine>\n        </sequence>\n      </project>\n    </event>\n  </library>\n</fcpxml>\n'; }

function exportFeedback(a){ var v=activeVer(a);
  var fmts=[['fcpxml','Final Cut Pro (FCPXML)','Markers — also imports into Resolve & Premiere'],
            ['edl','EDL (CMX 3600)','Resolve & Premiere — includes * LOC: marker lines'],
            ['csv','CSV','Spreadsheet or generic marker list'],
            ['txt','Text checklist','Human-readable notes']];
  var card=modal('Export feedback as markers',
    '<p style="margin:0 0 16px;color:var(--ink-2);font-size:13px;line-height:1.5;">Turn these comments into timeline markers your editor can import — the round-trip back into Premiere, Final Cut or DaVinci Resolve. Pick a frame rate so timecodes line up.</p>'+
    '<div style="font-size:12px;font-weight:600;color:var(--ink-2);margin-bottom:6px;">Frame rate</div>'+
    '<div class="fps-row">'+[24,25,30].map(function(f){return '<button class="fps-btn'+(f===30?' on':'')+'" data-fps="'+f+'">'+f+' fps</button>';}).join('')+'</div>'+
    '<div class="exp-list">'+fmts.map(function(f){return '<button class="exp-opt" data-k="'+f[0]+'"><div><div class="eo-t">'+f[1]+'</div><div class="eo-h">'+f[2]+'</div></div><span>&darr;</span></button>';}).join('')+'</div>',
    '<button class="btn btn-soft" data-close>Close</button>');
  var fps=30;
  $all('.fps-btn',card).forEach(function(b){ b.onclick=function(){ fps=+b.dataset.fps; $all('.fps-btn',card).forEach(function(x){x.classList.toggle('on',x===b);}); }; });
  $all('.exp-opt',card).forEach(function(b){ b.onclick=function(){ var k=b.dataset.k; var base=(a.title||'cue').replace(/[^\w]+/g,'-').replace(/^-+|-+$/g,'')||'cue';
    if(k==='txt') dl(base+'-feedback.txt',genTXT(a,v),'text/plain');
    else if(k==='csv') dl(base+'-markers.csv',genCSV(a,v,fps),'text/csv');
    else if(k==='edl') dl(base+'.edl',genEDL(a,v,fps),'text/plain');
    else dl(base+'.fcpxml',genFCPXML(a,v,fps),'application/xml');
    closeModal(); toast('Exported '+k.toUpperCase()+' — import it as markers in your editor.'); }; });
}

/* ---------- misc ---------- */
function jump(){ if(cur.pendingT!=null&&cur.mediaEl&&cur.mediaEl.tagName==='VIDEO'){try{cur.mediaEl.currentTime=cur.pendingT;}catch(e){}cur.pendingT=null;} if(cur.pendingC){selectNote(cur.pendingC);cur.pendingC=null;} }
function renderLibrarySilently(){ if($('#libraryView').hidden)return; renderLibrary(); }
function modal(title,body,foot){ const root=$('#modalRoot'),card=$('#modalCard'); card.innerHTML=`<div class="modal-head">${esc(title)}<button class="icon-btn" data-close>${I.close}</button></div><div class="modal-body">${body}</div>${foot?`<div class="modal-foot">${foot}</div>`:''}`; root.hidden=false; $all('[data-close]',root).forEach(x=>x.onclick=closeModal); $('.modal-scrim',root).onclick=closeModal; return card; }
function closeModal(){ $('#modalRoot').hidden=true; $('#modalCard').innerHTML=''; }
function onKey(e){ if(!$('#modalRoot').hidden&&e.key==='Escape'){closeModal();return;} if($('#reviewView').hidden)return;
  const typing=/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
  if(e.key==='Escape'){if(!$('#mentionMenu').hidden){$('#mentionMenu').hidden=true;return;}if(cur&&cur.drawMode){setDrawMode(false);return;}location.hash='';return;}
  if(typing)return; const vid=cur&&cur.mediaEl&&cur.mediaEl.tagName==='VIDEO'?cur.mediaEl:null; if(!vid)return;
  if(e.key===' '){e.preventDefault();vid.paused?vid.play():vid.pause();} else if(e.key===','){vid.pause();vid.currentTime=Math.max(0,vid.currentTime-1/30);} else if(e.key==='.'){vid.pause();vid.currentTime+=1/30;} }
function toast(m){ const h=$('#toastHost'),el=document.createElement('div');el.className='toast';el.innerHTML=I.check+'<span>'+esc(m)+'</span>';h.appendChild(el);setTimeout(()=>{el.style.opacity='0';setTimeout(()=>el.remove(),250);},2400); }
window.addEventListener('resize',()=>{ if(cur&&cur.canvas)sizeCanvas(); });
