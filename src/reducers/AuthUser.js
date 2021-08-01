import {LOGIN_SUCCESS, LOGOUT} from '../actions/AuthUser';

const initialState = {
    id: ''
};

function authUserReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return Object.assign({}, state, {id: action.id });
        }
        case LOGOUT: {
            return Object.assign({}, state, {id: '' });
        }
        default: {
            return state;
        }
    }
}

export default authUserReducer;
