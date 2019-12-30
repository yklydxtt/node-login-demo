var http = require('http');
var fs = require('fs');
var user=require('./user.json');
var server = http.createServer(function (request, response) {
    var path = request.url;
    var post = '';
    request.on('data',function(chunk){
        post += chunk;
    })
    request.on('end',function(){
        if(path==='/login'){
            post=JSON.parse(post);
            if(user[post.username]==post.pwd){
                response.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' })
                response.end(JSON.stringify({'msg':'登录成功！'}))
            }else if(user[post.username]&&user[post.username]!==post.pwd){
                response.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' })
                response.end(JSON.stringify({'msg':'用户名或密码错误'}))
            }else{
                response.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' })
                response.end(JSON.stringify({'msg':'用户不存在，请先注册'}))
            }
        }else if(path==='/reg'){
            post=JSON.parse(post);
            if(user[post.username]){
                response.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' })
                response.end(JSON.stringify({'msg':'用户名已存在，换一个吧'}))
            }else{
                let name=post.username;
                user[name]=post.pwd;
                let data=JSON.stringify(user)
                fs.writeFile('./user.json',data,(err)=>{
                    if(err) throw err;
                })
                response.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' })
                response.end(JSON.stringify({'msg':'恭喜你！注册成功^_^'}))
            }
        }
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
    }
})
server.listen(3000);
console.log('server is running at localhost:3000');