import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
    marginRight: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class HeaderMenu extends React.Component {
    state = {
        anchorEl: null,
        open: false,
        id: undefined
    };
    render() {
        const { classes, authUser, userName } = this.props;
        const pages = {
            '/question_list' : 'Question List',
            '/login': 'Login',
            '/leaderboard': 'Leader board',
            '/add': 'New question',
            '/question': 'Question'
        }

        const handleClick = (event) =>  {
            this.setState({anchorEl: event.currentTarget, open: Boolean(event.currentTarget), id: "simple-popover"});
        }

        const handleClose = (event) => {
            this.setState({anchorEl: event.currentTarget, open: false, id: undefined});
        }
        return (
            <AppBar position="static">{this.props.location}
                <Toolbar>
                    <IconButton edge="start" color="inherit"  aria-describedby="simple-menu" className={classes.marginRight} aria-label="menu" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={this.state.open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link to='/question_list'>
                                Question List
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to='/leaderboard'>
                                Leader board
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to='/add'>
                                New question
                            </Link>
                        </MenuItem>
                    </Menu>
                    <Typography variant="h6" className={classes.title}>
                        {pages[`${window.location.pathname}`]}
                    </Typography>
                    {userName ? (<div className={classes.marginRight}>Logged in with {userName}</div>) : ''}
                    <Button color="inherit" component={Link} to={authUser?'/logout':'/login'}>
                        {authUser?'Logout':'Login'}
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToHeaderMenu = (state) => {
    let userName = '';
    if(state.users.list) {
        userName = Object.entries(state.users.list).filter(user => user[0] === state.authUser.id);
        if(userName.length > 0) {
            userName = userName[0][1].name;
        }

    }
    return {
        authUser: state.authUser.id,
        userName: userName
    };
};

const HeaderMenuDisplay = connect(
    mapStateToHeaderMenu,
    null
)(HeaderMenu);

export default withStyles(styles, { withTheme: true })(HeaderMenuDisplay);
