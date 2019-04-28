import React, { Component } from "react";
import http from "../../_shared/http";
import msg from "../../_shared/msg";

export default class ResourceUpdateAndAddModal extends Component {


    componentDidMount() {
        this.initForm();
    }

    componentDidUpdate() {
        this.initForm();
    }

    initForm() {

        $("#resourceName").val($("#hideResourceName").val());
        $("#displayName").val($('#hideDisplayName').val());
        $("#resourceDescription").val($("#hideDescription").val());
        $("#hideResourceTag").next().tagsInput().importTags($("#hideResourceTag").val());

    }

    closeModal() {
        $(".addandupdateResourcemodal").modal("hide");
    }

    hanldeSubmit(e) {
        e.preventDefault();
        var data = this.getFormData();
        if (this.props.data === null) {
            let cb = x => {
                if (x.success) {
                    msg("成功", "添加资源成功", "success");
                    this.closeModal();
                } else {
                    msg("失败", x.message, "error");
                }
            }
            this.props.Actions.Resource.add(data, cb.bind(this));
        } else {
            let cb = x => {
                if (x.success) {
                    msg("成功", "更新资源成功", "success");
                    this.closeModal();
                } else {
                    msg("失败", x.message, "error");
                }
            }
            this.props.Actions.Resource.update(data, cb.bind(this));
        }
    }

    getFormData() {
        var data = {};
        data.Description = $("#resourceDescription").val();
        data.DisplayName = $("#displayName").val();
        if ($("#resourceType").val() === "Api") {
            data.Name = $('#resourceName').val();
            data.type = "api";
        } else {
            data.IdentityName = $('#resourceName').val();
            data.type = "identity";
        }
        data.UserClaims = $("#hideResourceTag").next().val().split(",");
        return data;
    }

    render() {
        let data = this.props.data;
        return (
            <div className="modal fade addandupdateResourcemodal" id="userrolemodal" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">{this.props.data === null ? "添加" : "更新"}资源</h4>
                        </div>
                        <div className="modal-body">
                            <form id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left">

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">资源类型：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input id="hideResourceType" value={data === null || data.type === null ? "" : data.type} type="hidden" />
                                        <select id="resourceType" disabled={data === null ? false : true} className="form-control col-md-7 col-xs-12">
                                            <option value="Api">Api</option>
                                            <option value="Identity">Identity</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">资源名称：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input id="hideResourceName" value={data === null || data.name === null ? "" : data.name} type="hidden" />
                                        <input type="text" id="resourceName" readOnly={data === null ? false : true} className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">资源展示名称：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input id="hideDisplayName" value={data === null || data.displayName === null ? "" : data.displayName} type="hidden" />
                                        <input type="text" id="displayName" className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">资源标记：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input id="hideResourceTag" value={data === null || data.UserClaims === null ? "" : data.userClaims.join(",")} type="hidden" />
                                        <input type="text" id="resourceTag" className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">描述：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input id="hideDescription" value={data === null || data.description === null ? "" : data.description} type="hidden" />
                                        <input type="text" id="resourceDescription" className="form-control col-md-7 col-xs-12" />
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