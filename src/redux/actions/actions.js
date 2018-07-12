export const STORE_TOKEN = 'STORE_TOKEN';

export const storeToken = token => ({
    type: STORE_TOKEN,
    payload: token
});
