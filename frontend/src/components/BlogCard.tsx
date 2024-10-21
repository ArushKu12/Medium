import { Link} from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { useState } from "react";


interface BlogCardProps {
  id:string,
  authorName: string;
  title: string;
  content: string;
  publishedDate: string,
  profile?:personal
}

export enum personal {
  "Yes",
  "No"
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
  profile=personal.No
}: BlogCardProps) => {
  const [deleted,setDeleted] = useState(false);
  const date = publishedDate ? publishedDate.split("T")[0] : "Unknown Date"
  const time = publishedDate ? publishedDate.split("T")[1].split('.')[0] : "";
 
  
  
  async function deleteHandler() {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`,{
        headers:{
          Authorization : localStorage.getItem('token')
        }
      })
      if(response.data.success){
        toast.success("Blog Successfully Deleted")
        setDeleted(true)
        
      }
    } catch (error) {
      toast.error("Process Failed, Try again after Sometime")
    }
  }

  if(deleted){
    return null;
  }
  return (
    
    <div className="border-b py-4">
      <div className="flex justify-between items-center">
        <div className="flex">
        <div>
          <Avatar name={authorName} />
        </div>
        <div className="flex items-center pl-2 font-semibold">{authorName}</div>
        <div className="flex items-center pl-2 pr-2">
          <Circle />
        </div>
        <div className="flex items-center">{`${date} ${time}`}</div>
      </div>
      {
        profile === personal.Yes ? (
        <div>
          <MdDelete onClick={deleteHandler} className="text-2xl text-red-500 hover:text-red-600 cursor-pointer"/>
        </div>
        ) : 
        null
      }
        </div>
        <Link  to={`/blog/${id}`}>
      <div className="text-2xl font-semibold pt-2">{title}</div>
      <div className="font-thin py-2">
        {content.length > 100 ? `${content.slice(0, 100)} ...` : content}
      </div>
      <div className="">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
      </Link>
    </div>
    
    
  );
};

function Circle() {
  return <div className="w-1 h-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-7 h-7" : "w-9 h-9 hover:border-2 border-gray-500"
      } overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
