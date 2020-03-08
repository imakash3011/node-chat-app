var moment =require('moment');

//Jan 1st 1970 00:00:00 am
// var date =new Date();
// var months =['Jan','Feb'];
// console.log(date.getMonth());

// var moment = new Date();
// var date = moment();
// console.log(date.format());

// new Date().getTime()

// var date = moment();
// console.log(date.format('h:mm a'))


var someTimestamp = moment().valueOf();
console.log(someTimestamp)

var createdAt =1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'))