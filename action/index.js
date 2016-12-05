const asyncLoadContentInit = (dispatch, state) => {
  dispatch({type:'INIT_LOADING'});
  dispatch({type:'CURRENT_LOADING'});

  const firstContentApi = 'https://www.techinasia.com/wp-json/techinasia/2.0/posts?page=1&per_page=5';
  XHR_req_reduxed(firstContentApi, function (data) {
    console.log('data', data);
    dispatch({type:'INIT_LOADED'});
    dispatch({type:'CURRENT_LOADED', imgsData:data.posts});
  });
}
const nextAsyncLoadContent = (dispatch, state) => {
  dispatch({type:'CURRENT_LOADING'});
  let nextPage = state.imgs.page;
  //31 MAX
  if(nextPage === 31) {
    dispatch({type:'COMPLETE'});
    return;
  }
  const nextContentApi = `https://www.techinasia.com/wp-json/techinasia/2.0/posts?page=${nextPage}'&per_page=5`
  XHR_req_reduxed(nextContentApi, function (data) {
    dispatch({type:'CURRENT_LOADED', imgsData:data.posts});
  });
}

const imgs_A = (imgs= DEFAULT, action) => {
  let _imgs = Object.assign({}, imgs);
  switch(action.type){
    case 'DOMCONTENTLOADED':
      return _imgs;

    case 'INIT_LOADING':
      _imgs.initLoadState = false;
      return _imgs;

    case 'INIT_LOADED':
      _imgs.initLoadState = true;
      return _imgs;

    case 'COMPLETE':
       _imgs.loadComplete = true;
      return _imgs;

    case 'ON_POLLINGFORDATA':
      _imgs.pollingForData = true;
      return _imgs;

    case 'OFF_POLLINGFORDATA':
      _imgs.pollingForData = false;
      return _imgs;

    case 'CURRENT_LOADING':
      _imgs.currentLoading = true;
      _imgs.currentLoaded = false;
      return _imgs;

    case 'CURRENT_LOADED':
      _imgs.currentLoaded = true;
      _imgs.imgsData = action.imgsData;
      //load images
      loadImgs(_imgs.imgsData, _contentContainer);
      _imgs.currentLoading = false;
      //update imgsDataAll
      _imgs.imgsData.forEach((e) =>{
        _imgs.imgsDataAll.push(e);
      });
      _imgs.imgsData = [];
      _imgs.page = parseInt(_imgs.page) + 1;
      return _imgs;

    default:
      return _imgs;
  }
}
