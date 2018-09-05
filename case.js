const Promise = require('./promise');

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});


let t = p.then((data) => {
    return t;
});

t.then(null,(e)=>console.log(e));