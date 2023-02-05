const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const projectSchema = new Schema ({
    taskId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Projects'
    },
    
    taskName:{
        type: String,
        required: true,
    },
    taskDescription:{
        type: String,
        required: true,
        
    },
    taskStatus:{
        type:String,
        required:true,
        
    }

})

module.exports = mongoose.model('task' , projectSchema)


