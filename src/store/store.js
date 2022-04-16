import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { GET_REGIONS_DATA, GET_COMMENTS_DATA, ADD_COMMENT } from './types';

const initialState = { regionsData: null, comments: [] };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGIONS_DATA:
      return { ...state, regionsData: action.payload };
    case GET_COMMENTS_DATA:
      return { ...state, comments: action.payload };
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    default:
      return { ...state };
  }
};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
