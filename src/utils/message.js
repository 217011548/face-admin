function success(self, msg) {
    self.$message.success(msg);
}

function error(self, err) {
    if (err && err.hasOwnProperty("success")) {
        if (err.success === 2000 || err.success === 6000) {
            self.$message.error(err.msg);
            if (err.msg.indexOf('timeout') > -1 && err.msg.indexOf('please login again') > -1) {
                self.$router.push("/login");
            }
        } else if (err.success === 3000 && err.msg && err.msg.length < 60) {
            self.$message.error(err.msg);
        } else {
            self.$message.error("internal error please contact admin！");
        }
    } else {
        self.$message.error("internal error please contact admin！");
    }
}

function responseError(self, response) {
    if (response && response.hasOwnProperty("success")) {
        if (response.success === 2000 || response.success === 6000) {
            self.$message.error(response.msg);
            if (response.msg.indexOf('timeout') > -1 && response.msg.indexOf('please login again') > -1) {
                self.$router.push("/login");
            }
        } else if (response.success === 3000 && response.msg && response.msg.length < 60) {
            self.$message.error(response.msg);
        } else {
            self.$message.error("internal error please contact admin！");
        }
    }
}

function errorMsg(self, msg) {
    self.$message.error(msg);
}

function info(self, msg) {
    self.$message(msg);
}

module.exports.success = success;
module.exports.error = error;
module.exports.responseError = responseError;
module.exports.errorMsg = errorMsg;
module.exports.info = info;
