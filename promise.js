/**
 * Promise对象
 * @param {Function} executor 执行器
 */
function Promise(executor) {

    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;

    function resolve(value) {

    }

    function reject(reason) {

    }
}

/**
 * 状态更新后执行
 * @param {Function} onFulfilled 成功态回调
 * @param {Function} onRejected 失败态回调
 */
Promise.prototype.then = function (onFulfilled, onRejected) {

};

module.exports = Promise;