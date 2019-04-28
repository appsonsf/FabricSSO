import React, { Component } from 'react';

export default class UserRoleModal extends Component {

    componentDidMount() {
        $(".roleinfo").select2({
            placeholder: '请选择角色',
            multiple:true
        });
    }

    renderRoleOptions() {
        var roleState = this.props.RoleState;
        if (roleState === null || roleState === undefined)
            return "";
        return roleState.datas.map(u => {
            return (
                <option value={u.id}>{u.name}</option>
            );
        });
    }

    render() {
        return (
            <div className="modal fade bs-example-modal-lg" id="userrolemodal" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">用户角色配置添加</h4>
                        </div>
                        <div className="modal-body">
                            <form id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left" novalidate="">
                                <input type="hidden" ref="id" />
                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">数据库名称 <span className="required">*</span>
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <select className="userinfo form-control col-md-7 col-xs-12">
                                            <option value="0">请选择用户</option>
                                            <option value="1">测试用户1</option>
                                            <option value="2">测试用户2</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">数据库名称 <span className="required">*</span>
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <select className="roleinfo form-control col-md-7 col-xs-12">
                                            {this.renderRoleOptions()}
                                        </select>
                                    </div>
                                </div>


                                <div className="ln_solid"></div>
                                <div className="form-group">
                                    <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                        <button className="btn btn-primary" type="button">取消</button>
                                        <button type="submit" className="btn btn-success">提交</button>
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