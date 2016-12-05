const logger = store => next => action => {
  console.group("logger")
  console.log('currentState: ', store.getState());
  console.log('action dispatched: ', action);
  next(action);
  console.log('updatedState: ', store.getState());
  console.groupEnd("logger");
}
const thunk = store => next => action => {
  if(typeof action === 'function'){
    action(store.dispatch, store.getState())
  }
  else {
    next(action)
  }
}
