import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        marginTop: theme.spacing(2),
    },
    avatarLarge: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardContainer: {
        display: 'flex',
    }
});

class QuestionCardList extends React.Component {
    render () {
        const { classes, question } = this.props;
        return (
            <div>
                <Typography component="h2" variant="h5">
                    Would you rather
                </Typography>
                <div>
                    ...{question.optionOne.text}...
                </div>
                <Button className={classes.button} component={Link} to={`/question/${question.id}`} variant="contained" color="primary">
                    View poll
                </Button>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(QuestionCardList);
