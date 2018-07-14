import { combineReducers } from 'redux';
import { 
    STORE_TOKEN, 
    LOAD_TRIGGER, 
    LOAD_DISMISS,
    TYPE_MESSAGE,
    SEND_MESSAGE,
    STORE_CONVO_ID,
    STORE_USER_ID } from '../actions/actions';

const initialState = {
    token: '',
    userId: '',
    loading: false,
    convoId: '',
    message: '',
    chatBox: []
};

function user(state = initialState, action) {
    switch (action.type) {
        case STORE_USER_ID:
            return { ...state, userId: action.payload };
        default:
            return state;
    }
}

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
        case STORE_CONVO_ID:
            return { ...state, convoId: action.payload };
        case SEND_MESSAGE:
            return { ...state, chatBox: [...state.chatBox, action.payload], message: '' };
        default:
            return state;
    }
}

const chatApp = combineReducers({
    user,
    token,
    loading,
    message
});

export default chatApp;
