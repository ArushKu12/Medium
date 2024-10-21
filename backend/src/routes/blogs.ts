import { Hono } from "hono";
import {PrismaClient} from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlog,updateBlog } from "@arush_012/medium-common";
import { auth } from "hono/utils/basic-auth";
import { number, string } from "zod";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables: {
        userId:string
    }
}>()

blogRouter.use("/*",async (c,next) => {
    //extract userId and pass it down
    const token = c.req.header("Authorization") || "";
    try {
        const user = await verify(token,c.env.JWT_SECRET) as {id:string};

        if(user){
            c.set("userId",user.id);
           await next();
        }else{
            c.status(403)
            return c.json({
                message:"You are not logged in"
            })
    }
    } catch (error) {
        c.status(403);
        return c.json({
            message:"Invalid Token"
        })
    }
    
    
})

blogRouter.post('/', async (c) => {
    const body =await c.req.json();

    const {success} = createBlog.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({
        message:"Incorrect Username or Password"
      })
    }
    try {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
        const authorId = c.get("userId")
      
        const blog = await prisma.blog.create({
            data:{
                title:body.title,
                content:body.content,
                authorId: Number(authorId)
            }
        })

        return c.json({
            success:true,
            id:blog.id
      })
    } catch (error) {
        c.status(411)
        c.json({
            success:false,
            message:"Database Error"
        })
    }
    
})
     
    



blogRouter.put('/', async (c) => {
    const body =await c.req.json();

    const {success} = updateBlog.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({
        message:"Incorrect Username or Password"
      })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
      
        const blog = await prisma.blog.update({
            where:{
                id:body.id
            },
            data:{
                title:body.title,
                content:body.content,
               
            }
        })

        return c.json({
            success:true,
            id:blog.id
      })
  })

blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
      const blogs = await prisma.blog.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            date:true,
            author:{
                select:{
                    name:true
                }
            }
        }
      });
    
      return c.json({
        success:true,
        blogs:blogs
      })
  })

blogRouter.get("/personal", async (c) => {
    const authorId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany({
            where:{
                author:{
                    id:Number(authorId)
                }
            },
            select:{
                id:true,
                title:true,
                content:true,
                date:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })

        c.status(200)
        return c.json({
            success:true,
            blogs:blogs
        })
    } catch (error) {
        c.status(403)
        return c.json({
            success:false,
            message:"Author Id incorrect"
    })
    }
})

blogRouter.get('/:id',async (c) => {
    const id = c.req.param("id");


    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    try {
        const blog = await prisma.blog.findFirst({
            where:{
                id: Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                date:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
            
        })

        return c.json({
            success:true,
            blog:blog
      })
    } catch (error) {
        c.status(411)
        return c.json({
            message:"Error while fetching blog post"
        })
    }
    
  })

blogRouter.delete("/delete/:id",async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    try {
        const blogtoDelete = await prisma.blog.findFirst({
            where:{
                id: Number(id),
                authorId:Number(c.get('userId'))
            }
        })

        if(blogtoDelete){
            const deletedBlog = await prisma.blog.delete({
                where:{
                    id: blogtoDelete.id
                }
            })
        }else{
            c.status(411)
            return c.json({
                success:false,
                message:"Blog Not found in DataBase"
            })
        }

        c.status(200)
        return c.json({
            success:true,
            message:"Blog Successfully Deleted"
        })
    } catch (error) {
        c.status(403)
        return c.json({
            success:false,
            message:"Unable to delete Blog"
        })
    }

})
//Todo: add pagination
