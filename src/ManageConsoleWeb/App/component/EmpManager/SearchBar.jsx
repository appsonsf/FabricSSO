import React, { Component } from 'react';

import msg from "../../_shared/msg";


export default class SearchBar extends Component {

    search(e) {
        e.preventDefault();
        var data = this.getFormData();
        if (this.props.load) {
            this.props.load(data);
        }
    }

    getFormData() {
        var data = {};
        data["IDKey"] = parseInt($('#IDKey').val());
        data["name"] = $("#name").val();
        data["deptName"] = $('#deptName').val();
        data["srcOrgName"] = $("#srcOrgName").val();
        data["fRelationStatus"] = $("#fRelationStatus").val();
        data["number"] = $("#number").val();
        return data;
    }

    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <label>IDKey</label>&nbsp;
                    <input type="text" className="form-control" id="IDKey" placeholder="按Id搜索" />&nbsp;&nbsp;&nbsp;
                </div>
                <div className="form-group">
                    <label>姓名</label>&nbsp;
                    <input type="email" className="form-control" id="name" placeholder="按姓名搜索" />&nbsp;&nbsp;&nbsp;
                </div>

                <div className="form-group">
                    <label>员工编号</label>&nbsp;
                    <input type="email" className="form-control" id="number" placeholder="按员工编号搜索" />&nbsp;&nbsp;&nbsp;
                </div>

                <div className="form-group">
                    <label>职位</label>&nbsp;
                    <input type="email" className="form-control" id="deptName" placeholder="按职位搜索" />&nbsp;&nbsp;&nbsp;
                </div>
                <div className="form-group">
                    <label>组织机构</label>&nbsp;
                    <input type="email" className="form-control" id="srcOrgName" placeholder="按组织机构搜索" />&nbsp;&nbsp;&nbsp;
                </div>
                <div className="form-group">
                    <label>入职状态</label>&nbsp;
                    <input type="email" className="form-control" id="fRelationStatus" placeholder="按入职状态搜索" />&nbsp;&nbsp;&nbsp;
                </div>

                <button type="submit" className="btn btn-default" onClick={this.search.bind(this)}>搜索</button>
            </form>
        );
    }
}