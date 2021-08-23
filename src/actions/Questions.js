export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export function receiveQuestions (data) {
    return {type: RECEIVE_QUESTIONS, data};
}

export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export function saveQuestionAnswer (data) {
    return {type: SAVE_QUESTION_ANSWER, data};
}

