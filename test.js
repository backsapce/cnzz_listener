

var date = new Date();
console.log(date);

setTimeout(function () {
  console.log(Date.now() - date);
}, 1000);
