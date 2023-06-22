import express from "express";
import mongoose from "mongoose";
const todoRouter = express.Router();
const task = mongoose.model('Task');



todoRouter.post('/todo', (req, res)=> {
    const {title} = req.body;
    // console.log(title, description, status);

    if(!title) {
        return res.status(400).json({sucess: false, message:"", error: "Title is required", data:[]});
    }


    let newTask = new task({
        title: title,
    })
    newTask.save()
    .then((saveTask) => {
        return res.status(200).json({massage:"Data is successfully saved in database", Data:saveTask});
    }).catch((err) => {
        return res.send({success:true, smassege:"Error occure", Error:err});
    });
})

todoRouter.get('/todo', (req, res)=> {
    task.find()
    .then((foundTask)=> {
        return res.send({success:true, massage:"All Task detaile", data: foundTask});
    })
    .catch(err=> {
        return res.send({massege:"error occure", Error:err});
    })
})

todoRouter.get('/todo/:id', (req, res)=> {
    const id = req.params.id;
    console.log(id);
    task.findOne({_id:id})
    .then((foundTask)=> {
        return res.send({massege:"Task is found", Task: foundTask});
    })
    .catch(err=> {
        return res.send({massege:"error occure", Error:err});
    }) 
})

todoRouter.patch('/todo/:id', (req, res)=> {
    const id = req.params.id;
    const {title, status} = req.body;
    task.updateOne({_id:id}, {$set:{title: title, status:status}})
    .then((taskFound)=> {
        return res.send({massege:"Task updated", Task: taskFound});
    })
    .catch(err=> {
        return res.send({massege:"error occure", Error:err});
    })
})

todoRouter.delete('/todo/:id', (req, res)=> {
    const id = req.params.id;
    task.deleteOne({_id:id})
    .then((deleteTask)=> {
        return res.json({massage:"deletion completed", data:deleteTask})
    })
    .catch(err=> {
        return res.send({massege:"error occure ", Error:err});
    })
})


export default todoRouter;