/* var socket=io();
        
    socket.on('connect',function(){
        console.log('connected to server');
        
        socket.emit('createEmail',{
    to:'bla@bla.com',
    text:'hi'
    
});
});

    
     socket.on('disconnect',function(){
        console.log('disconnected form server');
        });




socket.on('newEmail',function(email){
    
    console.log('new email',email);
        
});
*/

var socket=io();

socket.on('connect',function(){
    
    console.log('connected to server');
    
    socket.on('newMessage',function(message){
        console.log(message);
    });
    
    socket.emit('createMessage',{
        from:'anjan',
        text:'yaaa'
    });
    
    ;
});

socket.on('disconnect',function(){
    console.log('server is disconnected');
}
);