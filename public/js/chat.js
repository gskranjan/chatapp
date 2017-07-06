

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

function scrollToBottom () {
  
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect',function(){
    console.log('connected to server');
    
    socket.on('updateUserList',function(users){
       var ol=jQuery('<li></li>');
        
        users.forEach(function(user){
            
            ol.append(jQuery('<li></li>').text(user));
        });
        
        jQuery('#users').html(ol);
    });


var params=jQuery.deparam(window.location.search);
socket.emit('join',params,function(err){
    
    if(err){
        alert(err);
        window.location.href='/';
    }else{
        console.log('perfect!');
        
    }
    
});
    
    socket.on('newMessage',function(message){
        
         
        var formattedTime=moment(message.createdAt).format('h:mm a');
        
        var template=jQuery('#message-template').html();
        var html=Mustache.render(template,{
            text:message.text,
            from:message.from,
            createdAt:formattedTime
            
        });
        
        jQuery('#messages').append(html);
        
      scrollToBottom();
      
        
      //    var li=jQuery('<li></li>');
        
    //    li.text(message.from+' '+formattedTime+':'+message.text );
        
      //  jQuery('#messages').append(li);
        
    });
    
    
  
  
    
    
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
        
        
          var formattedTime=moment(message.createdAt).format('h:mm a');
        
        var template=jQuery('#location-message').html();
        
        var html=Mustache.render(template,{
            
            url:message.url,
            from:message.from,
            createdAt:formattedTime
        });
        
        jQuery('#messages').append(html);
        
        
        
      /* var li=jQuery('<li></li>');
        var a=jQuery('<a target="_blank"> My current location </a>');
        
      
        
        li.text(message.from+' '+formattedTime +':');
        
        a.attr('href',message.url);
        
        li.append(a);
        
        
        
        jQuery('#messages').append(li);
        */
        
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
            
            return alert('unable to fetch location');
        })
        
        
    });
    
});




socket.on('disconnect',function(){
    console.log('disconnected from server');
});
