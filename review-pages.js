(() => {
  const main=document.querySelector('.review-main');
  function showView(view){
    if(!['requirements','static-pages'].includes(view))view='prototype';
    main.dataset.reviewView=view;
    document.getElementById('requirements-view').hidden=view!=='requirements';
    document.getElementById('static-pages-view').hidden=view!=='static-pages';
    document.querySelectorAll('.quick-links [data-review-view]').forEach(entry=>{
      if(entry.dataset.reviewView===view)entry.setAttribute('aria-current','page');
      else entry.removeAttribute('aria-current');
    });
    if(view==='static-pages')window.mountStaticPages();
  }
  const fromHash=()=>showView(location.hash.slice(1));
  document.addEventListener('click',event=>{
    const switcher=event.target.closest('button[data-review-view]');
    if(switcher){
      const view=switcher.dataset.reviewView;showView(view);
      history.replaceState(null,'',location.pathname+location.search+(view==='prototype'?'':'#'+view));
    }else if(event.target.closest('[data-scene], [data-preview], [data-control]')){
      showView('prototype');
      if(['#requirements','#static-pages'].includes(location.hash))history.replaceState(null,'',location.pathname+location.search);
    }
  });
  window.addEventListener('hashchange',fromHash);fromHash();
})();
