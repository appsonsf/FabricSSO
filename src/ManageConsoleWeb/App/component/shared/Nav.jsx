import React, { Component } from 'react';


export default class Nav extends Component {
    render() {
        return (
            <div className="top_nav">
                <div className="nav_menu">
                    <nav>
                        <div className="nav toggle">
                            <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="">
                                <a href="javascript:;" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <img src="/images/img.jpg" alt="" />{this.props.userName === "" ? "请登录" : this.props.userName}
                                    <span className=" fa fa-angle-down"></span>
                                </a>
                                <ul className="dropdown-menu dropdown-usermenu pull-right">
                                    {this.renderLoginOrOut()}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }

    renderLoginOrOut() {
        if (this.props.userName === "") {
            return (
                <li><a href="/Login"><i className="fa fa-sign-out pull-right"></i>登录</a></li>
            );
        } else {
            return (
                <li><a href="/Logout"><i className="fa fa-sign-out pull-right"></i>登出</a></li>
            );
        }
    }
}