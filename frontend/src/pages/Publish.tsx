import { ChangeEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { AppBar } from "../components/AppBar";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export const Publish = () => {
    const [loading,setLoading] = useState(false)
  const[title,setTitle] = useState("");
  const [ content,setContent] = useState("")
    const navigate = useNavigate()

    const modules = {
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['link', 'image'],                    // add link and image options
          [{ 'align': [] }],                      // text alignment
          ['clean']       
          
        ],
        
      }
    };



    
  async function publishBlog () {
    setLoading(true)
    if(content.length == 0 || title.length == 0){
        setLoading(false)
        toast.error("Cannot publish Empty Blogs")
    }
    else{
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{title:title,content:content},{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            }
                   
            )
            if(response.data.success){
             toast.success("Blog Published")
             navigate('/blogs') 
             setLoading(false)  
            }
        } catch (error) {
            setLoading(false)
            toast.error("Failed to publish Blog, Try again")
        }
    }
    
  }

  if(loading){
    return  <div>
    <AppBar />
    <div className="flex flex-col justify-center items-center h-[80vh] w-screen ">
    <div className="font-semibold">
        Publishing...
    </div>
      <Spinner />
      
  </div>
  </div>
  }

  return (
    <div>
      <AppBar/>
      <div className="flex flex-col items-center pt-4">
        <textarea
        name='title'
          className="w-screen max-w-screen-xl block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Write your title of the blog here..."
          onChange={(e) => {setTitle(e.target.value)}}
        ></textarea>
        <div className="max-w-screen-xl w-full pt-[1.5vw]">
        <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Write your blog here..."
        className="w-full"
        
      />
          </div>

        

        <div className="flex justify-start w-full max-w-screen-xl pt-[1vw]">
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
