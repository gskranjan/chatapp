

/*var socket=io();

socket.on('connect',function(){
    
    console.log('connected to server');
    
    socket.on('welcome',function(message){
        console.log(message);
    });
    
    socket.on('newUser',function(message){
        console.log(message);
    });
    
    socket.on('newMessage',function(message){
        console.log(message);
    });
        
});
  
socket.on('disconnect',function(){
    console.log('server is disconnected');
}
);
*/
var socket=io();

socket.on('connect',function(){
    console.log('connected to server');
    
    
    socket.on('newMessage',function(message){
        
        
        console.log(message);
       
        var formattedTime=moment(message.createdAt).format('h:mm a');
        
        
        
        var li=jQuery('<li></li>');
        
        li.text(message.from+' '+formattedTime+':'+message.text );
        
        jQuery('#messages').append(li);
        
    });
    
    
    
   /* socket.on('welcome',function(message){
        console.log(message);
        
        var h=jQuery('<h3></h3>');
        
        h.text(message.text);
        
        jQuery('#header').append(h);
    });
    */
   /* socket.on('newUser',function(message)
    {
        console.log(message);
        
        var newu=jQuery('<p></p>');
        
        newu.text(message.text);
        
        jQuery('#new').append(newu);
    });
    */
  
    
    
    jQuery('#message-form').on('submit',function(e){
        
        e.preventDefault();
        
        
        
        
        socket.emit('createMessage',{
            from:'User',
            text:jQuery('[name=message]').val()
            
        },function(){
            jQuery('[name=message]').val('');
        });
        
        
    });
    
    
    
    socket.on('newLocationMessage',function(message){
        
       var li=jQuery('<li></li>');
        var a=jQuery('<a target="_blank"> My current location </a>');
        
        var formattedTime=moment(message.createdAt).format('h:mm a');
        
        li.text(message.from+' '+formattedTime +':');
        
        a.attr('href',message.url);
        
        li.append(a);
        
        
        
        jQuery('#messages').append(li);
        
        
    });
    
    
    
    
    
    var locationButton=jQuery('#address');
    
    locationButton.on('click',function(){
        
        if(!navigator.geolocation){
            return alert('geolocation not supported by your browser');
        };
        
        locationButton.attr('disabled','disabled').text('Sending location ....');
        
        navigator.geolocation.getCurrentPosition(function(position){
            
            locationButton.removeAttr('disabled').text('Send location');
            
            socket.emit('createLocationMessage',{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            });
            
        },function(){
             locationButton.removeAttr('disabled').text('Send location');
            return alert('unable to fetch location');
        })
        
        
    });
    
});




socket.on('disconnect',function(){
    console.log('disconnected from server');
});
