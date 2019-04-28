import React, { Component } from 'react';

import Loading from "../shared/Loading";

export default class RoleUserTable extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            widths: ["10%","25%", "25%", "25%", "15%"]
        }
    }

    handleCheckAll(e) {
        $(".checkRoleUsers").each(function () {
            $(this).prop("checked", e.target.checked); //设置选中值
        });
    }
    

    renderData() {
        if (this.props.loadding) {
            return (
                <tr>
                    <td colSpan="6" style={{ "textAlign": "center" }}>
                        <Loading />
                    </td>
                </tr>
            );
        }
        if (this.props.datas === null || this.props.datas.length === 0) {
            return (
                <tr>
                    <td colSpan="6" style={{ "textAlign": "center" }}>
                        暂无数据...
                    </td>
                </tr>
                );
        }

        return this.props.datas.map(u => {
            return (
                <tr key={u.username}>
                    <td>
                        <input className="checkRoleUsers" type="checkbox" value={u.id} />
                    </td>
                    <td>{u.username}</td>
                    <td>{u.name}</td>
                    <td>{u.mail}</td>
                    <td>{u.state}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="table table-hover" style={{ tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        <th width={this.state.widths[0]} style={{width:"10%"}}>
                            <input onChange={this.handleCheckAll} type="checkbox" className="allcheck" />
                            全选
                        </th>
                        <th width={this.state.widths[1]}>用户名</th>
                        <th width={this.state.widths[2]}>姓名</th>
                        <th width={this.state.widths[3]}>邮箱</th>                       
                        <th width={this.state.widths[4]}>状态</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderData()}
                </tbody>
            </table>
        );
    }
}