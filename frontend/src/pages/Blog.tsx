import { useParams } from "react-router-dom"
import {  useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog"
import { AppBar } from "../components/AppBar"
import { Spinner } from "../components/Spinner"


export const Blog = () => {
    const {id} = useParams()
    const {loading, blog} = useBlog({
        id: String(id)
    })

    if(loading){
        return <div>
            <AppBar />
             <div className="flex justify-center items-center h-[80vh] w-screen">
            <Spinner />
        </div>
        </div>
       
    }
    return <div>
        
        <AppBar />
        {/* @ts-ignore */}
        <FullBlog blog={blog}/>
    </div>
}