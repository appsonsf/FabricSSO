import React, { Component } from "react";
import axios from "axios";

export default class GroupMembersModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: props.groupId,
            datas: null,
            widths: ["4%", "10%", "10%", "20%", "20%", "25%", "11%"]
        }
    }

    componentWillReceiveProps(props) {
        var groupId = props.groupId;
        this.setState({ groupId: groupId });
        var self = this;
        axios.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
        axios.post("/api/contactgroupmember/GetGroupmembers?groupId=" + groupId, {})
            .then(res => {
                if (res.data.success) {
                    self.setState({ datas: res.data.data });
                }
            });
    }

    handleRemoveMember(entity) {
        axios.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
        var self = this;
        axios.post("/api/contactgroupmember/deleteMembers", { groupId: self.state.groupId, memberIds: [entity.id] })
            .then(res => {
                if (res.data.success) {
                    alert("移除成功!");
                    var newDatas = self.state.datas.filter(u => u.empId !== entity.empId);
                    self.setState({ datas: newDatas });
                    window.location.reload();
                }
            });
    }

    renderData() {
        if (this.state.datas === null) {
            return (
                <tr>
                    <td colSpan="6" style={{ "textAlign": "center" }}>
                        正在加载数据...
                    </td>
                </tr>
            );
        }
        if (this.state.datas.length === 0) {
            return (
                <tr>
                    <td colSpan="6" style={{ "textAlign": "center" }}>
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
                    <td>{u.gender}</td>
                    <td>{u.phone}</td>
                    <td>{u.position}</td>
                    <td>{u.department}</td>
                    <td>
                        <a href="javascript:void(0)" onClick={this.handleRemoveMember.bind(this, u)}>移除成员</a>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="modal fade groupMembersmodal" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">联系人组人员</h4>
                        </div>
                        <div className="modal-body" style={{ overflow: "scroll", height: 600 }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th width={this.state.widths[0]}>Id</th>
                                        <th width={this.state.widths[1]}>姓名</th>
                                        <th width={this.state.widths[2]}>性别</th>
                                        <th width={this.state.widths[3]}>手机/电话</th>
                                        <th width={this.state.widths[4]}>职位</th>
                                        <th width={this.state.widths[5]}>部门</th>
                                        <th width={this.state.widths[6]}>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}