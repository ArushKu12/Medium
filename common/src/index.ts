import { z } from "zod";

export const SignUp = z.object({
    username:z.string(),
    password:z.string().min(6),
    name:z.string().optional()
  })

export const SignIn = z.object({
    username:z.string(),
    password:z.string().min(6)
})

export const createBlog = z.object({
    title:z.string(),
    content:z.string()
})

export const updateBlog = z.object({
    title:z.string(),
    content:z.string(),
    authorId:z.number()
})



export type SignUp = z.infer<typeof SignUp>
export type SignIn = z.infer<typeof SignIn>
export type createBlog = z.infer<typeof createBlog>
export type updateBlog = z.infer<typeof updateBlog>