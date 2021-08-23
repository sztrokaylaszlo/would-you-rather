import React from 'react';
import { connect } from 'react-redux';
import AnsweredQuestionBar from './AnsweredQuestionBar';
class QuestionCardAnswered extends React.Component {

    render () {
        const { question, authUser } = this.props;
        const countAnswers = question.optionOne.votes.length + question.optionTwo.votes.length;
        let myAnswer = 'optionOne';
        for(let userId in question.optionTwo.votes) {
            if(question.optionOne.votes[userId] === authUser) {
                myAnswer = 'optionTwo';
            }
        }
        return (
            <div>
                <h2>Results: </h2>
                <AnsweredQuestionBar question={question.optionOne} countAnswers={countAnswers} additionalClass='greenAnswerCard' badge={true} />
                <AnsweredQuestionBar question={question.optionTwo} countAnswers={countAnswers} additionalClass='grayAnswerCard' badge={false} />
            </div>
        )
    }
}

const mapStateToQuestionCardAnswered = (state) => {
    return {
        authUser: state.authUser.id
    };
};

const mapDispatchQuestionCardAnswered = (dispatch) => (
    {
    }
);

const QuestionCardAnsweredDisplay = connect(
    mapStateToQuestionCardAnswered,
    mapDispatchQuestionCardAnswered
)(QuestionCardAnswered);

export default QuestionCardAnsweredDisplay;
