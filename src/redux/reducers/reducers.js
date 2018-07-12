import { combineReducers } from 'redux';
import { STORE_TOKEN, LOAD_TRIGGER, LOAD_DISMISS } from '../actions/actions';

const initialState = {
    token: '',
    loading: false
};

function loading(state = initialState, action) {
    switch (action.type) {
        case LOAD_TRIGGER:
            return { ...state, loading: true };
        case LOAD_DISMISS:
            return { ...state, loading: false };
      default:
        return state;
    }
}

function token(state = initialState, action) {
    switch (action.type) {
        case STORE_TOKEN:
            return { ...state, token: action.payload };
        default:
            return state;
    }
}

const chatApp = combineReducers({
    token,
    loading
});

export default chatApp;
