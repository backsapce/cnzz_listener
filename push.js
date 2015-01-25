var https = require('https');

var options = {
  host: 'api.pushbullet.com',
  port: 443,
  path: '/v2/pushes',
  method: 'POST',
  headers: {'content-type':'application/json'},
  //auth所用的 Access Token 填写你自己的，可以在账号信息里面看到
  auth: 'AODrYj6kQs2yTfKuyIqyKvSbwmRGUjw1'
};


function push( title, str) {
  var req = https.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
      console.log(data);
    });
  });
  req.on('error',function(e){
    console.log(e.message);
  });
  req.write(JSON.stringify({"type": "note",'channel_tag':'cnzz', "title": title, "body": str}));
  req.end();
}
// push('hello','world');

module.exports = push;
