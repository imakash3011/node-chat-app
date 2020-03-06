//it will help to enter into the directory which is inside the other folder 
//but present at the same level

//****RUN CODE USING "node server/server.js" */
console.log(__dirname + '/../public');

//check the path module documentation from nodejs.org
const path =require('path')
const http =require('http');
const express =require('express');
const socketIO= require('socket.io')

//getting access to generate message
const {generateMessage} = require('./utils/message')


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

    //socket.emit from Admin text welcome to the chat app
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));


    // socket.broadcast.emit from Admin text new user joined
    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));



    //after writing this ...go and emit the call in index.js file
    //callback is being used to generate the acknowledgement
    socket.on('createMessage',(message , callback) => {
        console.log('createMessage', message);

        //io.emit will send message to all the user
        io.emit('newMessage',generateMessage(message.from , message.text));
        //we can also pass multiple argument inside the callback
        callback('This is from the server');


        //except sender everyone else will see the message
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text:message.text,
        //     createdAt : new Date().getTime()
        // });
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newMessage',generateMessage('Admin',`${coords.latitude},${coords.longitude}`))
    })

    //when the user leaves/disconnect the chat
    socket.on('disconnect',()=>{
        console.log('User was Disconnected');
    });
});

server.listen(port,()=>{
    console.log(`Server is up on ${port}`)
})