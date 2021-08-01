import {combineReducers} from "redux";
import authUserReducer from '../reducers/AuthUser';
import usersReducer from '../reducers/Users';
import questionsReducer from './Questions';

const reducer = combineReducers({
    authUser: authUserReducer,
    users: usersReducer,
    questions: questionsReducer
});

export default reducer;
