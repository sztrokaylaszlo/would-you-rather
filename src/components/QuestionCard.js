import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import QuestionCardList from "./QuestionCardList";

const styles = theme => ({
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

class QuestionCard extends React.Component {
    render() {
        const { classes, question, type } = this.props;
        return (
            <Box style={{width: 'calc(100% - 40px)'}} my="2rem" px="3rem">
                <Card width={1}>
                    <CardHeader
                            title={`${type === 'unanswered' ? `${question.name} asks` : `Asked by ${question.name}` }`}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }}
                            className={classes.cardHeader}
                    />
                    <CardContent className={classes.cardContainer}>
                        <Grid container item xs={12} md={3} justifyContent="center" alignItems='center'>
                            <Avatar alt="alt" src={`/${question.avatarURL}`} className={classes.avatarLarge} />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            {React.createElement(this.props.component, this.props)}
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(QuestionCard);

