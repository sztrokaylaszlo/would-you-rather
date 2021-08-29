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
import { withCookies } from "react-cookie";
import { login } from './actions/AuthUser';
import NotFound from './components/NotFound';

class App extends React.Component {
    componentDidMount () {
        this.props.handleInitialData();
    }
    render () {
        if(!this.props.authUser && this.props.cookies.get('authUser') && window.location.pathname !=='/login'){
            this.props.login(this.props.cookies.get('authUser'));
        }
        if(!this.props.cookies.get('authUser') && !this.props.cookies.get('redirect') && window.location.pathname !=='/login'){
            this.props.cookies.set('redirect', window.location.pathname)
        }

        return (
            <div>
                <Switch>
                    <PrivateRoute path='/question_list' component={QuestionList}/>
                    <PrivateRoute path='/question' component={Question}/>
                    <PrivateRoute path='/leaderboard' component={LeaderBoard}/>
                    <PrivateRoute path='/add' component={NewQuestion}/>
                    <RouteWithMenu path="/404" component={NotFound}/>
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
        ),
        login: (id) => {
            dispatch(login(id))
        }
    }
);

const AppDisplay = connect(
    mapStateToProps,
    mapDispatchApp
)(App);

export default withCookies(AppDisplay);
