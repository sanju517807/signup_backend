const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model/userSchema')
const app = express();
const bcrypt = require('bcrypt')

mongoose.connect("mongodb+srv://sanju:sanju02@cluster0.r9qynmh.mongodb.net/sanjudb?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("mongo is connected");

})

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("hey there !")
})

app.post('/', async (req, res) => {
    try {

        const password = await req.body.password
        const hashedPassword= await bcrypt.hash(password,10)

        const userData = await User.create({ name: req.body.name, password:hashedPassword })
        console.log(userData.name);
        console.log(userData.password);
        if(userData){
         
       res.status(200).json({message:"the message is printing"})
       
        }
        else{
            res.status(404).json({message:"message not printing"})
        }
    } 
    catch (error) {
        console.error("error creating user", User.message);
    }});

//login
app.post('/login', async (req, res) =>{
    try{
        const userName = await req.body.name;
        const password = await req.body.password;
        
        const userData = await User.findOne({ name:userName })
        console.log(userData.name);
        console.log(userData.password);
        if(userData){
         
       res.status(200).json({message:"the message is printing"})
       
        }
        else{
            res.status(404).json({message:"message not printing"})
        }
    }    
    catch (error) {
        console.error("error creating user", User.message);
    }
}) 
    

app.listen(3000, () => {
    console.log("server is running ....")
})
