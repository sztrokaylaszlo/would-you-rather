import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import HeaderMenu from './Menu';

const PrivateRoute = ({ component, state, ...rest }) => (

    <Route {...rest} render={(props) => (
        state.authUser.id ? (<div>
                <HeaderMenu />
                {React.createElement(component, props)}
            </div>

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
