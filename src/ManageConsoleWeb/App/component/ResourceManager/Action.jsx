import React, { Component } from 'react';

import confirm from "../../_shared/confirm";


export default class Action extends Component {

    del() {
        if (this.props.del) {
            confirm(_ => {
                this.props.del();
            }, "确定要删除该资源");
        }
    }

    view() {
        if (this.props.view)
            this.props.view();
    }

    edit() {
        if (this.props.edit)
            this.props.edit();
    }

    render() {
        return (
            <div className="btn-group">
                <button data-toggle="dropdown" className="btn btn-default dropdown-toggle" type="button" aria-expanded="true">操作
                    <span className="caret"></span>
                </button>
                <ul style={{ minWidth: 30 }} role="menu" className="dropdown-menu">
                    <li><a href="#" onClick={this.edit.bind(this)}>编辑</a>
                    </li>
                    <li><a href="#" onClick={this.del.bind(this)}>删除</a>
                    </li>
                </ul></div>
        );
    }
}