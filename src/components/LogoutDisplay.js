import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import {logout} from '../actions/AuthUser';
import { withCookies } from "react-cookie";

class Logout extends React.Component {

    componentDidMount() {
        this.props.performLogout();
        this.props.cookies.remove('redirect');
    };
    render() {
        return (
            <Redirect
                to='/login'
            />
        );
    }
}

const mapStateToLogout = (state) => {
    return {
        state,
    };
};

const mapDispatchLogout = (dispatch) => (
    {
        performLogout: () => (
            dispatch(logout())
        ),
    }
);

const LogoutDisplay = connect(
    mapStateToLogout,
    mapDispatchLogout
)(Logout);


export default withCookies(LogoutDisplay);
