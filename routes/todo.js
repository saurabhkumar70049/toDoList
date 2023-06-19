import express from "express";
import mongoose from "mongoose";
const todoRouter = express.Router();
const task = mongoose.model('Task');



todoRouter.post('/todo', (req, res)=> {
    const {title, description, status} = req.body;
    // console.log(title, description, status);

    if(!title || !description || !status) {
        return res.send("Please fill all require data");
    }


    let newTask = new task({
        title: title,
        description: description,
        status:status
    })
    newTask.save()
    .then((saveTask) => {
        return res.send({massage:"Data is successfully saved in database", Data:saveTask});
    }).catch((err) => {
        return res.send({massege:"Error occure", Error:err});
    });
})

todoRouter.get('/todo', (req, res)=> {
    task.find()
    .then((foundTask)=> {
        return res.send({massage:"Task detaile", Task: foundTask});
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

todoRouter.put('/todo/:id', (req, res)=> {
    const id = req.params.id;
    const {title, description, status} = req.body;
    task.updateOne({_id:id}, {$set:{title: title, description: description, status:status}})
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
        return res.send({massage:"deletion completed", Task:deleteTask})
    })
    .catch(err=> {
        return res.send({massege:"error occure ", Error:err});
    })
})


export default todoRouter;