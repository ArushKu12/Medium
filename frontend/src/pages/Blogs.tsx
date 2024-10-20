import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const {loading,blogs} = useBlogs()

    if(loading){
        return <div className="flex justify-center items-center h-screen w-screen">
            Loading ...
        </div>
    }
  return (
    <div>
      <AppBar />

      <div className="flex justify-center">
        <div className=" max-w-xl">
          {blogs.map((blog) =>
          <BlogCard id={String(blog.id)} key={String(blog.id)} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate="22 Feb 2024"/> 
        )}
          

        </div>
      </div>
    </div>
  );
};
