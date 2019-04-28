import React, { Component } from 'react';
import msg from "../../_shared/msg";
import http from "../../_shared/http";

export default class RoleUpdateAndAddModal extends Component {

    //加载所有的客户端
    componentDidMount() {
        this.syncFormValue();
    }
    handCreateCode() {
        if (this.props.data !== null)
            return;
        var self = this;
        http.post("/api/role/CreateGuid", {}, function (result) {
            $("#inputRoleId").val(result.data);
        });
    }
    componentDidUpdate() {
        this.syncFormValue();
    }

    syncFormValue() {
        $("#roleName").val($("#hideRoleName").val());
        //稍微要处理一下编辑的逻辑
        if ("" !== $("#hideRoleId").val()) { //
            $("#inputRoleId").val($("#hideRoleId").val());
            $("#inputRoleId").prop("readonly", true);
        } else {
            $("#inputRoleId").prop("readonly", false);
        }

        var array = $("#hideClientId").val().split(",");
        $(".clientIdInfo").select2({
            placeholder: '请选择客户端Id',
            multiple: true,
            separator: ","
        }).val(array).trigger('change');
    }

    closeModal() {
        $(".addupdaterolemodal").modal("hide");
    }

    hanldeSubmit(e) {
        e.preventDefault();
        var name = $('#roleName').val();
        var clientId = $(".clientIdInfo").val(); //默认是用英文逗号隔开的
        var id = $("#inputRoleId").val();
        if (id === null || id === "") {
            msg("错误", "角色代码不能够为空", "error");
            return;
        }
        if (clientId === null || clientId.length === 0) {
            msg("错误", "客户端不能够为空", "error");
            return;
        }
        if (this.props.data !== null) { //这是更新角色
            this.props.Actions.update(id, name, clientId, x => {
                if (x) {
                    this.closeModal();
                }
            });
        } else {
            var self = this;
            this.props.Actions.add(id, name, clientId, function (success) {
                if (success && self.props.updatePageInfo) {
                    self.props.updatePageInfo();
                    self.closeModal();
                }
            });
        }
    }

    renderClients() {
        return this.props.clients.map(u => {
            return (
                <option key={u.clientId} value={u.clientId}>{u.clientName}</option>
            );
        });
    }

    render() {
        var clientIdArry = "";
        if (this.props.data != null) {
            var clients = this.props.data.clientIds;
            for (let i = 0; i < clients.length; i++) {
                clientIdArry += clients[i].clientId + ",";
            }
            if (clientIdArry.length > 0) {
                clientIdArry = clientIdArry.substr(0, clientIdArry.length - 1);
            }
        }
        return (
            <div className="modal fade addupdaterolemodal" id="userrolemodal" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">{this.props.data === null ? "添加" : "更新"}系统角色</h4>
                        </div>
                        <div className="modal-body">
                            <form id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left">

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">系统角色代码：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <div className="input-group">
                                            <input id="hideRoleId" type="hidden" value={this.props.data === null ? "" : this.props.data.id} />
                                            <input type="text" id="inputRoleId" className="form-control col-md-5 col-xs-12" />
                                            <span style={{ cursor: this.props.data === null ? "pointer" : "not-allowed" }} onClick={this.handCreateCode.bind(this)} className="input-group-addon">生成代码</span>
                                        </div>
                                    </div>
                                </div>

                                <input type="hidden" ref="id" />
                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">系统角色名称：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input id="hideRoleName" value={this.props.data === null ? "" : this.props.data.name} type="hidden" />
                                        <input type="text" id="roleName" className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">客户端： <span className="required">*</span>
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="hidden" id="hideClientId" value={this.props.data === null ? "" : clientIdArry} />
                                        <select className="clientIdInfo form-control col-md-7 col-xs-12">
                                            {this.renderClients()}
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