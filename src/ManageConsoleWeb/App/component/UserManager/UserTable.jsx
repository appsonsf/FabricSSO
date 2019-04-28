import React, { Component } from 'react';
import msg from "../../_shared/msg";
import confirm from "../../_shared/confirm";
import http from "../../_shared/http";

//导入组件
import Loading from "../shared/Loading";
import Pager from "../shared/Pager";
import EditMobile from "./EditMobile";
import EditPassword from "./EditPassword";
import UserAddModal from "./UserAddModal";
import CSVFileModal from "./CSVFileModal";
import EditUserName from "./EditUserName";
import Action from "./Action";




export default class UserTable extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            widths: ["15%", "10%", "20%", "20%", "10%","10%", "10%", "10%"],
            selected: null,
            index: 1,
            showCount: 10,
            isExportting: false
        };
    }

    componentDidMount() {
        let datas = this.props.User.User.users;
        if (datas === null || datas.length === 0) {
            //开始加载
            this.setState({ loading: true });
            let cb = x => {
                this.setState({ loading: false });
                if (!x.success) {
                    msg("错误", x.message, "error");
                }
            }
            this.props.Actions.User.load(cb.bind(this));
            return;
        }
        let pageCount = Math.ceil(datas.length / this.state.showCount);
        this.setState({ pageCount: pageCount });
    }

    handlePageData(index, cb) {
        this.setState({ index: index });
    }

    //修改手机号码
    handleEditMobile(u) {
        this.setState({ selected: u });
        $(".editMobile").modal("show");
    }

    handleEditPassword(u) {
        this.setState({ selected: u });
        $(".editpassword").modal("show");
    }

    handleEditUserName(u) {
        this.setState({ selected: u });
        $(".editUserName").modal("show");
    }

    handleEditState(u) {
        var self = this;
        confirm(_ => {
            self.props.Actions.User.editState(u.id.id, x => {
                if (x.success) {
                    msg("成功", "修改用户状态成功", "success");
                } else {
                    msg("失败", x.message, "error");
                }
            });
        }, "是否修改该用户状态?");
    }


    handUnLockUser(id) {
        this.props.Actions.User.unLockUser(id,
            x => {
                if (x.success) {
                    msg("成功", x.message, "success");
                } else {
                    msg("失败", x.message, "error");
                }
            });
    }



    handleAddClick() {
        $("#useraddform")[0].reset();
        $(".addUser").modal("show");
    }

    //处理删除
    handleDelete(id) {
        let cb = x => {
            if (x.success) {
                msg("成功", "删除成功", "success");
            } else {
                msg("失败", x.message, "error");
            }
        }
        this.props.Actions.User.del(id, cb.bind(this));
    }

    handleExportUserData() {
        confirm(_ => {
            let cb = x => {
                if (x.success) {
                    msg("成功", "导出用户数据成功", "success");
                } else {
                    msg("失败", x.message, "error");
                }
            }
            http.post("/api/user/ExportUserData", null, cb.bind(this));
        },
            "确定是否要导出用户数据到到存储服务!!?");
    }

    handleImportUserData() {
        $(".csvfilemodal").modal("show");
    }


    render() {
        let { index, showCount } = this.state;
        let pageCount = Math.ceil(this.props.User.User.users.length / this.state.showCount);
        let pageInfo = { index, showCount, pageCount };
        return (
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>用户管理 <small>用户管理列表</small>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button style={{ marginBottom: -7, display: "none" }} className="btn btn-primary" onClick={this.handleAddClick.bind(this)}>添加用户</button>
                            <button style={{ marginBottom: -7 }} disabled={this.state.isExportting} className="btn btn-primary" onClick={this.handleExportUserData.bind(this)}>导出用户数据</button>
                            <button style={{ marginBottom: -7 }} className="btn btn-primary" onClick={this.handleImportUserData.bind(this)}>导入用户数据</button>
                        </h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <table className="table table-hover" style={{ tableLayout: "fixed" }}>
                            <thead>
                                <tr>
                                    <th width={this.state.widths[0]}>用户名</th>
                                    <th width={this.state.widths[1]}>姓名</th>
                                    <th width={this.state.widths[2]}>身份证号</th>
                                    <th width={this.state.widths[3]}>手机号码</th>
                                    <td width={this.state.widths[4]}>员工编码</td>
                                    <th width={this.state.widths[5]}>锁定</th>
                                    <th width={this.state.widths[6]}>状态</th>
                                    <th width={this.state.widths[7]}>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderData()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pager {...pageInfo} click={this.handlePageData.bind(this)} />
                <EditMobile data={this.state.selected} Actions={this.props.Actions} />
                <EditPassword data={this.state.selected} Actions={this.props.Actions} />
                <UserAddModal Actions={this.props.Actions} />
                <EditUserName data={this.state.selected} Actions={this.props.Actions} />
                <CSVFileModal />
            </div>
        );
    }

    renderData() {
        let datas = this.props.User.User.users;
        let { index, showCount } = this.state;
        var offset = (index - 1) * this.state.showCount;
        datas = (offset + showCount >= datas.length)
            ? datas.slice(offset, datas.length)
            : datas.slice(offset, offset + showCount);
        if (this.state.loading) {
            return (
                <tr>
                    <td colSpan="6" style={{ "textAlign": "center" }}>
                        <Loading />
                    </td>
                </tr>
            );
        }
        if (datas === null || datas.length === 0) {
            return (
                <tr>
                    <td colSpan="6" style={{ "textAlign": "center" }}>
                        暂无数据...
                    </td>
                </tr>
            );
        }
        //开始渲染数据
        return datas.map(u => {
            var events =
            {
                EditPassword: this.handleEditPassword.bind(this, u),
                EditMobile: this.handleEditMobile.bind(this, u),
                EditState: this.handleEditState.bind(this, u),
                Delete: this.handleDelete.bind(this, u.id.id),
                EditUserName: this.handleEditUserName.bind(this, u),
                unLockUser: this.handUnLockUser.bind(this, u.id.id)
            };
            return (
                <tr>
                    <td>{u.username}</td>
                    <td>{u.name}</td>
                    <td>{u.idCardNo}</td>
                    <td>{u.mobile}</td>
                    <td>{u.employeeNumber}</td>
                    <td>{u.lockoutEnd === null ? "未锁定" : "已锁定"}</td>
                    <td>{u.isActive ? "可用" : "不可用"}</td>
                    <td>
                        <Action {...events} />
                    </td>
                </tr>
            );
        });
    }
}