import React, { Component } from 'react';

import Sidebar from "./Sidebar";
import Nav from "./Nav";

export default class Layout extends Component {

    constructor() {
        super();
        //获取用户名
        let userName = $("#_username").val();
        this.state = {
            loading: false,
            userName: userName
        }
    }

    changeLoading() {
        this.setState({
            loading: !this.state.loading
        });
    }

    render() {
        return (
            <div className="main_container">
                <Sidebar userName={this.state.userName}/>
                <Nav userName={this.state.userName}/>
                <div className="right_col" style={{ "minHeight": 768 }} role="main">
                    {this.props.children}
                </div>
                <footer>
                    <div className="pull-right">
                        SSO - 单点登录后台管理 <a href="#">FabricSSO Demo </a>
                    </div>
                    <div className="clearfix"></div>
                </footer>
            </div>
        );
    }
}