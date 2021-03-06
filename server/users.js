/*class Person{
    
    constructor(name,age){
        
        this.name=name;
        this.age=age;
    }
    returnvalues(){
        
        return this.name+' with age  '+this.age;
    }
    
}

var me=new Person('ranjan',19);

console.log(me.returnvalues());
*/






class Users{
    
    constructor(){
        this.users=[];
        this.adminUsers=[];
    }
    
    addUser(id,name,room){
      var user= {
                 id:id,
                 name:name,
                 room:room
            
      };
      
      this.users.push(user);    
      return user;
             };
    
    removeUser(id){
        
      var user=this.getUser(id);
        if(user){
            this.users=this.users.filter((user)=>{
                return user.id!=id;
            });
        };
        return user;
    };
    
    getUser(id){
     var user=this.users.filter((user)=>{
         return user.id==id;
     });   
     return user[0];
    };
    
    getUserList(room){
        
        var user=this.users.filter((user)=>{
            return user.room==room;
        });
        
        var names=user.map((user)=>{
           return user.name; 
        });
        
        return names;
    }
    
    
    getRoomList(){
        
        var rooms =this.users.map((user)=>{
            return user.room;
        });
        

        
        
        var unique = rooms.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
           });
        
        return unique;
    }
    
    isValid(room,password){
        
        var user=this.users.filter(function(user){
            
            return user.password==password;
            
        });
        
        if(user){
            
            return true;
        }
        else{
            return false;
        }
        
    }
    
};

module.exports.Users=Users;