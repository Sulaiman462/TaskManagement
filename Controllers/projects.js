const User = require('../models/user')
const Projects = require('../models/Projects')
const Tasks = require('../models/task')
const mongodb = require('mongodb');


exports.getProjects = (req,res,next)=>{
    let {projectName , projectDes, projectStatus} = req.body
    console.log(req.user._id,"<<>><><><>")
    
    try {

    Projects.find({projectId:req.user._id})
    .then((response)=>{
        console.log(response,"??????????")
        return res.status(200).json({response})
    })
    .catch((err)=>{
        res.status(500).json({err})
    })   
    
} catch (err) {
    console.log(err)
    res.status(500).json({error:err})
}



}

exports.postProjects = async (req,res,next)=>{
    try {
        let {projectName , projectDes, projectStatus} = req.body
        
        const data= await Projects.create({
            projectId:req.user._id,
            projectName :projectName,
            projectDescription:projectDes,
            projectStatus:projectStatus
        })

        res.status(201).json({NewProject:data})

    } catch (err) {
        console.log(err)
        res.status(500).json({error:err})

    }
    
}


exports.getTasks = async(req,res,next)=>{
        let Id = req.params
        const objectId = new mongodb.ObjectId(Id);

        console.log(Id,">>>>>>>>>>>>>>>")
        try {

            Tasks.find({taskId:objectId})
            // Tasks.find()
             .then((response)=>{
           return res.status(200).json({response})
             })

        .catch((err)=>{
         res.status(500).json({err})
         console.log(err)
            })   
            
        } catch (err) {
            console.log(err)
            res.status(500).json({error:err})
    
        }
}

exports.postTask = async(req,res,next)=>{
    try {
        let {Id ,name , des, status} = req.body
        
        const data= await Tasks.create({
            taskId:Id,
            taskName :name,
            taskDescription:des,
            taskStatus:status
        })

        res.status(201).json({NewProject:data})

    } catch (err) {
        console.log(err)
        res.status(500).json({error:err})

    }
}