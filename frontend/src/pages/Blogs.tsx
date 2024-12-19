import { AppBar } from "../components/AppBar";
import { BlogCard} from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Blogs = () => {
    const {loading,blogs} = useBlogs()
    const [name,setName] = useState('')

    useEffect(() => {
      (async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/blog/profile`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        });

          if(response.data.success){
            setName(response.data.name)
          }
        } catch (error) {
          console.log(error)
        }
      })()
    },[])

    if(loading){
        return <div>
          <AppBar name={name}/>
          <div className="flex flex-col justify-center items-center h-screen w-screen max-w-screen-xl pt-[23rem]">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            
        </div>
        </div>
        
        
    }
    if(blogs.length == 0){
      return <div>
        <AppBar name = {name}/>
        <div className="flex justify-center items-center w-screen h-[80vh] text-3xl font-semibold">
        No Blogs Published, You can be the first
      </div>
      </div>
      
    }
  return (
    <div>
      
    <AppBar name={name}/>
      <div className="flex justify-center">
        <div className=" max-w-xl w-full">
          {blogs.map((blog) =>
          <BlogCard id={String(blog.id)} key={String(blog.id)} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate={blog.date}/> 
        )}
          

        </div>
      </div>
    </div>
  );
};
