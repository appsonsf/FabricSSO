import React, { Component } from 'react';
import RoleUserTable from "./RoleUserTable";

import Pager from "../shared/Pager";
import msg from "../../_shared/msg";

export default class RoleUsersModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 1,  //分页信息
            showCount: 10
        }
    }

    handlePageData(index, cb) {
        this.setState({
            index: index
        });
    }

    handleClick() {
        var arr = [];
        $('.checkRoleUsers').each(function () {
            if ($(this).prop("checked")) {
                arr.push($(this).val());
            }
        });
        if (arr.length === 0) {
            msg("错误", "请选择需要移除的用户", "error");
            return;
        }
        //开始请求删除多个数据
        var selcted = this.props.data;
        this.props.Actions.delRoleUsers(selcted.id, arr);
    }

    render() {
        let { index, showCount } = this.state;
        let pageCount = this.props.pageCount;
        let pageInfo = { index, showCount, pageCount };
        let offset = (index - 1) * this.state.showCount;
        let datas = (offset + showCount >= this.props.datas.length)
            ? this.props.datas.slice(offset, this.props.datas.length)
            : this.props.datas.slice(offset, offset + showCount);

        return (
            <div className="modal fade RoleUsersModal" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">{this.props.data === null ? "" : this.props.data.name} 角色下的用户：</h4>
                            <a onClick={this.handleClick.bind(this)} style={{float:"right"}} href="javascript:void(0)" className="btn btn-primary">移除选中用户</a>
                        </div>
                        <div className="modal-body">
                            <RoleUserTable datas={datas} select={this.props.selectd} />
                            <Pager {...pageInfo} click={this.handlePageData.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}