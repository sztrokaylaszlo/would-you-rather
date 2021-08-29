import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/AuthUser';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withCookies } from "react-cookie";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});

class Login extends React.Component {
    state = {
        redirect: ''
    }
    render () {
        const { classes, users, loading } = this.props;
        const handleChange = (event) => {
            this.props.login(event.target.value);
            if(this.props.cookies.get('redirect')) {
                this.setState({redirect: this.props.cookies.get('redirect')})
                this.props.cookies.remove('redirect');
            }
        };
        if (this.props.authUser && this.state.redirect) {
            return (
                <Redirect to={this.state.redirect}/>
            )
        }
        else if (this.props.authUser) {
            return (
                <Redirect to="/question_list"/>
            )
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        {
                            loading ? (<CircularProgress/>) : (
                                <FormControl className={classes.form} noValidate>
                                    <InputLabel id="login-select-label">Select your user</InputLabel>
                                    <Select
                                        labelId="login-select-label"
                                        id="login-select"
                                        onChange={handleChange}>
                                        {
                                            Object.keys(users).map((key) => (
                                                <MenuItem key={users[key].id}
                                                          value={users[key].id}>{users[key].name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}>
                                        Sign In
                                    </Button>
                                </FormControl>
                            )
                        }
                    </div>
                </Container>
            );
        }
    }
}

const mapStateToLoginForm = (state) => {
    return {
        users: state.users.list,
        loading: state.users.list.length === 0,
        authUser: state.authUser.id,
        questions: state.questions.list
    };
};

const mapDispatchLoginForm = (dispatch) => (
    {
        login: (id) => (
            dispatch(login(id))
        )
    }
);

const LoginDisplay = connect(
    mapStateToLoginForm,
    mapDispatchLoginForm
)(Login);

export default withStyles(styles, { withTheme: true })(withCookies(LoginDisplay));
