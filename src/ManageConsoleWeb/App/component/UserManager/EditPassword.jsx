import React, { Component } from 'react';

import msg from "../../_shared/msg";

export default class EditPassword extends Component {

    closeModal() {
        $(".editpassword").modal("hide");
    }

    hanldeSubmit(e) {
        e.preventDefault();
        let id = this.props.data.id.id;
        let password1 = $("#password1").val();
        let password2 = $('#password2').val();
        let cb = x => {
            if (x.success) {
                msg("成功", "修改密码成功", "success");
                this.closeModal();
            } else {
                msg("失败", x.message, "error");
            }
            
        }
        this.props.Actions.User.editPassword(id,password1, password2, cb.bind(this));
    }

    render() {
        return (
            <div className="modal fade editpassword" id="bindUserModal" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">修改用户{this.props.data === null ? "" : this.props.data.name}密码:</h4>
                        </div>
                        <div className="modal-body">
                            <form data-parsley-validate="" className="form-horizontal form-label-left">
                                <input type="hidden" ref="id" />
                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">新密码：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="password" id="password1" className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">再次输入新密码：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="password" id="password2" className="form-control col-md-7 col-xs-12" />
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