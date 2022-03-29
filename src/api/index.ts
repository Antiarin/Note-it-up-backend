import { Response, Request } from "express";
import { Todo_interface } from "../interfaces/Todo.interface"
import Task_model from "../models/Task";

// get Task
const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const task: Todo_interface[] = await Task_model.find();
        res.status(200)
            .json({ todos:task });

    } catch (error) {
        res.send(500).json({message:"error getting all the tasks"})
    }
};

// Adding a task 
const addTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<Todo_interface, "name" | "description" | "status">;
        const task: Todo_interface = new Task_model({
            
            name: body.name,
            description: body.description,
            status: body.status,
        });
            await task.save();
        const allTask: Todo_interface[] = await Task_model.find();
        res
            .status(201)
            .json({ message: "Task added", todo: task, todos: allTask });
    } catch (error) {
        res.send(500).json({message:"error adding a task"});
    }
};

// updating a task
const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req;
        const updateTask: Todo_interface | null = await Task_model.findByIdAndUpdate(
            { _id: id },
            body
        );
        const allTask: Todo_interface[] = await Task_model.find();
        res.status(200)
            .json({
                message: "Task updated",
                todo: updateTask,
                todos: allTask,
            });
    } catch (error) {
        res.send(500).json({message:"error updating a task"})
    }
}

// deleting a task
const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTask: Todo_interface | null = await Task_model.findByIdAndRemove(
            req.params.id
        );
        const allTask: Todo_interface[] = await Task_model.find();
        res.status(200)
            .json({
                message: "Task deleted",
                todo: deletedTask,
                todos: allTask,
            });
    } catch (error) {
        res.send(500).json({message:"error deleting a task"})
    }
};
const getByStatus=async(req:Request, res:Response):Promise<void>=>{
    try {
        const status=req.params.status;
        console.log(status);
        let searchQuery:boolean;
        if (status=== "completed"){
            searchQuery=true;
        }else{
            searchQuery=false;
        }
        const tasks=await Task_model.find({status:searchQuery});
        console.log(tasks)
        res.status(200).json({
            message: "Task filtered",
            todos:tasks,
        })
    } catch (error) {
        res.send(500).json({message:"error sorting the tasks"})
    }
}

export { getTasks, addTask, updateTask, deleteTask,getByStatus };