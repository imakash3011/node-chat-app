//it will help to enter into the directory which is inside the other folder 
//but present at the same level

//****RUN CODE USING "node server/server.js" */
console.log(__dirname + '/../public');

//check the path module documentation from nodejs.org
const path =require('path')
const express =require('express');


const publicPath =path.join(__dirname, '../public')
// console.log(publicPath);
var app =express();


app.use(express.static(publicPath));

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})