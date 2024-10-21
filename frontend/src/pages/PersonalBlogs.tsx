import { AppBar } from "../components/AppBar";
import { BlogCard, personal } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { usePersonalBlogs } from "../hooks";

export const PersonalBlogs = () => {

    const {loading,blogs} = usePersonalBlogs()

    if(loading){
        return <div className="">
          <AppBar  />
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
        <AppBar />
        <div className="flex justify-center items-center w-screen h-[80vh] text-3xl font-semibold">
        No Blogs Published, You can be the first
      </div>
      </div>
      
    }
  return (
    <div>
      
    <AppBar />
      <div className="flex justify-center">
        <div className=" max-w-xl w-full">
          {blogs.map((blog) =>
          <BlogCard id={String(blog.id)} key={String(blog.id)} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate={blog.date} profile={personal.Yes}/> 
        )}
          

        </div>
      </div>
    </div>
  );
}