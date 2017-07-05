const path = require('path');
const express = require('express');
const socketIO=require('socket.io');
const http=require('http');

var g=require('./functions.js');
generateMessage=g.generateMessage;


var p=require('./functions.js');
generateLocationMessage=p.generateLocationMessage;

var q=require('./functions.js');
validator=q.validator;
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server=http.createServer(app);

var io=socketIO(server);

app.use(express.static(publicPath));



io.on('connection',(socket)=>{
    
    console.log('new user connected');
    
   /* socket.emit('welcome',generateMessage('admin','welcome to chat app by ranjan'));*/
    
   
    
    socket.on('join',(params,callback)=>{
        
      
        
        //getting an error if we use ? here
        if(!validator(params.room)||!validator(params.name)){
                callback('name and room are required');      
                      };
        
        socket.join(params.room);
        
         socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',params.name+'  joined'));
    
    socket.emit('newMessage',generateMessage('Admin','Welcome to The Chat App Neon'));
        
        
        
        callback();
        
    })
    

    socket.on('createLocationMessage',(message)=>{
        
        io.emit('newLocationMessage',generateLocationMessage('Admin',message.latitude,message.longitude));
        
    });
    
    
    
    
    socket.on('createMessage',function(message,callback){
     
        
        io.emit('newMessage',generateMessage(message.from,message.text));
        
        callback();
        
      /*  socket.broadcast.emit('newMessage',{
            
            from:message.from,
           text:message.text,
           createdAt:new Date().getTime()
        });
   
   
   */


    });
    
    socket.on('disconnect',()=>{
        
        console.log('client is disconnected');
    });
    
})


    

    
 
    
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
