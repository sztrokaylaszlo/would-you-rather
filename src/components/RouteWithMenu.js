import React from 'react';

import { Route } from 'react-router-dom';
import HeaderMenu from './Menu';

const RouteWithMenu = ({ component, state, ...rest }) => (

    <Route {...rest} render={(props) => (
        <div>
            <HeaderMenu />
            {React.createElement(component, props)}
        </div>
    )} />
);


export default RouteWithMenu;
