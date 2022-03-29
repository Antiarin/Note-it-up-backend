import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/Task_routes';
import 'dotenv/config' 

const app: Express = express();
const PORT: string | number = process.env.PORT || 4000


app.use(cors());
app.use(express.json());
app.use(router);

const uri:string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.fknes.mongodb.net/test`;
mongoose.connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        console.log(error);
    })