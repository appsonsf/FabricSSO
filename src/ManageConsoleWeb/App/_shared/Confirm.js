export default function confirm(cb,message) {
    $.confirm({
        title: '确认!',
        content: message,
        buttons: {
            confirm: {
                text: "确定",
                btnClass: "btn-blue",
                action: cb
            },
            cancel: {
                text: "取消",
                btnClass: "btn-blue",
                action: function () { }
            }
        }
        
    });
}