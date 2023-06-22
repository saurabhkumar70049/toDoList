import mongoose from "mongoose";



const userTask = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    status: {
        type:String,
        default:false
    }
})


mongoose.model("Task", userTask);