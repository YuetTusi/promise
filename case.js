const Promise = require('./promise');

let p = new Promise((resolve, reject) => {
    setTimeout(function(){
        reject(100);
    },1000);
});

p.then((data) => {
    console.log(data);
}, (reason) => {
    console.log(reason);
});