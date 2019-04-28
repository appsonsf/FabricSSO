import React, { Component } from "react";
import axios from "axios";

var readSerach = false;
export default class AddMembersModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: props.groupId,
            datas: []
        }
    }

    componentDidMount() {
        this.initTree();
    }

    componentWillReceiveProps(props) {
        this.setState({ groupId: props.groupId });
    }

    closeModal() {
        $(".addMembersModal").modal("hide");
    }

    initTree() {
        $('#jstree_demo_div').jstree({
            "core": {
                "data": {
                    "url": "/api/orgtree/load",
                    "data": function (node) {
                        return { "id": node.id };
                    }
                }
            },
            "types": {
                "default": {
                    "icon": "fa fa-user"
                }
            },
            plugins: ["sort", "types", "checkbox", "themes", "html_data"],
            "checkbox": {
                "keep_selected_style": false,//是否默认选中
                "three_state": true,//父子级别级联选择
                "tie_selection": false
            }
        });
    }

    handleSearchClick(e) {
        e.preventDefault();
        var val = $("#q").val();
        if (val === null || val === "") {
            $("#search_result").hide();
            $('#jstree_demo_div').show();
            readSerach = false;
            return;
        }
        $("input[type=checkbox]").each(function () {
            $(this).prop("checked", false);
        })
        var self = this;
        axios.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
        axios.post("/api/orgtree/search?keyword=" + val, null)
            .then(res => {
                if (res.data.success) {
                    $('#jstree_demo_div').hide();
                    if (res.data.data.length === 0) {
                        alert("没有查询到数据!");
                    } else {
                        self.setState({ datas: res.data.data });
                        $("#search_result").show();
                        readSerach = true;
                        console.log(res);
                    }
                }
            })
    }

    handleSubit(e) {
        e.preventDefault();
        var ids = [];
        var idss = [];
        if (!readSerach) {
            $('#jstree_demo_div').find(".jstree-checked").each(function () {
                ids.push($(this).attr("id"));
            });
            if (ids.length === 0) {
                alert("请选择要选择的人员");
                return;
            }

            for (var i = 0; i < ids.length; i++) {
                var item = ids[i];
                var val = item.split("_")[0];
                idss.push(val);
            }
            if (ids.length === 0) {
                alert("请选择要选择的人员,并需要展开所选的节点！");
                return;
            }
        } else {
            //获取checkbox中的值
            $("#search_result input[type='checkbox']:checked").each(function () {
                idss.push($(this).val());
            })
        }
        axios.defaults.headers.common['XSRF-TOKEN'] = $('input:hidden[name="__RequestVerificationToken"]').val();
        var self = this;
        console.log(this);
        axios.post("/api/contactgroupmember/AddMembers", { groupId: self.state.groupId, MemberIds: idss })
            .then(res => {
                if (res.data.success) {
                    alert("添加成功");
                    window.location.reload();
                } else {
                    alert(res.data.message);
                }
            });
    }

    renderSearch() {
        if (this.state.datas === null || this.state.datas.length === 0)
            return "";
        return (
            <table className="table table-hover" style={{ tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        <th width="5%"></th>
                        <th width="10%">姓名</th>
                        <th width="10%">性别</th>
                        <th width="25%">上级部门</th>
                        <th width="25%">当前部门</th>
                        <th width="25%">当前职位</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.datas.map(u => {
                        return (
                            <tr>
                                <td>
                                    <input type="checkbox" value={u.empId} />
                                </td>
                                <td>{u.name}</td>
                                <td>{u.gender}</td>
                                <td>{u.parentDepartment}</td>
                                <td>{u.department}</td>
                                <td>{u.position}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );

    }

    render() {
        return (
            <div className="modal fade addMembersModal" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">{this.props.data === null ? "添加" : "更新"}联系人组</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form">
                                <div className="form-group row">
                                    <label for="name" className="col-sm-2 control-label">联系人姓名：</label>
                                    <div className="col-sm-5">
                                        <input type="text" id="q" className="form-control PhoneNo" name="mp-PhoneNo" placeholder="联系人" />
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-primary" onClick={this.handleSearchClick.bind(this)}>搜索</button>
                                    </div>
                                </div></div>
                            <form id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left">
                                <div className="form-group" style={{ overflow: "scroll", height: 600 }}>
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div id="jstree_demo_div"></div>
                                        <div id="search_result">
                                            {this.renderSearch()}
                                        </div>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                        <button className="btn btn-primary" type="button" onClick={this.closeModal.bind(this)}>取消</button>
                                        <button type="submit" className="btn btn-success" onClick={this.handleSubit.bind(this)}>提交</button>
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