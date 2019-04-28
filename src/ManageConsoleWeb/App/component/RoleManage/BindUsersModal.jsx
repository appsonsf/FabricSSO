import React, { Component } from 'react';
import msg from "../../_shared/msg";

export default class BindUsersModal extends Component {

    componentDidMount() {
        this.syncData();
    }
    componentDidUpdate() {
        this.syncData();
    }

    syncData() {
        $('#bindUsersSelect').select2({
            placeholder: '请选择用户',
            multiple: true,
            separator: ","
        }).val([]).trigger('change');
    }

    closeModal() {
        $(".bindUsers").modal("hide");
    }


    hanldeSubmit(e) {
        e.preventDefault();
        var id = this.props.data.id;
        var userIds = $('#bindUsersSelect').val();
        if (userIds === null) {
            msg("错误", "请选择需要绑定的用户", "error");
            return;
        }
        var self = this;
        if (this.props.Actions) {  //绑定多个用户
            this.props.Actions.bindUsers(id, userIds, u => {
                if (u.success) {
                    self.closeModal();
                }
            });
        }
    }

    renderUsersOptions() {
        return this.props.users.map(u => {
            return (
                <option key={u.id} value={u.id}>{u.name}</option>
            );
        });
    }


    render() {
        return (
            <div className="modal fade bindUsers" id="bindUserModal" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">绑定多个用户至角色</h4>
                        </div>
                        <div className="modal-body">
                            <form id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left">
                                <input type="hidden" ref="id" />
                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">角色：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <input type="text" value={this.props.data === null ? "" : this.props.data.name} className="form-control col-md-7 col-xs-12" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12">用户：
                                    </label>
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <select id="bindUsersSelect" className=" form-control col-md-7 col-xs-12">
                                            {this.renderUsersOptions()}
                                        </select>
                                    </div>
                                </div>

                                <div className="ln_solid"></div>
                                <div className="form-group">
                                    <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                        <button className="btn btn-primary" type="button" onClick={this.closeModal}>取消</button>
                                        <button type="submit" className="btn btn-success" onClick={this.hanldeSubmit.bind(this)}>提交</button>
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