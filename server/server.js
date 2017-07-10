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

var u=require('./users.js');
Users=u.Users;


var users=new Users();



const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server=http.createServer(app);

var io=socketIO(server);

app.use(express.static(publicPath));



io.on('connection',(socket)=>{
    
    
    
   /* socket.emit('welcome',generateMessage('admin','welcome to chat app by ranjan'));*/
    
    
  
    
    
    
   
    
    socket.on('join',(params,callback)=>{
        
        
        
        
        
          socket.emit('newMessage',generateMessage('Admin','Welcome to The Chat App Neon'));
 
        if(!validator(params.room)||!validator(params.name)){
              return  callback('name and room are required');      
        };
        
        
        

        
        socket.join(params.room);
        
        users.removeUser(socket.id);
        
        users.addUser(socket.id,params.name,params.room,params.password);
        
        //  socket.emit('getRoomsList',users.getRoomList());

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',params.name+'  joined'));
    
         //  console.log(users.getRoomList());
         
        callback();
        
    });
    
      socket.on('joinIndex',function(e){
        
        socket.emit('getRoomsList',users.getRoomList());
        
    });
    
    
    

    socket.on('createLocationMessage',(message)=>{
        
        
        var user=users.getUser(socket.id);
        
        if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,message.latitude,message.longitude));
        }
    });
    
    
    
    
    socket.on('createMessage',function(message,callback){
     
        var user=users.getUser(socket.id);
        
        
        
        if(user && validator(message.text)){
        
        io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        
        
        callback();
        
      /*  socket.broadcast.emit('newMessage',{
            
            from:message.from,
           text:message.text,
           createdAt:new Date().getTime()
        });
   
   
   */


    });
    
    socket.on('disconnect',()=>{
        
       var user=users.removeUser(socket.id);
        
        if(user){
            
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',user.name+' has left.'))
        }
        
       
    });
    
})


    

    
 
    
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
