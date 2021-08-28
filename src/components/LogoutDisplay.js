
import React from 'react';

import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import {logout} from '../actions/AuthUser';

class Logout extends React.Component {

    componentDidMount() {
        this.props.performLogout();
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


export default LogoutDisplay;
