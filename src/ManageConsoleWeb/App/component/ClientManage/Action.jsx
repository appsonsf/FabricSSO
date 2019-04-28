import React, { Component } from 'react';

import { msg } from "../../_shared/tool";

export default class Action extends Component {

    del() {
        if (this.props.del)
            this.props.del();
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
                    <li><a href="#" onClick={this.view.bind(this)}>详情</a>
                    </li>
                    <li><a href="#" onClick={this.del.bind(this)}>删除</a>
                    </li>
                </ul></div>
        );
    }
}