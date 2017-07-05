const path = require('path');
const express = require('express');
const socketIO=require('socket.io');
const http=require('http');

var g=require('./functions.js');
generateMessage=g.generateMessage;


var p=require('./functions.js');
generateLocationMessage=p.generateLocationMessage;

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server=http.createServer(app);

var io=socketIO(server);

app.use(express.static(publicPath));



io.on('connection',(socket)=>{
    
    console.log('new user connected');
    
   /* socket.emit('welcome',generateMessage('admin','welcome to chat app by ranjan'));*/
    
    socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));
    
    socket.emit('newMessage',generateMessage('Admin','Welcome to The Chat App Neon'))
    

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
