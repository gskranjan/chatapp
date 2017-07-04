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


/*io.on('connection',(socket)=>{
    console.log('new user connected');
    
 
    
    socket.on('disconnect',()=>{
        console.log('disconnected');
    })
});
*/
io.on('connection',(socket)=>{
    
    console.log('new user connected');
    
    socket.emit('newMessage',{
        from:'ranjan',
        text:'hey',
        createdAt:123123
        
    });
    
    
    socket.on('createMessage',function(message){
        console.log(message);
    })
    
    socket.on('disconnect',()=>{
        
        console.log('client is disconnected');
    });
    
})


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
