import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ADD } from './types';
import { SUBTRACT } from './types';

const initialState = { count: 0, msg: 'hello' };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD:
            return {...state, count: state.count + 1};
        case SUBTRACT:
            return {...state, count: state.count - 1};
        default:
            return { ...state };
    }
};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
