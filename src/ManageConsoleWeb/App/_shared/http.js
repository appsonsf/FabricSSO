//let $ = require("jquery");//先不处理
import msg from "./msg";
const http = {
    send: function (url, data, method, callback, errorcb) {
        $.ajax({
            type: method,
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (data, status, xhr) {
                if (callback !== undefined || callback !== null)
                    callback(data);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            error: function (xhr, status, error) {
                if (xhr.status === 401) {
                    window.location.href = "/login";
                } else if (xhr.status === 403) { //forbidden
                    msg("错误", "您没有权限做此操作!请联系管理员", "error");
                    window.location.href = "/Account/AccessDenied";
                    return;
                }
                if (errorcb !== undefined && errorcb !== null && typeof (errorcb) === "function")
                    errorcb(xhr, status, error);
                else
                    msg("失败", "服务器异常!请从新尝试!", "error");
            }
        });
    },
    post: function (url, data, callback, errorcb) {
        this.send(url, data, "POST", callback, errorcb);
    },
    get: function (url, data, callback, errorcb) {
        $.ajax({
            type: "get",
            url: url,
            data: data,
            success: function (data, status, xhr) {
                if (callback !== undefined || callback !== null)
                    callback(data);
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            error: function (xhr, status, error) {
                if (xhr.status === 401) {
                    window.location.href = "/login";
                } else if (xhr.status === 403) { //forbidden
                    msg("错误", "您没有权限做此操作!请联系管理员", "error");
                    window.location.href = "/Account/AccessDenied";
                    return;
                }
                if (errorcb !== undefined && errorcb !== null && typeof (errorcb) === "function")
                    errorcb(xhr, status, error);
                else
                    msg("失败", "服务器异常!请从新尝试!", "error");
            }
        });
    },
    put: function (url, data, callback, errorcb) {
        this.send(url, data, "PUT", callback, errorcb);
    },
    delete: function (url, data, callback, errorcb) {
        this.send(url, data, "DELETE", callback, errorcb);
    },
    patch: function (url, data, callback, errorcb) {
        this.send(url, data, "PATCH", callback, errorcb);
    }
}

export default http;