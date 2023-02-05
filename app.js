const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose')
const userRoutes = require('./Routes/user')
const forgetRoutes = require('./Routes/forgetpass')
const projectRoutes = require('./Routes/projects')

const User = require('./models/user');
const forgetPassword = require('./models/forgetPas')
const Projects = require('./models/Projects')
const Tasks = require('./models/task')

const app = express();
const cors = require('cors')


app.use(cors());
app.use(bodyParser.json({extended:true}))
const fs = require('fs');
const path = require('path');
// require('dotenv').config()
app.use(userRoutes)
app.use('/password',forgetRoutes)
app.use(projectRoutes)

// app.use(express.json())
// app.use(bodyParser.json({extended:false}))



mongoose.connect('mongodb+srv://Skhan:ameensab@cluster0.hhc4rdx.mongodb.net/projects?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000 , (req,res)=>{
        console.log('Connected')
    })
})