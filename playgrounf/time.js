var moment=require('moment');

var date=moment();

console.log(date.format('h:mm a'));

console.log(date.subtract(3 ,'hours').format('h:mm a'));