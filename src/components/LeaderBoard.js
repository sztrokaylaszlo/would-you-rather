import React from 'react';
import { connect } from 'react-redux';
import LeaderBoardCard from './LeaderBoardCard';


class LeaderBoard extends React.Component {
    render() {
        const { users } = this.props;
        return(
            <div>
                {
                    Object.keys(users).map((key) => (
                        <LeaderBoardCard key={key} user={users[key]} />
                    ))
                }
            </div>
        )
    }
}
const mapStateToLeaderBoard = (state) => {
    const users = Object.entries(state.users.list).map(user => [user[0], Object.assign({}, user[1], { count: (Object.keys(user[1].answers).length??0) + (Object.keys(user[1].questions).length??0) })] );
    return {
        users:Object.fromEntries(users.sort((a,b) =>(a[1].count > b[1].count) ? -1 : 1))
    };
};

const LeaderBoardDisplay = connect(
    mapStateToLeaderBoard,
    null
)(LeaderBoard);

export default LeaderBoardDisplay;
