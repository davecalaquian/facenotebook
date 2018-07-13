import { combineReducers } from 'redux';
import { 
    STORE_TOKEN, 
    LOAD_TRIGGER, 
    LOAD_DISMISS,
    TYPE_MESSAGE,
    SEND_MESSAGE } from '../actions/actions';

const initialState = {
    token: '',
    loading: false,
    message: '',
    chatBox: []
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

function message(state = initialState, action) {
    switch (action.type) {
        case TYPE_MESSAGE:
            return { ...state, message: action.payload };
        case SEND_MESSAGE:
            console.log(state.chatBox);
            console.log(state.message);
            return { ...state, chatBox: [...state.chatBox, action.payload], message: '' };
        default:
            return state;
    }
}

const chatApp = combineReducers({
    token,
    loading,
    message
});

export default chatApp;
