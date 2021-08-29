import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import QuestionCardContainer from './QuestionCardContainer';

class QuestionList extends React.Component {
    state = {
        tabValue: 0
    };

    render () {
        const { tabValue } = this.state;
        const handleChange = (event, newValue) => {
            this.setState({tabValue:newValue});
        };
        return (
            <Container maxWidth="sm">
                <Card>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Unanswered questions"/>
                        <Tab label="Answered questions"/>
                    </Tabs>
                    {
                        tabValue === 0 ? (<QuestionCardContainer list={this.props.notAnsweredQuestions}/>) : (
                            <QuestionCardContainer list={this.props.answeredQuestions}/>)
                    }
                </Card>
            </Container>
        );
    }
}

const mapStateToQuestionList = (state) => {
    let questions = state.questions.list;
    let answeredQuestions = {};
    let notAnsweredQuestions = {};
    let allQuestions = {};
    if(Object.entries(questions).length>0) {
        questions = Object.entries(questions).map(item => [item[0], Object.assign({}, item[1], {
            avatarURL: state.users.list[item[1].author].avatarURL,
            name: state.users.list[item[1].author].name
        })]);
        const answeredQuestionIds = state.users.list[state.authUser.id].answers;
        answeredQuestions = questions.filter(item => answeredQuestionIds.hasOwnProperty(item[1]['id']));
        answeredQuestions = Object.fromEntries(answeredQuestions.sort((a, b) => (a[1].timestamp > b[1].timestamp) ? -1 : 1))
        notAnsweredQuestions = questions.filter(item => !answeredQuestionIds.hasOwnProperty(item[1]['id']));
        notAnsweredQuestions = Object.fromEntries(notAnsweredQuestions.sort((a, b) => (a[1].timestamp > b[1].timestamp) ? -1 : 1))
        allQuestions = Object.fromEntries(questions)
    }
    return {
        allQuestions: allQuestions,
        answeredQuestions: answeredQuestions,
        notAnsweredQuestions: notAnsweredQuestions
    };
};

const QuestionListDisplay = connect(
    mapStateToQuestionList,
    null
)(QuestionList);

export default QuestionListDisplay;




