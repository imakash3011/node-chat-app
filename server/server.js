//it will help to enter into the directory which is inside the other folder 
//but present at the same level

//****RUN CODE USING "node server/server.js" */
console.log(__dirname + '/../public');

//check the path module documentation from nodejs.org
const path =require('path')
const http =require('http');
const express =require('express');
const socketIO= require('socket.io')


const publicPath =path.join(__dirname, '../public')
// console.log(publicPath);
const port = process.env.PORT || 3000;
var app =express();
var server = http.createServer(app);
var io =socketIO(server);


app.use(express.static(publicPath));

//popular event...it help to listen for new connection
io.on('connection', (socket)=>{
    console.log('New user connected');

    //when the user leaves/disconnect the chat
    socket.on('disconnect',()=>{
        console.log('User was Disconnected');
    });
})


server.listen(port,()=>{
    console.log(`Server is up on ${port}`)
})