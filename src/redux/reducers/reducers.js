import { combineReducers } from 'redux';
import { STORE_TOKEN } from '../actions/actions';

const intialState = {
    token: ''
};

function token(state = intialState, action) {
    switch (action.type) {
        case STORE_TOKEN:
            return { ...state, token: action.payload };
        default:
            return state;
    }
}

const chatApp = combineReducers({
    token
});

export default chatApp;
