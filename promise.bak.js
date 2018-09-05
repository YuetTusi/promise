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
            _this.state = 'resolved';
            _this.onFulfilledFunc.forEach(f => f(value));

        }
    }

    function reject(reason) {
        if (_this.state === 'pending') {
            _this.reason = reason;
            _this.state = 'rejected';
            _this.onRejectedFunc.forEach(f => f(reason));

        }
    }
}

/**
 * 状态更新后执行
 * @param {Function} onFulfilled 成功态回调
 * @param {Function} onRejected 失败态回调
 */
Promise.prototype.then = function (onFulfilled, onRejected) {

    var promise2 = new Promise((resolve, reject) => {
        if (this.state === 'pending') {
            if (typeof onFulfilled === 'function') {
                this.onFulfilledFunc.push((value) => {
                    try {
                        let x = onFulfilled(value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
            if (typeof onRejected === 'function') {
                this.onRejectedFunc.push((reason) => {
                    try {
                        let x = onRejected(reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        }

        if (this.state === 'resolved') {

            if (typeof onFulfilled === 'function') {

                let x = onFulfilled(this.value);
                try {
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }

        }
        if (this.state === 'rejected') {
            if (typeof onRejected === 'function') {
                let x = onRejected(this.reason);
                try {
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }

        }
    });

    return promise2;
};

/**
 * 根据上一个then的结果解析Promise
 * @param {Object} promise2 新Promise对象
 * @param {Object} x 上一个then的返回值
 * @param {Function} resovle 新Promise的成功态回调
 * @param {Function} reject 新Promise的失败态回调
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('Promise发生了循环引用'));
    }


    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        //是对象或函数
        try {

            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    reject(r);
                });

            } else {
                resolve(x);
            }
        } catch (error) {
            reject(error);
        }
    } else {
        //是普通值
        // console.log(x);
        resolve(x)
    }
}

module.exports = Promise;