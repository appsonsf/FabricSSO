import React, { Component } from "react";
import axios from "axios";


import confirm from "../../_shared/confirm";

//导入对话框组件
import AddUpdateModal from "./AddUpdateModal";
import GroupMembersModal from "./GroupMembersModal";
import AddMembersModal from "./addMembersModal";

export default class ContactGroupTable extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            widths: ["5%", "20%", "20%", "25%", "25%"],
            selected: null,
            datas: null
        };
    }

    //生命周期,完成之后
    componentDidMount() {
        axios.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
        var self = this;
        axios.post("/api/contactgroup/GetGroups", null)
            .then(res => {
                console.log(res);
                if (res.data.success) {
                    self.setState({ datas: res.data.data });
                } else {
                    self.setState({ datas: [] });
                }

            });
    }

    handleAddClick() {
        this.setState({ selected: null });
        $(".addupdatecontactgroupmodal").modal("show");
    }

    handleRemoveClick(id) {
        axios.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
        var self = this;
        confirm(_ => {
            axios.post("/api/contactgroup/DeleteGroup" + "?groupId=" + id, null)
                .then(res => {
                    if (res.data.success) {
                        alert("移除成功");
                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
        }, "确定要移除该联系人组?");
    }

    handleRenameClick(entity) {
        this.setState({ selected: entity });
        $(".addupdatecontactgroupmodal").modal("show");
    }

    hanleLookMembers(entity) {
        this.setState({ selected: entity });
        $(".groupMembersmodal").modal("show");
    }

    handleAddMemberClick(entity) {
        this.setState({ selected: entity });
        $(".addMembersModal").modal("show");
    }

    renderData() {
        if (!this.state.datas) {
            return (
                <tr>
                    <td colSpan="4" style={{ "textAlign": "center" }}>
                        正在加载数据...
                    </td>
                </tr>
            );
        }
        if (this.state.datas.length === 0) {
            return (
                <tr>
                    <td colSpan="4" style={{ "textAlign": "center" }}>
                        暂无数据...
                    </td>
                </tr>
            );
        }
        return this.state.datas.map(u => {
            return (
                <tr>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.remark}</td>
                    <td onClick={this.hanleLookMembers.bind(this, u)}>
                        <a href="javascript:void(0)">{u.contactGroupMembers.length}(点击查看人员详情)</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" onClick={this.handleRemoveClick.bind(this, u.id)}>删除组</a>&nbsp;&nbsp;
                        <a href="javascript:void(0)" onClick={this.handleRenameClick.bind(this, u)}>重命名组</a>&nbsp;&nbsp;
                        <a href="javascript:void(0)" onClick={this.handleAddMemberClick.bind(this, u)}>添加成员</a>&nbsp;&nbsp;
                        <a href="javascript:void(0)" onClick={this.hanleLookMembers.bind(this, u)}>删除成员</a>
                    </td>
                </tr>
            );
        });
    }
    render() {
        return (
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>联系人组管理 <small>联系人组管理列表</small>&nbsp;&nbsp;&nbsp;&nbsp;<a style={{ marginBottom: -7 }} className="btn btn-primary" onClick={this.handleAddClick.bind(this)} href="javascript:void(0)">添加新联系人组</a></h2>
                        <ul className="nav navbar-right panel_toolbox">
                            <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li><a href="#">Settings 1</a>
                                    </li>
                                    <li><a href="#">Settings 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li><a className="close-link"><i className="fa fa-close"></i></a>
                            </li>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <table className="table table-hover" style={{ tableLayout: "fixed" }}>
                            <thead>
                                <tr>
                                    <th width={this.state.widths[0]}>Id</th>
                                    <th width={this.state.widths[1]}>联系人组名称</th>
                                    <th width={this.state.widths[2]}>联系人组标记</th>
                                    <th width={this.state.widths[3]}>联系人组人数</th>
                                    <th width={this.state.widths[4]}>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderData()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <AddUpdateModal data={this.state.selected} />
                <GroupMembersModal groupId={this.state.selected === null ? 0 : this.state.selected.id} />
                <AddMembersModal groupId={this.state.selected === null ? 0 : this.state.selected.id} />
            </div>
        );
    }
}