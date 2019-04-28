import React, { Component } from 'react';
import http from "../_shared/http";

//导出Index首页组件
export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            users: 0,
            clients: 0,
            roles: 0
        }
    }

    componentDidMount() {
        if (!this.loaded) {
            //开始加载
            var self = this;
            http.get("/api/count", {}, function (result) {
                if (result.success) {
                    self.setState({
                        users: result.data.userCount,
                        clients: result.data.clientCount,
                        roles: result.data.roleCount
                    });
                }
            });
        }
    }

    render() {
        return (
            <div className="row tile_count">
                <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                    <span className="count_top"><i className="fa fa-user"></i> 总计用户</span>
                    <div className="count">{this.state.users}</div>
                    <span className="count_bottom"><i className="green">4% </i> From last Week</span>
                </div>
                <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                    <span className="count_top"><i className="fa fa-clock-o"></i> 总计客户端</span>
                    <div className="count">{this.state.clients}</div>
                    <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>3% </i> From last Week</span>
                </div>
                <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                    <span className="count_top"><i className="fa fa-user"></i> 总计角色</span>
                    <div className="count green">{this.state.roles}</div>
                    <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>34% </i> From last Week</span>
                </div>
            </div>
        );
    }
}