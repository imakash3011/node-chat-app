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
const {generateMessage,generateLocationMessage} = require('./utils/message')

const {isRealString} = require('./utils/validation');

const {Users}=require('./utils/users');


const publicPath =path.join(__dirname, '../public')
// console.log(publicPath);
const port = process.env.PORT || 3000;
var app =express();
var server = http.createServer(app);
var io =socketIO(server);
var users =new Users();


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

    
    socket.on('join',(params,callback)=>{
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required. ');
        }

        // to join the room ..with the same string name
        socket.join(params.room);
        users.removeUser(socket.id)

        //adding a brand new User 
        users.addUser(socket.id, params.name ,params.room)
        //socket.leave('') ..to leave the chat room 

        //io.emit -> io.to('The Office Fans').emit  will send msg to everyone connected to 'The Office Fans'
        //socket.broadcast.emit -> io.to('The Office Fans').emit will send msg to everyone except the current user
        //socket.emit

        io.to(params.room).emit('updateUserList', users.getUserList(params.room)); 

        //socket.emit from Admin text welcome to the chat app
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));


        // socket.broadcast.emit from Admin text new user joined who joined the room
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));

        callback();
    });

    //after writing this ...go and emit the call in index.js file
    //callback is being used to generate the acknowledgement
    socket.on('createMessage',(message , callback) => {
        // console.log('createMessage', message);

        var user= users.getUser(socket.id)
        if(user && isRealString(message.text)){
            //io.emit will send message to all the user
        io.to(user.room).emit('newMessage',generateMessage(user.name , message.text));
        }

        //we can also pass multiple argument inside the callback
        callback();


        //except sender everyone else will see the message
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text:message.text,
        //     createdAt : new Date().getTime()
        // });
    });

    socket.on('createLocationMessage',(coords)=>{
        var user = users.getUser(socket.id);

        if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude ,coords.longitude));

        }
    })

    //when the user leaves/disconnect the chat
    socket.on('disconnect',()=>{
        // console.log('User was Disconnected');

        //removing the user and updating the list 
        var user =  users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin' , `${user.name} has left.`));
        }
    });
});

server.listen(port,()=>{
    console.log(`Server is up on ${port}`)
})