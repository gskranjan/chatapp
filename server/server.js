const path = require('path');
const express = require('express');
const socketIO=require('socket.io');
const http=require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server=http.createServer(app);

var io=socketIO(server);

app.use(express.static(publicPath));



io.on('connection',(socket)=>{
    
    console.log('new user connected');
    
    socket.emit('welcome',{
        from:'admin',
        text:'welcome to chat app',
        createdAt:new Date().getTime()
    });
    
    socket.broadcast.emit('newUser',{
         from:'admin',
        text:'new user joined',
        createdAt:new Date().getTime()
    });

    
    
    socket.on('createMessage',function(message){
     
        
        io.emit('newMessage',{
            from:message.from,
         text:message.text,
        createdAt:new Date().getTime()
      });
        
        
      /*  socket.broadcast.emit('newMessage',{
            
            from:message.from,
           text:message.text,
           createdAt:new Date().getTime()
        });
        */
    })
    
    socket.on('disconnect',()=>{
        
        console.log('client is disconnected');
    });
    
})


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
