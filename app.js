const express = require('express');
const app = express();
const request = require('request')
const superagent = require('superagent')
const port = 7800;
const cors = require('cors');


app.use(cors());

app.get('/',(req,res)=>{
    res.send("<a href='https://github.com/login/oauth/authorize?client_id=e916c9735d9786170290'>Login with Github</a>")
})

app.get('/user',(req,res)=>{
    const code = req.query.code;
     
     superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'e916c9735d9786170290',
            client_secret:' 86184ca6769f86fd69dd5e17cec4900007c95c63',
            code:'09cbadd963d51ec4d256'
        })
        .set('Accept','application/json')
        .end((err,result)=>{
            var accessToken = result.body.access_token;
             const option={
                 url:'https://api.github.com/user',
                 method:'Get',
                 headers:{
                     'Accept':'application/json',
                     'Authorization':'token' +accessToken,
                      'User-Agent':'mycode'
                 }
             }
             request(option,(err,response,body)=>{
                 res.send(body)
             })
        })
})


app.listen(port,()=>{
    console.log('server running on port no 7800')
})

//client id e916c9735d9786170290

//code  code=09cbadd963d51ec4d256