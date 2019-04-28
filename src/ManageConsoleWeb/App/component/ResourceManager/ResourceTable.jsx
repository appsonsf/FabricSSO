import React, { Component } from 'react';

//导入公共类库
import msg from "../../_shared/msg";

import Loading from "../shared/Loading";
import Action from "./Action";
import ResourceUpdateAndAddModal from "./ResourceUpdateAndAddModal";

export default class ResourceTable extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            widths: ["15%", "15%", "10%", "25%","25%", "10%"],
            selected: null
        };
    }

    componentDidMount() {
        let resources = this.props.Client.Resources.resources;
        if (resources === null) {
            //开始加载
            this.setState({ loading: true });
            var cb = x => {
                this.setState({ loading: false });
                if (!x.success) {
                    msg("失败", "获取资源失败", "error");
                }
            }
            this.props.Actions.Resource.load(cb.bind(this));
        }
    }

    handleView(resource) {
        this.setState({ selected: resource });
        $(".addandupdateResourcemodal").modal("show");
    }

    handleDel(u) {
        let cb = x => {
            if (x.success) {
                msg("成功", "删除成功", "success");
            } else {
                msg("失败", x.message, "error");
            }
        }
        let data = {
            IdentityName: u.type === "IdentityResource" ? u.name : "",
            Name: u.type === "ApiResources" ? u.name : ""
        };
        this.props.Actions.Resource.del(data, cb);
    }

    handleAddClick() {
        this.setState({ selected: null });
        $(".addandupdateResourcemodal").modal("show");
    }
    renderData() {
        if (this.state.loading) {
            return (
                <tr>
                    <td colSpan="5" style={{ "textAlign": "center" }}>
                        <Loading />
                    </td>
                </tr>
            );
        }
        let resources = this.props.Client.Resources.resources;
        if (resources === null || (resources.apiResources.length === 0 && resources.identityResources.length === 0)) {
            return (
                <tr>
                    <td colSpan="5" style={{ "textAlign": "center" }}>
                        暂无数据...
                    </td>
                </tr>
            );
        }
        var arr = [];
        resources.apiResources.map(x => {
            arr.push({ type: "ApiResources", name: x.name, displayName: x.displayName, description: x.description, userClaims: x.userClaims });
        });
        resources.identityResources.map(x => {
            arr.push({ type: "IdentityResource", name: x.name, displayName: x.displayName, description: x.description, userClaims: x.userClaims });
        });
        return arr.map(u => {
            return (
                <tr>
                    <td>{u.type}</td>
                    <td>{u.name}</td>
                    <td>{u.displayName}</td>
                    <td>{u.userClaims == null || u.userClaims.length === 0 ? "" : u.userClaims.map(x => {
                        return (
                            <label style={{ display: "inline-block" }} className="label label-primary">{x}</label>
                            );
                    })}</td>
                    <td>{u.description}</td>
                    <td>
                        <Action edit={this.handleView.bind(this, u)} del={this.handleDel.bind(this, u)} />
                    </td>
                </tr>
            );
        });
    }

    render() {
        console.log(this);
        return (
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>资源管理 <small>资源管理列表</small>&nbsp;&nbsp;&nbsp;&nbsp;<a style={{ marginBottom: -7 }} className="btn btn-primary" onClick={this.handleAddClick.bind(this)} href="javascript:void(0)">添加新的资源</a></h2>
                        <ul className="nav navbar-right panel_toolbox">
                            <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li><a href="#">Settings 1</a>
                                    </li>
                                    <li><a href="#">Settings 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li><a className="close-link"><i className="fa fa-close"></i></a>
                            </li>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <table className="table table-hover" style={{ tableLayout: "fixed" }}>
                            <thead>
                                <tr>
                                    <th width={this.state.widths[0]}>资源类型</th>
                                    <th width={this.state.widths[1]}>资源名称</th>
                                    <th width={this.state.widths[2]}>资源显示名称</th>
                                    <th width={this.state.widths[3]}>资源标记</th>
                                    <th width={this.state.widths[4]}>描述</th>
                                    <th width={this.state.widths[5]}>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderData()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ResourceUpdateAndAddModal data={this.state.selected} Actions={this.props.Actions} />
            </div>
        );
    }
}