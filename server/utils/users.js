[{
    id:'/#234asdfdgfsda',
    name:'Akash',
    room: 'The Office Fans'
}]


//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(room)

//Method 1
// var users = [];
// var addUser = (id,name,room)=>{
//     users.push({})
// }
// modules.export = {addUser}

// to run "node server/utils/user.js"
// class Person{
//     constructor(name,age){
//         // console.log(name,age)
//         this.name =name;
//         this.age =age;

//     }
//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old. `;
//     }

// }
// var me =new Person('akash',21);
// console.log('this.name',me.name)
// console.log('this.age',me.age)
// var description = me.getUserDescription();
// console.log(description);


class Users{
    constructor(){
        this.users=[];
    }
    addUser(id,name,room){
        var user={id,name,room};
        this.users.push(user);
        return user;
    }
}

module.exports = {Users};