import React, { Component } from 'react';

import { msg } from "../../_shared/tool";

export default class Action extends Component {

    removeAllRole(e) {
        e.preventDefault();
        var roleIds = [];
        for (let i = 0; i < this.props.data.roles.length; i++) {
            roleIds.push(this.props.data.roles[i].id);
        }
        this.props.Actions.removeRole(this.props.data.id, roleIds);
    }

    updateRole(e) {
        e.preventDefault();
        this.props.edit();
    }

    render() {
        return (
            <div className="btn-group">
                <button data-toggle="dropdown" className="btn btn-default dropdown-toggle" type="button" aria-expanded="true">操作
                    <span className="caret"></span>
                </button>
                <ul style={{ minWidth: 30 }} role="menu" className="dropdown-menu">
                    <li><a href="javascrpit:void(0)" onClick={this.removeAllRole.bind(this)}>移除所有角色</a>
                    </li>
                    <li><a href="javascrpit:void(0)" onClick={this.updateRole.bind(this)}>更新角色</a>
                    </li>
                </ul></div>
        );
    }
}