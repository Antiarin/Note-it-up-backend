import { Document } from 'mongoose';
export interface Todo_interface extends Document {
    name: string,
    description: string,
    status: boolean,
}