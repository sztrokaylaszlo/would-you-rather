import {RECEIVE_QUESTIONS} from '../actions/Questions';

const initialState = {
    list: {}
};

function questionsReducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS: {
            return Object.assign({}, state, {list: action.data });
        }
        default: {
            return state;
        }
    }
}

export default questionsReducer;
