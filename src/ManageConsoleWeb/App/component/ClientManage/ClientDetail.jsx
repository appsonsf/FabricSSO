import React, { Component } from 'react';

//import from "./ClientDetail.css";

export default class ClientDetail extends Component {

    constructor() {
        super();
    }

    hideShow() {
        this.props.setState({
            view: null
        });
    }

    render() {
        var data = this.props.data;
        return (
            <div className="clientDetialContain" style={{ display: this.props.data === null ? "none" : "block" }}>
                <div className="clientdetailshow" onClick={this.hideShow.bind(this)}></div>
                <div className="clientdetail">
                    <h4>&nbsp;&nbsp;&nbsp;客户端详情</h4>
                    <br />
                    <br />
                    <form id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left">

                        <div className="form-group">
                            <label style={{ textAlign: "left" }} className="control-label col-md-12 col-sm-12 col-xs-12">是否启用
                            </label>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <span style={{ borderStyle: "none" }} className="form-control">{data === null || data.enabled===null ? "" : data.enabled.toString()}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ textAlign: "left" }} className="control-label col-md-12 col-sm-12 col-xs-12">客户端Id
                            </label>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <span style={{ borderStyle: "none" }} className="form-control">{data === null ? "" : data.clientId}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ textAlign: "left" }} className="control-label col-md-12 col-sm-12 col-xs-12">客户端名称
                            </label>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <span style={{ borderStyle: "none" }} className="form-control">{data === null ? "" : data.clientName}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ textAlign: "left" }} className="control-label col-md-12 col-sm-12 col-xs-12">授权类型
                            </label>
                            <div className="col-md-12 col-sm-12 col-xs-12">

                                {data === null || data.allowedGrantTypes === null ? "" : data.allowedGrantTypes.map(u => {
                                    return (
                                        <span style={{ borderStyle: "none" }} className="form-control">
                                            <label className="label label-primary">{u}</label>
                                        </span>
                                    );
                                })}

                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{ textAlign: "left" }} className="control-label col-md-12 col-sm-12 col-xs-12">登出回调地址
                            </label>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                {data === null || data.postLogoutRedirectUris === null ? "" : data.postLogoutRedirectUris.map(u => {
                                    return (
                                        <span style={{ borderStyle: "none" }} className="form-control">
                                            <label className="label label-primary">{u}</label>
                                        </span>
                                    );
                                })}

                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{ textAlign: "left" }} className="control-label col-md-12 col-sm-12 col-xs-12">登录回调地址
                            </label>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                {data === null || data.redirectUris === null ? "" : data.redirectUris.map(u => {
                                    return (
                                        <span style={{ borderStyle: "none" }} className="form-control">
                                            <label className="label label-primary">{u}</label>
                                        </span>
                                    );
                                })}

                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ textAlign: "left" }} className="control-label col-md-12 col-sm-12 col-xs-12">协议类型
                            </label>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <span style={{ borderStyle: "none" }} className="form-control">{data === null || data.protocolType===null ? "" : data.protocolType.toString()}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ textAlign: "left" }} className="control-label col-md-12 col-sm-12 col-xs-12">是否需要客户端密码
                            </label>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <span style={{ borderStyle: "none" }} className="form-control">{data === null || data.requireClientSecret===null ? "" : data.requireClientSecret.toString()}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{ textAlign: "left" }} className="control-label col-md-12 col-sm-12 col-xs-12">客户端Uri
                            </label>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <span style={{ borderStyle: "none" }} className="form-control">{data === null || data.clientUri===null ? "" : data.clientUri.toString()}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{ textAlign: "left" }} className="control-label col-md-12 col-sm-12 col-xs-12">需要同意(RequireConsent)
                            </label>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <span style={{ borderStyle: "none" }} className="form-control">{data === null || data.requireConsent===null ? "" : data.requireConsent.toString()}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{ textAlign: "left" }} className="control-label col-md-12 col-sm-12 col-xs-12">需要记住同意(AllowRememberConsent)
                            </label>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <span style={{ borderStyle: "none" }} className="form-control">{data === null || data.allowRememberConsent===null ? "" : data.allowRememberConsent.toString()}</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}