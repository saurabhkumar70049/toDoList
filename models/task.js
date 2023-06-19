import mongoose from "mongoose";



const userTask = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description: {
        type:String,
        require:true
    },
    status: {
        type:String,
        require:true
    }
})


mongoose.model("Task", userTask);