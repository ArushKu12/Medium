import { useParams } from "react-router-dom"
import {  useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog"
import { AppBar } from "../components/AppBar"

export const Blog = () => {
    const {id} = useParams()
    const {loading, blog} = useBlog({
        id: String(id)
    })

    if(loading){
        return <div className="flex justify-center items-center h-screen w-screen">
            Loading ... 
        </div>
    }
    return <div>
        
        <AppBar />
        {/* @ts-ignore */}
        <FullBlog blog={blog}/>
    </div>
}