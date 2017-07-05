var moment=require('moment');


var generateMessage=(from,text)=>{
    
    return{
        from,
        text,
        createdAt:moment().valueOf()
    }
};

var generateLocationMessage=(from,latitude,longitude)=>{
    
    return{
        from:from,
        url:'https://www.google.com/maps?q='+latitude+','+longitude,
        createdAt:moment().valueOf()
    }
};

var validator=(str)=>{
    
    return typeof(str)=='string'&& str.trim().length>0;
}

module.exports.validator=validator;

module.exports.generateLocationMessage=generateLocationMessage;

module.exports.generateMessage=generateMessage;