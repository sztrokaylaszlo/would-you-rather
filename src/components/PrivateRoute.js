import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";


const PrivateRoute = ({ component, state, ...rest }) => (

    <Route {...rest} render={(props) => (
        state.authUser.id ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{
                pathname: '/login',
            }} />
        )
    )} />
);
const mapStateToPrivateRoute = (state) => {
    return {
        state,
    };
};

const PrivateRouteDisplay = connect(
    mapStateToPrivateRoute
)(PrivateRoute);


export default PrivateRouteDisplay;
