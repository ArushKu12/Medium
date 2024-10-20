import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const {loading,blogs} = useBlogs()

    if(loading){
        return <div>
          <AppBar />
          <div className="flex flex-col justify-center items-center h-screen w-screen max-w-screen-xl">
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
          <BlogCard id={String(blog.id)} key={String(blog.id)} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate="22 Feb 2024"/> 
        )}
          

        </div>
      </div>
    </div>
  );
};
