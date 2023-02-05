const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const projectSchema = new Schema ({
    projectId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    projectName:{
        type: String,
        required: true,
    },
    projectDescription:{
        type: String,
        required: true,
        
    },
    projectStatus:{
        type:String,
        required:true,
        
    }

})

module.exports = mongoose.model('Projects' , projectSchema)


