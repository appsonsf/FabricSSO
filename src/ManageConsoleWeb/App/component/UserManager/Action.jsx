import React, { Component } from 'react';

import { msg } from "../../_shared/tool";



export default class Action extends Component {
    render() {
        return (
            <div className="btn-group">
                <button data-toggle="dropdown" className="btn btn-default dropdown-toggle" type="button" aria-expanded="true">操作
                    <span className="caret"></span>
                </button>
                <ul style={{ minWidth: 30 }} role="menu" className="dropdown-menu">
                    <li>
                        <a href="javascrpit:void(0)" onClick={this.props.EditPassword}>修改密码</a>
                    </li>
                    <li>
                        <a href="javascrpit:void(0)" onClick={this.props.EditMobile}>修改手机号</a>
                    </li>

                    <li>
                        <a href="javascrpit:void(0)" onClick={this.props.EditState}>修改状态</a>
                    </li>
                    <li>
                        <a href="javascrpit:void(0)" onClick={this.props.EditUserName}>修改用户名</a>
                    </li>
                    <li>
                        <a href="javascrpit:void(0)" onClick={this.props.unLockUser}>解除锁定</a>
                    </li>
                    <li>
                        <a href="javascrpit:void(0)" onClick={this.props.Delete}>删除</a>
                    </li>
                </ul>
            </div>
        );
    }
}