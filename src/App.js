import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/Shared';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import QuestionList from "./components/QuestionList";
import Question from "./components/Question";

import LoginDisplay from './components/Login';

class App extends React.Component {
    componentDidMount () {
        this.props.handleInitialData();
    }

    render () {
        return (
            <Switch>
                <PrivateRoute path='/question_list' component={QuestionList}/>
                <PrivateRoute path='/question' component={Question}/>
                <Route path="/login" component={LoginDisplay}/>
                <Route exact path='/' render={() => (
                    <Redirect
                        to='/question_list'
                    />
                )}/>
            </Switch>
        );
    }
}

const mapDispatchApp = (dispatch) => (
    {
        handleInitialData: () => (
            dispatch(handleInitialData())
        )
    }
);

const AppDisplay = connect(
    null,
    mapDispatchApp
)(App);

export default AppDisplay;
