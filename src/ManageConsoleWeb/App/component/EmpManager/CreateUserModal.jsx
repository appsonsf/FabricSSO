import React, { Component } from 'react';

//导入公共类库
import msg from "../../_shared/msg";
import http from "../../_shared/http";

export default class CreateUserModal extends Component {

    closeModal() {
        $(".createuserbyempmodal").modal("hide");
    }

    hanldeSubmit(e) {
        e.preventDefault();
        var data = this.getFormData();
        let cb = result => {
            if (result.success) {
                msg("成功", "注册成功", "success");
                this.props.createUser(data.IdCardNo);
                this.closeModal();
            } else {
                msg("失败", result.message, "error");
            }
        }
        http.post("/api/empinfo/CreateUser", data, cb.bind(this));
    }

    getFormData() {
        var data = {};
        data.IdCardNo = $("#IdCardNo").val();
        data.Name = $("#IdCardName").val();
        data.EmployeeNumber = $("#EmployeeNumber").val();
        data.Phone = $("#phone").val();
        data.UserName = $("#username").val();
        data.Password = $("#password").val();
        data.Gender=$("#Gender").val();
        return data;
    }

    render() {

        let data = this.props.data;
        return (
            <div className="modal fade createuserbyempmodal" id="userrolemodal" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">创建用户</h4>
                        </div>
                        <div className="modal-body">
                            <form id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left">

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">用户身份证号：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="text" id="IdCardNo" readOnly value={data === null ? "" : data.idCardNo} className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">用户身份证姓名：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="text" id="IdCardName" readOnly value={data === null ? "" : data.name} className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">用户员工编码：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="text" id="EmployeeNumber" readOnly value={data === null ? "" : data.number} className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">性别：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="text" id="Gender" readOnly value={data === null ? "" : data.gender} className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">用户手机号码：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="text" id="phone" className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">注册用户名：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="text" id="username" className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">用户名密码：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="text" id="password" className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="ln_solid"></div>
                                <div className="form-group">
                                    <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                        <button className="btn btn-primary" type="button" onClick={this.closeModal}>取消</button>
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