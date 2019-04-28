import React, { Component } from "react";
import http from "../../_shared/http";
import msg from "../../_shared/msg";

export default class ClientUpdateAndAddModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resources: null
        }
    }

    componentDidMount() {
        this.initForm();
    }

    componentDidUpdate() {
        this.initForm();
    }

    //初始化表单
    initForm() {
        $("#clientName").val($("#hideClientName").val());
        $("#clientId").val($("#hideClientID").val());
        //$("#inputSecret").val($("#hideSecret").val() === "" ? "" : "重置密码");
        var granTypes = $("#hideAuthType").val().split(",");
        $(".AuthType").select2({
            placeholder: '请选择授权类型',
            multiple: true
        }).val(granTypes).trigger("change");
        var resources = $("#hideScope").val().split(",");
        $(".resourceScope").select2({
            placeholder: '请选择资源',
            multiple: true
        }).val(resources).trigger("change");
        $('#hideLogoutAddress').next().tagsInput().importTags($("#hideLogoutAddress").val());
        $('#hideLoginAddress').next().tagsInput().importTags($("#hideLoginAddress").val());
        $("#inputSecret").val("");
    }

    createCode() {
        //改变值
        http.post("/api/client/CreateSecrt", {}, function (result) {
            let code = result.data;
            $("#hideSecret").val($("#hideSecret").val() + code + ",");
            $("#inputSecret").val(code);
        });
    }

    closeModal() {
        //关闭对话框
        $(".addandupdateclientmodal").modal("hide");
    }

    hanldeSubmit(e) {
        e.preventDefault();
        let data = this.getFormData();
        //新增提交代码
        if (this.props.data.selected === null) {
            let cb = result => {
                if (result.success) {
                    msg("成功", "添加客户端成功", "success");
                    this.closeModal();
                } else {
                    msg("失败", result.message, "error");
                }
            }
            this.props.Actions.Client.add(data, cb.bind(this));
        } else {
            let cb = result => {
                this.closeModal();
                if (result.success) {
                    msg("成功", "更新客户端成功", "success");
                } else {
                    msg("失败", result.message, "error");
                }
            }
            this.props.Actions.Client.update(data, cb.bind(this));
        }
    }

    getFormData() {
        let clientName = $("#clientName").val();
        let clientId = $('#clientId').val();
        let clientSecrets = [];
        var secrets = $("#inputSecret").val();
        if (secrets !== null && secrets !== "") {
            clientSecrets.push(
                { description: null, expiration: null, type: "SharedSecret", value: secrets }
            );
        }
        var redirectUris = $("#hideLoginAddress").next().val().split(",");
        var postLogoutRedirectUris = $("#hideLogoutAddress").next().val().split(",");
        var allowedGrantTypes = $(".AuthType").val();
        var allowedScopes = $(".resourceScope").val();
        return {
            clientName,
            clientId,
            clientSecrets,
            redirectUris,
            postLogoutRedirectUris,
            allowedGrantTypes,
            allowedScopes
        };
    }
    //api资源
    RenderApiResources() {
        let { resources } = this.props.data;
        if (resources != null) {
            if (resources.apiResources.length === 0) {
                return "";
            } else {
                return resources.apiResources.map(x => {
                    return (
                        <option value={x.name}>{x.name}</option>
                    );
                });
            }
        }
    }

    //Identity资源
    RenderIdentityResources() {
        let { resources } = this.props.data;
        if (resources != null) {
            if (resources.identityResources.length === 0) {
                return "";
            } else {
                return resources.identityResources.map(x => {
                    return (
                        <option value={x.name}>{x.name}</option>
                    );
                });
            }
        }
    }

    render() {
        var data = this.props.data.selected;
        return (
            <div className="modal fade addandupdateclientmodal" id="userrolemodal" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">{data === null ? "添加" : "更新"}客户端</h4>
                        </div>
                        <div className="modal-body">
                            <form id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left">

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">客户端名称：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input id="hideClientName" value={data === null ? "" : data.clientName} type="hidden" />
                                        <input type="text" id="clientName" className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">客户端ID：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input id="hideClientID" value={data === null ? "" : data.clientId} type="hidden" />
                                        {data === null
                                            ? <input type="text" id="clientId" className="form-control col-md-7 col-xs-12" />
                                            : <input type="text" id="clientId" className="form-control col-md-7 col-xs-12" readOnly />
                                        }

                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <textarea readOnly="readonly" className="col-sm-12 form-control" style={{ height: 110, maxHeight: 150, overflowY: "auto", resize: "none" }}>
                                            企业智能管理平台：OM、项目管理系统：PM、共享财务系统：FSSC、人力资源系统：HR、协同办公系统：OA。Clientid编码规则：项目缩写+"_"+系统缩写+"_"+客户端类型(如Mobile，Web，Desktop)+"_"+顺序号(3位)。比如移动端即时通的ClientId为：OM_AppStore_Mobile_001；BI门户的ClientId为：OM_PORTAL_Web_001
                                        </textarea>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">密钥：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input id="hideSecret" type="hidden" />
                                        <input type="text" id="inputSecret" placeholder={data === null ? "" : "更新状态不填,服务端将不会更新密钥"} className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">授权类型：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="hidden" value={data === null || data.allowedGrantTypes === null ? "" : data.allowedGrantTypes.join(",")} id="hideAuthType" />
                                        <select className="AuthType form-control col-md-7 col-xs-12">
                                            <option value="implicit">Implicit</option>
                                            <option value="client_credentials">ClientCredentials</option>
                                            <option value="authorization_code">Code</option>
                                            <option value="hybrid">Hybrid</option>
                                            <option value="password">ResourceOwnerPassword</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">请求作用域：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="hidden" value={data === null || data.allowedScopes === null ? "" : data.allowedScopes.join(",")} id="hideScope" />
                                        <select className="resourceScope form-control col-md-7 col-xs-12">
                                            <optgroup label="Identity资源">
                                                {this.RenderIdentityResources()}
                                            </optgroup>
                                            <optgroup label="api资源">
                                                {this.RenderApiResources()}
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">授权登录地址：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input id="hideLoginAddress" value={data === null || data.redirectUris === null ? "" : data.redirectUris.join(",")} type="hidden" />
                                        <input type="text" id="LoginAddress" className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">授权登出地址：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input id="hideLogoutAddress" value={data === null || data.postLogoutRedirectUris === null ? "" : data.postLogoutRedirectUris.join(",")} type="hidden" />
                                        <input type="text" id="LogoutAddress" className="form-control col-md-7 col-xs-12" />
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