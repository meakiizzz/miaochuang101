/* 妙创 1.0.1：独立、本地商业化交互演示。无支付、短信或生成 API。 */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const app = $('#app'), layers = $('#layers');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const A = name => `assets/${name}`;
  const paths = {
    crown:'m3 6 4 4 5-6 5 6 4-4-2 13H5L3 6Zm3 16h12', back:'M14 5 7 12l7 7', close:'m6 6 12 12M18 6 6 18', next:'m9 5 7 7-7 7',
    spark:'m12 3 2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3ZM20 2v4m-2-2h4',
    home:'m3 10 9-7 9 7v10H15v-6H9v6H3Z', user:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21a8 8 0 0 1 16 0',
    shop:'M3 10h18l-2-6H5l-2 6Zm1 0v10h16V10M9 20v-7h6v7M3 10c0 4 4 4 5 0 1 4 5 4 6 0 1 4 7 4 7 0',
    bag:'M5 7h14l1 14H4L5 7Zm3 0V5a4 4 0 0 1 8 0v2M8 11a4 4 0 0 0 8 0',
    movie:'m3 7 17-4 1 5-17 4-1-5Zm1 5h17v9H4v-9Zm4-6 3 4m3-6 3 4',
    film:'M4 3h16v18H4V3Zm4 0v18m8-18v18M4 8h4m8 0h4M4 16h4m8 0h4',
    image:'M4 3h16v18H4V3Zm0 13 5-5 4 4 3-3 4 4M10 7h.01',
    grid:'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z',
    book:'M3 4h6c2 0 3 1 3 3v14c0-2-1-3-3-3H3V4Zm18 0h-6c-2 0-3 1-3 3v14c0-2 1-3 3-3h6V4Z',
    music:'M10 18V3l10 4M10 18a4 4 0 1 1-4-4c2 0 4 1 4 4Z',
    wand:'m5 19 11-11 3 3L8 22l-3-3Zm9-9 3 3M5 3v4M3 5h4m12-4v4m-2-2h4M2 12h4m-2-2v4',
    settings:'M4 6h10m4 0h2M4 18h2m4 0h10M18 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM10 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
    bookmark:'M6 3h12v18l-6-4-6 4V3Z', more:'M5 12h.01M12 12h.01M19 12h.01',
    play:'m8 5 11 7-11 7V5Z', trash:'M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7',
    download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5', alert:'M12 8v5m0 4h.01M3 21 12 3l9 18H3Z',
    bulb:'M8 17h8M9 21h6M8 14a7 7 0 1 1 8 0v3H8v-3Z', check:'m5 12 4 4L20 5',
    upload:'M3 15v6h18v-6M12 17V3m-5 5 5-5 5 5', lock:'M5 10h14v11H5V10Zm3 0V6a4 4 0 0 1 8 0v4',
    receipt:'M5 3h14v18l-3-2-4 2-4-2-3 2V3Zm3 5h8m-8 5h8', phone:'M7 2h10v20H7V2Zm4 17h2',
    arrow:'m5 19 14-14M6 5h13v13', refresh:'M20 8a8 8 0 1 0 0 8M20 3v5h-5',
    broken:'M4 3h16v18H4V3Zm0 13 5-5 4 4 3-3 4 4M2 2l20 20',
    clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2',
    volume:'M4 9h4l5-4v14l-5-4H4V9Zm12-1a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14',
    muted:'M4 9h4l5-4v14l-5-4H4V9Zm13 1 4 4m0-4-4 4'
  };
  const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.spark}"/></svg>`;
  const bean = cls => `<i class="bean ${cls || ''}" aria-hidden="true"><svg viewBox="0 0 32 36" fill="none" aria-hidden="true"><path d="M25.8 4.3C18.1-1.2 6.3 5.4 3.1 16.1C.1 26.3 5.5 34.1 13.3 33.4C19.9 32.8 19.6 26.5 22.1 23.1C24.9 19.4 29.8 17.8 29 11.9C28.6 8.6 27.7 5.7 25.8 4.3Z" fill="currentColor"/><path d="M22.8 8.2C16.2 10 11.4 15.9 10.1 23.2" stroke="#F5EDFF" stroke-width="2" stroke-linecap="round"/></svg></i>`;
  const button = (label, action, cls = 'primary', extra = '') => `<button class="${cls}" data-action="${action}" ${extra}>${label}</button>`;
  const typeMap = {
    sales:{name:'视频带货', group:'带货', icon:'bag', img:'sales-video.jpg', source:'product.jpg', sample:'好物的高光时刻', caption:'一键生成商品轻松变爆款', ai:'点击让AI根据商品图生成带货内容', hint:'上传商品图，点击下方文字，让AI生成带货内容', prompt:'温暖的桌面场景中，柔和的自然光照亮商品包装。镜头缓缓靠近，展示外观与使用细节，随后切换至日常使用场景。'},
    story:{name:'剧情带货', group:'带货', icon:'movie', img:'sales-story.jpg', source:'product.jpg', sample:'把好物写进故事', caption:'创作商品爆单视频', ai:'点击让AI根据商品图生成带货剧情', hint:'上传商品图，点击下方文字，让AI生成带货剧情', prompt:'古装女子在庭院中发现一件日常好物，通过人物对话和自然的情节推进，呈现商品外观与使用方式。'},
    shop:{name:'探店视频', group:'带货', icon:'shop', img:'shop-cover.jpg', source:'shop-cover.jpg', sample:'发现街角好店', caption:'一键生成门店引流视频', ai:'点击让AI根据图片生成探店内容', hint:'上传门店或商品图片，点击下方文字，让AI生成探店内容', prompt:'从门店招牌开始，跟随镜头走进店内，展示环境、招牌商品和服务细节，营造真实自然的探店氛围。'},
    poster:{name:'创意海报', group:'带货', icon:'image', img:'sales-video.jpg', source:'product.jpg', sample:'新品上市海报', caption:'一键生成宣传海报', ai:'点击让AI根据商品图生成海报创意', hint:'上传商品图，点击下方文字，让AI生成海报创意', image:true, prompt:'保留商品外观，以浅色背景、柔和光影与醒目的短标题突出新品特点，生成简洁有层次的宣传海报。'},
    detail:{name:'电商详图', group:'带货', icon:'grid', img:'detail-work-2.jpg', source:'product.jpg', sample:'商品细节展示', caption:'一键生成商品详情图', ai:'点击让AI根据商品图生成详情图描述', hint:'上传商品图，点击下方文字，让AI生成详情图描述', image:true, prompt:'保留商品包装与外观，以浅色背景呈现商品全貌，搭配包装细节、商品外观与日常使用场景分区，制作清晰的电商详情展示图。'},
    drama:{name:'AI短剧', group:'视频', icon:'film', img:'wuxia.jpg', sample:'一封未拆的信', caption:'把故事创意变成精彩短剧', ai:'点击让AI扩写短剧剧本', hint:'写下故事梗概、人物关系或情节，让AI扩写短剧剧本', text:true, prompt:'薄雾中的庭院，一位年轻侠客收到一封未拆的信。镜头慢慢推进，信中的一句话引出一段新的冒险。'},
    novel:{name:'小说推文', group:'视频', icon:'book', img:'novel-cover.jpg', sample:'风起山河间', caption:'把小说变成精彩视频', ai:'点击让AI改写小说推文内容', hint:'输入小说片段或故事梗概，让AI改写小说推文内容', text:true, prompt:'少年翻开古老卷轴，层峦与云海在眼前展开。以清晰的叙事和连贯的镜头，呈现故事的关键情节。'},
    textvideo:{name:'文生视频', group:'视频', icon:'film', img:'wuxia.jpg', sample:'山野间的一缕晨光', caption:'让文字变成生动画面', ai:'点击让AI扩写视频描述', hint:'写下你想生成的画面，让AI完善场景、动作和镜头', text:true, prompt:'清晨的山谷中薄雾缓缓散去，阳光照亮草木。镜头平稳向前推进，呈现安静、通透的自然画面。'},
    imgvideo:{name:'图生视频', group:'视频', icon:'image', img:'beauty.jpg', sample:'让画面动起来', caption:'让静止图片动起来', ai:'点击让AI根据图片生成动态描述', hint:'上传图片，点击下方文字，让AI生成动态描述', prompt:'保留原图主体和画面细节，加入自然轻微的动态，镜头缓缓推进，运动平稳、画面连贯。'},
    dance:{name:'照片跳舞', group:'视频', icon:'music', img:'beauty.jpg', sample:'把照片变成舞台', template:true, prompt:''},
    fun:{name:'趣味视频', group:'视频', icon:'wand', img:'art.jpg', sample:'经典画作的新故事', template:true, prompt:''},
    portrait:{name:'写真大片', group:'图片', icon:'user', img:'beauty.jpg', sample:'午后自然光写真', template:true, image:true, prompt:''},
    idphoto:{name:'证件照', group:'图片', icon:'user', img:'beauty.jpg', sample:'清新自然证件照', template:true, image:true, prompt:''},
    sentence:{name:'一句话海报', group:'图片', icon:'wand', img:'sales-video.jpg', sample:'一句话生成创意海报', caption:'让好想法成为一张海报', text:true, image:true, ai:'点击让AI完善海报创意', hint:'描述主题、风格和想展示的内容', prompt:'为一家街角咖啡店设计春日上新海报，奶油白与浅绿色搭配，留白简洁，突出本周新品。'}
  };
  function miaoUsage(type,params={}) {
 const aliases={video:'sales',animate:'imgvideo',textimage:'sentence',ecom:'detail'};
 type=aliases[type]||type;
 const fixed={poster:40,sentence:40,detail:40,portrait:8,idphoto:8,dance:20,effect:8};
 if(Object.hasOwn(fixed,type))return fixed[type];
 const seconds=parseInt(params.duration)||5,quality=params.quality==='480p'?'480p':'720p';
 const rates=type==='fun'?{5:150,8:240,10:300,12:370}:quality==='480p'?{5:150,8:240,10:300,12:370,15:450}:{5:200,8:320,10:400,12:480,15:600};
 return rates[seconds]??rates[5];
}
  const GENERATE_USAGE = 400; // 仅用于历史演示数据。实时生成按用量表计费。
  const usageFor=(type=route.type||'sales',params)=>miaoUsage(type,params||draft(type).params);
  const RECHARGE_PACKS = [
    {amount:200,bonus:0,price:10},{amount:600,bonus:0,price:30},{amount:1000,bonus:0,price:50},
    {amount:2000,bonus:100,price:100},{amount:3000,bonus:300,price:150},{amount:4000,bonus:600,price:200}
  ];
  const selectedPack = () => RECHARGE_PACKS[(state.pack||1)-1];
  const balance = () => state.gift+state.paid.reduce((sum,p)=>sum+p.amount,0);
  const types = Object.keys(typeMap);
  const ratios = ['9:16','3:4','1:1','16:9','4:3'];
  const scenes = {
    organic:['自然量新人流程','四步介绍后进入端内同款订阅页，可关闭后进入首页。'],
    campaign:['非自然量新人流程','带货、剧情、短剧与更多玩法介绍后进入专属订阅页。'],
    guest:['非会员开始创作','先编辑内容；点击开始创作，依次体验订阅、绑定手机和生成。'],
    writer:['AI 帮写拦截','已有商品图，点击 AI 帮写；开通会员并绑定后自动继续帮写。'],
    template:['模板做同款拦截','照片跳舞、趣味视频、写真大片和证件照，在详情页做同款时判断会员。'],
    insufficient:['妙豆不足','有效会员余额不足。充值后回到原页，由用户再次点击生成。'],
    failure:['生成失败与退回','失败任务保留原图与描述，扣除的妙豆按原来源退回。'],
    expired:['会员已到期','赠送妙豆清零；充值妙豆保留，历史作品仍可查看、保存和删除。'],
    unbound:['已付费，未绑定','进入 App 不强制绑定；再次进行受限操作时继续绑定手机。'],
    member:['有效会员','查看妙豆入口、充值、收支明细和历史作品。'],
    cancelled:['会员已取消续订','已开通会员，当期权益仍有效；查看当前套餐和权益到期日期。']
  };
  let state, route, history = [], overlay = null, events = [], drafts = {}, checkout = null;
  let timerToken = 0, writerTimer, toastTimer, photoTarget = null, fileInput;
  const jobTimers = new Set();
  const sceneJobs = () => [
    {id:'DEMO-1001',type:'sales',status:'success',image:A('product.jpg'),source:A('product.jpg'),prompt:typeMap.sales.prompt,created:Date.now()-3600000,params:{ratio:'9:16',duration:'5s',quality:'720p',model:'Seedance 2.0'}},
    {id:'DEMO-1002',type:'detail',status:'success',image:A('detail-work-2.jpg'),source:A('product.jpg'),prompt:typeMap.detail.prompt,created:Date.now()-86400000,params:{ratio:'3:4',model:'GPT 生图'}},
    {id:'DEMO-1003',type:'fun',status:'success',image:A('art.jpg'),source:A('beauty.jpg'),prompt:'',created:Date.now()-86400000*8,params:{ratio:'9:16'},item:'fun'}
  ];
  function log(message) { events.push(message); if(events.length>10) events.shift(); renderReview(); }
  function toast(message) {
    clearTimeout(toastTimer); $('#toast').textContent=message; $('#toast').classList.add('show');
    toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2600);
  }
  function draft(type) {
    if(!drafts[type]) drafts[type]={image:'',prompt:'',params:{ratio:typeMap[type].image?'3:4':'9:16',duration:'5s',quality:'720p',model:typeMap[type].image?'GPT 生图':'Seedance 2.0'},keywords:[],dirty:false,item:type};
    return drafts[type];
  }
  function ledger(title,change,type='',negative=false,task='') {
    state.ledger.unshift({title,change,type,negative,task,time:Date.now()});
  }
  // 历史收支演示数据，仅用于查看各类明细，不改变当前妙豆余额。
  function demoLedger() {
    const now = Date.now();
    const usage = Object.values(typeMap).map((m, i) => ({
      title:'生成扣除', change:`− ${GENERATE_USAGE} 妙豆`, type:m.name, negative:true,
      task:`HISTORY-${String(i+1).padStart(3,'0')}`, time:now-(i+1)*3600000
    }));
    return [...usage,
      {title:'赠送妙豆到期清零',change:'− 200 妙豆',type:'订阅赠送到期',negative:true,time:now-86400000},
      ...['写真大片','视频带货','照片跳舞'].map((type,i)=>({title:'生成失败退回',change:`+ ${GENERATE_USAGE} 妙豆`,type,negative:false,time:now-90000000-i*60000})),
      {title:'妙豆充值',change:'+ 600 妙豆',type:'妙豆包',negative:false,time:now-93600000},
      {title:'会员赠送',change:'+ 400 妙豆',type:'周会员',negative:false,time:now-97200000}
    ];
  }
  function seedScene(name='guest') {
    jobTimers.forEach(clearTimeout); jobTimers.clear(); clearInterval(writerTimer); ++timerToken;
    history=[];overlay=null;checkout=null;drafts={};events=[];
    state={scene:name,member:false,bound:false,memberPlan:'week',subscriptionPlan:'week',subscriptionAgreement:true,weekPurchased:false,autoRenew:true,memberUntil:null,nickname:'灵感创作者',phone:'',gift:0,cycle:1,paid:[],pending:null,rechargeReturn:null,tab:'home',mine:'带货',sub:'全部',category:'推荐',favorites:['sales','drama','portrait'],jobs:sceneJobs(),ledger:demoLedger(),failNext:false,order:0};
    subscriptionFeature='sales';showcase.progress=0;showcase.muted=true;showcase.failed.clear();
    route={page:'editor',type:'sales'};
    const d=draft('sales');d.image=A('product.jpg');d.prompt=typeMap.sales.prompt;
    if(['insufficient','failure','expired','member','unbound','cancelled'].includes(name)) {
      state.member=true;state.weekPurchased=true;state.memberUntil=Date.now()+7*86400000;state.bound=name!=='unbound';state.phone=state.bound?'19100009999':'';state.gift=600;state.paid=[{id:'PACK-DEMO',amount:3*GENERATE_USAGE}];
      ledger('会员赠送','+ 600 妙豆','周会员');ledger('妙豆充值','+ 1,200 妙豆','妙豆包');
    }
    if(['organic','campaign'].includes(name)){state.onboardingSource=name;state.subscriptionOrigin={page:'home'};route={page:'onboarding',step:0};}
    if(name==='writer'){d.prompt='';route={page:'editor',type:'story'};draft('story').image=A('product.jpg');}
    if(name==='template') route={page:'detail',type:'portrait'};
    if(name==='insufficient'){state.gift=0;state.paid=[];}
    if(name==='expired'){state.member=false;state.gift=0;route={page:'mine'};ledger('赠送妙豆到期清零','− 上期剩余额度','周会员',true);}
    if(name==='member') route={page:'mine'};
    if(name==='cancelled'){state.autoRenew=false;route={page:'subscribe'};}
    if(name==='failure') {
      const j={...sceneJobs()[0],id:'DEMO-FAILED',type:'story',status:'failed',image:A('sales-story.jpg'),prompt:typeMap.story.prompt,charge:{gift:GENERATE_USAGE,paid:[],cycle:state.cycle},refunded:true};
      state.jobs.unshift(j);route={page:'result',id:j.id};
      ledger('生成扣除',`− ${GENERATE_USAGE} 妙豆`,'剧情带货',true,j.id);ledger('生成失败退回',`+ ${GENERATE_USAGE} 妙豆`,'剧情带货',false,j.id);
    }
    $('#demo-fail').checked=false;$('#demo-conflict').checked=false;$('#demo-submit-fail').checked=false;
    log('已切换演示场景：'+scenes[name][0]);render();syncScene(name);
  }
  function renderReview() {
    const scene=scenes[state.scene]||scenes.guest;
    $('#scene-name').textContent=scene[0];$('#scene-desc').textContent=scene[1];
    document.querySelectorAll('[data-scene]').forEach(el=>el.classList.toggle('active',el.dataset.scene===state.scene));
    const sum=[['会员资格',state.member?'有效'+subscriptionPlans[state.memberPlan||'week'].name:state.scene==='expired'?'已到期':'未开通'],['手机绑定',state.bound?'已绑定':'未绑定'],['妙豆状态',!state.member?'需会员资格':balance().toLocaleString()+' 妙豆'],['生成任务',state.jobs.filter(j=>j.status==='generating').length+' 个进行中']];
    $('#state-summary').innerHTML=sum.map(([a,b])=>`<div class="state-item"><span>${a}</span><strong>${b}</strong></div>`).join('');
    $('#flow-events').innerHTML=events.map(e=>`<li>${esc(e)}</li>`).join('');
  }
  function nav(active) {
    return `<nav class="nav" aria-label="底部导航"><div class="nav-pill">${[['home','home','创作'],['inspiration','spark','灵感'],['sentence','wand','一句话'],['mine','user','我的']].map(([page,i,name])=>button(icon(i)+`<span>${name}</span>`,'nav',''+(active===page?'active':''),`data-page="${page}"`)).join('')}</div><button class="nav-plus" data-action="quick" aria-label="新建创作">+</button></nav>`;
  }
  function memberEntry() {
    return state.member?button(bean()+'<span>'+balance().toLocaleString()+'</span>','recharge','vip-entry','aria-label="妙豆充值"'):button(icon('crown')+'<span>会员</span>','subscribe','vip-entry','aria-label="会员中心"');
  }
  function top(title,back=true,right='',sub='') {
    return `<header class="topbar ${sub?'tall':''}">${back?button(icon('back'),'back','side','aria-label="返回"'):memberEntry()}<div class="title-group"><h2>${esc(title)}</h2>${sub?`<small>${esc(sub)}</small>`:''}</div>${right||'<span class="side"></span>'}</header>`;
  }
  const foot = body => `<footer class="page-foot">${body}</footer>`;
  const video = type => !typeMap[type].image;
  function tile(type, title, action='detail', showPlay=false) {
    const m=typeMap[type];
    return `<button class="tile" data-action="${action}" data-type="${type}" aria-label="${esc(title||m.sample)}"><img src="${A(m.img)}" alt="${esc(m.name)}示例"><span class="tile-title">${esc(title||m.sample)}</span>${showPlay&&video(type)?`<span class="play-small">${icon('play')}</span>`:''}</button>`;
  }
  function home() {
    const section=(title,arr)=>`<div class="section-head"><h3>${title}</h3>${button('更多 ›','browse','',`data-category="${title}"`)}</div><div class="strip">${arr.map(t=>tile(t)).join('')}</div>`;
    return `<section class="page"><div class="scroll"><div class="hero"><div class="home-vip-toolbar">${memberEntry()}</div><img src="${A('sales-video.jpg')}" alt="商品创作示例"><h2>让好商品<br>拥有<em>好故事</em></h2><p>一张商品图，开启你的创作</p>${button('创作带货视频 ↗','edit','text-button','data-type="sales"')}<div class="hero-dots"><i></i><i></i><i></i></div></div><div class="home-main"><div class="core-cards">${['sales','story'].map(t=>`<button class="core-card" data-action="edit" data-type="${t}"><strong>${typeMap[t].name}</strong><small>${t==='sales'?'一图成片':'剧情植入'}</small><img src="${A(typeMap[t].img)}" alt=""></button>`).join('')}</div><div class="tools-row">${[['shop','探店视频'],['novel','小说推文'],['drama','AI短剧'],['detail','电商详图'],['all','全部']].map(([t,n])=>`<button data-action="${t==='all'?'alltools':'edit'}" data-type="${t}"><span class="tool-icon">${icon(typeMap[t]?.icon||'grid')}${t==='shop'?'<b class="hot">Hot</b>':''}</span><span class="tool-name">${n}</span></button>`).join('')}</div>${section('🔥热门玩法',['shop','novel','drama','textvideo','imgvideo'])}${section('AI短剧',['drama','novel','textvideo','drama'])}${section('电商详图',['detail','poster','detail','poster'])}${section('趣味视频',['fun','fun','dance','fun'])}${section('照片跳舞',['dance','dance','dance','dance'])}</div></div>${nav('home')}</section>`;
  }
  function inspiration() {
    const filtered=state.category==='推荐'?types.filter(t=>t!=='sentence'):types.filter(t=>typeMap[t].name===state.category);
    const list=filtered.length?filtered:['shop','drama','textvideo','imgvideo','dance','fun'];
    const items=[...list,...list,...list];
    const column = parity => `<div class="water-column">${items.filter((_,i)=>i%2===parity).map((t,i)=>`<div class="water-item">${tile(t,i>0?typeMap[t].sample+' · '+(i+1):typeMap[t].sample,'detail',true)}<span class="pill-tag category-badge">${typeMap[t].name}</span>${button(icon('spark')+' 做同款 <span>25.2w</span>','detail','same-mini',`data-type="${t}"`)}</div>`).join('')}</div>`;
    return `<section class="page">${top('灵感',false)}<div class="content" style="padding-bottom:0;padding-top:2px"><div class="chip-row" style="margin-bottom:12px">${['推荐',...types.filter(t=>t!=='sentence').map(t=>typeMap[t].name)].map(c=>button(c,'filter','chip '+(c===state.category?'active':''),`data-category="${c}"`)).join('')}${button('⌄','categories','chip','aria-label="全部分类"')}</div></div><div class="scroll"><div class="content" style="padding-top:4px"><div class="waterfall">${column(0)}${column(1)}</div></div></div>${nav('inspiration')}</section>`;
  }
  function memberBanner() {
    return state.member?`<div class="member-banner" data-action="subscribe" role="button" tabindex="0"><span class="balance-pro">PRO</span><span class="banner-copy"><strong>我的妙豆 ${balance().toLocaleString()}</strong></span>${button('去充值 ›','recharge','banner-action')}</div>`:
      `<button class="member-banner" data-action="subscribe">${bean('big')}<span class="banner-copy"><strong>妙创 PRO</strong><small>解锁 AI 创作资格 · 每周赠妙豆</small></span><span class="banner-action">去开通 ›</span></button>`;
  }
  function mine() {
    const all=state.mine==='收藏夹'?[]:state.jobs.filter(j=>typeMap[j.type].group===state.mine);
    const available=['全部',...new Set(all.map(j=>typeMap[j.type].name))];
    if(!available.includes(state.sub)) state.sub='全部';
    const list=state.sub==='全部'?all:all.filter(j=>typeMap[j.type].name===state.sub);
    const count = name => name==='全部'?all.length:all.filter(j=>typeMap[j.type].name===name).length;
    const card=j=>`<button class="work-card" data-action="work" data-id="${j.id}" aria-label="${typeMap[j.type].name} · ${j.status==='success'?'已生成':j.status==='failed'?'生成失败':'生成中'}"><img src="${j.image}" alt="${typeMap[j.type].name}作品">${video(j.type)?`<span class="play-small">${icon('film')}</span>`:''}${j.status==='generating'?'<span class="cover-state"><i class="spinner"></i>生成中…</span>':j.status==='failed'?`<span class="cover-state fail">${icon('alert')}生成失败</span>`:''}</button>`;
    return `<section class="page"><div class="scroll"><div class="profile-toolbar">${memberEntry()}${button(icon('settings'),'settings','','aria-label="设置"')}</div><button class="profile" data-action="profile"><span class="avatar">${icon('user')}</span><span><strong>${state.bound?esc(state.nickname):'去登录'}</strong>${!state.bound?'<p>一键AI，轻松创作爆款素材</p>':''}</span></button>${memberBanner()}${!state.member&&state.paid.some(p=>p.amount>0)?'<div class="expiry-note">会员已到期，充值妙豆已保留，重新开通会员后可继续使用。</div>':''}<div class="account-tabs">${['带货','视频','图片','收藏夹'].map(c=>button(c,'mine-tab',c===state.mine?'active':'',`data-category="${c}"`)).join('')}</div><div class="mine-content">${state.mine==='收藏夹'?`<div class="chip-row"><span class="chip active">全部 ${state.favorites.length}</span></div><div class="works-grid favorites">${state.favorites.map(t=>tile(t,'','detail',true)).join('')}</div>`:all.length?`<div class="chip-row">${available.map(c=>button(c+' '+count(c),'mine-filter','chip '+(c===state.sub?'active':''),`data-category="${c}"`)).join('')}</div><div class="works-grid">${list.map(card).join('')}</div><p class="end-note">每个好想法，都在这里留下痕迹</p>`:`<div class="empty">${icon('image')}<p>暂无作品生成</p>${button('去创作 ›','nav','text-button','data-page="home"')}</div>`}</div></div>${nav('mine')}</section>`;
  }
  const staticCreationPrompts = {
  "sales": {
    "tags": [
      "男声讲解",
      "女声讲解",
      "突出商品细节",
      "展示使用场景"
    ],
    "descriptions": [
      "使用自然清晰的男性声音讲解商品，先介绍它适合的使用场景，再结合画面说明核心特点。语气像向朋友分享好物，口播与商品展示保持同步。",
      "使用亲切自然的女性声音讲解商品，从日常需求切入，结合商品外观与使用画面介绍特点。语速适中，表达清楚，避免生硬地罗列参数。",
      "镜头先展示商品整体，再切换包装、材质和结构的近景特写。通过柔和侧光与缓慢推进突出质感，保持上传商品的外观、标识和包装一致，不编造原图未体现的功能。",
      "把上传商品放入符合其用途的日常场景，展示人物如何拿取、操作或使用商品。镜头在整体环境与使用细节之间切换，商品主体清晰，呈现自然真实的使用过程。"
    ]
  },
  "story": {
    "tags": [
      "甜宠短剧",
      "修仙神器",
      "霸总短剧",
      "冷宫嘲讽",
      "宫斗争宠",
      "港风TVB"
    ],
    "descriptions": [
      "生成甜宠短剧风格的带货视频：两位成年角色在日常相处中遇到一个小困扰，一方通过分享上传商品表达关心。用自然对话与温柔互动推进情节，让商品成为故事中的贴心细节，结尾留下甜蜜回味。",
      "生成修仙题材的带货小短剧：角色在修炼途中遇到难题，上传商品以修仙世界中的趣味道具登场。通过发现、展示、使用的情节突出商品外观与真实用途，仙侠效果仅作剧情表现，不把虚构能力说成商品功效。",
      "生成现代霸总风格的带货小短剧：职场中的成年角色因一次意外相遇展开对话，上传商品成为化解尴尬或表达关心的契机。人物气场鲜明，台词简洁，镜头自然带出商品细节。",
      "生成古装冷宫逆袭小短剧：主角起初受到冷落与嘲讽，随后借一个巧妙举动扭转局面。把上传商品融入角色的日常需求，通过人物反应与对话制造反差，结尾完成轻松解气的小反转。",
      "生成宫廷争宠题材的带货小短剧：角色为一场宫廷聚会精心准备，上传商品作为剧情中的关键好物登场。用含蓄交锋、人物表情和细节特写推进故事，保留商品原有包装与外观。",
      "生成经典港式都市电视剧氛围的带货小短剧：以街坊、茶餐厅或办公室里的生活冲突开场，用有来有回的口语对话推进情节。上传商品自然出现在解决日常需求的过程中，画面带温暖复古质感。"
    ]
  },
  "shop": {
    "tags": [
      "女生探店",
      "男生探店",
      "添加字幕"
    ],
    "descriptions": [
      "以一位成年女生作为探店主角，用自然亲切的口吻带观众走进上传图片中的门店。从门头和环境开始，再介绍图片中可见的特色内容，穿插人物体验与细节镜头，不虚构价格、优惠或实际体验结论。",
      "以一位成年男生作为探店主角，用轻松自然的口吻带观众探索上传图片中的门店。依次展示门头、空间氛围和特色细节，人物与镜头保持自然互动，不虚构图片中未提供的地址、价格或优惠。",
      "为探店视频添加与口播内容同步的中文字幕，短句分行，重点词适当突出。字幕放在画面下方安全区域，保持清晰易读，避免遮挡人物面部、门店招牌和主要展示内容。"
    ]
  },
  "drama": {
    "tags": [
      "3D国创",
      "都市言情",
      "都市漫画",
      "怀旧电影",
      "黏土风格",
      "美式漫画"
    ],
    "descriptions": [
      "将输入的想法改编为3D国创动画短剧，角色造型精致，服装与场景具有东方审美。用人物动作和简洁对话建立冲突，通过连贯镜头推动情节，保持角色形象与场景风格一致。",
      "将输入的想法改编为现代都市言情短剧，以成年角色的相遇、误会或心动为线索。突出人物眼神、表情和情绪变化，对话贴近日常，情节有明确起因与转折，画面自然细腻。",
      "将输入的想法改编为都市漫画风短剧，采用清晰线条、鲜明配色与现代城市背景。通过人物表情、对话和富有节奏的分镜呈现冲突，保持角色造型统一，让情节清楚易懂。",
      "将输入的想法拍成怀旧电影风短剧，使用柔和胶片颗粒、复古色调与符合时代氛围的场景。镜头节奏克制，用人物动作和对话推动故事，避免仅靠滤镜替代情节。",
      "将输入的想法改编为黏土动画短剧，人物与道具保留手工塑形的纹理，采用定格动画般的动作节奏。用清晰的场景关系、夸张表情与简短情节表现冲突，整体生动有趣。",
      "将输入的想法改编为美式漫画风短剧，使用粗线条、强烈明暗对比与富有张力的构图。以动态镜头、人物动作和简练对话表现故事，角色外形前后一致，情节衔接清晰。"
    ]
  },
  "novel": {
    "tags": [
      "都市漫画",
      "精怪传说",
      "民间故事",
      "国风写实",
      "古风仙侠",
      "温暖绘本",
      "3D卡通"
    ],
    "descriptions": [
      "把输入的小说或故事改编为都市漫画风视频，保留主要人物关系与关键情节。采用现代城市背景、清晰线条和鲜明配色，通过人物表情与连续分镜呈现故事，不添加与原文矛盾的设定。",
      "把输入的故事改编为精怪传说风视频，用山林、古宅或夜色营造神秘氛围。根据原文呈现精怪形象与人物遭遇，通过环境细节和悬念镜头推进情节，保持故事主线完整。",
      "把输入的故事改编为民间故事风视频，保留故事中的人物、事件与因果关系。以村落、集市或传统生活场景展开叙述，画面质朴生动，让关键转折通过人物行动自然发生。",
      "把输入的小说或故事改编为国风写实视频，人物服饰、建筑与器物符合故事背景。采用细腻自然的光影与写实质感，用连贯镜头还原关键情节，保持人物形象和时代设定一致。",
      "把输入的小说或故事改编为古风仙侠视频，依据原文呈现山门、云海、仙境与角色服饰。用镜头运动和适度特效表现修行与冲突，保留主要人物关系，不改变原文关键情节。",
      "把输入的故事改编为温暖绘本风视频，使用柔和配色、纸张纹理和手绘质感。通过舒缓的镜头与细腻表情呈现人物情感，保留原有故事主线，让画面像一本缓缓翻开的绘本。",
      "把输入的小说或故事改编为3D卡通视频，人物造型鲜明，表情生动，场景色彩协调。用连续动作和清楚的镜头关系呈现主要事件，保持角色外形一致，不遗漏关键情节。"
    ]
  },
  "poster": {
    "tags": [
      "突出商品卖点",
      "大标题醒目",
      "简约留白",
      "节日促销氛围"
    ],
    "descriptions": [
      "围绕上传商品设计宣传海报，以一个清晰的核心卖点作为视觉重点，搭配商品主体与简短辅助文案。只使用用户提供或图片可确认的信息，不添加未经提供的功效、销量或优惠。",
      "将海报主标题设为最醒目的文字层级，标题简短、字体清晰，与背景形成足够对比。商品主体与标题合理错位，辅助信息缩小呈现，避免文字遮挡商品关键细节。",
      "采用简约留白的海报布局，减少装饰元素，以干净背景、协调配色和柔和光影突出商品。保留清楚的标题与信息区域，让商品主体和文案都有足够的呼吸空间。",
      "根据用户指定的节日设计促销氛围海报，运用相关配色与少量节日元素衬托商品。标题突出活动主题，优惠信息仅采用用户提供的内容，未提供时不虚构折扣或限时承诺。"
    ]
  },
  "detail": {
    "tags": [
      "商品全貌",
      "材质细节",
      "卖点分区",
      "使用场景"
    ],
    "descriptions": [
      "清晰展示上传商品的完整外观，主体居中，构图留白适当，避免裁切包装与关键结构。保留商品比例、颜色、标识和包装文字，使用干净背景与均匀光线呈现整体形态。",
      "围绕上传商品可见的材质和结构制作细节展示图，以局部放大和近景呈现纹理、边缘及做工。保持商品真实外观，不凭空添加图片中无法确认的材质、认证或性能说明。",
      "将商品详情图划分为清晰的信息区块，每区突出一个用户提供的卖点，并搭配相应商品画面。使用统一标题层级和配色，避免堆砌文字，不虚构参数与功效。",
      "结合上传商品的实际用途设计日常使用场景，让商品在真实比例与合理环境中出现。通过整体场景与局部细节说明使用方式，保留商品原有形态，不添加未经确认的用途。"
    ]
  },
  "imgvideo": {
    "tags": [
      "照片动起来",
      "微笑",
      "跑起来",
      "戴墨镜",
      "眨眼"
    ],
    "descriptions": [
      "让上传照片自然动起来，保留原有主体、背景、构图与色彩。人物可有轻微呼吸和细小动作，环境元素随场景自然变化，镜头平稳缓慢推进，避免明显变形与闪烁。",
      "让上传图片中的人物或拟人主体自然露出微笑，表情从原有状态轻柔过渡，嘴角和眼神变化协调。保持面部特征、身份、服饰与背景一致，避免夸张拉伸或突然换脸。",
      "让上传图片中的主体向前跑动，动作连贯，身体重心与步伐协调，镜头平稳跟随。保留主体外形、服饰和原图风格，运动过程中避免肢体扭曲、主体复制或背景跳变。",
      "让上传图片中的人物或拟人主体抬手戴上一副墨镜，动作自然连贯，手部与眼镜位置准确衔接。保持人物身份、面部结构、服饰与背景一致，佩戴完成后稍作停留。",
      "让上传图片中的人物或拟人主体自然眨眼，眼睑闭合与睁开流畅，神态放松。保持五官、脸型和头部位置稳定，保留原图背景与质感，避免面部变形。"
    ]
  },
  "textvideo": {
    "tags": [
      "霓虹等车",
      "写实海边",
      "女生与猫",
      "写实猫咪",
      "跳舞熊猫",
      "赛博美女",
      "古风男子"
    ],
    "descriptions": [
      "夜晚的城市街头，一位成年人物站在公交站等车，霓虹招牌与路灯倒映在微湿的路面上。镜头从街景缓慢推进到人物侧脸，远处车辆驶过，衣角随风轻动，整体具有电影般的都市夜色氛围。",
      "写实摄影风格的海边，海浪一层层涌向沙滩，阳光照亮水面，海风轻拂岸边植物。镜头沿海岸线平稳移动，再靠近浪花与沙粒细节，色彩自然，海水运动真实连贯。",
      "温暖的室内窗边，一位成年女生坐在地毯上与一只猫互动。猫咪轻轻靠近并蹭她的手，她低头微笑，阳光透过窗帘落在人物与猫的身上，镜头缓慢推进，画面自然温馨。",
      "写实风格的一只猫坐在阳光下，毛发细节清晰，耳朵轻轻转动，随后抬头望向镜头并自然眨眼。镜头从全身缓慢靠近脸部，光线柔和，动作符合猫的身体结构。",
      "一只3D卡通熊猫在简洁明亮的舞台上跳舞，跟随轻快节奏摆动手臂、迈出小步并轻轻转身。保持全身入镜，动作连贯可爱，镜头稳定，熊猫造型前后一致。",
      "未来城市的夜晚，一位成年女性穿着具有科技感的服装走过霓虹街道，灯光在衣料与发丝上流动。镜头从侧后方平稳跟随，再切换面部近景，整体呈现鲜明的赛博朋克氛围。",
      "一位古风成年男子身着长袍站在庭院中，微风吹动衣袖与发丝。他缓缓转身望向远处，镜头穿过前景枝叶平稳推进，建筑与服饰风格统一，画面具有东方电影质感。"
    ]
  }
};
  function editor(type, previewPrompts=null) {
    const m=typeMap[type],d=draft(type);
    const samples=[0,1,2,3].map((_,i)=>tile(type,i?m.sample+' '+(i+1):m.sample,'sample',video(type))).join('');
    const needsImage=!m.text;
    const upload=needsImage?`<h3 class="field-title">${m.group==='带货'?'上传商品图':'上传图片'}</h3><div class="upload-box ${d.image?'has-image':''}" data-action="upload" data-type="${type}" role="button" tabindex="0" aria-label="${m.group==='带货'?'上传商品图':'上传图片'}">${d.image?`<img src="${d.image}" alt="已上传的图片">${button(icon('close'),'remove-photo','upload-remove',`data-type="${type}" aria-label="移除图片"`)}`:`${icon('upload')}<span>${m.group==='带货'?'上传商品图':'上传图片'}</span><small>图片支持jpg/png格式，文件大小不超过10M</small>`}</div>`:'';
    const param=(name,key,value,choices=true)=>`<button class="param-item" data-action="param" data-key="${key}" data-type="${type}" ${choices?'':'disabled'}><small>${name}</small><span>${value}</span>${choices?icon('next'):''}</button>`;
    return `<section class="page">${top(m.name)}<div class="scroll"><div class="edit-content"><h3 style="font-size:15px">热门案例</h3><p class="sample-note">点击预览下方素材，查看创意描述示例</p><div class="sample-strip">${samples}</div>${upload}<section class="prompt-module"><h3>创意描述</h3><div class="prompt-editor"><textarea id="creative-prompt" data-type="${type}" maxlength="2000" placeholder="${m.hint}" aria-label="创意描述">${esc(d.prompt)}</textarea>${button(icon('spark')+m.ai,'writer','ai-inline',`data-type="${type}"`)}</div><div class="prompt-actions">${button('清空','clear-prompt','',`data-type="${type}" style="${d.prompt?'':'visibility:hidden'}"`)}<span class="counter">${d.prompt.length}/2000</span></div><div class="keywords${previewPrompts?' static-prompt-tags':''}">${(previewPrompts?previewPrompts.tags:(m.image?['突出商品细节','简洁留白','柔和自然光']:m.text?['情节连贯','人物特写','节奏自然流畅']:['突出主体细节','生活使用场景','镜头缓慢推进','柔和自然光'])).map((k,i)=>button(k,'keyword',previewPrompts&&i===0?'selected':'',`data-type="${type}" data-word="${k}" ${previewPrompts?`aria-pressed="${i===0}"`:''}`)).join('')}</div></section><h3 class="field-title">生成参数</h3><div class="param-grid">${param('比例','ratio',d.params.ratio)}${!m.image?param('时长','duration',d.params.duration)+param('清晰度','quality',d.params.quality):''}${param('模型','model',d.params.model,false)}</div></div></div>${foot(generateButton(type))}</section>`;
  }
  function validDraft(type) {const m=typeMap[type],d=draft(type);return Boolean(d.prompt.trim()&&(m.text||d.image));}
  function generateButton(type,template=false) {
    const valid=template?Boolean(draft(type).image):validDraft(type);
    return `<div class="edit-foot">${button(icon('spark')+(template?'立即生成':'开始创作')+(state.member?`<span class="generate-amount">· ${usageFor(type)} 妙豆</span>`:''),'generate','primary',`data-type="${type}" ${valid?'':'disabled'}`)}${state.member?'<p class="footer-rate">提交成功时扣除妙豆 · <button data-action="rates">查看用量表</button></p>':''}</div>`;
  }
  const subscriptionCopy = {
    sales:{perk:'商品变视频',hero:'不会说也能带货，AI帮你生成讲解视频'},
    story:{perk:'好物融剧情',hero:'短剧+带货太香了，爆单大卖'},
    shop:{perk:'引流利器',hero:'上传门店照，轻松制作引流视频'},
    drama:{perk:'脑洞变好戏',hero:'输入想法，生成短剧'},
    novel:{perk:'小说变视频',hero:'把小说/故事轻松变成视频'},
    poster:{perk:'上新做海报',hero:'只需一句话，轻松做出商品海报'},
    detail:{perk:'卖点看得懂',hero:'上传商品图，自动生成详情页'},
    fun:{perk:'照片玩花样',hero:'选个热门玩法，让照片玩出花样'},
    imgvideo:{perk:'静态变动态',hero:'一张静态图，轻松变成视频'},
    textvideo:{perk:'一句话成片',hero:'你说画面，AI来拍'},
    dance:{perk:'照片起舞',hero:'不用练舞，一张照片惊艳开跳'},
    portrait:{perk:'百变写真',hero:'一张自拍，解锁百变风格写真'},
    idphoto:{perk:'自然上镜',hero:'不跑照相馆，也有上镜证件照'}
  };
  const showcaseOriginals={sales:'product.jpg',story:'product.jpg',shop:'shop-cover.jpg',poster:'product.jpg',detail:'product.jpg',fun:'art.jpg',imgvideo:'beauty.jpg',dance:'face.jpg',portrait:'face.jpg',idphoto:'face.jpg'};
  const showcaseOriginal = type => showcaseOriginals[type];
  const showcaseSourceTexts={
    drama:'雨夜，年轻侠客收到一封故人的来信。他循线来到旧宅，却发现寄信的人早已失踪。门外忽然响起熟悉的脚步声……',
    novel:'她独自立于雪山之巅，手中的古卷忽然泛起微光。沉寂百年的山门缓缓开启，那个传说中的名字，再次回荡在风雪中。',
    textvideo:'清晨的果园，阳光穿过枝叶，露珠挂在成熟的果实上。微风吹动绿叶，镜头缓缓推进，呈现清新自然的田园画面。'
  };

  const subscriptionFeatures = ['sales','story','shop','drama','novel','poster','detail','fun','imgvideo','textvideo','dance','portrait','idphoto'].map(type=>({type,...typeMap[type],caption:subscriptionCopy[type].hero}));
  const subscriptionPlans = {week:{name:'周会员',gift:600,days:7,original:88},year:{name:'年会员',gift:1800,days:365,original:298}};
  const selectedSubscription = () => state.member ? (state.memberPlan||'week') : 'week';
  const subscriptionPrice = plan => plan==='year'?198:state.weekPurchased?68:9.9;
  const renewalNote = plan => plan==='year'?'¥198/年自动续费，每期一次发放1800妙豆，可随时取消':state.weekPurchased?'¥68/周自动续费，每期发放600妙豆，可随时取消':'首周¥9.9，到期¥68/周自动续费，每期发放600妙豆，可随时取消';
  const subscriptionPerks = [
    {icon:'bag',kind:'gift'},
    {icon:'grid',title:'500+灵感模板',desc:'创作不断档'},
    ...['sales','story','shop','drama','novel','poster','detail','fun','imgvideo','textvideo','dance','portrait','idphoto'].map(type=>({icon:typeMap[type].icon,title:typeMap[type].name,desc:subscriptionCopy[type].perk,hot:['sales','story','shop','drama','detail'].includes(type)})),
    {icon:'spark',title:'AI帮写',desc:'免费帮写'},
    {icon:'receipt',title:'专享充值资格',desc:'按需加购'}
  ];
  const renderSubscriptionPerks = items => items.map(({icon:i,kind,title,desc,hot})=>{
    if(kind==='gift'){
      const year=selectedSubscription()==='year';
      title='充值加赠';
      desc='600妙豆';
    }
    return `<div class="subscription-perk${kind==='gift'?' subscription-gift-perk':''}">${icon(i)}${hot?'<em class="subscription-hot">Hot</em>':''}<strong>${title}</strong><small>${desc}</small></div>`;
  }).join('');
  function selectSubscriptionPlan(plan){
    if(state.member||plan!=='week')return;
    state.subscriptionPlan=plan;
    // 原位更新套餐相关节点，不重绘页面、不触碰滚动位置或视频。
    document.querySelectorAll('.subscription-plans [data-plan]').forEach(card=>{
      const active=card.dataset.plan===plan;
      card.classList.toggle('selected',active);card.setAttribute('aria-pressed',String(active));
      $('.plan-radio',card).innerHTML=active?icon('check'):'';
    });
    const note=$('.subscription-charge-note',app);if(note)note.textContent=renewalNote(plan);
    const gift=$('.subscription-gift-perk',app);
    if(gift){$('strong',gift).textContent='充值加赠';$('small',gift).textContent='600妙豆';}
  }
  // 原型示例评价，后续可替换为经授权的真实评价。
  const subscriptionReviews=[
    {name:'小**铺',avatar:'face.jpg',text:'以前上新最头疼拍视频，现在先用商品图做一版，换个卖点就能继续试，小店也有了自己的内容节奏。'},
    {name:'阿**探店',avatar:'shop-cover.jpg',text:'店里拍几张照片，就能整理成探店内容。环境、招牌菜都能讲到，比对着空白剪辑页发愁轻松多了。'},
    {name:'橙**日记',avatar:'beauty.jpg',text:'最喜欢先看模板找感觉，选好风格再做同款。不用每次从零想，空闲时间也能认真做点内容。'},
    {name:'林**好物',avatar:'sales-video.jpg',text:'剧情带货挺有意思，不用一开口就介绍参数。把商品放进小故事里，表达自然多了。'},
    {name:'追**的人',avatar:'wuxia.jpg',text:'脑子里有故事，又不会拍。先把一段情节做成短剧，看见人物和画面动起来，真的更有创作动力。'},
    {name:'苏**书单',avatar:'novel-cover.jpg',text:'做小说推文终于不用只放几张图了。把喜欢的情节变成画面，再慢慢调整，挺容易进入状态。'},
    {name:'一**设计',avatar:'art.jpg',text:'上新海报和商品详图能放在一起做，风格也更好统一。一个人打理店铺，少切几个工具就很省心。'},
    {name:'糖**同学',avatar:'beauty.jpg',text:'给照片换个写真风格，或者做段跳舞视频，都挺好玩。同一张照片能试出好多不一样的感觉。'},
    {name:'陈**创作',avatar:'face.jpg',text:'AI帮写是我常用的功能。先有个方向，再改成自己的表达，比一直卡在第一句话上舒服多了。'},
    {name:'慢**生活',avatar:'shop-cover.jpg',text:'想法有了就先做出来，不用等设备、等时间。从商品展示到日常小视频，一个地方就能接着做。'}
  ];
  // 原型弹幕占位内容：与功能切换独立，后续替换为已核实、获授权的评价。
  const subscriptionDanmaku=[
    '新手7天起号，就出了百万级的作品',
    '探店视频太方便了，客流翻10倍',
    '探店带货＋小说推文，效率×10',
    'GPT生图模型，做电商图太方便了',
    '小说推文神器，单条视频涨粉过千',
    '小白也能做电影质感的短剧了',
    '新人0帧起手，电商人爆单神器',
    '商品图传上去就能做，真的省事',
    '以前拍一天的素材，现在自己就能搞定',
    '不用露脸也能带货，终于轮到我了',
    '短剧里植入商品，这种带货有点东西',
    '一个商品试了几个模板，根本停不下来',
    '不会拍不会剪，居然也做出成片了',
    '海报和带货视频一起做，上新轻松多了',
    '一个人撑起一家店，素材这块总算不愁了'
  ];
  function subscriptionDanmakuHTML(){
    return `<div class="showcase-danmaku" aria-label="创作评价弹幕">${subscriptionDanmaku.map((text,i)=>`<div class="showcase-danmaku-item" style="--danmaku-delay:${i*4.5}s;--danmaku-lane:${i%3}"><img src="${A(subscriptionReviews[i%subscriptionReviews.length].avatar)}" alt="" draggable="false"><span>${esc(text)}</span></div>`).join('')}</div>`;
  }
  let subscriptionReviewIndex=0,subscriptionReviewTimer;
  function reviewCard(index=subscriptionReviewIndex){const r=subscriptionReviews[index];return `<div class="subscription-review-person"><img src="${A(r.avatar)}" alt="${r.name}的头像"><strong>${r.name}</strong><span class="subscription-review-member">周会员</span><span class="subscription-review-stars" aria-label="5星评价">★★★★★</span></div><p class="subscription-review-text">${r.text}</p>`;}
  function changeSubscriptionReview(step){
    const previousIndex=subscriptionReviewIndex;
    subscriptionReviewIndex=(subscriptionReviewIndex+step+subscriptionReviews.length)%subscriptionReviews.length;
    const card=$('#subscription-review-card');if(!card)return;
    card.innerHTML=`<div class="subscription-review-slide review-slide-out" aria-hidden="true">${reviewCard(previousIndex)}</div><div class="subscription-review-slide review-slide-in">${reviewCard()}</div>`;
  }
  function syncSubscriptionReviews(){
    clearInterval(subscriptionReviewTimer);
    if(route.page!=='subscribe'||document.hidden)return;
    subscriptionReviewTimer=setInterval(()=>{
      const section=$('.subscription-reviews');
      if(overlay||!section)return;
      changeSubscriptionReview(1);
    },3000);
  }
  let subscriptionFeature = 'sales', showcaseTimer, showcaseFrame;
  let creatorCount=5668,creatorCountTimer;
  function syncCreatorCount(){
    clearInterval(creatorCountTimer);
    if(route.page!=='subscribe'||state.member||document.hidden||creatorCount>=7188)return;
    creatorCountTimer=setInterval(()=>{
      creatorCount=Math.min(7188,creatorCount+1+Math.floor(Math.random()*3));
      const number=$('#subscription-creator-count');
      if(number)number.textContent=creatorCount.toLocaleString('en-US');
      if(creatorCount>=7188)clearInterval(creatorCountTimer);
    },2000);
  }
  const showcase = {muted:true,progress:0,failed:new Set()};
  function saveShowcase() {
    const media=$('#subscription-video');
    if(media){if(media.getAttribute('src')&&media.dataset.feature===subscriptionFeature)showcase.progress=media.currentTime||0;showcase.muted=media.muted;media.pause();}
    clearTimeout(showcaseTimer);cancelAnimationFrame(showcaseFrame);
  }
  function nextShowcase() {
    if(route.page!=='subscribe'||overlay||document.hidden)return;
    const available=subscriptionFeatures.filter(f=>!showcase.failed.has(f.type));
    if(!available.length)return;
    const current=subscriptionFeatures.findIndex(f=>f.type===subscriptionFeature);
    for(let step=1;step<=subscriptionFeatures.length;step++){
      const f=subscriptionFeatures[(current+step)%subscriptionFeatures.length];
      if(!showcase.failed.has(f.type)){selectShowcase(f.type);break;}
    }
  }
  function selectShowcase(type){
    saveShowcase();subscriptionFeature=type;showcase.progress=0;
    const f=subscriptionFeatures.find(x=>x.type===type),media=$('#subscription-video'),cover=$('#showcase-cover');
    if(!media||!f)return;
    media.removeAttribute('src');media.load();media.dataset.feature=type;media.poster=A(f.img);media.hidden=false;
    cover.src=A(f.img);cover.alt=f.name+'效果占位';cover.classList.remove('placeholder-motion');void cover.offsetWidth;
    $('.subscription-hero-copy h1').textContent=f.name;$('.subscription-hero-copy p').textContent=f.caption;
    $('#showcase-status').textContent=window.subscriptionMedia?.[type]?'创作效果示例':'动态封面 · 视频素材占位';
    const original=$('#showcase-original'),originalSource=showcaseOriginal(type);if(original){original.hidden=!originalSource;if(originalSource){original.querySelector('img').src=A(originalSource);original.querySelector('img').alt=f.name+'上传原图';}}
    const sourceText=$('#showcase-source-text');if(sourceText){const text=showcaseSourceTexts[type]||'';sourceText.hidden=!text;sourceText.querySelector('p').textContent=text;}
    document.querySelectorAll('.subscription-feature-tabs button').forEach(tab=>{const active=tab.dataset.type===type;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));});
    document.querySelectorAll('.showcase-dots button').forEach(dot=>{const active=dot.dataset.type===type;dot.classList.toggle('active',active);dot.setAttribute('aria-current',String(active));});
    mountShowcase();
  }
  function mountShowcase() {
    clearTimeout(showcaseTimer);cancelAnimationFrame(showcaseFrame);
    if(route.page!=='subscribe'||overlay||document.hidden)return;
    const f=subscriptionFeatures.find(x=>x.type===subscriptionFeature),media=$('#subscription-video');
    if(!media)return;
    media.muted=showcase.muted;
    const configured=window.subscriptionMedia?.[f.type];
    if(configured){
      media.src=configured;
      media.onloadedmetadata=()=>{media.currentTime=Math.min(showcase.progress,Math.max(0,media.duration-.1));media.play().catch(()=>{const hint=$('#showcase-play');if(hint)hint.hidden=false;});};
      media.onended=()=>{showcase.progress=0;nextShowcase();};
      media.onerror=()=>{showcase.failed.add(f.type);const label=$('#showcase-status');if(label)label.textContent='视频暂不可用 · 展示封面';showcaseTimer=setTimeout(nextShowcase,1200);};
    }else{
      // 现有项目仅有图片；用已有封面生成本地动态占位，不向外部服务请求素材。
      media.hidden=true;
      const image=$('#showcase-cover');image.classList.add('placeholder-motion');
      image.style.animationDelay=`-${showcase.progress}s`;
      const started=performance.now(),offset=showcase.progress;
      const tick=()=>{if(route.page!=='subscribe'||overlay||document.hidden)return;showcase.progress=Math.min(6,offset+(performance.now()-started)/1000);showcaseFrame=requestAnimationFrame(tick);};
      showcaseFrame=requestAnimationFrame(tick);
      showcaseTimer=setTimeout(()=>{showcase.progress=0;nextShowcase();},Math.max(100,6000-offset*1000));
    }
    const tabs=$('.subscription-feature-tabs');const active=$('[role="tab"][aria-selected="true"]',tabs);
    if(active)tabs.scrollLeft=Math.max(0,active.offsetLeft-tabs.offsetLeft-tabs.clientWidth/2+active.clientWidth/2);
  }
  const newcomerSlides=[
    {type:'sales',tag:'一图成片',title:'视频带货',text:'不用搭场景、拍素材，上传商品图，把卖点变成一段值得看的带货视频。'},
    {type:'story',tag:'剧情带货',title:'AI剧情带货',text:'短剧+带货太香了，把商品放进情节，一定爆单大卖！'},
    {type:'drama',tag:'AI短剧',title:'AI短剧',text:'写下一句话，让AI帮你展开剧情。人物、冲突、反转，从一个灵感开始。'},
    {type:'fun',img:'novel-cover.jpg',tag:'不止带货',title:'创意还有更多玩法',text:'小说推文、文生视频，把故事变成画面；海报、写真、照片跳舞，让每个想法都有新玩法。'}
  ];
  const newcomerSubtitleLines=[['不用搭场景、拍素材，上传商品图，','把卖点变成一段值得看的带货视频。'],['短剧+带货太香了，','把商品放进情节，一定爆单大卖！'],['写下一句话，让AI帮你展开剧情。','人物、冲突、反转，从一个灵感开始。'],['小说推文、文生视频，把故事变成画面；','海报、写真、照片跳舞，让每个想法都有新玩法。']];
  function newcomerPage(){
    const step=Math.min(3,Math.max(0,Number(route.step)||0)),slide=newcomerSlides[step],m=typeMap[slide.type];
    const original=step<2?showcaseOriginal(slide.type):null;
    return `<section class="page newcomer-page">${step>0?button(icon('back'),'newcomer-back','newcomer-back','aria-label="返回上一页"'):''}<div class="newcomer-media"><img src="${A(slide.img||m.img)}" alt="${slide.title}创作效果示例">${original?`<figure class="showcase-original newcomer-original"><img src="${A(original)}" alt="${m.name}上传原图"><figcaption>原图</figcaption></figure>`:''}${slide.type==='drama'?`<aside class="showcase-source-text newcomer-source-text" aria-label="创作原文"><span>原文</span><p>${esc(showcaseSourceTexts.drama)}</p></aside>`:''}</div><div class="newcomer-copy"><h1>${slide.title}</h1><p>${newcomerSubtitleLines[step].map(line=>`<span class="newcomer-subtitle-line">${line}</span>`).join('')}</p>${button('继续','newcomer-next','primary newcomer-continue')}</div></section>`;
  }
  function finishNewcomer(){
    state.subscriptionOrigin={page:'home'};state.subscriptionPlan='week';history=[];
    navigate(state.onboardingSource==='campaign'?'campaign-subscribe':'subscribe',{},false);
    state.subscriptionOrigin={page:'home'};
  }
  function campaignSubscription(){
    return `<section class="page campaign-subscribe-page"><div class="campaign-media"><img src="${A('sales-video.jpg')}" alt="视频带货创作效果示例"></div>${button(icon('close'),'newcomer-close','campaign-close','aria-label="关闭订阅页，进入首页"')}<div class="campaign-offer"><div class="campaign-social"><span class="social-avatars" role="img" aria-label="创作者头像"><i></i><i></i><i></i></span><span>已有5,668位创作者抢先解锁AI创作</span></div><h1>500+灵感模板，让想法轻松成片</h1><p class="campaign-subtitle">1杯咖啡钱，解锁你的创作主场</p>${button('继续','pay-subscribe','primary subscription-buy')}<div class="subscription-agreement"><input type="checkbox" id="subscription-agreement" aria-label="同意会员服务协议" ${state.subscriptionAgreement===false?'':'checked'}><span><label for="subscription-agreement">支付即代表同意</label><button data-action="legal" data-title="用户服务协议">《用户服务协议》</button>和<button data-action="legal" data-title="付费会员服务协议">《付费会员服务协议》</button>，开通自动续费，${renewalNote('week').replace('，每期发放600妙豆','')}。</span></div>${button('恢复购买','restore','subscription-restore')}</div></section>`;
  }
  function subscribe() {
    const f=subscriptionFeatures.find(x=>x.type===subscriptionFeature)||subscriptionFeatures[0],plan=selectedSubscription(),p=subscriptionPlans[plan];
    return `<section class="page pay-page subscription-page">

      <div class="scroll subscription-scroll">
        <section class="subscription-showcase">
          <header class="subscription-nav">${button(icon('back'),'back','subscription-close','aria-label="返回"')}${button(bean()+'<b>'+balance().toLocaleString()+'</b><span>充值 ›</span>','recharge','subscription-balance','aria-label="余额 '+balance()+' 妙豆，充值"')}</header>
          <img id="showcase-cover" src="${A(f.img)}" alt="${f.name}效果占位" class="subscription-hero-image" draggable="false">
          <video id="subscription-video" data-feature="${f.type}" playsinline preload="metadata" poster="${A(f.img)}" ${showcase.muted?'muted':''}></video>
          <span class="subscription-example" id="showcase-status">${window.subscriptionMedia?.[f.type]?'创作效果示例':'动态封面 · 视频素材占位'}</span>
          <figure class="showcase-original" id="showcase-original" ${showcaseOriginal(f.type)?'':'hidden'}><img src="${A(showcaseOriginal(f.type)||'product.jpg')}" alt="${f.name}上传原图" draggable="false"><figcaption>原图</figcaption></figure>
          <aside class="showcase-source-text" id="showcase-source-text" aria-label="创作原文" ${showcaseSourceTexts[f.type]?'':'hidden'}><span>原文</span><p>${esc(showcaseSourceTexts[f.type]||'')}</p></aside>
          ${subscriptionDanmakuHTML()}
          <div class="subscription-hero-copy"><h1>${f.name}</h1><p>${f.caption}</p></div>
          ${button(icon('play'),'showcase-play','showcase-play','id="showcase-play" hidden aria-label="播放视频"')}
          ${button(icon(showcase.muted?'muted':'volume'),'showcase-sound','showcase-sound',`aria-label="${showcase.muted?'开启':'关闭'}声音" aria-pressed="${!showcase.muted}"`)}<div class="showcase-dots" role="group" aria-label="切换创作展示">${subscriptionFeatures.map(x=>button('','subscription-feature','showcase-dot'+(x.type===f.type?' active':''),`data-type="${x.type}" aria-label="查看${x.name}" aria-current="${x.type===f.type}"`)).join('')}</div>
        </section>
        <div class="subscription-feature-tabs" role="tablist" aria-label="创作效果示例">${subscriptionFeatures.map(x=>`<button role="tab" aria-selected="${x.type===f.type}" class="${x.type===f.type?'active':''}" data-action="subscription-feature" data-type="${x.type}">${icon(x.icon)}<span>${x.name}</span></button>`).join('')}</div>
        <div class="subscription-body">
          ${state.member?'':`<div class="subscription-heading"><div class="subscription-title-main"><h2>开通会员<span>一键解锁全站AI创作</span></h2><div class="subscription-title-count"><em>100<span>+</span></em><span>AI创作玩法<br>持续更新中</span></div></div></div>`}
          ${state.member?`<div class="subscription-member-status"><strong>当前订阅：PRO${p.name}</strong>${state.autoRenew===false?`<span>会员权益将于 ${(()=>{const d=new Date(state.memberUntil||Date.now()+p.days*86400000);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');})()} 到期</span>`:''}</div>`:`
          <div class="subscription-plans" role="group" aria-label="会员套餐"><button class="subscription-plan weekly-plan selected" data-action="subscription-plan" data-plan="week" aria-pressed="true"><span class="weekly-plan-info"><strong>周会员</strong><span class="weekly-offer-label">${state.weekPurchased?'周订阅':'新用户专享1.1折'}</span></span><span class="weekly-plan-pricing"><span class="weekly-price-line"><span class="subscription-plan-price"><small>¥</small>${subscriptionPrice('week')}</span></span><span class="weekly-price-meta"><del class="weekly-original-price">¥88</del><span class="plan-daily">仅¥${(subscriptionPrice('week')/7).toFixed(2)}/天</span></span></span><i class="plan-radio">${icon('check')}</i></button></div>
          <p class="subscription-charge-note">${renewalNote(plan)}</p>`}
          <section class="subscription-rights"><div class="subscription-section-heading"><h3><em>100+</em> 创作玩法，会员尊享</h3>${button('权益对比 ›','subscription-compare','rights-compare')}</div><div class="confirmed-perks">${renderSubscriptionPerks(subscriptionPerks.slice(0,12))}</div></section>
          <section class="subscription-reviews" aria-label="用户评价轮播"><div class="subscription-review-heading"><h3>用户评价</h3></div><div id="subscription-review-card"><div class="subscription-review-slide">${reviewCard()}</div></div></section>
        </div>
      </div>
      ${state.member?'':foot(`<div class="subscription-social"><span class="social-avatars" role="img" aria-label="创作者头像逐个出现"><i></i><i></i><i></i></span><span>已有 <b id="subscription-creator-count">${creatorCount.toLocaleString('en-US')}</b> 位创作者抢先解锁AI创作</span></div>${button(state.member?'会员有效期内':'立即订阅','pay-subscribe','primary subscription-buy',state.member?'disabled':'')}<div class="subscription-agreement"><input type="checkbox" id="subscription-agreement" aria-label="同意会员服务协议" ${state.subscriptionAgreement===false?'':'checked'}><span><label for="subscription-agreement">支付即代表同意</label><button data-action="legal" data-title="用户服务协议">《用户服务协议》</button>和<button data-action="legal" data-title="付费会员服务协议">《付费会员服务协议》</button></span></div>${button('恢复购买','restore','subscription-restore')}`)}
    </section>`;
  }
  function rechargeContent() {
    if(!state.member)return `<div class="recharge-balance"><span>${bean()}我的妙豆</span><strong>${balance().toLocaleString()}</strong></div><div class="guest-recharge"><span>${icon('crown')}</span><h3>开通会员，开启创作</h3>${button('开通会员得妙豆','guest-recharge-back','primary')}</div>`;
    return `${state.rechargeReason==='insufficient'?`<div class="recharge-shortfall"><h3>妙豆不足，充值后继续创作</h3><p>本次需要 ${state.rechargeUsage} 妙豆，还差 <strong>${Math.max(0,state.rechargeUsage-balance())}</strong> 妙豆</p></div>`:''}<div class="recharge-balance"><span>${bean()}当前妙豆</span><strong>${balance().toLocaleString()}</strong></div><div class="recharge-grid">${RECHARGE_PACKS.map((p,i)=>`<button class="pack ${p.bonus?'has-bonus':''} ${state.pack===i+1?'active':''}" data-action="pack" data-pack="${i+1}" aria-pressed="${state.pack===i+1}">${(p.bonus?`加赠${Math.ceil(p.bonus/p.amount*100)}%`:({600:'新人首选',1000:'87%人选择'})[p.amount])?`<span class="pack-badge">${(p.bonus?`加赠${Math.ceil(p.bonus/p.amount*100)}%`:({600:'新人首选',1000:'87%人选择'})[p.amount])}</span>`:''}<strong>${p.amount.toLocaleString()}<small>妙豆</small></strong><small class="pack-price">¥${p.price}</small>${p.bonus?`<span class="pack-bonus"><span>加赠${p.bonus}妙豆</span>${bean('bonus-bean')}<span class="pack-bubbles" aria-hidden="true">${bean('bubble bubble-one')}${bean('bubble bubble-two')}${bean('bubble bubble-three')}</span></span>`:''}</button>`).join('')}</div>${rechargeActions()}`;
  }
  function selectRechargePack(pack) {
    if(!Number.isInteger(pack)||pack<1||pack>RECHARGE_PACKS.length)return;
    state.pack=pack;
    document.querySelectorAll('.recharge-grid [data-action="pack"]').forEach(node=>{
      const selected=Number(node.dataset.pack)===pack;
      node.classList.toggle('active',selected);
      node.setAttribute('aria-pressed',String(selected));
    });
    // Keep the stored drawer content current without replacing any live elements.
    if(overlay?.kind==='recharge')overlay.body=rechargeContent();
  }
  function rechargeActions() {
    return `<div class="recharge-actions">${button('确认充值','pay-pack','primary')}<div class="recharge-agreement"><input type="checkbox" id="recharge-agreement" aria-label="同意充值服务协议" ${state.rechargeAgreement===false?'':'checked'}><span><label for="recharge-agreement">支付即代表同意</label><button data-action="legal" data-title="用户服务协议">《用户服务协议》</button>和<button data-action="legal" data-title="付费会员服务协议">《付费会员服务协议》</button></span></div></div>`;
  }
  function showRecharge() {
    drawer('妙豆充值',rechargeContent(),'','recharge');
  }
  function recharge() {
    return `<section class="page recharge-page">${top('妙豆充值',true,state.member?button('妙豆明细','ledger','recharge-ledger-entry'):'')}<div class="scroll"><div class="content">${rechargeContent()}</div></div></section>`;
  }
  function ledgerPage() {
    const tab = state.ledgerTab || '全部';
    const rows = state.ledger.filter(r => tab === '全部' || (tab === '消耗' ? r.negative : !r.negative));
    const category = r => {
      if(/失败/.test(r.title)) return (r.type || '')+'生成失败返还';
      if(/到期|清零|过期/.test(r.title)) return '订阅赠送妙豆过期';
      if(/赠送/.test(r.title)) return '订阅赠送妙豆';
      if(r.title==='妙豆充值') return '充值妙豆';
      if(r.negative && /生成/.test(r.title)) return r.type ? r.type+'生成' : '生成消耗';
      return r.title;
    };
    const ledgerTime = ts => {
      const d=new Date(ts),pad=n=>String(n).padStart(2,'0');
      return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    return `<section class="page ledger-page">${top('妙豆明细',true,button('妙豆规则','bean-rules','recharge-ledger-entry'))}
      <div class="ledger-tabs" role="tablist" aria-label="妙豆收支类型">${['全部','消耗','获取'].map(t => `<button role="tab" aria-selected="${tab===t}" class="${tab===t?'active':''}" data-action="ledger-tab" data-tab="${t}">${t}</button>`).join('')}</div>
      <div class="scroll"><div class="content"><p class="table-note">以下为妙豆收支记录，生成用量按所选功能和规格计算。</p>${rows.length?rows.map(r=>`<div class="list-row"><span class="ledger-icon">${icon(r.negative?'receipt':'spark')}</span><div><strong>${esc(category(r))}</strong><small>${ledgerTime(r.time)}</small></div><span class="change ${r.negative?'negative':''}">${r.change}</span></div>`).join(''):'<div class="empty">'+icon('receipt')+'<p>暂无'+(tab==='全部'?'妙豆':tab)+'记录</p></div>'}</div></div></section>`;
  }
  function beanRulesPage() {
    return `<section class="page bean-rules-page">${top('妙豆规则')}<div class="scroll"><article class="bean-rules-content">
      <section><h3>1. 什么是妙豆？</h3><p>妙豆是妙创AI内用于图片生成、视频生成等AI创作服务的虚拟用量单位，生成作品时按页面提示消耗。</p><p>妙豆仅限当前绑定账号在妙创AI内使用，不具有现金价值，不可兑换现金，也不支持跨账号转移、赠与或交易。</p></section>
      <section><h3>2. 妙豆的获取、消耗与有效期</h3><table><thead><tr><th>妙豆类型</th><th>获取／使用方式</th><th>有效期说明</th></tr></thead><tbody><tr><td>会员赠送妙豆</td><td>开通或续费会员后，按所购套餐发放；具体发放额度以订阅页公示为准。</td><td>仅限当前订阅周期使用，到期清零，不累计至下一期。</td></tr><tr><td>充值妙豆</td><td>有效会员可通过妙豆充值页购买，到账数量以购买页面为准。</td><td>自购买之日起1年内有效。</td></tr><tr><td>妙豆消耗</td><td>图片、视频生成任务提交成功时扣除；生成成功不重复扣取。AI帮写不额外扣豆。</td><td>实时扣除</td></tr></tbody></table></section>
      <section><h3>3. 妙豆的扣除顺序</h3><p>优先使用当前周期的会员赠送妙豆，不足部分再扣除充值妙豆。多笔充值妙豆按到账先后依次使用。</p></section>
      <section><h3>4. 妙豆与会员的关系</h3><p>会员提供AI创作资格，妙豆用于支付具体生成任务的用量。开通会员后，图片和视频生成仍需消耗妙豆。</p><p>仅有效会员可充值和使用妙豆。取消自动续费不影响当期权益，会员到期后暂停新建生成任务；赠送妙豆清零，有效期内的充值妙豆保留，重新开通会员后可继续使用。</p><p>到期前已提交的生成任务继续处理，历史作品可查看、下载和删除，请在作品保存期限内及时下载。</p></section>
      <section><h3>5. 生成失败与退回</h3><p>提交失败不扣妙豆；系统生成失败时，已扣妙豆按原来源退回，可在妙豆明细中查看。</p><p>若原赠豆所属周期已结束，该部分退回后仍按到期规则清零，不延长有效期；充值妙豆退回原余额。</p><p>生成成功后再次生成或重试，将作为新的任务计算用量。</p></section>
      <section><h3>6. 妙豆充值与订单处理</h3><p>购买前请确认账号、妙豆数量及支付金额。支付完成并核验成功后发放妙豆，请勿重复支付。</p><p class="bean-rules-charge-notice">会员用户可以通过充值获得妙豆。如您选择通过人民币充值获得妙豆，需要提示您妙豆充值服务为收费服务，妙豆为虚拟商品，采用先收费后服务的方式。请您仔细阅读以下条款，并在理解和同意的前提下继续使用本产品：<br>妙豆充值成功后，将不支持退款或反向兑换为人民币。</p></section>
      <section><h3>7. 收费与用量标准</h3><p>会员套餐、充值档位及优惠以购买页面展示为准。不同功能、模型和生成参数的妙豆用量，以提交任务前的提示为准。</p><p>如价格或用量标准调整，将通过相关页面展示，已购买妙豆余额以账号记录为准。</p>${button('查看创作用量表 '+icon('next'),'rates','bean-rules-rates')}</section>
    </article></div></section>`;
  }
  function ratesPage() {
    // Source: supplied pricing screenshots, final bean-consumption column only.
    // Blank source tiers use the standard video rates, as confirmed by the user.
    const videoRates=[
      {name:'文生视频',input:'文生',durations:[5,10,15],rows:[['480p',150,300,450],['720p',200,400,600]]},
      {name:'AI短剧',input:'文生',durations:[5,10,12,15],rows:[['480p',150,300,370,450],['720p',200,400,480,600]]},
      {name:'小说推文',input:'文生',durations:[5,10,12,15],rows:[['480p',150,300,370,450],['720p',200,400,480,600]]},
      {name:'视频带货',input:'图生',durations:[5,8,10,15],rows:[['480p',150,240,300,450],['720p',200,320,400,600]]},
      {name:'剧情带货',input:'图生',durations:[5,10,15],rows:[['480p',150,300,450],['720p',200,400,600]]},
      {name:'探店视频',input:'图生',durations:[5,10,15],rows:[['480p',150,300,450],['720p',200,400,600]]},
      {name:'图生视频',input:'图生',durations:[5,10,15],rows:[['480p',150,300,450],['720p',200,400,600]]},
      {name:'趣味视频',input:'图生',durations:[5,8,10,12],rows:[['720p',150,240,300,370]]}
    ];
    const fixedRates=[
      {name:'照片跳舞',model:'腾讯融脸',kind:'视频',beans:20},
      {name:'创意海报',model:'GPT 生图',kind:'图片',beans:40},
      {name:'电商详图',model:'GPT 生图',kind:'图片',beans:40},
      {name:'写真大片',model:'Seedream 生图',kind:'图片',beans:8},
      {name:'证件照',model:'Seedream 生图',kind:'图片',beans:8}
    ];
    const tierCell=value=>`<td>${value}</td>`;
    return `<section class="page usage-page">${top('创作用量表')}<div class="scroll"><div class="content">
      <div class="usage-intro"><p>以下数值为单次生成消耗的妙豆数，任务提交成功时扣除。本页用量仅供参考，实际消耗以生成页面展示并扣取的妙豆数为准。</p></div>
      <h3 class="usage-group-title">视频创作</h3>
      ${videoRates.map(item=>`<section class="usage-card"><header><h3>${item.name}</h3><span>Seedance · ${item.input}视频</span></header><table aria-label="${item.name}妙豆用量"><thead><tr><th>分辨率</th>${item.durations.map(d=>`<th>${d}秒</th>`).join('')}</tr></thead><tbody>${item.rows.map(([quality,...values])=>`<tr><th scope="row">${quality}</th>${values.map(tierCell).join('')}</tr>`).join('')}</tbody></table></section>`).join('')}
      <h3 class="usage-group-title">图片与特效创作</h3>
      <section class="usage-fixed">${fixedRates.map(item=>`<div class="rate-row"><div><strong>${item.name}</strong><small>${item.model} · ${item.kind}生成</small></div><span>${item.beans} 妙豆／次</span></div>`).join('')}</section>
      <div class="rate-row"><div><strong>AI 帮写</strong><small>有效会员权益</small></div><span>不额外扣豆</span></div>
      <p class="table-note">系统生成失败按原来源退回，再次生成按新任务计算。</p>
    </div></div></section>`;
  }
  function bindPage(login=false) {
    const justSubscribed=!login&&route.justSubscribed===true;
    return `<section class="page ${login?'login-page':'bind-page'}">${top('')}<div class="scroll">${login?'<div class="bind-spark">✦</div>':''}<div class="bind-header"><div class="bind-title-row" ${!login&&!justSubscribed?'hidden':''}><h1>${login?'手机号登录':justSubscribed?'会员已开通':''}</h1>${justSubscribed?`<svg class="bind-celebrate-art" viewBox="0 0 96 84" role="img" aria-label="会员开通庆祝插画"><defs><linearGradient id="celebrateCone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a995ff"/><stop offset="1" stop-color="#6651db"/></linearGradient></defs><ellipse cx="49" cy="73" rx="30" ry="5" fill="#f0ebfd"/><path d="M24 66L35 27L65 53Z" fill="url(#celebrateCone)"/><ellipse cx="50" cy="40" rx="10" ry="21" transform="rotate(-43 50 40)" fill="#c5b5ff"/><ellipse cx="50" cy="40" rx="6" ry="17" transform="rotate(-43 50 40)" fill="#7460d5"/><path d="M47 29Q43 11 58 10M61 35Q76 25 80 35M56 25Q68 18 66 9" fill="none" stroke="#f1c95f" stroke-width="4" stroke-linecap="round"/><path d="M21 17l2-6 3 6 6 2-6 3-3 6-2-6-6-3Z" fill="#b3a1ee"/><path d="M77 51l2-5 2 5 5 2-5 2-2 5-2-5-5-2Z" fill="#edce75"/><rect x="72" y="12" width="5" height="8" rx="2" transform="rotate(24 72 12)" fill="#a7dce7"/><circle cx="37" cy="8" r="3" fill="#efb6ce"/><circle cx="87" cy="39" r="2.5" fill="#bca8f4"/><path d="M28 55l11 4M31 44l18 8" stroke="#d6c9ff" stroke-width="3"/></svg>`:''}</div>${login?'<p>未注册号码将自动注册并绑定</p>':'<div class="bind-guide-card"><svg class="bind-create-art" viewBox="0 0 80 88" role="img" aria-label="AI创作插画"><rect x="17" y="15" width="48" height="60" rx="10" transform="rotate(8 41 45)" fill="#e0d7f8"/><rect x="10" y="13" width="48" height="60" rx="9" fill="#fff" stroke="#d6c8ed" stroke-width="1.5"/><rect x="17" y="21" width="34" height="29" rx="5" fill="#eee8fb"/><circle cx="41" cy="29" r="4" fill="#d8caef"/><path d="M20 45l10-12 8 9 5-5 6 8" fill="none" stroke="#b5a1d6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 58h25M19 64h16" stroke="#ded3ee" stroke-width="3" stroke-linecap="round"/><path d="M49 62l18-23 6 5-18 23-8 4Z" fill="#a18acb"/><path d="M64 43l6 5" stroke="#f5f0fc" stroke-width="2"/><path d="M63 20l2-6 2 6 6 2-6 2-2 6-2-6-6-2Z" fill="#c0ade1"/></svg><h2>绑定手机，继续创作</h2><p>绑定后同步会员权益、妙豆与作品</p><p>未注册号码将自动注册并绑定</p></div>'}</div><div class="bind-body"><label class="input-wrap"><span>+86</span><input id="phone-number" inputmode="numeric" autocomplete="tel-national" maxlength="11" placeholder="请输入手机号" aria-label="手机号"><button data-action="clear-phone" id="clear-phone" aria-label="清空手机号" hidden>${icon('close')}</button></label><label class="input-wrap"><input id="phone-code" inputmode="numeric" maxlength="6" placeholder="请输入验证码" aria-label="验证码"><button data-action="send-code" id="send-code">获取验证码</button></label><p class="form-note">本地演示：填写任意 11 位手机号，验证码 246810。</p>${button(login?'登录':'确认绑定','bind-confirm','primary',`data-login="${login}" disabled`)}<p class="bind-terms">点击${login?'登录':'确认绑定'}即表示同意<button data-action="legal" data-title="用户协议">《用户协议》</button>及<button data-action="legal" data-title="隐私政策">《隐私政策》</button></p></div></div></section>`;
  }
  function sentencePage() {
    const d=draft('sentence');
    return `<section class="page"><div class="scroll"><div class="content"><div class="sentence-vip-toolbar">${memberEntry()}</div><div class="one-hero"><h1>一句话<br>生成创意海报<span style="color:#9a82df"> ✦</span></h1><p>让脑海里的想法，成为眼前的画面</p></div><div class="poster-examples">${['poster','shop','detail'].map(t=>tile(t,typeMap[t].sample,'sentence-example')).join('')}</div><div class="section-head"><h3>试试这些提示词</h3></div>${['为咖啡店设计一张春日上新海报','一张有胶片质感的周末市集海报','设计简约清新的新品发布海报'].map(p=>button(icon('arrow')+p,'sentence-prompt','prompt-suggestion',`data-prompt="${p}"`)).join('')}</div></div><div class="one-input"><textarea id="sentence-prompt" placeholder="描述海报的主题、风格和想展示的内容…" maxlength="2000" aria-label="海报创意">${esc(d.prompt)}</textarea>${button(icon('spark')+'生成海报'+(state.member?` · ${usageFor('sentence')} 妙豆`:''),'generate','primary',`data-type="sentence" ${d.prompt.trim()?'':'disabled'}`)}</div>${nav('sentence')}</section>`;
  }
  function materialDetail(type) {
    const m=typeMap[type],saved=state.favorites.includes(type);
    return `<section class="detail-page"><img class="detail-image" src="${A(m.img)}" alt="${m.sample}"><header class="detail-toolbar">${button(icon('back'),'back','','aria-label="返回"')}<div>${button(icon('bookmark'),'favorite',saved?'active':'',`data-type="${type}" aria-label="${saved?'取消收藏':'收藏'}"`)}${button(icon('more'),'report','','aria-label="举报"')}</div></header><span class="detail-ai">AI生成</span>${m.group==='带货'?`<div class="original-thumb"><img src="${A(m.source)}" alt="商品原图"><small>商品原图</small></div>`:''}<div class="detail-bottom">${!m.template?button(icon(m.icon)+m.name+' · '+m.caption+icon('next'),'same-type','detail-type',`data-type="${type}"`):''}<h1>${m.sample}</h1>${!m.template?`<p class="detail-desc">${m.prompt}</p>`:''}${button(icon('spark')+'做同款','same','primary',`data-type="${type}"`)}</div></section>`;
  }
  function templateUpload(type) {
    const m=typeMap[type],d=draft(type);
    return `<section class="page">${top(m.sample)}<div class="scroll"><div class="template-upload"><div class="template-photo">${d.image?`<img src="${d.image}" alt="已上传照片">${button(icon('close'),'remove-photo','upload-remove',`data-type="${type}" aria-label="移除照片"`)}`:`<button class="upload-box" data-action="upload" data-type="${type}">${icon('upload')}<span>上传图片</span><small>选择一张清晰的人物或宠物图片</small></button>`}</div><p class="photo-hint">根据素材内容，上传与之对应的人物或宠物图片</p>${button('更换照片','upload','text-button',`data-type="${type}"`)}<div class="param-grid">${/* 模板的模型和尺寸固定，不展示可选参数 */''}</div></div></div>${foot(generateButton(type,true))}</section>`;
  }
  function timeLabel(ts) {
    const d=new Date(ts),now=new Date(),mid=new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
    const n=new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime(),hh=String(d.getHours()).padStart(2,'0'),mm=String(d.getMinutes()).padStart(2,'0');
    return n===mid?`今天 ${hh}:${mm}`:n===mid-86400000?`昨天 ${hh}:${mm}`:`${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
  }
  function resultPage(id) {
    const j=state.jobs.find(j=>j.id===id);if(!j)return `<section class="page">${top('作品已删除')}<div class="empty">作品已删除</div></section>`;
    const m=typeMap[j.type],fail=j.status==='failed';
    const media=fail?`<div class="failure-placeholder"><span>${icon('broken')}</span><h2>生成失败</h2><p>这次未能生成作品</p></div>`:`<div class="result-media ${m.template&&!m.image?'vertical':''}"><img src="${j.image}" alt="${m.name}生成示例">${video(j.type)?button(icon('play'),'mock-play','result-play','aria-label="播放视频示例"'):''}<span class="ai-mark">AI生成</span></div>`;
    const description=!m.template?`<section class="result-description"><h3>创作描述</h3><div class="description-row">${j.source?`<div class="source-photo"><img src="${j.source}" alt="${m.group==='带货'?'商品原图':'上传图片'}"><span>${m.group==='带货'?'商品原图':'上传图片'}</span></div>`:''}<p>${esc(j.prompt)}</p></div></section><div class="result-tags"><span class="tag">${m.name}</span>${Object.values(j.params).map(v=>`<span class="tag">${esc(v)}</span>`).join('')}</div>`:'';
    const advice=fail?`<div class="suggestion"><strong>${icon('bulb')}生成建议</strong><p>请检查图片质量或网络是否稳定</p></div><p class="table-note">${j.refunded?'本次任务妙豆已按原来源处理退回。':'正在核对本次任务的妙豆退回状态。'}</p>`:'';
    return `<section class="page">${top(m.name,true,button(icon('trash'),'delete-work','side danger',`data-id="${id}" aria-label="删除作品"`),timeLabel(j.created))}<div class="scroll"><div class="content">${media}${description}${advice}</div></div>${foot(`<div class="result-foot">${button(fail?'重新传图':'再次创作','recreate','secondary',`data-id="${id}"`)}${button(fail?'重新生成':icon('download')+'保存到相册',fail?'retry':'save','primary',`data-id="${id}"`)}</div>`)}</section>`;
  }
  function settings() {
    const row=(name,action,other='')=>`<button class="list-row" data-action="${action}" data-title="${name}"><div><strong>${name}</strong></div>${other?`<span>${other}</span>`:''}${icon('next')}</button>`;
    return `<section class="page">${top('设置')}<div class="scroll"><div class="content">${state.bound?`<div class="settings-group">${row('手机号','bound-phone',state.phone.slice(0,3)+'****'+state.phone.slice(-4))}</div>`:''}<div class="settings-group">${row('用户协议','legal')}${row('隐私政策','legal')}${row('清除缓存','cache',state.cacheCleared?'0 MB':'992.33 MB')}${row('帮助与反馈','help')}</div>${state.bound?`<div class="settings-group">${row('退出登录','logout')}${row('注销账户','delete-account')}</div>`:''}<div class="version-footer">Vision 1.0.1</div></div></div></section>`;
  }
  function render(keepScroll=false) {
    saveShowcase();
    const pos=keepScroll?$('.scroll',app)?.scrollTop:0;
    $('.phone').classList.toggle('dark',route.page==='detail');
    const pages={onboarding:newcomerPage,'campaign-subscribe':campaignSubscription,home, inspiration,mine,editor:()=>editor(route.type),sentence:sentencePage,subscribe,'subscription-perks':()=>`<section class="page subscription-perks-page">${top('全部会员权益')}<div class="scroll"><div class="all-perks-intro"><h2>100+ AI创作玩法</h2><p>开通会员，一站解锁</p></div><div class="confirmed-perks">${renderSubscriptionPerks(subscriptionPerks)}</div><p class="all-perks-note">图片与视频生成需消耗妙豆<br>会员当期发放额度以所选套餐说明为准</p></div></section>`,'subscription-comparison':subscriptionComparisonPage,recharge,ledger:ledgerPage,'bean-rules':beanRulesPage,rates:ratesPage,bind:()=>bindPage(false),login:()=>bindPage(true),detail:()=>materialDetail(route.type),upload:()=>templateUpload(route.type),result:()=>resultPage(route.id),settings};
    app.innerHTML=(pages[route.page]||home)();
    if(route.page==='mine'&&state.mine!=='收藏夹'){
      const notice=document.createElement('p');notice.className='work-retention-notice';
      notice.innerHTML=icon('clock')+'<span>作品将为您储存<strong>7</strong>天，请及时下载保存</span>';
      $('.account-tabs',app)?.after(notice);
    }
    if(pos&&$('.scroll',app))$('.scroll',app).scrollTop=pos;
    renderOverlay();renderReview();syncBaseView();mountShowcase();syncCreatorCount();syncSubscriptionReviews();
  }
  function navigate(page,data={},push=true) {
    if(page==='subscribe'&&route.page!=='subscribe'&&route.page!=='recharge'){state.subscriptionOrigin={...route};state.subscriptionPlan=state.member?state.memberPlan:'week';subscriptionFeature='sales';showcase.progress=0;}
    clearInterval(writerTimer);overlay=null;
    if(push)history.push({...route});route={page,...data};render();if(!commercialPages.has(page)){const value=page==='editor'?'create:'+(Object.keys(toolMap).find(k=>toolMap[k]===data.type)||data.type):page==='detail'?'templatePreview:'+data.type:page;postBase('preview',{value});}
  }
  function setRoute(r){overlay=null;route={...r};render();}
  function back(force=false) {
    if(overlay){closeOverlay();return;}
    if(route.page==='bind'&&!force){
      const origin=state.pending?.origin;
      state.pending=null;
      log('返回原页面，保留已购会员权益；再次创作时继续要求绑定手机');
      if(origin){
        const index=history.findLastIndex(r=>r.page===origin.page&&r.type===origin.type);
        history=index>=0?history.slice(0,index):[];
        setRoute(origin);
      }else{
        let previous;
        while(history.length){const candidate=history.pop();if(!['bind','subscribe','login'].includes(candidate.page)){previous=candidate;break;}}
        setRoute(previous||{page:'mine'});
      }
      return;
    }
    if(!force&&['editor','upload','sentence'].includes(route.page)&&draft(route.type||'sentence').dirty){
      modal('是否退出编辑？','退出后，所有编辑内容将不再保存。',[['继续编辑','dismiss','secondary'],['退出编辑','exit-edit','primary']]);return;
    }
    if(route.page==='subscribe'&&state.pending){const origin=state.pending.origin;state.pending=null;log('关闭订阅页，保留原图片、文本和参数');setRoute(origin);return;}
    if(route.page==='recharge'&&state.rechargeReturn){const r=state.rechargeReturn;state.rechargeReturn=null;setRoute(r);return;}
    setRoute(history.pop()||{page:'home'});
  }
  function modal(title,body,actions,kind='modal') {
    overlay={kind,title,body,actions};renderOverlay();
  }
  function drawer(title,body,footer='',kind='drawer') {
    overlay={kind,title,body,footer};renderOverlay();
  }
  function renderOverlay() {
    if(!overlay){layers.innerHTML='';return;}
    saveShowcase();
    const o=overlay;
    if(o.kind==='writer') {
      layers.innerHTML=`<div class="overlay" data-backdrop="true"><section class="drawer" style="max-height:78%;min-height:440px"><div class="handle"></div><div class="drawer-header">${icon('spark')}<h2>AI帮写</h2>${button(icon('close'),'dismiss','','aria-label="关闭AI帮写"')}</div><div class="drawer-body"><p class="writer-status">${o.running?'<i class="spinner"></i>AI正在生成，请稍候…':icon('spark')+'创意已生成，可继续编辑'}</p><textarea class="writer-result" id="writer-result" ${o.running?'readonly':''} aria-label="AI帮写内容">${esc(o.text)}</textarea><p class="writer-note">采用后将替换上一级创意描述；关闭弹窗不修改原内容。</p></div><div class="drawer-foot">${button(o.running?'停止生成':'重新生成',o.running?'stop-writer':'regenerate-writer','secondary')}${button('采用','adopt-writer','primary',o.running||!o.text?'disabled':'')}</div></section></div>`;return;
    }
    if(o.kind==='modal'||o.kind==='payment'||o.kind==='recharge-consent') {
      layers.innerHTML=`<div class="overlay modal-overlay" ${o.kind==='recharge-consent'?'data-backdrop="true"':''}><section class="modal" role="dialog" aria-modal="true" aria-label="${esc(o.title)}"><h2>${o.title}</h2>${o.body}${o.actions.map(([label,action,cls,extra])=>button(label,action,cls,extra||'')).join('')}</section></div>`;
    } else {
      layers.innerHTML=`<div class="overlay" data-backdrop="true"><section class="drawer ${o.kind==='recharge'?'recharge-drawer':''}" role="dialog" aria-modal="true" aria-label="${esc(o.title)}"><div class="handle"></div><div class="drawer-header">${o.kind==='recharge'?'':`<h2>${o.title}</h2>`}${o.kind==='guide'?'':button(icon('close'),'dismiss','','aria-label="关闭弹窗"')}</div><div class="drawer-body">${o.body}</div>${o.footer?`<div class="drawer-foot">${o.footer}</div>`:''}${o.kind==='guide'?'<label class="guide-skip"><input id="skip-guide" type="checkbox">下次不再弹出</label>':''}</section></div>`;
    }
  }
  function closeOverlay(){clearInterval(writerTimer);++timerToken;overlay=null;renderOverlay();mountShowcase();}
  function canAfford(usage=usageFor()){return balance()>=usage;}
  function ensure(action) {
    state.pending={...action,origin:action.origin||{...route}};
    if(!state.member){log('非会员触发'+actionLabel(action)+'，打开订阅页');navigate('subscribe');return;}
    if(!state.bound){log('会员有效，未绑定手机，打开绑定页');navigate('bind');return;}
    state.pending=null;execute(action);
  }
  function actionLabel(a){return ({write:'AI帮写',generate:'生成',template:'模板做同款'})[a.kind]||'创作';}
  function continuePending() {
    const a=state.pending;
    if(!a){const origin=state.subscriptionOrigin||{page:'mine'};state.subscriptionOrigin=null;history=[];setRoute(origin);return;}
    setRoute(a.origin);ensure(a);
  }
  function execute(action) {
    if(action.bridge)return executeBridge(action);
    if(action.kind==='write'){startWriter(action.type);return;}
    if(action.kind==='template'&&!canAfford(usageFor(action.type))){openRecharge('insufficient',usageFor(action.type));return;}
    if(action.kind==='template'){navigate('upload',{type:action.type});showUploadGuide(action.type);return;}
    if(action.kind==='generate') submit(action.type);
  }
  function showUploadGuide(type) {
    if(state.skipGuide)return;
    drawer('传图示例',`<p class="guide-copy">根据素材内容，上传与之对应的人物或宠物图片</p><div class="guide-pair"><div class="guide-photos"><img src="${A('face.jpg')}" alt="清晰人像示例"><img src="${A('sales-video.jpg')}" alt="正面人物示例"></div><span>或</span><div class="guide-photos pets"><i><img src="${A('photo-reference.png')}" alt="宠物狗示例" style="width:685.4%;height:216.8%;left:-428.1%;top:-59.7%"></i><i><img src="${A('photo-reference.png')}" alt="宠物猫示例" style="width:743.9%;height:226.3%;left:-607.3%;top:-74.6%"></i></div></div>`,button('我已了解，去上传 →','guide-upload','primary',`data-type="${type}"`),'guide');
  }
  function pay(kind) {
    if(kind==='subscription'&&state.member){toast('会员有效期内不支持切换套餐');return;}
    if(kind==='subscription'&&state.purchasePending){showPurchasePending();return;}
    if(kind==='subscription'&&state.subscriptionAgreement===false){modal('协议确认','<p>我已阅读并同意<button data-action="legal" data-title="用户服务协议">《用户服务协议》</button>和<button data-action="legal" data-title="付费会员服务协议">《付费会员服务协议》</button></p>',[['继续','subscription-consent-continue','primary'],['取消','dismiss','text-button']]);return;}
    if(kind==='pack'&&state.rechargeAgreement===false){modal('协议确认','<p>我已阅读并同意《用户服务协议》和《付费会员服务协议》</p>',[['继续','recharge-consent-continue','primary']],'recharge-consent');return;}
    if(kind==='pack'&&!state.member){toast('请先开通会员，再购买妙豆包');return;}
    checkout={kind,plan:selectedSubscription(),price:subscriptionPrice(selectedSubscription())};
    if(kind==='subscription'){
      const p=subscriptionPlans[checkout.plan];
      modal('确认购买',`<div class="payment-caption">本地内购演示 · 不会发起真实支付</div><div class="apple-title"><span class="app-mini">✦</span><div><strong>妙创 ${p.name}</strong><small>${renewalNote(checkout.plan)}</small></div></div><div class="payment-row"><span>本次支付</span><strong>¥${checkout.price}</strong></div><div class="payment-row"><span>当期赠豆</span><strong>${p.gift} 妙豆</strong></div><p class="form-note">赠豆当期有效，到期清零；生成另需消耗妙豆。</p>`,[['模拟购买成功','purchase-success','primary'],['模拟已支付，确认中','purchase-pending','secondary'],['取消支付','purchase-cancel','text-button'],['模拟支付失败','purchase-fail','text-button']],'payment');return;
    }
    const title='妙豆包 · '+selectedPack().amount+' + '+selectedPack().bonus+' 妙豆';
    modal('确认购买',`<div class="payment-caption">iOS 内购流程模拟 · 不会发起真实支付</div><div class="apple-title"><span class="app-mini">✦</span><div><strong>妙创</strong><small>${title}</small></div></div><div class="payment-row"><span>${kind==='subscription'?'周期':'数量'}</span><span>${kind==='subscription'?'每周自动续费':(selectedPack().amount+selectedPack().bonus)+' 妙豆（含赠送）'}</span></div><div class="payment-row"><span>价格</span><span>${kind==='subscription'?'待定':'¥'+selectedPack().price}</span></div>`,[['模拟购买成功','purchase-success','primary'],['取消支付','purchase-cancel','secondary'],['模拟支付失败','purchase-fail','text-button']],'payment');
  }
  function purchaseSuccess() {
    if(!checkout)return;
    const kind=checkout?.kind;closeOverlay();
    if(kind==='subscription') {
      const plan=checkout.plan,p=subscriptionPlans[plan];
      state.member=true;state.memberPlan=plan;state.autoRenew=true;state.memberUntil=Date.now()+p.days*86400000;state.order++;state.cycle++;state.gift=p.gift;state.giftGranted=true;state.purchasePending=false;
      if(plan==='week')state.weekPurchased=true;
      state.restorable={plan,until:state.memberUntil,gift:state.gift,autoRenew:true};
      ledger('会员赠送',`+ ${p.gift} 妙豆`,'开通'+p.name);log(p.name+'购买成功，发放 '+p.gift+' 妙豆');toast('会员已开通');
      if(!state.bound){log('购买后检查手机绑定，未绑定');navigate('bind',{justSubscribed:true});}else continuePending();
    } else {
      state.paid.push({id:'PACK-'+Date.now(),amount:selectedPack().amount+selectedPack().bonus});ledger('妙豆充值','+ '+(selectedPack().amount+selectedPack().bonus)+' 妙豆','妙豆包 · '+selectedPack().amount+' + '+selectedPack().bonus+' 妙豆');
      log('妙豆包到账；返回原页面，等待手动再次生成');const r=state.rechargeReturn||{page:'mine'},insufficient=state.rechargeReason==='insufficient';state.rechargeReturn=null;state.rechargeReason='';setRoute(r);toast(insufficient?'妙豆已到账，请再次点击生成':'充值成功，妙豆已到账');
    }
    checkout=null;
  }
  function openRecharge(reason='manual',usage=usageFor()) {
    state.rechargeUsage=usage;
    if(!state.member){state.rechargeReturn={...route};log('非会员查看充值页，不展示充值档位');navigate('recharge',{},false);return;}
    state.rechargeReturn={...route};state.rechargeReason=reason;state.rechargeAgreement=true;state.pack=reason==='insufficient'?Math.max(1,RECHARGE_PACKS.findIndex(p=>p.amount+p.bonus>=usage-balance())+1):1;if(reason==='insufficient')showRecharge();else navigate('recharge',{},false);
  }
  function showPurchasePending(){modal('购买确认中','<p>正在确认已支付的购买记录，确认完成后将发放会员权益和妙豆，请勿重复购买。</p>',[['重新查询（模拟确认成功）','purchase-query','primary']]);}
  function compareSubscription(){navigate('subscription-comparison');}
  function subscriptionComparisonPage(){
    const groups=[
      {title:'8项会员专属权益',rows:[['AI创作资格',false,true],['AI帮写',false,'不额外扣豆'],['会员赠送妙豆','无','按订阅套餐发放'],['妙豆充值',false,true],['高级模型',false,true],['本地下载',false,true],['高清画质',false,true],['优先制作',false,true]]},
      {title:'13项核心创作功能',rows:subscriptionFeatures.map(f=>[f.name,false,true])},
      {title:'500+灵感与模板',rows:[['500+灵感模板','可浏览','可创作同款']]},
      {title:'作品管理',rows:[['查看历史作品',true,true],['本地下载保存',true,true],['作品保存期限','7天','7天']]}
    ];
    const cell=value=>typeof value==='boolean'?`<span class="benefit-${value?'yes':'no'}" aria-label="${value?'支持':'不支持'}">${icon(value?'check':'close')}</span>`:esc(value);
    return `<section class="page benefits-detail-page">${top('权益详情')}<div class="scroll"><div class="benefits-detail-content">${groups.map(group=>`<section class="benefits-group"><h3>${group.title}</h3><div class="benefits-table-wrap"><table><thead><tr><th>权益</th><th>普通用户</th><th>${icon('crown')} PRO</th></tr></thead><tbody>${group.rows.map(([name,normal,pro])=>`<tr><th scope="row">${esc(name)}</th><td>${cell(normal)}</td><td>${cell(pro)}</td></tr>`).join('')}</tbody></table></div></section>`).join('')}</div></div></section>`;
  }
  function startWriter(type) {
    closeOverlay();const m=typeMap[type],d=draft(type),token=++timerToken;
    const copy=(state.writerRun||0)%2?`开场：用一个清晰的主体特写吸引注意，保持图片中主体的外观和细节。\n\n展开：${m.prompt}\n\n收尾：镜头自然停留在主体上，以简洁的画面结束，光影统一、节奏流畅。`:`${m.prompt}\n\n开场以自然光呈现主体全貌，再通过近景和细节特写展现重点。画面保持统一的光影与色彩，动作和转场连贯，避免出现夸大的信息。`;
    state.writerRun=(state.writerRun||0)+1;overlay={kind:'writer',type,running:true,text:'',copy,index:0};renderOverlay();log('AI帮写自动开始，不扣妙豆');
    writerTimer=setInterval(()=>{
      if(token!==timerToken||overlay?.kind!=='writer'){clearInterval(writerTimer);return;}
      overlay.index+=5;overlay.text=copy.slice(0,overlay.index);const el=$('#writer-result');if(el){el.value=overlay.text;el.scrollTop=el.scrollHeight;}
      if(overlay.index>=copy.length){clearInterval(writerTimer);overlay.running=false;renderOverlay();}
    },35);
  }
  function charge(usage=usageFor()) {
    let remaining=usage;const gift=Math.min(state.gift,remaining);state.gift-=gift;remaining-=gift;
    const paid=[];for(const lot of state.paid){if(!remaining)break;const n=Math.min(lot.amount,remaining);lot.amount-=n;remaining-=n;if(n)paid.push({id:lot.id,amount:n});}
    return {gift,paid,cycle:state.cycle};
  }
  function refundJob(j) {
    if(j.refunded)return;j.refunded=true;const c=j.charge;if(!c)return;
    const giftValid=state.member&&c.cycle===state.cycle;
    if(giftValid)state.gift+=c.gift;
    c.paid.forEach(p=>{const lot=state.paid.find(l=>l.id===p.id);if(lot)lot.amount+=p.amount;else state.paid.push({...p});});
    const returned=(giftValid?c.gift:0)+c.paid.reduce((sum,p)=>sum+p.amount,0);
    ledger('生成失败退回',returned?`+ ${returned} 妙豆`:'赠豆退回后清零',typeMap[j.type].name,false,j.id);
    log(giftValid||c.paid.length?'任务失败，妙豆按原来源退回':'任务失败，原赠豆周期已清零，退回部分一并清零');
  }
  function submit(type) {
    if(!canAfford(usageFor(type))){state.pending=null;log('生成前校验妙豆不足，打开妙豆充值页');openRecharge('insufficient',usageFor(type));return;}
    if($('#demo-submit-fail').checked){$('#demo-submit-fail').checked=false;state.pending=null;log('提交失败，保留编辑内容，不创建任务、不扣妙豆');toast('提交失败，请稍后重试');return;}
    const d=draft(type),m=typeMap[type],id='MC-'+String(Date.now()).slice(-8),fail=state.failNext||$('#demo-fail').checked;
    state.failNext=false;$('#demo-fail').checked=false;
    const j={id,type,status:'generating',image:m.template?A(m.img):type==='detail'?A('detail-work-2.jpg'):d.image||A(m.img),source:d.image,prompt:d.prompt,params:{...d.params},created:Date.now(),charge:charge(usageFor(type)),item:d.item};
    state.jobs.unshift(j);ledger('生成扣除',`− ${usageFor(type)} 妙豆`,m.name,true,id);log('提交成功，先扣妙豆，任务进入生成队列');
    state.pending=null;history=[];state.mine=m.group;state.sub='全部';navigate('mine',{},false);toast('已加入生成队列');
    const t=setTimeout(()=>{
      jobTimers.delete(t);if(!state.jobs.includes(j))return;
      j.status=fail?'failed':'success';if(fail)refundJob(j);else log(m.name+'生成成功，不再重复扣豆');
      render(true);toast(fail?'生成未完成，妙豆已按规则退回':'作品已生成，可前往「我的」查看');
    },8000);jobTimers.add(t);
  }
  function requestPhoto(type) {
    photoTarget=type;
    if(!fileInput){fileInput=document.createElement('input');fileInput.type='file';fileInput.accept='image/jpeg,image/png';fileInput.hidden=true;fileInput.addEventListener('change',onFile);document.body.appendChild(fileInput);}
    fileInput.value='';fileInput.click();
  }
  function onFile() {
    const f=fileInput.files?.[0];if(!f)return;
    if(!['image/jpeg','image/png'].includes(f.type)){toast('请上传 jpg 或 png 图片');return;}
    if(f.size>10*1024*1024){toast('图片大小不能超过10M');return;}
    const target=photoTarget,reader=new FileReader();reader.onload=()=>{const d=draft(target);d.image=reader.result;d.dirty=true;log('系统选图完成，图片已回填创作页');render(true);};reader.readAsDataURL(f);
  }
  function selectParam(type,key) {
    if(key==='model')return;
    const d=draft(type),names={ratio:'选择比例',duration:'视频时长',quality:'清晰度'};
    const durations=type==='fun'?['5s','8s','10s','12s']:type==='sales'?['5s','8s','10s','15s']:['drama','novel'].includes(type)?['5s','10s','12s','15s']:['5s','10s','15s'];
    const options=key==='ratio'?ratios:key==='duration'?durations:type==='fun'?['720p']:['480p','720p'];
    const body=key==='ratio'?`<div class="ratio-options">${options.map(r=>{const[w,h]=r.split(':').map(Number),max=Math.max(w,h);return `<button class="ratio-option ${d.params.ratio===r?'active':''}" data-action="set-param" data-type="${type}" data-key="${key}" data-value="${r}"><span class="ratio-shape"><i style="width:${30*w/max}px;height:${30*h/max}px"></i></span>${r}</button>`;}).join('')}</div>`:`<div class="options-grid">${options.map(v=>button(v,'set-param','option '+(d.params[key]===v?'active':''),`data-type="${type}" data-key="${key}" data-value="${v}"`)).join('')}</div>`;
    drawer(names[key],body+`<p class="table-note">选中即生效。</p>`);
  }
  function recreate(j,uploadOnly=false) {
    const m=typeMap[j.type];
    if(m.template&&!uploadOnly){navigate('detail',{type:j.type});return;}
    const d=draft(j.type);d.image=uploadOnly?'':j.source;d.prompt=j.prompt;d.params={...j.params};d.dirty=false;
    navigate(m.template?'upload':'editor',{type:j.type});if(uploadOnly)requestPhoto(j.type);
  }
  function allTools() {
    const group=(title,arr)=>`<h3 class="field-title">${title}</h3><div class="all-tools-grid">${arr.map(t=>`<button data-action="${typeMap[t].template?'tool-browse':'edit'}" data-type="${t}"><span class="tool-icon">${icon(typeMap[t].icon)}${['sales','story','shop','drama'].includes(t)?'<b class="hot">Hot</b>':t==='detail'?'<b class="hot">New</b>':''}</span><span>${typeMap[t].name}</span></button>`).join('')}</div>`;
    drawer('',group('带货创作',['sales','story','shop','poster','detail'])+group('AI视频',['drama','novel','textvideo','imgvideo','dance','fun'])+group('AI图片',['portrait','idphoto']));
  }
  function runControl(name) {
    if(name==='week-history'||name==='year-history'){seedScene('guest');state.weekPurchased=name==='week-history';navigate('subscribe');log(name==='week-history'?'历史周会员：重新开通¥68/周':'仅年会员历史：首次周会员仍享¥9.9');return;}
    if(name==='cancel-renew'){if(!state.member){toast('当前没有有效会员');return;}state.autoRenew=false;if(state.restorable)state.restorable.autoRenew=false;render(true);toast('已取消续费，当期权益保留');return;}
    closeOverlay();
    if(name==='reset'){seedScene('guest');toast('已重置商业化演示');return;}
    if(name==='expire') {
      state.memberUntil=Date.now()-1;if(state.restorable)state.restorable.until=state.memberUntil;
      state.member=false;state.gift=0;state.cycle++;ledger('赠送妙豆到期清零','− 本期剩余额度','周会员',true);state.scene='expired';log('模拟会员到期：赠豆清零，充值妙豆和作品保留');navigate('mine',{},false);toast('已模拟会员到期');
    } else if(name==='renew') {
      if(!state.member){toast('请先开通会员');return;}
      const p=subscriptionPlans[state.memberPlan||'week'];ledger('上期赠送清零','− '+state.gift+' 妙豆',p.name,true);state.gift=p.gift;state.cycle++;state.autoRenew=true;state.memberUntil=Math.max(Date.now(),state.memberUntil||0)+p.days*86400000;ledger('会员续费赠送','+ '+p.gift+' 妙豆',p.name);log('模拟续费：清上期赠豆，再发新一期 '+p.gift+' 妙豆');render(true);toast(p.name+'已续费');
    } else if(name==='refund') {
      if(state.restorable)state.restorable.revoked=true;
      state.member=false;state.gift=0;state.cycle++;ledger('会员订单退款','− 剩余赠送额度','会员权益撤销',true);log('模拟会员订单退款：撤销资格，保留充值妙豆与作品');navigate('mine',{},false);toast('会员订单退款已处理');
    } else if(name==='packrefund') {
      const lot=[...state.paid].reverse().find(p=>p.amount>0);if(!lot){toast('暂无可撤回的妙豆包余额');return;}
      lot.amount=0;ledger('妙豆包退款','− 该笔剩余额度','充值妙豆',true);log('模拟妙豆包退款：撤回该笔剩余妙豆');render(true);toast('该笔剩余妙豆已撤回');
    }
  }
  function onAction(el) {
    const a=el.dataset.action,type=el.dataset.type||route.type;
    switch(a) {
      case 'dismiss':closeOverlay();break;
      case 'back':back();break;
      case 'exit-edit':{const t=route.type||'sentence';delete drafts[t];closeOverlay();back(true);break;}
      case 'nav':{
        const page=el.dataset.page;
        if(route.page==='sentence'&&page!=='sentence'&&draft('sentence').dirty){modal('是否退出编辑？','退出后，所有编辑内容将不再保存。',[['继续编辑','dismiss','secondary'],['退出编辑','exit-to-nav','primary',`data-page="${page}"`]]);return;}
        history=[];navigate(page,{},false);break;
      }
      case 'exit-to-nav':delete drafts.sentence;history=[];navigate(el.dataset.page,{},false);break;
      case 'edit':closeOverlay();navigate('editor',{type});break;
      case 'detail':closeOverlay();navigate('detail',{type});break;
      case 'browse':state.category=el.dataset.category.includes('热门')?'推荐':el.dataset.category;history=[];navigate('inspiration',{},false);break;
      case 'filter':state.category=el.dataset.category;render();break;
      case 'categories':drawer('全部分类',`<div class="category-grid">${['推荐',...types.filter(t=>t!=='sentence').map(t=>typeMap[t].name)].map(c=>button(c,'choose-category','chip '+(state.category===c?'active':''),`data-category="${c}"`)).join('')}</div>`);break;
      case 'choose-category':state.category=el.dataset.category;closeOverlay();render();break;
      case 'quick':drawer('',`<div class="quick-options">${['sales','story'].map(t=>`<button data-action="edit" data-type="${t}"><span class="quick-art ${t==='story'?'story':''}">${icon(typeMap[t].icon)}</span><strong>${typeMap[t].name}</strong><small>${t==='sales'?'上传商品图，一键生成爆款带货视频':'将商品融入故事，创作商品爆单剧情'}</small></button>`).join('')}</div>`);break;
      case 'alltools':allTools();break;
      case 'tool-browse':closeOverlay();state.category=typeMap[type].name;history=[];navigate('inspiration',{},false);break;
      case 'mine-tab':state.mine=el.dataset.category;state.sub='全部';render(true);break;
      case 'mine-filter':state.sub=el.dataset.category;render(true);break;
      case 'profile':if(!state.bound)navigate('login');break;
      case 'settings':navigate('settings');break;
      case 'newcomer-back':route.step=Math.max(0,(Number(route.step)||0)-1);render();break;
      case 'newcomer-next':if((route.step||0)<3){route.step=(route.step||0)+1;render();}else finishNewcomer();break;
      case 'newcomer-prev':route.step=Math.max(0,(route.step||0)-1);render();break;
      case 'newcomer-close':history=[];navigate('home',{},false);break;
      case 'subscribe':state.pending=null;navigate('subscribe');break;
      case 'recharge':openRecharge();break;
      case 'ledger':state.ledgerTab='全部';navigate('ledger');break;
      case 'bean-rules':navigate('bean-rules');break;
      case 'ledger-tab':state.ledgerTab=el.dataset.tab;render();break;
      case 'rates':navigate('rates');break;
      case 'subscription-feature':selectShowcase(el.dataset.type);break;
      case 'subscription-plan':selectSubscriptionPlan(el.dataset.plan);break;
      case 'subscription-compare':compareSubscription();break;
      case 'subscription-all-perks':navigate('subscription-perks');break;
      case 'showcase-sound':{showcase.muted=!showcase.muted;const media=$('#subscription-video');media.muted=showcase.muted;el.innerHTML=icon(showcase.muted?'muted':'volume');el.setAttribute('aria-label',showcase.muted?'开启声音':'关闭声音');el.setAttribute('aria-pressed',String(!showcase.muted));break;}
      case 'showcase-play':$('#subscription-video')?.play().then(()=>{el.hidden=true;}).catch(()=>toast('暂时无法播放，请切换其他玩法'));break;
      case 'guest-recharge-back':back();break;
      case 'subscription-consent-continue':state.subscriptionAgreement=true;$('#subscription-agreement').checked=true;closeOverlay();pay('subscription');break;
      case 'purchase-pending':state.purchasePending=true;showPurchasePending();break;
      case 'purchase-query':if(state.purchasePending&&checkout?.kind==='subscription')purchaseSuccess();break;
      case 'pay-subscribe':pay('subscription');break;
      case 'pay-pack':pay('pack');break;
      case 'recharge-consent-continue':state.rechargeAgreement=true;document.querySelectorAll('#recharge-agreement').forEach(input=>input.checked=true);pay('pack');break;
      case 'pack':selectRechargePack(Number(el.dataset.pack));break;
      case 'purchase-success':purchaseSuccess();break;
      case 'purchase-cancel':{const isPack=checkout?.kind==='pack';closeOverlay();checkout=null;if(isPack&&state.rechargeReason==='insufficient')showRecharge();}log('用户取消支付，原编辑内容保留');toast('已取消支付');break;
      case 'purchase-fail':{const isPack=checkout?.kind==='pack';closeOverlay();checkout=null;if(isPack&&state.rechargeReason==='insufficient')showRecharge();}log('支付失败，原编辑内容保留');toast('支付未完成，请稍后重试');break;
      case 'subscription-terms':modal('订阅说明',`<p>周会员首周¥9.9，之后¥68/周自动续费，可在系统账户设置中取消。取消后权益持续至当期结束。</p><p>周会员首周及每次续费均发放600妙豆。当期赠豆到期清零；充值妙豆保留，重新开通会员后可用。图片与视频生成另需消耗妙豆，AI帮写不额外扣豆。</p>`,[['我知道了','dismiss','primary']]);break;
      case 'restore':drawer('恢复购买',`<p class="form-note">本地演示请选择恢复结果。正式产品由 App Store 交易核验返回。</p><div class="restore-options">${button('恢复到有效会员','restore-valid','secondary')}${button('没有可恢复记录','restore-none','secondary')}${button('订阅已绑定其他手机号','restore-other','secondary')}</div>`);break;
      case 'restore-none':closeOverlay();log('恢复购买：没有可恢复记录');toast('暂无可恢复的购买记录');break;
      case 'restore-valid':closeOverlay();if(!state.member){const record=state.restorable||{plan:'week',until:Date.now()+7*86400000,gift:600,autoRenew:true};if(record.until<=Date.now()||record.revoked){toast('暂无可恢复的有效购买记录');break;}state.memberPlan=record.plan;state.memberUntil=record.until;state.autoRenew=record.autoRenew;if(!state.giftGranted){state.gift=record.gift;state.giftGranted=true;}}state.member=true;if(state.memberPlan==='week')state.weekPurchased=true;log('恢复购买成功，不重复发放已领取额度');toast('购买已恢复');if(!state.bound)navigate('bind');else continuePending();break;
      case 'restore-other':modal('该订阅已绑定其他账号','<p>该订阅已绑定其他账号，请使用原手机号登录。</p>',[['使用原手机号登录','switch-account','primary'],['取消','dismiss','text-button']]);break;
      case 'switch-account':closeOverlay();state.restoreOnLogin=true;navigate('login');break;
      case 'send-code':{const n=$('#phone-number').value;if(!/^1\d{10}$/.test(n)){toast('请输入正确的手机号');return;}toast('演示验证码：246810');$('#phone-code').focus();break;}
      case 'clear-phone':$('#phone-number').value='';updatePhone();$('#phone-number').focus();break;
      case 'bind-confirm':{
        const n=$('#phone-number').value,c=$('#phone-code').value;
        if(!/^1\d{10}$/.test(n)){toast('请输入正确的手机号');return;}
        if(c!=='246810'){toast('验证码错误，请重新输入');return;}
        if($('#demo-conflict').checked){toast('不允许绑定该手机号');log('目标手机号已有有效会员，禁止绑定');return;}
        state.bound=true;state.phone=n;log('手机绑定成功，权益归入该手机号');toast('绑定成功');
        if(state.restoreOnLogin){state.restoreOnLogin=false;if(!state.member&&!state.giftGranted){state.gift=subscriptionPlans[state.memberPlan||'week'].gift;state.giftGranted=true;}state.member=true;state.memberUntil=state.memberUntil||Date.now()+subscriptionPlans[state.memberPlan||'week'].days*86400000;log('原手机号登录成功，已恢复该账号的有效会员');toast('登录成功，购买已恢复');}
        if(state.pending||state.subscriptionOrigin)continuePending();else navigate('mine',{},false);break;
      }
      case 'upload':requestPhoto(type);break;
      case 'remove-photo':draft(type).image='';draft(type).dirty=true;render(true);break;
      case 'guide-upload':state.skipGuide=!!$('#skip-guide')?.checked;closeOverlay();requestPhoto(type);break;
      case 'writer':{
        const d=draft(type),m=typeMap[type];if(!m.text&&!d.image){toast('请先上传图片');return;}
        if(m.text&&!d.prompt.trim()){toast('请先填写创意描述');return;}ensure({kind:'write',type});break;
      }
      case 'stop-writer':clearInterval(writerTimer);++timerToken;overlay.running=false;renderOverlay();break;
      case 'regenerate-writer':startWriter(overlay.type);break;
      case 'adopt-writer':{const d=draft(overlay.type);d.prompt=$('#writer-result').value.slice(0,2000);d.dirty=true;closeOverlay();render(true);toast('已替换创意描述');break;}
      case 'clear-prompt':draft(type).prompt='';draft(type).dirty=true;render(true);break;
      case 'keyword':{const d=draft(type),word=el.dataset.word;if(!d.prompt.includes(word))d.prompt=(d.prompt.trim()?d.prompt.trim()+'，':'')+word;d.dirty=true;render(true);break;}
      case 'param':selectParam(type,el.dataset.key);break;
      case 'set-param':draft(type).params[el.dataset.key]=el.dataset.value;draft(type).dirty=true;closeOverlay();render(true);break;
      case 'generate':ensure({kind:'generate',type});break;
      case 'sample':navigate('detail',{type});break;
      case 'same-type':navigate('editor',{type});break;
      case 'same':{
        const m=typeMap[type];if(m.template){ensure({kind:'template',type});return;}
        const d=draft(type);d.image=m.text?'':A(m.source||m.img);d.prompt=m.prompt;d.dirty=false;navigate('editor',{type});break;
      }
      case 'favorite':if(!state.bound){toast('请先登录后收藏');navigate('login');}else{state.favorites=state.favorites.includes(type)?state.favorites.filter(t=>t!==type):[type,...state.favorites];render();toast(state.favorites.includes(type)?'已收藏':'已取消收藏');}break;
      case 'report':toast('举报成功');break;
      case 'work':{const j=state.jobs.find(j=>j.id===el.dataset.id);if(j.status==='generating')toast('作品正在生成，完成后可在这里查看');else navigate('result',{id:j.id});break;}
      case 'save':toast('演示：作品已保存到相册');break;
      case 'mock-play':toast('当前为静态原型，正式作品在此播放');break;
      case 'delete-work':modal('删除这件作品？','<p>删除后无法恢复。</p>',[['取消','dismiss','secondary'],['删除','confirm-delete','primary',`data-id="${el.dataset.id}"`]]);break;
      case 'confirm-delete':state.jobs=state.jobs.filter(j=>j.id!==el.dataset.id);closeOverlay();history=[];navigate('mine',{},false);toast('作品已删除');break;
      case 'recreate':recreate(state.jobs.find(j=>j.id===el.dataset.id),state.jobs.find(j=>j.id===el.dataset.id).status==='failed');break;
      case 'retry':{const j=state.jobs.find(j=>j.id===el.dataset.id),d=draft(j.type);d.image=j.source;d.prompt=j.prompt;d.params={...j.params};ensure({kind:'generate',type:j.type,origin:{page:typeMap[j.type].template?'upload':'editor',type:j.type}});break;}
      case 'sentence-example':{const m=typeMap[type],d=draft('sentence');d.prompt=m.prompt;d.dirty=true;render();break;}
      case 'sentence-prompt':draft('sentence').prompt=el.dataset.prompt;draft('sentence').dirty=true;render();break;
      case 'cache':state.cacheCleared=true;render(true);toast('缓存已清除');break;
      case 'bound-phone':break;
      case 'help':modal('帮助与反馈','<p>商业化原型仅演示页面流程。实际客服与反馈入口后续接入。</p>',[['我知道了','dismiss','primary']]);break;
      case 'legal':modal(esc(el.dataset.title||'协议说明'),'<p>此处为协议正文承载页的原型占位，正式内容另行提供。</p>',[['返回','dismiss','primary']]);break;
      case 'logout':modal('退出登录？','<p>确认退出当前账号。</p>',[['取消','dismiss','secondary'],['退出登录','confirm-logout','primary']]);break;
      case 'confirm-logout':state.bound=false;state.phone='';state.member=false;state.gift=0;closeOverlay();navigate('mine',{},false);toast('已退出登录');break;
      case 'delete-account':modal('注销账号','<p>正式产品在此说明注销条件，并核验账号后继续。</p>',[['取消','dismiss','primary']]);break;
    }
  }
  function updatePhone() {
    const n=$('#phone-number'),c=$('#phone-code');if(!n)return;
    const clear=$('#clear-phone');clear.hidden=!n.value;
    const confirm=$('[data-action="bind-confirm"]');if(confirm)confirm.disabled=!/^1\d{10}$/.test(n.value)||c.value.length!==6;
  }
  document.addEventListener('click',event=>{
    const scene=event.target.closest('[data-scene]');if(scene){seedScene(scene.dataset.scene);return;}
    const control=event.target.closest('[data-control]');if(control){runControl(control.dataset.control);return;}
    const preview=event.target.closest('[data-preview]');if(preview){
      const p=preview.dataset.preview;if(p==='success-push'){route={page:'home'};render();postBase('preview',{value:'push'});return;}if(p==='recharge'){if(!state.member)seedScene('member');openRecharge();log('查看页面：妙豆充值弹窗');return;}
      if(p==='bind'){state.member=true;state.bound=false;state.gift=Math.max(2*GENERATE_USAGE,state.gift);}
      navigate(p);log('查看页面：'+preview.textContent);return;
    }
    const action=event.target.closest('[data-action]');if(action&&!action.disabled){onAction(action);return;}
    if(event.target.dataset.backdrop==='true'){const restoreRecharge=overlay?.kind==='recharge-consent'&&state.rechargeReason==='insufficient';closeOverlay();if(restoreRecharge)showRecharge();}
  });
  document.addEventListener('change',event=>{
    if(event.target.id==='subscription-agreement')state.subscriptionAgreement=event.target.checked;
    if(event.target.id==='recharge-agreement'){
      state.rechargeAgreement=event.target.checked;
    }
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)saveShowcase();else{saveShowcase();mountShowcase();}syncCreatorCount();syncSubscriptionReviews();});
  // 水平手势切换展示；纵向仍交给页面滚动。桌面鼠标拖动同样可用。
  let showcaseGesture=null;
  document.addEventListener('pointerdown',event=>{
    const area=event.target.closest('.subscription-showcase');
    if(!area||overlay||!event.isPrimary||event.button!==0||event.target.closest('button'))return;
    showcaseGesture={id:event.pointerId,x:event.clientX,y:event.clientY,area};
    saveShowcase();area.setPointerCapture(event.pointerId);
  });
  function endShowcaseGesture(event,cancelled=false){
    const gesture=showcaseGesture;if(!gesture||gesture.id!==event.pointerId)return;
    showcaseGesture=null;
    if(gesture.area.hasPointerCapture(event.pointerId))gesture.area.releasePointerCapture(event.pointerId);
    if(route.page!=='subscribe'||overlay)return;
    const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
    if(!cancelled&&Math.abs(dx)>=35&&Math.abs(dx)>Math.abs(dy)*1.2){
      const index=subscriptionFeatures.findIndex(f=>f.type===subscriptionFeature);
      selectShowcase(subscriptionFeatures[(index+(dx<0?1:-1)+subscriptionFeatures.length)%subscriptionFeatures.length].type);
    }else mountShowcase();
  }
  document.addEventListener('pointerup',event=>endShowcaseGesture(event));
  document.addEventListener('pointercancel',event=>endShowcaseGesture(event,true));
  document.addEventListener('input',event=>{
    const el=event.target;
    if(el.id==='creative-prompt'){
      const d=draft(el.dataset.type);d.prompt=el.value;d.dirty=true;
      $('.counter').textContent=el.value.length+'/2000';$('[data-action="clear-prompt"]').style.visibility=el.value?'visible':'hidden';$('[data-action="generate"]',app).disabled=!validDraft(el.dataset.type);
    }else if(el.id==='sentence-prompt'){draft('sentence').prompt=el.value;draft('sentence').dirty=true;$('[data-action="generate"]',app).disabled=!el.value.trim();}
    else if(el.id==='phone-number'||el.id==='phone-code'){el.value=el.value.replace(/\D/g,'');updatePhone();}
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&overlay)closeOverlay();
    if(event.key==='Enter'&&event.target.matches('[role="button"][data-action="upload"]'))requestPhoto(event.target.dataset.type);
  });

  // The 100 content pages are hosted independently; only commercial pages render here.
  let baseReady=false,queuedBridgeJobs=[],pendingBaseCommand=null;
  const baseFrame=()=>document.getElementById('content-base');
  const commercialPages=new Set(['onboarding','campaign-subscribe','subscribe','subscription-perks','subscription-comparison','recharge','ledger','bean-rules','rates','bind','login']);
  const toolMap={video:'sales',animate:'imgvideo',textimage:'sentence',ecom:'detail'};
  function commerceSnapshot(){return {member:state.member,bound:state.bound,balance:state.gift+state.paid.reduce((sum,p)=>sum+p.amount,0),phone:state.phone};}
  function postBase(action,data={}){if(baseReady)baseFrame().contentWindow.postMessage({channel:'miaochuang101',action,...data},'*');}
  function syncBaseView(){const frame=baseFrame();if(!frame)return;frame.hidden=commercialPages.has(route.page);postBase('state',{commerce:commerceSnapshot()});}
  function syncScene(name){const values={guest:'home',writer:'create:story',template:'templatePreview:portrait',member:'mine',insufficient:'create:video',unbound:'create:video',failure:'task:failed',expired:'mine'};const command={value:values[name]||'home',commerce:commerceSnapshot()};if(baseReady)postBase('scene',command);else pendingBaseCommand=command;}
  function executeBridge(action){
    const usage=miaoUsage(action.tool,action.params);
    if(action.kind==='template'&&!canAfford(usage)){postBase('deny',{token:action.token});openRecharge('insufficient',usage);return;}
    if(action.kind==='generate'){
      if(!canAfford(usage)){postBase('deny',{token:action.token});openRecharge('insufficient',usage);return;}
      if($('#demo-submit-fail').checked){$('#demo-submit-fail').checked=false;setRoute(action.origin);postBase('deny',{token:action.token,message:'提交失败，请稍后重试'});return;}
      const type=toolMap[action.tool]||action.tool;
      const job={id:'BRIDGE-'+Date.now(),type,status:'generating',charge:charge(usage)};queuedBridgeJobs.push(job);state.jobs.unshift(job);
      ledger('生成扣除',`− ${usage} 妙豆`,typeMap[type]?.name||action.tool,true,job.id);log('提交成功，扣除 '+usage+' 妙豆，任务进入生成队列');
    }
    setRoute(action.origin);const fail=state.failNext||$('#demo-fail').checked;state.failNext=false;$('#demo-fail').checked=false;
    syncBaseView();postBase('grant',{token:action.token,fail});
  }
  window.addEventListener('message',event=>{
    if(event.source!==baseFrame()?.contentWindow||event.data?.channel!=='miaochuang101')return;
    const m=event.data;
    if(m.action==='ready'){
      baseReady=true;syncBaseView();if(pendingBaseCommand){postBase('scene',pendingBaseCommand);pendingBaseCommand=null;}
      const select=document.getElementById('content-page-select');
      if(select){select.innerHTML='<option value="">查看 1.0.0 对齐页面…</option>'+m.pages.map(p=>{const value=Array.isArray(p)?p[0]:p.value,label=Array.isArray(p)?p[1]:p.label;return `<option value="${esc(value)}">${esc(label||value)}</option>`}).join('');}
    }
    if(m.action==='subscribe'){state.pending=null;navigate('subscribe');}
    if(m.action==='recharge')openRecharge();
    if(m.action==='gate')ensure({bridge:true,kind:m.kind,tool:m.tool,params:m.params,token:m.token,origin:{page:'home'}});
    if(m.action==='queued'){const j=queuedBridgeJobs.shift();if(j)j.id=m.id;renderReview();}
    if(m.action==='result'){
      const j=state.jobs.find(j=>j.id===m.id);if(j){j.status=m.status==='failed'?'failed':'success';if(m.status==='failed')refundJob(j);renderReview();syncBaseView();}
    }
  });
  document.getElementById('content-page-select')?.addEventListener('change',event=>{route={page:'home'};render();postBase('preview',{value:event.target.value});});
  // 只暴露测试所需的只读快照，便于本地核对扣豆与任务状态。
  // Read-only page inventory: reuse renderers without navigating or starting timers.
  function staticPageInventory() {
    const saved={state,route,drafts,subscriptionFeature};
    const pages=[];
    try {
      state={...JSON.parse(JSON.stringify(saved.state)),member:false,bound:false,memberPlan:'week',subscriptionPlan:'week',subscriptionAgreement:true,weekPurchased:false,autoRenew:true,gift:0,paid:[],pending:null,pack:2,rechargeReason:null};
      drafts={};subscriptionFeature='sales';
      const add=(id,group,title,note,render,extra={})=>{
        route={page:id,...extra};
        pages.push({id,group,title,note,html:render()});
      };
      for(let step=0;step<4;step++)add('newcomer-'+step,'新人流程',`新人引导 ${step+1} · ${newcomerSlides[step].title}`,'自然量与非自然量共用引导；第2—4页支持返回。',newcomerPage,{step});
      add('campaign-subscribe','新人流程','非自然量 · 订阅页','新人引导结束后的独立订阅样式。',campaignSubscription);
      add('subscribe','订阅与权益','自然量 / 端内 · 未开通会员','自然量新人最后一页沿用端内订阅页；首周¥9.9。',subscribe);
      for(const type of ['drama','novel','textvideo']){
        subscriptionFeature=type;
        add('subscribe-'+type,'订阅与权益',`订阅素材 · ${typeMap[type].name}`,'展示原文与生成效果的对应关系。',subscribe);
      }
      subscriptionFeature='sales';
      for(const [type,prompts] of Object.entries(staticCreationPrompts)){
        draft(type).prompt=prompts.descriptions[0];
        add('create-'+type,'创作页',`${typeMap[type].name} · 提示词条`,
          `共${prompts.tags.length}个互斥词条，单排左右滑动；示例选中「${prompts.tags[0]}」，文本框展示详细叙述。`,
          ()=>editor(type,prompts),{type});
      }
      add('recharge-guest','妙豆','妙豆充值 · 非会员','不展示充值SKU与明细入口。',recharge);
      state.member=true;state.bound=true;state.weekPurchased=true;state.gift=600;state.memberUntil=Date.now()+7*86400000;
      add('subscribe-active','订阅与权益','订阅页 · 续订中','仅展示当前订阅；隐藏购买SKU、营销标题和购买底栏。',subscribe);
      state.autoRenew=false;
      add('subscribe-cancelled','订阅与权益','订阅页 · 已取消续订','当期权益仍有效，展示会员权益到期日期。',subscribe);
      state.autoRenew=true;
      add('subscription-comparison','订阅与权益','权益详情','普通用户与PRO权益对比，突出PRO列。',subscriptionComparisonPage);
      add('recharge','妙豆','妙豆充值 · 会员','六档SKU、加赠数量与百分比角标。',recharge);
      state.gift=0;state.rechargeReason='insufficient';state.rechargeUsage=200;
      add('recharge-shortfall','妙豆','妙豆不足 · 充值弹窗','先展示用量缺口，再展示余额与充值SKU。',()=>`<section class="page">${top('视频带货')}<div class="scroll"><div class="content"><h3>创意描述</h3><p>${esc(typeMap.sales.prompt)}</p></div></div></section><div class="layers"><div class="overlay"><section class="drawer recharge-drawer"><div class="handle"></div><div class="drawer-header">${button(icon('close'),'dismiss','','aria-label="关闭弹窗"')}</div><div class="drawer-body">${rechargeContent()}</div></section></div></div>`);
      add('ledger','妙豆','妙豆明细','全部、消耗、获取记录；含妙豆规则入口。',ledgerPage);
      add('bean-rules','妙豆','妙豆规则','获取、有效期、扣除顺序、会员关系与充值说明。',beanRulesPage);
      add('rates','妙豆','创作用量表','按功能、分辨率及时长列出妙豆用量。',ratesPage);
      state.bound=false;
      add('bind-new','手机绑定','购买成功 · 首次绑定','紧接开通成功展示“会员已开通”。',()=>bindPage(false),{justSubscribed:true});
      add('bind-return','手机绑定','再次触发 · 手机绑定','从创作等入口重新进入，不再展示“会员已开通”。',()=>bindPage(false));
      return pages;
    } finally {
      state=saved.state;route=saved.route;drafts=saved.drafts;subscriptionFeature=saved.subscriptionFeature;
    }
  }
  Object.defineProperty(window,'commercialDemo',{value:{snapshot:()=>JSON.parse(JSON.stringify({state,route,events,drafts})),seed:seedScene,staticPages:staticPageInventory},writable:false});
  seedScene('guest');
  if(location.hash==='#subscribe')navigate('subscribe');
})();
