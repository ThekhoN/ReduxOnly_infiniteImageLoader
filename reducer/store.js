const {createStore} = Redux;
const store = createStore(combineReducer, Redux.applyMiddleware(logger, thunk));
