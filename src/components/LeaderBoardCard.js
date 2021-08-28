import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    avatarLarge: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    cardContainer: {
        display: 'flex',
    },
    answerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1em',
        marginBottom: '1em'
    }
});

class LeaderBoardCard extends React.Component {
    render() {
        const { classes, user } = this.props;
        return (
            <Container maxWidth="sm">
                    <Box style={{width: 'calc(100% - 40px)'}} my="2rem" px="3rem">
                        <Card width={1}>
                            <CardContent className={classes.cardContainer}>
                                <Grid container item xs={12} md={3} justifyContent="center" alignItems='center'>
                                    <Avatar alt="alt" src={`/${user.avatarURL}`} className={classes.avatarLarge} />
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <h2>{user.name}</h2>
                                    <div className={classes.answerContainer}>
                                        <span>Answered questions:</span>
                                        <span>{Object.keys(user.answers).length??0}</span>
                                    </div>
                                    <Divider />
                                    <div className={classes.answerContainer}>
                                        <span>Created questions: </span>
                                        <span>{Object.keys(user.questions).length??0}</span>
                                    </div>
                                    <Divider />
                                    <div className={classes.answerContainer}>
                                        <span>Score: </span>
                                        <span>{user.count}</span>
                                    </div>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
            </Container>
        )
    }
}
export default withStyles(styles, { withTheme: true })(LeaderBoardCard);
