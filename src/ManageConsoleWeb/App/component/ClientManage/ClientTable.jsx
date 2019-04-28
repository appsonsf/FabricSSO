import React, { Component } from 'react';

//导入公共类库
import msg from "../../_shared/msg";


//导入组件
import Action from "./Action";
import ClientUpdateAndAddModal from "./ClientUpdateAndAddModal";
import Loading from "../shared/Loading";
import ClientDetail from "./ClientDetail";
import Pager from "../shared/Pager";

export default class ClientTable extends Component {
    constructor() {
        super();
        this.state = {
            widths: ["20%", "20%", "50%", "10%"],
            loading: true,
            selected: null,
            view: null,
            index: 1,
            showCount: 10,
            pageCount: 1
        }
    }

    //页面渲染完毕后,一定要初始化
    componentDidMount() {
        if (this.props.Actions.Client) {
            var cb = result => {
                this.setState({ loading: false });
                if (result.success) {
                    var pageCount = Math.ceil(result.data.length / this.state.showCount);
                    this.setState({ pageCount: pageCount });
                } else {
                    msg("失败", result.message, "error");
                }
            }
            this.props.Actions.Client.load(cb.bind(this));
        }
    }

    //更新分页相关的信息
    updatePageInfo() {
        var dataCount = this.props.Client.Client.clients.length;
        var pageCount = Math.ceil(dataCount / this.state.showCount);
        this.setState({
            pageCount: pageCount
        });
    }

    handlePageData(index, cb) {
        this.setState({
            index: index
        });
    }

    handleAddClick() {
        this.setState({
            selected: null,
            view: null
        });
        if (this.props.Client.Resources.resources === null) {
            this.props.Actions.Resource.load();
        }
        $('.addandupdateclientmodal').modal("show");
    }

    //删除
    handleDelete(clientId) {
        if (this.props.Actions.Client.del)
            this.props.Actions.Client.del(clientId, result => {
                if (result.success) {
                    msg("成功", "删除客户端成功!", "success");
                } else {
                    msg("失败", result.message, "error");
                }
            });
    }

    hanldeEdit(client) { //这里是一个client对象
        //$(".clientDetialContain").show();
        //这里要开始判断
        this.setState({
            selected: client
        });
        if (this.props.Client.Resources.resources === null) {
            this.props.Actions.Resource.load(x => {
                if (x.success) { //确保打开的时候是初始化完成了
                    $('.addandupdateclientmodal').modal("show");
                }
            });
        } else {
            $('.addandupdateclientmodal').modal("show");
        }

    }

    handleView(client) {//对象
        this.setState({
            view: client
        });
    }

    renderData() {
        if (this.state.loading) {
            return (
                <tr>
                    <td colSpan="4" style={{ "textAlign": "center" }}>
                        <Loading />
                    </td>
                </tr>
            );
        }
        var datas = this.props.Client.Client.clients;
        let { index, showCount } = this.state;
        var offset = (index - 1) * this.state.showCount;
        datas = (offset + showCount >= datas.length)
            ? datas.slice(offset, datas.length)
            : datas.slice(offset, offset + showCount);
        if (datas === null || datas === undefined || datas.length === 0)
            return (
                <tr>
                    <td colSpan="4" style={{ "textAlign": "center" }}>暂无数据！</td>
                </tr>
            );
        return datas.map(u => {
            return (
                <tr style={{ "cursor": "pointer" }}>
                    <th onDoubleClick={this.handleView.bind(this, u)} scope="row"><a href="#">{u.clientName}</a></th>
                    <td onDoubleClick={this.handleView.bind(this, u)}>{u.clientId}</td>
                    <td onDoubleClick={this.handleView.bind(this, u)}>{u.allowedGrantTypes.map(x => {
                        return (
                            <label style={{ display: "inline-block" }} className="label label-primary">{x}</label>
                        );
                    })}</td>
                    <td>
                        <Action view={this.handleView.bind(this, u)} del={this.handleDelete.bind(this, u.clientId)} edit={this.hanldeEdit.bind(this, u)} />
                    </td>
                </tr>
            );
        });
    }

    render() {
        let { index, showCount, pageCount } = this.state;
        var pageInfo = { index, showCount, pageCount };
        var resources = this.props.Client.Resources.resources;
        var selected = this.state.selected;
        var data = { resources, selected };
        return (
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>客户端资源管理 <small>客户端资源列表</small>&nbsp;&nbsp;&nbsp;&nbsp;<a style={{ marginBottom: -7 }} className="btn btn-primary" onClick={this.handleAddClick.bind(this)} href="javascript:void(0)">添加新客户端</a></h2>
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
                                    <th width={this.state.widths[0]}>客户端名称</th>
                                    <th width={this.state.widths[1]}>客户端Id</th>
                                    <th width={this.state.widths[2]}>授权类型</th>
                                    <th width={this.state.widths[3]}>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderData()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pager {...pageInfo} click={this.handlePageData.bind(this)} />
                <ClientUpdateAndAddModal data={data} Actions={this.props.Actions} />
                <ClientDetail data={this.state.view} setState={this.setState.bind(this)} />
            </div>
        );
    }
}

