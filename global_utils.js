//default state settings
let DEFAULT = {
  pollingForData: false,
  page: 1,
  //reqd
  imgsData: [],
  imgsDataAll:[],
  initLoadState: false,
  currentLoading:false,
  currentLoaded:true,
  loadComplete: false
}

//loadImgs
const loadImgs = (data, contentContainer) => {
  data.forEach(function(post, index) {
      let newLi = document.createElement('li');
          newLi.setAttribute('class', 'dataItem');
          contentContainer.appendChild(newLi);
          newLi.innerHTML = `<img src='${post.featured_image.source}' class='img-responsive'/>`;
          contentContainer.appendChild(newLi);
    })
}

//commenceNextLoad on scroll
const commenceNextLoad = () => {
  let _state = store.getState().imgs;
  let pollingForData = _state.pollingForData;
  let page = _state.page;

  if(_state.loadComplete){
    console.log('DATA LOAD COMPLETE');
    return;
  }
  distToBottom = getDistFromBottom();
  console.log('distToBottom: ', distToBottom);
  //console.log('pollingForData: ', pollingForData);
  //console.log('page: ', page);
  if (!pollingForData && distToBottom > 0 && distToBottom <= 999999) {
    store.dispatch(nextAsyncLoadContent);
  }

}

const debounced_commenceNextLoad = debounce(function() {
  commenceNextLoad();
}, 10);

//debounce
function debounce(func, wait, immediate) {
   var timeout;
   return function() {
      var context = this, args = arguments;
      var later = function() {
         timeout = null;
         if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
   };
}

//XHR_req_reduxed
const XHR_req_reduxed = function(url, callback) {
  console.log('rawXHR running!');
  var request = new XMLHttpRequest();
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      //update store
      store.dispatch({'type': 'OFF_POLLINGFORDATA'});
      var data = request.responseText;
      if(typeof data !== 'object'){
        data = JSON.parse(request.responseText);
      }
      callback(data);
    } else {
      console.log('Server reached but an internal error occured!');
    }
  };
  request.open('GET', url);
  request.onerror = function () {
    console.log("** An error occurred during the transaction");
  };
  request.send();
  //update store
  store.dispatch({'type': 'ON_POLLINGFORDATA'});
};
