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

            //appending the messages in li
            var li =jQuery('<li></li>');
            //template string
            li.text(`${message.from}:${message.text}`);

            jQuery('#messages').append(li); 
        });

        //adding an acknowledgement
        // socket.emit('createMessage',{
        //     from: 'Frank',
        //     text: 'Hi'
        // },function(data){
        //     console.log('Got it',data)
        // })

        jQuery('#message-form').on('submit',function(e){
            //by default the page gets freshed...now we will prevent such thing
            e.preventDefault();

            //we are overwriting the default behaviour so we have to emit the following msg

            socket.emit('createMessage',{
                from: 'User',
                text: jQuery('[name=message]').val()
            },function(){

            });
        });