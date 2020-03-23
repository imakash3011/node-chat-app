        //it means that we are making the request from client to the server 
        var socket=io();

        //autoscrolling on receiving msg
        function scrollToBottom(){
            //selectors
            var messages =jQuery('#messages');
            var newMessage = messages.children('li:last-child');
            //height
            var clientHeight =messages.prop('clientHeight');
            var scrollTop =messages.prop('scrollTop');
            var scrollHeight =messages.prop('scrollHeight');
            var newMessageHeight = newMessage.innerHeight();
            var lastMessageHeight = newMessage.prev().innerHeight();

            if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
                // console.log('should scroll');
                messages.scrollTop(scrollHeight);
            }

        }

        //to listen an event
        //we have removed arrow function because it will crash in the mobile phones if opened
        socket.on('connect',function () {
            // console.log('Connected to Server');
            //deparam in the same way as we do in the console to get the result in a formatted way 
            var params = jQuery.deparam(window.location.search)

            socket.emit('join',params,function(err){
                if(err){
                    alert(err);
                    window.location.href = '/';
                }else{
                    console.log('No error')
                }

            });
            // socket.emit('createMessage',{
            //     from:'Andrew',
            //     text:'Yup , that works for me.'
            // });
        });

        //socket.on is used to listen
        socket.on('disconnect',function () {
            console.log('Disconnected from  Server');
        });

        //we are updating the users list each time the new user get connected
        socket.on('updateUserList',function (users) {
            // console.log('Users list',users);

            var ol = jQuery('<ol></ol>');

            users.forEach(function (user){
                ol.append(jQuery('<li></li>').text(user));
            });

            jQuery('#users').html(ol);
        });


        //listen to new event
        //it will be emitted by the server and will be listen by the client
        socket.on('newMessage',function (message) {
            var formattedTime =moment(message.createdAt).format('h:mm a');
            //implementing mustache.js rendering method
            var template =jQuery('#message-template').html();
            var html =Mustache.render(template,{
                text:message.text,
                from:message.from,
                createdAt:formattedTime
            });

            jQuery('#messages').append(html);
            //scroll the msg box to bottom on receiving the msg
            scrollToBottom();
            // console.log('NewMessage',message);
            

            //appending the messages in li
            // var li =jQuery('<li></li>');
            //template string
            // li.text(`${message.from} ${formattedTime}:${message.text}`);

            // jQuery('#messages').append(li); 
        });

        socket.on('newLocationMessage',function(message){
            var formattedTime =moment(message.createdAt).format('h:mm a');
            var template =jQuery('#location-message-template').html();
            var html =Mustache.render(template,{
                from:message.from,
                url:message.url,
                createdAt:formattedTime
            });
            jQuery('#messages').append(html);
            //scroll the msg box to bottom on receiving the msg
            scrollToBottom();
            
            // var li = jQuery('<li></li>')
            //here we are creating an anchor tag or say link for geolocation
            //target="_blank" will open the anchor tag in new tab not in  the same
            // var a = jQuery('<a target="_blank"> My Current Location </a>')

            //sender name
            // li.text(`${message.from} ${formattedTime}: `);
            //updating anchor tag...(read about attr)
            // a.attr('href', message.url);
            // li.append(a);
            // jQuery('#messages').append(li);
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

            var messageTextbox = jQuery('[name=message]');

            //we are overwriting the default behaviour so we have to emit the following msg

            socket.emit('createMessage',{
                // from: 'User',
                text: messageTextbox.val()
            },function(){
                //clearing the text once it is send successfully
                //setting val('') empty ..which means after sendinf msg it will be empty
                messageTextbox.val('')
            });
        });

        //Adding the Geolocation property in chat app
        var locationButton =jQuery('#send-location');
        locationButton.on('click', function(){
            //firstly cheacking the access of geolocation API
            if(!navigator.geolocation){
                return alert('Geolocation not supported by your browser.')
            }

            //disabling the location button if not supported in browser or already sending the location
            locationButton.attr('disabled','disabled').text('Sending location...');

            //if geolocation work then perform the following function
            navigator.geolocation.getCurrentPosition(function (position){
                // console.log(position);
                //now again we are enabling the location button that we disabled in above code
                //we will write this code in both the part i.e success and the error
                locationButton.removeAttr('disabled').text('Send location');
                socket.emit('createLocationMessage',{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });

            },function(){
                locationButton.removeAttr('disabled').text('Send location');
                alert('Unable to fetch location.')
            }); 
        });



        //note
        //include the library links.mead.io/deparam
        //it helps to in search query
        //param take the object and return string
        //deparam take the string and return object