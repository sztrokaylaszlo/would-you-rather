import React from 'react';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import styles from '../css/style.module.css';
import Badge from '@material-ui/core/Badge';

function LinearProgressWithLabel (props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

class AnsweredQuestionBar extends React.Component {
    render () {
        const { question, countAnswers, authUser, additionalClass, badge } = this.props;
        const card =
            <Card className={`${styles.answerCard} ${styles[additionalClass]}`}>
                Would you rather {question.text}
                <LinearProgressWithLabel value={parseInt(Math.round(question.votes.length / countAnswers * 100))}/>
                {question.votes.length} out ot {countAnswers} votes
            </Card>;
        if (badge) {
            return (
                <Badge color="secondary" badgeContent="your answer"   anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                    {card}
                </Badge>
            );
        } else {
            return (<div>{card}</div>);
        }
    }
}

const mapStateToAnsweredQuestionBar = (state) => {
    return {
        authUser: state.authUser.id
    };
};

const mapDispatchAnsweredQuestionBar = (dispatch) => (
    {}
);

const AnsweredQuestionBarDisplay = connect(
    mapStateToAnsweredQuestionBar,
    mapDispatchAnsweredQuestionBar
)(AnsweredQuestionBar);

export default AnsweredQuestionBarDisplay;
