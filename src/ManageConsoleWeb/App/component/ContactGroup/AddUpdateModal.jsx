import React, { Component } from "react";
import axios from "axios";

export default class AddUpdateModal extends Component {

    constructor(props) {
        super(props);
        var data = this.props.data;
        if (data) {
            this.state = {
                groupId: data.id,
                name: data.name,
                remark: data.remark
            }
        } else {
            this.state = {
                groupId: 0,
                name: "",
                remark: ""
            }
        }

    }

    componentWillReceiveProps(props) {
        var data = props.data;
        if (data === undefined || data === null) {
            this.setState({ name: "", remark: "", groupId: 0 });
        } else {
            this.setState({ name: data.name, remark: data.remark, groupId: data.id });
        }
    }

    changeFormValue(key, e) {
        this.setState({
            [key]: e.target.value
        });
    }

    closeModal() {
        $(".addupdatecontactgroupmodal").modal("hide");
    }

    hanldeSubmit(e) {
        //0表示新增
        e.preventDefault();
        axios.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
        console.log(this.state.groupId);
        if (this.state.groupId === 0) {
            axios.post("/api/contactgroup/AddGroup", this.state)
                .then(res => {
                    if (res.data.success) {
                        alert("添加成功");
                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
        } else {
            axios.post("/api/contactgroup/UpdateGroup", this.state)
                .then(res => {
                    if (res.data.success) {
                        alert("重命名成功");
                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
        }
    }

    render() {
        return (
            <div className="modal fade addupdatecontactgroupmodal" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">{this.props.data === null ? "添加" : "更新"}联系人组</h4>
                        </div>
                        <div className="modal-body">
                            <form id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left">
                                <input type="hidden" value={this.state.groupId} />
                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">联系人组名称：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="text" value={this.state.name} onChange={this.changeFormValue.bind(this, "name")} className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">联系人组备注：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="text" value={this.state.remark} onChange={this.changeFormValue.bind(this, "remark")} className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="ln_solid"></div>
                                <div className="form-group">
                                    <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                        <button className="btn btn-primary" type="button" onClick={this.closeModal.bind(this)}>取消</button>
                                        <button type="submit" className="btn btn-success" onClick={this.hanldeSubmit.bind(this)}>提交</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}