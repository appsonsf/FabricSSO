import React, { Component } from 'react';

import { msg } from "../../_shared/tool";

export default class Action extends Component {

    bindUsers() {
        if (this.props.bindUsers)
            this.props.bindUsers();
    }

    del() {
        if (this.props.del) {
            this.props.del();
        }
    }

    edit() {
        if (this.props.edit)
            this.props.edit();
    }

    lookUsers() {
        if (this.props.lookUsers)
            this.props.lookUsers();
    }

    render() {
        return (
            <div className="btn-group">
                <button data-toggle="dropdown" className="btn btn-default dropdown-toggle" type="button" aria-expanded="true">操作
                        <span className="caret"></span>
                </button>
                <ul style={{ minWidth: 30 }} role="menu" className="dropdown-menu">
                    <li><a href="#" onClick={this.bindUsers.bind(this)}>绑定用户</a>
                    </li>
                    <li><a href="#" onClick={this.lookUsers.bind(this)}>查看已绑定用户</a>
                    </li>
                    <li><a href="#" onClick={this.edit.bind(this)}>编辑</a>
                    </li>
                    <li><a href="#" onClick={this.del.bind(this)}>删除</a>
                    </li>
                </ul></div>
        );
    }
}