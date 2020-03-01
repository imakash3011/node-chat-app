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

    //here we are creating a new event 
    // socket.emit('newMessage',{
    //     from:'John',
    //     text:'See you then',
    //     createdAt : 123123
    // })

    //creating the custom event
    // socket.on('createEmail',(newEmail) => {
    //     console.log('createEmail', newEmail);

    // });

    //after writing this ...go and emit the call in index.js file
    socket.on('createMessage',(message) => {
        console.log('createMessage', message);

        //io.emit will send message to all the user
        io.emit('newMessage',{
            from: message.from,
            text:message.text,
            createdAt : new Date().getTime()
        });
    });

    //when the user leaves/disconnect the chat
    socket.on('disconnect',()=>{
        console.log('User was Disconnected');
    });
});

server.listen(port,()=>{
    console.log(`Server is up on ${port}`)
})