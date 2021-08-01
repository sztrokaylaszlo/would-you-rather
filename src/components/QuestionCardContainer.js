import React from 'react';
import QuestionCard from './QuestionCard';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

class QuestionCardContainer extends React.Component {
    render() {
        const { classes, list } = this.props;
        return (
                <div className={classes.paper}>
                    {
                        Object.keys(list).map((key) => (
                                <QuestionCard key={list[key].id} question={list[key]} />
                            ))
                    }
                </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(QuestionCardContainer);
