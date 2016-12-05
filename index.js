const render = () => {
  const state = store.getState();
  if(state.imgs.currentLoaded){
    _infiniteLoadStatus.classList.remove('loading');
    _infiniteLoadStatus.innerHTML = 'LOADED';
  }
  else if(state.imgs.loadComplete){
    _infiniteLoadStatus.classList.remove('loading');
    _infiniteLoadStatus.classList.add('complete');
    _infiniteLoadStatus.innerHTML = 'DATA LOAD COMPLETE!';
  }
  else {
    _infiniteLoadStatus.classList.add('loading');
    _infiniteLoadStatus.innerHTML = 'LOADING. . .';
  }
}
render();
store.subscribe(render);

document.addEventListener('DOMContentLoaded', function(){
  store.dispatch({type:'DOMCONTENTLOADED'});
  store.dispatch(asyncLoadContentInit);
}, false);
document.addEventListener('scroll', debounced_commenceNextLoad);
