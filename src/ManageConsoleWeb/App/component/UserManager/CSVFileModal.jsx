import React, { Component } from 'react';
import msg from "../../_shared/msg";
import confirm from "../../_shared/confirm";

export default class CSVFileModal extends Component {

    constructor() {
        super();
        this.state = {
            files: []  //文件的名称
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        confirm(_ => {
            var formData = new FormData($("#form1")[0]);
            $.ajax({
                url: "/api/user/ImportUserData",
                type: 'POST',
                data: formData,
                // 告诉jQuery不要去处理发送的数据  
                processData: false,
                // 告诉jQuery不要去设置Content-Type请求头  
                contentType: false,
                async: true,
                success: function (data) {
                    if (data) {
                        if (data.success) {
                            msg("成功", "还原数据到ServiceFabric集群成功,请刷新页面查看", "success");
                        } else {
                            msg("失败", data.message, "error");
                        }
                    }
                }
            });
        },
            "确定要您所选择的用户备份文件");
    }

    handleChange(e) {
        if (e.target.files !== null && e.target.files.length > 0) {
            let arr = [];
            for (let i = 0; i < e.target.files.length; i++) {
                arr.push(e.target.files[i].name);
            }
            this.setState({ files: arr });
        } else {
            this.setState({ files: [] });
        }
    }

    render() {
        return (
            <div className="modal fade csvfilemodal" id="bindUserModal" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title">选择导入文件</h4>
                        </div>
                        <div className="modal-body">
                            <form action="uploadTrainProduct" method="post" enctype="multipart/form-data" id="form1">
                                <input onChange={this.handleChange.bind(this)} id="csvfile" type="file" name="csvfile" multiple="multiple" />
                                {this.state.files.map(u => {
                                    return (
                                        <div>
                                            <span>{u}</span>
                                        </div>
                                    );
                                })}
                                <br />
                                <button onClick={this.handleSubmit.bind(this)} className="btn btn-primary">提交</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}