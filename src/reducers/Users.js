import {RECEIVE_USERS} from '../actions/Users';

const initialState = {
    list: {}
};

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_USERS: {
            return Object.assign({}, state, {list: action.data });
        }
        default: {
            return state;
        }
    }
}

export default usersReducer;
