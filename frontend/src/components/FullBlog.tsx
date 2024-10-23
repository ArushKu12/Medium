import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog} : {blog : Blog}) => {

    const date = blog.date ? blog.date.split("T")[0] : "Unknown Date"
  const time = blog.date ? blog.date.split("T")[1].split('.')[0] : ""

    return <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 max-w-screen-xl border-b-2">
    <div className="col-span-8 py-4 ">
        <div className="text-5xl font-bold">
        {blog.title}

        </div>
        <div className="font-medium text-gray-500 pt-4 pb-5">
            Posted on {`${date} ${time}`}
        </div>
       
        <div dangerouslySetInnerHTML={{ __html: blog?.content }} className="text-gray-700 text-lg">
            
        </div>
    </div>
    <div className="col-span-4 ">
        <div className="font-semibold pt-4 pl-4">
            Author
        </div>
        <div className="flex pl-3 pt-6 text-xl font-semibold">
            <Avatar name={blog.author.name} />
            <div className="flex items-center pl-2">
                {blog.author.name}
            </div>
            
        </div>
        <div className="pl-3 pt-3 text-gray-500">
                Random Catch phrase of user to attract user's attention and grab audience.
        </div>
    </div>
</div>
    </div>
    
}