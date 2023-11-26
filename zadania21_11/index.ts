import express from 'express';
import userRouter from './routes/user.routes';
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 2);
app.use(express.static('public'));

app.use("/users", userRouter);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

