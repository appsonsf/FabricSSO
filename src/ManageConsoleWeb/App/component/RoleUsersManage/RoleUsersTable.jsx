import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RoleActions from "../../actions/Role";
import Action from "./Action";

//导入组件
import BindRolesModal from "./BindRolesModal";
import Loading from "../shared/Loading";
import Pager from "../shared/Pager";

class RoleUsersTable extends Component {
    constructor() {
        super();
        this.state = {
            selected: null,
            loading: true,
            widths: ["15%", "15%", "20%", "30%", "10%", "10%"],
            index: 1,  //分页信息
            showCount: 10,
            pageCount: 1
        }
    }

    componentDidMount() {
        var self = this;
        this.props.RoleUserActions.load(x => {
            var pageCount = Math.ceil(x.data.length / self.state.showCount);
            self.setState({
                loading: false,
                pageCount: pageCount
            });
        });//加载用户列表
    }

    updatePageInfo() {
        var dataCount = this.props.Role.UserRole.items.length;
        var pageCount = Math.ceil(dataCount / this.state.showCount);
        this.setState({
            pageCount: pageCount
        });
    }

    handlePageData(index, cb) {
        this.setState({
            index: index
        });
    }

    handleEdit(id) {
        var datas = this.props.Role.UserRole.items;
        var temp = null;
        for (let i = 0; i < datas.length; i++) {
            if (datas[i].id === id) {
                temp = datas[i];
                break;
            }
        }
        if (this.props.Role.Role.datas === null || this.props.Role.Role.datas.length === 0) {
            let self = this;
            this.props.RoleActions.loadAll(x => {
                self.setState({
                    selected: temp
                });
                if (x) {
                    $(".bindUserRole").modal("show");
                }
            });
        } else {
            $(".bindUserRole").modal("show");
        }


    }


    renderData() {
        if (this.state.loading) {
            return (
                <tr>
                    <td colSpan="6" style={{ "textAlign": "center" }}>
                        <Loading />
                    </td>
                </tr>
            );
        }
        var datas = this.props.Role.UserRole.items;
        if (datas === null || datas.length === 0)
            return (
                <tr>
                    <td colSpan="6" style={{ "textAlign": "center" }}>暂无数据...</td>
                </tr>
            );
        let { index, showCount } = this.state;
        var offset = (index - 1) * this.state.showCount;
        datas = (offset + showCount >= datas.length)
            ? datas.slice(offset, datas.length)
            : datas.slice(offset, offset + showCount);
        return datas.map(u => {
            return (
                <tr key={u.username}>
                    <td>{u.username}</td>
                    <td>{u.name}</td>
                    <td>{u.mail}</td>
                    <td>{u.roles.map(x => {
                        return (
                            <label style={{ display: "inline-block" }} className="label label-info">{x.name}</label>
                        );
                    })}</td>
                    <td>{u.state}</td>
                    <td>
                        <Action edit={this.handleEdit.bind(this, u.id)} Actions={this.props.RoleUserActions} data={u} />
                    </td>
                </tr>
            );
        });
    }

    render() {
        let { index, showCount, pageCount } = this.state;
        var pageInfo = { index, showCount, pageCount };
        return (
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>用户角色管理</h2>
                        <ul className="nav navbar-right panel_toolbox">
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">

                        <table style={{ tableLayout: "fixed" }} className="table table-hover">
                            <thead>
                                <tr>
                                    <th width={this.state.widths[0]}>用户名</th>
                                    <th width={this.state.widths[1]}>姓名</th>
                                    <th width={this.state.widths[2]}>邮箱</th>
                                    <th width={this.state.widths[3]}>角色</th>
                                    <th width={this.state.widths[4]}>状态</th>
                                    <th width={this.state.widths[5]}>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderData()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pager {...pageInfo} click={this.handlePageData.bind(this)} />
                <BindRolesModal Actions={this.props.RoleUserActions} roles={this.props.Role.Role.datas} data={this.state.selected} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RoleUsersTable);