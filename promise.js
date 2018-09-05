/**
 * Promise对象
 * @param {Function} executor 执行器
 */
function Promise(executor) {

    var _this = this;
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFunc = [];
    this.onRejectedFunc = [];

    executor(resolve, reject);

    function resolve(value) {
        if (_this.state === 'pending') {
            _this.value = value;
            _this.onFulfilledFunc.forEach(f => f(value));
            _this.state = 'resolved';

        }
    }

    function reject(reason) {
        if (_this.state === 'pending') {
            _this.reason = reason;
            _this.onRejectedFunc.forEach(f => f(reason));
            _this.state = 'rejected';
        }
    }
}

/**
 * 状态更新后执行
 * @param {Function} onFulfilled 成功态回调
 * @param {Function} onRejected 失败态回调
 */
Promise.prototype.then = function (onFulfilled, onRejected) {

    if (this.state === 'pending') {
        this.onFulfilledFunc.push(onFulfilled);
        this.onRejectedFunc.push(onRejected);
    }
    if (this.state === 'resolved') {
        onFulfilled(this.value);
    }
    if (this.state === 'rejected') {
        onRejected(this.reason);
    }
};

module.exports = Promise;