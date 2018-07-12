export const STORE_TOKEN = 'STORE_TOKEN';
export const LOAD_TRIGGER = 'LOAD_TRIGGER';
export const LOAD_DISMISS = 'LOAD_DISMISS';

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
