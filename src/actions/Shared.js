import { getInitialData } from '../utils/Api'
import { receiveUsers } from './Users'
import { receiveQuestions } from './Questions'

export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
            })
    }
}
