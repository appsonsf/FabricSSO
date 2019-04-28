import React, { Component } from 'react';

export default class Action extends Component {

    createUser() {
        if (this.props.createUser)
            this.props.createUser();
    }

    render() {
        return (
            <div className="btn-group">
                <button data-toggle="dropdown" className="btn btn-default dropdown-toggle" type="button" aria-expanded="true">操作
                    <span className="caret"></span>
                </button>
                <ul style={{ minWidth: 30 }} role="menu" className="dropdown-menu">
                    <li><a href="#" onClick={this.createUser.bind(this)}>创建用户</a>
                    </li>
                </ul>
            </div>
        );
    }
}