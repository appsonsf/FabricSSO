import React, { Component } from 'react';
import msg from "../../_shared/msg";


export default class BindRolesModal extends Component {

    componentDidMount() {
        this.syncFormValue();
    }
    componentDidUpdate() {
        this.syncFormValue();
    }

    syncFormValue() {
        var array = $("#hidenRoels").val().split(",");
        $("#rolelist").select2({
            placeholder: '请选择角色',
            multiple: true,
            separator: ","
        }).val(array).trigger('change');
    }

    closeModal() {
        $(".bindUserRole").modal("hide");
    }

    hanldeSubmit(e) {
        e.preventDefault();
        var userId = this.props.data.id;
        var roleIds = $("#rolelist").val();
        if (roleIds === null) {
            msg("失败", "请选择需要绑定的角色", "error");
            return;
        }
        var roles = [];
        for (let i = 0; i < roleIds.length; i++) {
            for (let j = 0; j < this.props.roles.length; j++) {
                if (roleIds[i] === this.props.roles[j].id) {
                    roles.push(this.props.roles[j]);
                }
            }
        }
        this.props.Actions.updateRoles(userId, roles);
        this.closeModal();
    }
    renderRoles() {
        if (this.props.roles === null) {
            return "";
        }
        return this.props.roles.map(u => {
            return (
                <option key={u.id} value={u.id}>{u.name}</option>
            );
        });
    }


    render() {
        var roles = "";
        if (this.props.data !== null && this.props.data.roles.length > 0) {
            roles = this.props.data.roles.map(u => { return u.id }).join(",");
        }
        return (
            <div className="modal fade bindUserRole" id="userrolemodal" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">用户:{this.props.data === null ? "" : this.props.data.name} 绑定角色：</h4>
                        </div>
                        <div className="modal-body">
                            <form id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left">
                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">角色
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="hidden" id="hidenRoels" value={roles} />
                                        <select id="rolelist" className=" form-control col-md-7 col-xs-12">
                                            {this.renderRoles()}
                                        </select>
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