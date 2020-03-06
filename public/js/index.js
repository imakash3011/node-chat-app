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

        //socket.on is used to listen
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

        socket.on('newLocationMessage',function(message){
            var li = jQuery('<li></li>')
            //here we are creating an anchor tag or say link for geolocation
            //target="_blank" will open the anchor tag in new tab not in  the same
            var a = jQuery('<a target="_blank"> My Current Location </a>')

            //sender name
            li.text(`${message.from}: `);
            //updating anchor tag...(read about attr)
            a.attr('href', message.url);
            li.append(a);
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

        //Adding the Geolocation property in chat app
        var locationButton =jQuery('#send-location');
        locationButton.on('click', function(){
            //firstly cheacking the access of geolocation API
            if(!navigator.geolocation){
                return alert('Geolocation not supported by your browser.')
            }

            //if geolocation work then perform the following function
            navigator.geolocation.getCurrentPosition(function (position){
                // console.log(position);
                socket.emit('createLocationMessage',{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });

            },function(){
                alert('Unable to fetch location.')
            }); 
        });