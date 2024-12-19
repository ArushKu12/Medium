import { useParams } from "react-router-dom"
import {  useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog"
import { Spinner } from "../components/Spinner"
import { AppBar } from "../components/AppBar"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const Blog = () => {
    const {id} = useParams()
    const {loading, blog} = useBlog({
        id: String(id)
    })
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
             <div className="flex justify-center items-center h-[80vh] w-screen">
            <Spinner />
        </div>
        </div>
       
    }
    return <div>
        
        <AppBar name={name}/>
        {/* @ts-ignore */}
        <FullBlog blog={blog}/>
    </div>
}