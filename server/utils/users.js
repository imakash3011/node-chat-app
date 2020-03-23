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
    removeUser(id){
        // var user =this.users.filter((user)=> user.id === id)[0]
        var user = this.getUser(id);

        if(user){
            this.users = this.users.filter((user)=> user.id !== id)
        }
        return user;
        // return user that was removed

    }
    getUser(id){
        //return the user by filtering method if its ID is equal to id in argument 
        //there will be maximum 1 user of same id and we want to get first element in the array ...[0]
        return this.users.filter((user)=> user.id === id)[0]

    }
    getUserList(room){
        var users =this.users.filter((user)=> user.room ===room);
        var namesArray =users.map((user)=> user.name);

        return namesArray;
        
    }
}

module.exports = {Users};