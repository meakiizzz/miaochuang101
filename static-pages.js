(() => {
  const host=document.getElementById('static-pages-view');
  let initialized=false;
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function documentFor(page){
    const base=new URL('.',location.href).href;
    // srcdoc uses the parent's local origin; embed readable styles as well so
    // file previews do not depend on another stylesheet request from the frame.
    const styles=[...document.styleSheets].filter(sheet=>sheet.href&&/\/(styles|subscription)\.css(?:[?#]|$)/.test(sheet.href)).map(sheet=>{
      try{return '<style>'+[...sheet.cssRules].map(rule=>rule.cssText).join('\n')+'</style>';}
      catch{return '<link rel="stylesheet" href="'+escape(sheet.href)+'">';}
    }).join('');
    return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=390"><base href="${escape(base)}">${styles}<style>html,body{margin:0;padding:0;width:390px;height:844px;min-width:0;overflow:hidden;background:white}.phone{margin:0!important;width:390px!important;height:844px!important;border:0!important;border-radius:0!important;box-shadow:none!important}.app{position:relative}.app>.layers{inset:0}*,*::before,*::after{animation:none!important;transition:none!important}button,input,textarea{cursor:default}.statusbar{background:#fff!important;color:#292436!important}.home-indicator{background:#292436!important}.scroll{scroll-behavior:auto!important}</style></head><body><section class="phone"><div class="statusbar"><strong>9:41</strong><span>▂▄▆ ◔ ▰</span></div><div class="app">${page.html}</div><div class="home-indicator"></div></section></body></html>`;
  }
  function fillFrame(frame,page){
    if(!page.baseBanner){frame.srcdoc=documentFor(page);return;}
    frame.setAttribute('sandbox','allow-same-origin allow-scripts');
    frame.addEventListener('load',()=>frame.contentWindow.postMessage({channel:'miaochuang101',action:'static-banner',member:page.member},'*'),{once:true});
    frame.src=new URL('base.html',location.href).href;
  }
  window.mountStaticPages=()=>{
    if(initialized)return;
    const pages=window.commercialDemo.staticPages();
    initialized=true;
    host.innerHTML=`<header class="static-pages-header"><div><p>1.0.1 / PAGE INVENTORY</p><h1>新增页面与关键状态</h1><span>共 ${pages.length} 个静态预览 · 与当前交互原型共用页面样式</span></div><button data-review-view="prototype">返回交互原型</button></header><p class="static-pages-help">点击“放大查看”查看完整尺寸；预览内可滚动查看长页，按钮不执行操作。新人引导结束后，按来源进入对应订阅页。</p><nav class="static-page-filters" aria-label="页面分类">${['全部',...new Set(pages.map(p=>p.group))].map((g,i)=>`<button type="button" data-static-filter="${g}" aria-pressed="${i===0}">${g}</button>`).join('')}</nav><div class="static-page-grid"></div><dialog class="static-page-dialog"><header><strong></strong><button type="button" data-static-close aria-label="关闭放大预览">关闭 ×</button></header><div class="static-expanded-frame"></div></dialog>`;
    const grid=host.querySelector('.static-page-grid');
    pages.forEach((page,index)=>{
      const card=document.createElement('article');card.className='static-page-card';card.dataset.group=page.group;
      card.innerHTML=`<div class="static-card-heading"><small>${String(index+1).padStart(2,'0')} / ${escape(page.group)}</small><h2>${escape(page.title)}</h2><p>${escape(page.note)}</p><button type="button" data-static-expand="${index}">放大查看 ↗</button></div><div class="static-phone-space"><iframe loading="lazy" sandbox="allow-same-origin" title="${escape(page.title)}静态预览"></iframe></div>`;
      fillFrame(card.querySelector('iframe'),page);grid.append(card);
    });
    const dialog=host.querySelector('dialog');
    host.addEventListener('click',event=>{
      const filter=event.target.closest('[data-static-filter]');
      if(filter){host.querySelectorAll('[data-static-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===filter)));grid.querySelectorAll('article').forEach(c=>c.hidden=filter.dataset.staticFilter!=='全部'&&c.dataset.group!==filter.dataset.staticFilter);}
      const expand=event.target.closest('[data-static-expand]');
      if(expand){const page=pages[Number(expand.dataset.staticExpand)];dialog.querySelector('strong').textContent=page.title;const iframe=document.createElement('iframe');iframe.setAttribute('sandbox','allow-same-origin');iframe.title=page.title;fillFrame(iframe,page);dialog.querySelector('.static-expanded-frame').replaceChildren(iframe);dialog.showModal();}
      if(event.target.closest('[data-static-close]'))dialog.close();
    });
    dialog.addEventListener('close',()=>dialog.querySelector('.static-expanded-frame').replaceChildren());
  };
})();
