        //it means that we are making the request from client to the server 
        var socket=io();

        //to listen an event
        //we have removed arrow function because it will crash in the mobile phones if opened
        socket.on('connect',function () {
            console.log('Connected to Server');

            // socket.emit('createMessage',{
            //     from:'Andrew',
            //     text:'Yup , that works for me.'
            // });
        });

        socket.on('disconnect',function () {
            console.log('Disconnected from  Server');
        });

        //listen to new event
        //it will be emitted by the server and will be listen by the client
        socket.on('newMessage',function (message) {
            console.log('NewMessage',message);
        });