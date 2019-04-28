import React, { Component } from 'react';


//导入组件
import Action from "./Action";
import RoleUpdateAndAddModal from "./RoleUpdateAndAddModal";
import BindUsersModal from "./BindUsersModal";
import RoleUsersModal from "./RoleUsersModal"
import Loading from "../shared/Loading";
import Pager from "../shared/Pager";

export default class RoleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            widths: ["20%", "20%", "50%", "10%"],
            loadding: true,
            roleUsersLoadding: true,
            index: 1,  //分页信息
            showCount: 10,
            pageCount: 1,
            innerPageCount: 1
        }
    }

    //渲染完成之后需要亲求数据
    componentDidMount() {
        var self = this;
        this.props.Actions.loadAll(x => {
            if (x !== undefined && x !== null) {
                var pageCount = Math.ceil(x.length / self.state.showCount);
                self.setState({
                    pageCount: pageCount,
                    loadding: false
                });
            }
        });
    }

    //更新分页相关的信息
    updatePageInfo() {
        var dataCount = this.props.RoleState.datas.length;
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

    //处理添加操作
    handleAddClick(e) {
        e.preventDefault();
        this.setState({
            selected: null
        });
        this.loadClients();
        $("#inputRoleId").val("");
        $(".addupdaterolemodal").modal("show");
    }

    handleDel(id) {
        this.props.Actions.del(id);
    }

    handleEdit(id) {
        console.log(id);
        this.updateStateById(id);
        this.loadClients(x => {
            if (x.success) {
                $(".addupdaterolemodal").modal("show");
            }
        });

    }
    loadClients(cb) {
        cb = cb || function () { };
        if (this.props.RoleState.clients.length === 0) {
            this.props.Actions.loadAllClient(cb);
        } else {
            var obj = { success: true };
            cb(obj);//有点问题
        }
    }

    handleBindUsers(id) {
        if (this.props.RoleState.users === null || this.props.RoleState.users.length === 0) {
            this.props.Actions.loaddAllUsers(x => {
                if (x.success) {
                    $(".bindUsers").modal("show");
                }
            });
        }
        else {
            $(".bindUsers").modal("show");
        }
        this.updateStateById(id);
    }

    handleLookUsers(id) {

        this.updateStateById(id);
        //开始加载
        var self = this;
        this.props.Actions.loadRoleUsers(id, u => {
            self.setState({
                roleUsersLoadding: false
            });
            if (u.success) {
                var pageCount = Math.ceil(u.data.length / this.state.showCount);
                self.setState({
                    innerPageCount: pageCount
                });
            }
        });
    }

    updateStateById(id) {
        var temp = null;
        var datas = this.props.RoleState.datas;
        for (let i = 0; i < datas.length; i++) {
            if (datas[i].id === id) {
                temp = datas[i];
                break;
            }
        }
        this.setState({
            selected: temp
        });
    }

    renderData() {
        if (this.state.loadding) {
            return (
                <tr>
                    <td colSpan="3" style={{ "textAlign": "center" }}>
                        <Loading />
                    </td>
                </tr>
            );
        }
        var roleState = this.props.RoleState;
        if (roleState.datas.length === 0)
            return (
                <tr>
                    <td colSpan="3" style={{ "textAlign": "center" }}>暂无数据！</td>
                </tr>
            );
        //这里要处理分页数据的问题
        let { index, showCount } = this.state;
        var offset = (index - 1) * this.state.showCount;
        var datas = (offset + showCount >= roleState.datas.length)
            ? roleState.datas.slice(offset, roleState.datas.length)
            : roleState.datas.slice(offset, offset + showCount);
        return datas.map(u => {
            return (
                <tr key={u.id}>
                    <td>{u.id}
                    </td>
                    <td>
                        <a>{u.name}</a>
                    </td>
                    <td>
                        {u.clientIds.map(x => {
                            return (
                                <label key={x.clientId} style={{ display: "inline-block" }} className="label label-info">{x.clientName}&nbsp;</label>
                            );
                        })}
                    </td>
                    <td>
                        <Action lookUsers={this.handleLookUsers.bind(this, u.id)} bindUsers={this.handleBindUsers.bind(this, u.id)} edit={this.handleEdit.bind(this, u.id)} del={this.handleDel.bind(this, u.id)} />
                    </td>
                </tr>
            );
        });
    }

    render() {
        let { index, showCount, pageCount } = this.state;
        var pageInfo = { index, showCount, pageCount };
        return (
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>系统角色</h2>&nbsp;&nbsp;&nbsp;&nbsp;<a style={{ marginBottom: -7 }} className="btn btn-primary" onClick={this.handleAddClick.bind(this)} href="javascript:void(0)">添加角色</a>
                        <ul className="nav navbar-right panel_toolbox">
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">

                        <table style={{ tableLayout: "fixed" }} className="table table-hover">
                            <thead>
                                <tr>
                                    <th width={this.state.widths[0]}>角色代码</th>
                                    <th width={this.state.widths[1]}>角色名称</th>
                                    <th width={this.state.widths[2]}>关联客户端</th>
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
                <RoleUpdateAndAddModal Actions={this.props.Actions} updatePageInfo={this.updatePageInfo.bind(this)} clients={this.props.RoleState.clients} data={this.state.selected} />
                <BindUsersModal Actions={this.props.Actions} data={this.state.selected} users={this.props.RoleState.users} />
                <RoleUsersModal Actions={this.props.Actions} data={this.state.selected} datas={this.props.RoleState.roleUsers} loadding={this.state.roleUsersLoadding} pageCount={this.state.innerPageCount} />
            </div>
        );
    }
}