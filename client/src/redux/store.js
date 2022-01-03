import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userReducer } from "../redux/reducers/userReducers";
import { postsReducer } from "../redux/reducers/postReducers";
import { categoryReducer } from "../redux/reducers/categoryReducers";

let initialState = {};

const reducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  category: categoryReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
