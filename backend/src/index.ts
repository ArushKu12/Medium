import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blogs'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

app.use("/*", cors({
  origin:["http://localhost:5173","https://medium-arush.vercel.app","*"]
}))

app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)




export default app

//
//DATABASE_URL=""