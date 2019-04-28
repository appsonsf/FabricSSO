import React, { Component } from 'react';


export default class SearchBar extends Component {

    search(e) {
        e.preventDefault();
        var data = this.getFormData();
        if (this.props.Actions.User.search)
            this.props.Actions.User.search(data);
    }

    getFormData() {
        var data = {};
        data["username"] = $('#username').val();
        data["name"] = $("#name").val();
        data["idCardNo"] = $('#idCardNo').val();
        data["mobile"] = $("#mobile").val();
        data["email"] = $("#email").val();
        data["employeeNumber"] = $("#employeeNumber").val();
        data["lock"] = $("#lock").prop('checked');
        return data;
    }

    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <label>用户名</label>&nbsp;
                    <input type="text" className="form-control" id="username" placeholder="按用户名搜索" />&nbsp;&nbsp;&nbsp;
                </div>
                <div className="form-group">
                    <label>姓名</label>&nbsp;
                    <input type="email" className="form-control" id="name" placeholder="按姓名搜索" />&nbsp;&nbsp;&nbsp;
                </div>
                <div className="form-group">
                    <label>身份证号</label>&nbsp;
                    <input type="email" className="form-control" id="idCardNo" placeholder="按身份证号搜索" />&nbsp;&nbsp;&nbsp;
                </div>
                <div className="form-group">
                    <label>手机号码</label>&nbsp;
                    <input type="email" className="form-control" id="mobile" placeholder="按手机号码搜索" />&nbsp;&nbsp;&nbsp;
                </div>

                <div className="form-group">
                    <label>员工编码</label>&nbsp;
                    <input type="text" className="form-control" id="employeeNumber" placeholder="员工编码" />&nbsp;&nbsp;&nbsp;
                </div>

                <div className="form-group">
                    <label>是否锁定</label>&nbsp;
                    <input type="checkbox" className="form-control" id="lock" value="true" placeholder="是否锁定" />&nbsp;&nbsp;&nbsp;
                </div>


                <div className="form-group">
                    <label>邮箱</label>&nbsp;
                    <input type="email" className="form-control" id="email" placeholder="按邮箱搜索" />&nbsp;&nbsp;&nbsp;
                </div>

                <button type="submit" className="btn btn-default" onClick={this.search.bind(this)}>搜索</button>
            </form>
        );
    }
}