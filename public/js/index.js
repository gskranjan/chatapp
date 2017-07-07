var socket=io();


socket.on('connect',function(){
    
    console.log('connected to server');
    
    socket.emit('joinIndex',{});
    
    
    
    
    socket.on('getRoomsList',function(names){
       
       console.log(names);
        
      //  var select=jQuery('<select name="select"></select');
        
        
        names.forEach((name)=>{
           
           // select.append(jQuery('<option value=name></option').text(name));
            
            var select=jQuery('#selectScript').html();
            var html=Mustache.render(select,{
                name:name
            });
            
            jQuery('#please').append(html);
            
        });
        
      //  jQuery('#selectfield').html(select);
        
    });
    
    
});



socket.on('disconnect',function(){
    console.log('server is disconnected');
})