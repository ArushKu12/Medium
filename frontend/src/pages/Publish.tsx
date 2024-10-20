import { ChangeEvent, useState } from "react";
import { AppBar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createBlog } from "@arush_012/medium-common";

export const Publish = () => {
  const[blog,setBlog] = useState<createBlog>({
    title:"",
    content:""
  });
    const navigate = useNavigate()


    function handleInputChange (e : ChangeEvent<HTMLTextAreaElement> ) {
        const {name,value} = e.target;
        setBlog({...blog,[name] : value})

    }
  async function publishBlog () {
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{title:blog.title,content:blog.content},{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        }
               
        )
        if(response.data.success){
         toast.success("Blog Published")
         navigate('/blogs')   
        }
    } catch (error) {
        toast.error("Failed to publish Blog, Try again")
    }
  }

  return (
    <div>
      <AppBar />
      <div className="flex flex-col items-center pt-4">
        <textarea
        name='title'
          className="w-screen max-w-screen-xl block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Write your title of the blog here..."
          onChange={handleInputChange}
        ></textarea>

        <TextArea
          onChange={handleInputChange}
          value={blog.content}
        />

        <div className="flex justify-start w-full max-w-screen-xl">
          <button
            type="submit"
            className="py-2.5 px-4 text-xs font-medium  text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            onClick={publishBlog}
          >
            Publish Blog
          </button>
        </div>
        <div className=" w-full max-w-screen-xl pt-3">
          <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
            Remember, contributions to this topic should follow our{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Community Guidelines
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

function TextArea({
  onChange,
  value
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  value:string
}) {
  return (
    <div>
      <div className="w-screen max-w-screen-xl mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-4">
          <textarea
            name="content"
            className="w-full px-3 text-sm text-gray-900 bg-white border-0 h-40  py-1 text-xl focus:ring-0 "
            placeholder="Write your Blog..."
            onChange={onChange}
            value={value}
            required
          ></textarea>
        
      </div>
    </div>
  );
}
