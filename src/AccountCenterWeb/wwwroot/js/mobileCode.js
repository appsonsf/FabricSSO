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