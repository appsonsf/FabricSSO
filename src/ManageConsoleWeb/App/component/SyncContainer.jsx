import React, { Component } from 'react';
import http from "../_shared/http";

export default class SyncContainer extends Component {


    syncKingdee(e) {
        e.preventDefault();
        http.post("/api/sync/employee", {}, x => {
            alert(x.message);
        }, x => {
            alert("失败,请重新请求");
        })
    }

    syncToActor(e) {
        e.preventDefault();
        http.post("/api/sync/syncToUser", {}, x => {
            alert(x.message);
        }, x => {
            alert("失败,请重新操作!");
        });
    }

    syncOrg(e) {
        e.preventDefault();
        http.post("/api/sync/org", {}, x => {
            alert(x.message);
        }, x => {
            alert("失败,请重新操作!")
        })
    }

    batchCreate(e) {
        e.preventDefault();
        var id=$("#orgId").val();
        http.post("/api/sync/batchCreate?orgId="+id, {}, x => {
            alert(x.message);
        });
    }

    syncNumber(e) {
        e.preventDefault();
        http.post("/api/sync/FillEmployeeNumberToUserItem", {}, x => {
            alert(x.message);
        });
    }

    SendAdOrgs(e) {
        e.preventDefault();
        http.post("/api/sync/SendAdOrgs", {}, x => {
            alert(x.message);
        });
    }

    

    render() {
        return (
            <div>
                
                <button onClick={this.syncNumber}>补充注册员工编号，以及头像</button>
                <button onClick={this.syncKingdee}>Kingdee职员同步</button>
                <button onClick={this.syncOrg}>同步组织结构信息</button>
                <button onClick={this.syncToActor}>注册用户信息同步到职员中</button>
                <input type="text" id="orgId"></input>
                <button onClick={this.batchCreate}>更具组织机构创建用户</button>
                <button onClick={this.SendAdOrgs}>给AD发送所有组织结构</button>
            </div>
        );
    }
}