var http = require('http');
var fs = require('fs');
var qurerystring = require('querystring');
var user = {
    guoguo:123456
}
var server = http.createServer(function (request, response) {
    var path = request.url;
    var post = '';
    request.on('data',function(chunk){
        post += chunk;
    })
    request.on('end',function(){
        post=qurerystring.parse(post);
    })
    if (path === '/') {
        fs.readFile('./login.html', function (err, data) {
            if (!err) {
                response.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
                response.end(data);
            } else {
                throw err;
            }
        })
    } else if(path==='/data'){
        if(user[post.username]===post.pwd){
            response.writeHead(200, { 'Content-Type': 'text/plain;charset=UTF-8' })
            response.end('登录成功')
        }else{
            throw err
        }
    }
})
server.listen(3000);
console.log('server is running at localhost:3000');