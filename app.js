import express from "express";
import mongoose from "mongoose";
import "./models/task.js";
import todoRouter from "./routes/todo.js";
const app = express();
const PORT = 8000;


//connect to dataBase
mongoose.connect('mongodb://localhost:27017/todoTask'); // "/todoTask" is name of database and if you not specify it, node will allocate test database by default 
mongoose.connection.on('connected', ()=> {
    console.log('server is connected to database');
})
mongoose.connection.on('error', ()=> {
    console.log("Connection not stablised ");
})


app.use(express.json());
app.use('/api', todoRouter);

app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`);
})
