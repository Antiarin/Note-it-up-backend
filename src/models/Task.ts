import { Todo_interface } from "../interfaces/Todo.interface";
import { model, Schema } from 'mongoose';

const taskSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)

export default model<Todo_interface>("Todo", taskSchema)