import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { _saveQuestion } from '../utils/_DATA';
import { handleInitialData } from '../actions/Shared';
import CircularProgress from '@material-ui/core/CircularProgress';

class NewQuestion extends React.Component {
    state = {
        optionOne: '',
        optionTwo: '',
        loading: false
    };

    handleSubmit = () => {

        // TODO handle empty input submit with error message
        if(this.state.optionOne !== '' && this.state.optionTwo !== '') {
            this.setState({loading:true});
            Promise.all([
                _saveQuestion({
                    author: this.props.authUser,
                    optionOneText: this.state.optionOne,
                    optionTwoText: this.state.optionTwo,
                })
            ]).then(() => {
                this.props.handleInitialData();
                this.props.history.push('/leaderboard')
            });
        }
    };

    handleOnchange = (event) => {
        this.setState( {[event.target.id]: event.target.value})
    }

    render() {
        const { loading } = this.state;
        return (
            <div>
                {loading ? (<CircularProgress/>) : (
                <Container maxWidth="sm">
                    <Card width={1}>
                        <CardHeader
                            title={`Create new question`}
                        />
                        <CardContent>
                            <div>Complete the question</div>
                            <div>Would you rather...</div>
                            <div>
                                <TextField required id="optionOne" label="Enter option One text here" onChange={this.handleOnchange} />
                            </div>
                            <div>or</div>
                            <div>
                                <TextField required id="optionTwo" label="Enter option Two text here" onChange={this.handleOnchange} />
                            </div>
                            <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </CardContent>
                    </Card>
                </Container> )}
            </div>
        )
    }
}

const mapStateToNewQuestion = (state) => {
    return {
        questions: state.questions.list,
        authUser: state.authUser.id
    };
};

const mapDispatchNewQuestion = (dispatch) => (
    {
        handleInitialData: () => (
            dispatch(handleInitialData())
        )
    }
);

const NewQuestionDisplay = connect(
    mapStateToNewQuestion,
    mapDispatchNewQuestion
)(NewQuestion);

export default NewQuestionDisplay;
