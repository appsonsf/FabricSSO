import React, { Component } from 'react';

//导入组件
import Loading from "../shared/Loading";
import Pager from "../shared/Pager";
import Action from "./Action";
import CreateUserModal from "./CreateUserModal";
import SearchBar from "./SearchBar";

//导入公共类库
import msg from "../../_shared/msg";


export default class TmpTable extends Component {

    constructor() {
        super();
        this.state = {
            widths: ["10%", "15%", "10%", "25%", "25%", "10%", "10%"],
            loading: true,
            selected: null,
            index: 1,
            showCount: 10,
            pageCount: 1
        }
    }

    //组件渲染结束
    componentDidMount() {
        let cb = result => {
            this.setState({ loading: false });
            if (!result.success) {
                msg("错误", result.message, "error");
            } else {
                this.setState({ pageCount: result.data.pageCount });
            }
        }
        this.props.Actions.Emp.load(null, cb.bind(this));
    }

    handleLoad(query) {
        //处理搜索记载的问题
        if (query === null || query == undefined)
            return;
        query["PageIndex"] = 1;
        query["PageSize"] = 10;
        this.setState({ index: 1 });
        let cb = result => {
            this.setState({ loading: false });
            if (!result.success) {
                msg("错误", result.message, "error");
            } else {
                this.setState({ pageCount: result.data.pageCount });
            }
        }
        this.props.Actions.Emp.load(query, cb.bind(this));
    }

    handlePageData(index) {
        this.setState({
            index: index,
            loading: true
        });
        let cb = x => {
            this.setState({ loading: false, pageCount: x.data.pageCount });
        }
        //TODO：下一个分支代码优化这一部分
        var data = {};
        data["IDKey"] = parseInt($('#IDKey').val());
        data["name"] = $("#name").val();
        data["deptName"] = $('#deptName').val();
        data["srcOrgName"] = $("#srcOrgName").val();
        data["fRelationStatus"] = $("#fRelationStatus").val();
        data["pageIndex"] = index;
        data["pageSize"] = this.state.showCount;
        this.props.Actions.Emp.load(data, cb.bind(this));
    }

    render() {
        let { index, showCount, pageCount } = this.state;
        var pageInfo = { index, showCount, pageCount };
        return (
            <div>
                <SearchBar load={this.handleLoad.bind(this)} />
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>职员管理 <small>职员资源列表</small>&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <table className="table table-hover" style={{ tableLayout: "fixed" }}>
                                <thead>
                                    <tr>
                                        <th width={this.state.widths[0]}>IDKey</th>
                                        <th width={this.state.widths[1]}>姓名</th>
                                        <th width={this.state.widths[2]}>员工编号</th>
                                        <th width={this.state.widths[3]}>职位名称</th>
                                        <th width={this.state.widths[4]}>组织机构名称</th>
                                        <th width={this.state.widths[5]}>入职状态</th>
                                        <th width={this.state.widths[6]}>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pager {...pageInfo} click={this.handlePageData.bind(this)} />
                    <CreateUserModal createUser={this.props.Actions.Emp.createUser} data={this.state.selected} />
                </div>
            </div>
        );
    }

    renderData() {
        if (this.state.loading) {
            return (
                <tr>
                    <td colSpan="6" style={{ "textAlign": "center" }}>
                        <Loading />
                    </td>
                </tr>
            );
        }
        console.log(this);
        var datas = this.props.User.Emp.emps;
        if (datas === null || datas.length === 0) {
            return (
                <tr>
                    <td colSpan="6" style={{ "textAlign": "center" }}>
                        暂未查询到数据
                    </td>
                </tr>
            );
        }
        return datas.map(u => {
            return (
                <tr>
                    <td>{u.idKey}</td>
                    <td>{u.name}</td>
                    <td>{u.number}</td>
                    <td>{u.deptName}</td>
                    <td>{u.srcOrgName}</td>
                    <td>{u.fRelationStatus}</td>
                    {u.haveRegisteUser ? <td>此职员以注册用户</td> : <td><Action createUser={this.createUser.bind(this, u)} /></td>}
                </tr>
            );
        });
    }

    createUser(model) {
        this.setState({ selected: model });
        $("#phone").val("");
        $("#username").val("");
        $("#password").val("");
        $(".createuserbyempmodal").modal("show");
    }
}