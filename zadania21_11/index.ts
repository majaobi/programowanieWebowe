import express from 'express'
import userRouter from './routes/user.routes'
import profileRouter from './routes/profile.routes'
import postRouter from './routes/post.routes'
import CommentRouter from './routes/comment.routes'
import TagsRouter from './routes/tags.routes'
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('json spaces', 2)
app.use(express.static('public'))

app.use("/users", userRouter)
app.use("/profile", profileRouter)
app.use("/post", postRouter)
app.use("/comments", CommentRouter)
app.use("/tags", TagsRouter)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
});

