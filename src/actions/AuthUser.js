
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function login (id) {
    return {type: LOGIN_SUCCESS, id};
}

export const LOGOUT = 'LOGOUT';
export function logout () {
    return {type: LOGOUT};
}
