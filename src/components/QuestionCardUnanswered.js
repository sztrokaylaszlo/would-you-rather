import React from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import { _saveQuestionAnswer } from '../utils/_DATA.js';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/Shared';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    button: {
        marginTop: theme.spacing(2)
    },
    avatarLarge: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]
    },
    cardContainer: {
        display: 'flex'
    }
});

class QuestionCardUnAnswered extends React.Component {
    state = {
        selectedAnswer: 'optionOne',
        loading: false
    };

    handleChange = (event) => {
        this.setState({ selectedAnswer: event.target.value });
    };

    handleSubmit = () => {
        this.setState({loading:true});
        Promise.all([
            _saveQuestionAnswer({
                authedUser: this.props.authUser,
                qid: this.props.question.id,
                answer: this.state.selectedAnswer
            })
        ]).then(() => {
            this.props.handleInitialData();
        });
    };

    render () {
        const { classes, question } = this.props;
        const { selectedAnswer, loading } = this.state;
        return (
            <div>
                {loading ? (<CircularProgress/>) : (
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Would you rather...</FormLabel>
                        <RadioGroup aria-label="gender"
                                    name="question"
                                    value={selectedAnswer}
                                    onChange={this.handleChange}>
                            <FormControlLabel value="optionOne" control={<Radio/>} label={question.optionOne.text}/>
                            <FormControlLabel value="optionTwo" control={<Radio/>} label={question.optionTwo.text}/>
                        </RadioGroup>
                        <Button className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </FormControl>
                )}
            </div>
        );
    }
}

const mapStateToQuestionCardUnanswered = (state) => {
    return {
        authUser: state.authUser.id
    };
};

const mapDispatchQuestionCardUnanswered = (dispatch) => (
    {
        handleInitialData: () => (
            dispatch(handleInitialData())
        )
    }
);

const QuestionCardUnAnsweredDisplay = connect(
    mapStateToQuestionCardUnanswered,
    mapDispatchQuestionCardUnanswered
)(QuestionCardUnAnswered);

export default withStyles(styles, { withTheme: true })(QuestionCardUnAnsweredDisplay);
