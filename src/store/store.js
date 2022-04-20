import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { GET_REGIONS_DATA, GET_COMMENTS_DATA, ADD_COMMENT, EDIT_VALUE } from './types';

const initialState = { regionsData: null, comments: [] };

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REGIONS_DATA:
      return { ...state, regionsData: payload };
    case GET_COMMENTS_DATA:
      return { ...state, comments: payload };
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, payload] };
    case EDIT_VALUE: {
      const newRegionsData = { ...state.regionsData };
      newRegionsData[payload.region].G[payload.year][payload.column].value = payload.value;
      return { ...state, regionsData: newRegionsData };
    }
    default:
      return { ...state };
  }
};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
