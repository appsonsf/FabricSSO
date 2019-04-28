import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserActions from "../../actions/User";

import UserTable from "./UserTable";
import SearchBar from "./SearchBar";

class UserContainer extends Component {
    render() {
        return (
            <div>
                <SearchBar Actions={this.props.Actions}/>
                <UserTable {...this.props.state} Actions={this.props.Actions} />
            </div>

        );
    }
}



function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: {
            User: bindActionCreators(UserActions.User, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);