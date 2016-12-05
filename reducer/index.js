const combineReducer = (state= DEFAULT, action) => {
  let _state = Object.assign({}, state);
  _state = {
    imgs:imgs_A(state.imgs, action)
  }
  return _state;
}
