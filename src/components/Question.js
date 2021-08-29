import React from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import QuestionCardUnanswered from './QuestionCardUnanswered';
import QuestionCardAnswered from './QuestionCardAnswered';
import Container from '@material-ui/core/Container';
import { getUrlFromPath } from '../utils/Utils';
import { Redirect } from 'react-router-dom';


class Question extends React.Component {

    render () {
        const { isQuestionAnswered, question, notFound } = this.props;
        if (notFound) {
            return (<Redirect to="/404"/>)
        } else {
            return (
                <Container maxWidth="sm">
                    {isQuestionAnswered ?
                        <QuestionCard question={question} component={QuestionCardAnswered} type='answered'/>
                        : <QuestionCard question={question} component={QuestionCardUnanswered} type='unanswered'/>}
                </Container>
            )
        }
    }
}

const mapStateToQuestion = (state, props) => {
    const {location} = props
    let isQuestionAnswered = false;
    const users = state.users.list;
    let  questions = Object.fromEntries(Object.entries(state.questions.list).map(item => [item[0], Object.assign({}, item[1], { avatarURL: state.users.list[item[1].author].avatarURL, name:state.users.list[item[1].author].name })]));;
    let question = {};
    let results = {};
    let notFound = false;
    if(Object.entries(questions).length > 0) {
        const answeredQuestions = Object.fromEntries(Object.entries(state.users.list).filter(([key, val]) => key === state.authUser.id))[state.authUser.id].answers;
        question = Object.fromEntries(Object.entries(questions).filter(([key, val]) => key === getUrlFromPath(location.pathname, 2)))[getUrlFromPath(location.pathname, 2)];
        if(question) {
            for (let answeredQuestion in answeredQuestions) {
                if (answeredQuestion === question.id) {
                    isQuestionAnswered = true;
                }
            }
            results = { optionOne: 0, optionTwo: 0 };
            for (let userId in users) {
                for (let userAnswerId in users[userId].answers) {
                    if (userAnswerId === question.id) {
                        if (users[userId].answers[userAnswerId] === 'optionOne') {
                            results.optionOne++;
                        } else {
                            results.optionTwo++;
                        }
                    }
                }
            }
        } else {
            notFound = true;
        }
    }
    return {
            question: isQuestionAnswered ? question : question,
            results: results,
            isQuestionAnswered: isQuestionAnswered,
            notFound: notFound
    };
};

const QuestionDisplay = connect(
    mapStateToQuestion,
    null
)(Question);

export default QuestionDisplay;

