import { Router } from "express";
import { getTasks, addTask, updateTask, deleteTask, getByStatus } from '../controllers/TodoMethods'

const router: Router = Router();
router.get("/", (req, res) => {
    res.send("alive");
})
router.get("/tasks/:status", getByStatus);
router.get("/tasks", getTasks);
router.post("/add-task", addTask);
router.put("/edit-task/:id", updateTask);
router.delete("/delete-task/:id", deleteTask);

export default router