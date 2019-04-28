import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RoleActions from "../../actions/Role";

//引入组件
import RoleTable from "./RoleTable";

class RoleContainer extends Component {
    render() {
        return (
            <div>
                <RoleTable Actions={this.props.RoleActions} RoleUserActions={this.props.RoleUserActions} RoleState={this.props.Role.Role} RoleUsersState={this.props.Role.UserRole} />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        RoleActions: bindActionCreators(RoleActions.Role, dispatch),
        RoleUserActions: bindActionCreators(RoleActions.RoleUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleContainer);