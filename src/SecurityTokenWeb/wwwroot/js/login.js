function Time(sec, out, callback1, callback2) {
    this.sec = sec;
    this.start = function () {
        var self = this;
        var internal = setInterval(function () {
            callback1(self.sec);
            self.sec--;
            if (self.sec <= 0) {
                clearInterval(internal);
                callback2();
            }
        }, out * 1000);
    }
}

function InitSQR() {
    var serviceUri = $("#__HIDDEDVALUE_ScanLoginServiceUri").val();
    $.connection.hub.url = serviceUri + "/signalr";
    var chat = $.connection.QrCodeApp;
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 220,
        height: 220,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    //mock
    function mocklogin(usr, id) {
        $("#qr_username").val(usr);
        $("#qr_password").val(id);
        $("#qr_login").click();
    }

    chat.client.sendQrCodeText = function (message) {
        qrcode.makeCode(message);
    }
    chat.client.sendLoginInfo = function (message) {
        var msg = JSON.parse(message);
        $.connection.hub.stop();
        mocklogin(msg.Username, msg.TempPwd);
    }
    $.connection.hub.start().done(function () {
        var _si = setInterval(function () {
            $.connection.hub.stop();
            clearInterval(_si);
        },180 * 1000);
    });
}

$(function () {
    //初始化登录方式切换
    $(".login-form").each(function () {
        var self = $(this);
        var otherLoginTypes = self.find(".other-login a");
        otherLoginTypes.each(function () {
            var logintype = $(this).attr("logintype");
            if (logintype !== null && logintype !== undefined) {
                $(this).click(function () {
                    var loginForms = $(".login-form");
                    loginForms.each(function () {
                        var loginForm = $(this);
                        loginForm.hasClass(logintype + "-login") ? loginForm.show() : loginForm.hide();
                    });
                });
            }
        });
    });


    //发送短信验证码
    $(".btn-sendCode").click(function (e) {
        e.preventDefault();
        var self = this;
        $(self).attr("disabled", true);
        var _token = $('input:hidden[name="__RequestVerificationToken"]').val();
        var phone = $("#phone_username").val();
        var body = "mobile=" + phone.trim() + "&__RequestVerificationToken=" + _token;
        $.ajax({
            url: "/Account/GetLoginMobileVerificationCode?mobile=" + phone,
            dataType: "json",
            data: body,
            type: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN", _token);
            },
            cache: true,
            success: function (result) {
                if (result !== "" && isNaN(result)) {
                    $("#smserror").html("*" + result);
                    $(self).attr("disabled", false);
                    return;
                } else {
                    var time = new Time(60, 1, function (sec) {
                        $(self).attr("disabled", true).html("重发(" + sec + "s)");
                    }, function () {
                        $(self).attr("disabled", false).html("发送验证码");
                    });
                    time.start();
                }
            },
            error: function() {
                $(self).attr("disabled", false);
            }
        });
    });

    InitSQR();

    var hash = window.location.hash;
    if (hash !== null && hash !== undefined &&hash!=="") {
        var type = hash.replace("#", "");
        $("[logintype=" + type + "]").click();
    }
});