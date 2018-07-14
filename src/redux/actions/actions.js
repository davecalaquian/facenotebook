export const STORE_TOKEN = 'STORE_TOKEN';
export const LOAD_TRIGGER = 'LOAD_TRIGGER';
export const LOAD_DISMISS = 'LOAD_DISMISS';
export const TYPE_MESSAGE = 'TYPE_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const STORE_CONVO_ID = 'STORE_CONVO_ID';
export const STORE_USER_ID = 'STORE_USER_ID';


export const storeToken = token => ({
    type: STORE_TOKEN,
    payload: token
});

export const loadTrigger = () => ({ 
    type: LOAD_TRIGGER 
});

export const loadDismiss = () => ({ 
    type: LOAD_DISMISS 
});

export const typeMessage = (message) => ({
    type: TYPE_MESSAGE,
    payload: message
});

export const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    payload: message
});

export const storeConvoId = (convoId) => ({
    type: STORE_CONVO_ID,
    payload: convoId
});

export const storeUserId = (userId) => ({
    type: STORE_USER_ID,
    payload: userId
});