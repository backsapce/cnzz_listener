var http = require('http');
var querystring = require('querystring');
var push = require('./push');
// var data = querystring.stringify({
//   'password':'ict5a.com',
// });
//
// var post = {
//   hostname:"new.cnzz.com",
//   port:80,
//   path:'/v1/login.php?t=login&siteid=1253772390',
//   method:'POST',
//   headers:{
//     'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Origin':'http://new.cnzz.com',
//     'Referer':'http://new.cnzz.com/v1/login.php?siteid=1253772390',
//     'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.91 Safari/537.36',
//     'Content-length':data.length,
//     // 'referer':'http://new.cnzz.com/v1/login.php?siteid=1253772390'
//   }
// };
//
// var req = http.request(post,function (res) {
//   res.setEncoding('utf8');
//   res.on('data',function (chunk) {
//     console.log('chunk'+chunk);
//   });
// });
//
// req.on('error',function (err) {
//   console.log(err);
// });
//
// req.write(data);
// req.end();

var getdata = {
    hostname:"tongji.cnzz.com",
    port:80,
    path:'/main.php?c=site&a=overview&ajax=module%3Dsummary&siteid=1253772390&_=1422074733905',
    method:'POST',
    headers:{
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin':'http://new.cnzz.com',
      'Referer':'http://new.cnzz.com/v1/login.php?siteid=1253772390',
      'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.91 Safari/537.36',
      'Content-length':0,
      'Cookie':'PHPSESSID=0avvk61ms779dgjuqhhv3nooe4',
      // 'referer':'http://new.cnzz.com/v1/login.php?siteid=1253772390'
    }
};


var pv = 0,
    uv = 0,
    ip = 0,
    nuv = 0,
    session = 0;

function listen() {


  http.get(getdata,function (res) {
    var jsondata = '';
    res.setEncoding('utf8');
    res.on('data',function (chunk) {
      jsondata += chunk;
    });
    res.on('end',function () {
      json = JSON.parse(jsondata);
      // console.log(json.data.summary.items[0].pv);
      // console.log(JSON.stringify(json));
      console.log('###########################');
      console.log('-----pv ' + json.data.summary.items[0].pv);
      console.log('-----uv ' + json.data.summary.items[0].uv);
      console.log('-----ip ' + json.data.summary.items[0].ip);
      console.log('-----nuv ' + json.data.summary.items[0].newuv);
      if(pv === 0){
        pv = json.data.summary.items[0].pv;
        uv = json.data.summary.items[0].uv;
        ip = json.data.summary.items[0].ip;
        nuv = json.data.summary.items[0].newuv;
      }
      else{
        if(json.data.summary.items[0].pv - pv > 500){
          console.log('======push msg');
          push('PV 达到了' + json.data.summary.items[0].pv,'增长了'+(json.data.summary.items[0].pv-pv));
          pv = json.data.summary.items[0].pv;
        }
      }
    });
  }).on('error',function (err) {
    console.log("got error when link to server " + err);
  });

}

setInterval(listen,1000*2);
