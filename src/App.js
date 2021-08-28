import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/Shared';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import QuestionList from "./components/QuestionList";
import Question from "./components/Question";
import LeaderBoard from "./components/LeaderBoard";
import NewQuestion from "./components/NewQuestion";
import LoginDisplay from './components/Login';
import LogoutDisplay from "./components/LogoutDisplay";
import RouteWithMenu from './components/RouteWithMenu';

class App extends React.Component {
    componentDidMount () {
        this.props.handleInitialData();
    }

    render () {
        return (
            <div>
                <Switch>
                    <PrivateRoute path='/question_list' component={QuestionList}/>
                    <PrivateRoute path='/question' component={Question}/>
                    <PrivateRoute path='/leader_board' component={LeaderBoard}/>
                    <PrivateRoute path='/add' component={NewQuestion}/>
                    <RouteWithMenu path="/login" component={LoginDisplay}/>
                    <Route path='/logout' component={LogoutDisplay}/>
                    <Route exact path='/' render={() => (
                        <Redirect
                            to='/question_list'
                        />
                    )}/>
                </Switch>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        authUser: state.authUser.id
    };
};

const mapDispatchApp = (dispatch) => (
    {
        handleInitialData: () => (
            dispatch(handleInitialData())
        )
    }
);

const AppDisplay = connect(
    mapStateToProps,
    mapDispatchApp
)(App);

export default AppDisplay;
