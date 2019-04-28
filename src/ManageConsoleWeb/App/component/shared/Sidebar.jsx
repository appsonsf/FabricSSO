import React, { Component } from "react";
import { Route, Link, withRouter } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    groupName: "General",
                    groupItems: [
                        {
                            label: "角色管理",
                            items: [
                                {
                                    name: "系统角色",
                                    link: "/reactRoleManager"
                                }, {
                                    name: "用户角色",
                                    link: "/ReactRoleUsersManage"
                                }, {
                                    name: "员工组管理",
                                    link:"/contactgroup"
                                }
                            ]
                        }, {
                            label: "资源管理",
                            items: [
                                {
                                    name: "客户端管理",
                                    link: "/ReactClientManage"
                                }, {
                                    name: "资源管理",
                                    link: "/ReactResourceManager"
                                }
                            ]
                        }, {
                            label: "人员管理",
                            items: [
                                {
                                    name: "用户管理",
                                    link: "/ReactUserManager"
                                },
                                {
                                    name: "职员管理",
                                    link: "/reactEmpManager"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
    renderMenu(datas) {
        if (datas === null || datas === undefined || datas.length === 0)
            return "";
        return datas.map(u => {
            return (
                <div key={u.groupName} className="menu_section">
                    <h3>{u.groupName}</h3>
                    <ul className="nav side-menu">
                        {u.groupItems.map(x => {
                            return (
                                <li key={x.label}>
                                    <a><i className="fa fa-home"></i> {x.label
                                    } <span className="fa fa-chevron-down"></span></a>
                                    <ul className="nav child_menu">
                                        {x.items.map(y => {
                                            return (
                                                <li key={y.link}><Link to={y.link}>{y.name}</Link></li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title" style={{ border: 0 }}>
                        <a href="/" className="site_title"><i className="fa fa-paw"></i> <span>SSO后台管理</span></a>
                    </div>
                    <div className="clearfix"></div>
                    <div className="profile clearfix">
                        <div className="profile_pic">
                            <img src="/images/img.jpg" alt="..." className="img-circle profile_img" />
                        </div>
                        <div className="profile_info">
                            <span>Welcome,</span>
                            <h2>
                                <a href="/login">{this.props.userName === "" ? "请登录" : this.props.userName}</a>
                            </h2>
                        </div>
                    </div>
                    <br />
                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                        {this.props.userName === "" ? "" : this.renderMenu(this.state.items)}
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(Sidebar);