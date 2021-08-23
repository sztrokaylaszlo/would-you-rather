import {RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER} from '../actions/Questions';

const initialState = {
    list: {}
};

function questionsReducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS: {
            return Object.assign({}, state, {list: action.data });
        }
        case SAVE_QUESTION_ANSWER: {
            return state;
        }
        default: {
            return state;
        }
    }
}

export default questionsReducer;
