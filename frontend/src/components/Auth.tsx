import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignUp } from "@arush_012/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
import toast from "react-hot-toast"
import { Spinner } from "./Spinner"

export const Auth = ({type} : {type:"signup" | "signin"}) => {
    
    const navigate = useNavigate();
    const [loading,SetLoading] = useState(false)
    const [postInputs,setPostInputs] = useState<SignUp>({
        name:"",
        username:"",
        password:""
    })

    async function SendRequest() {
        SetLoading(true)
        try {
           const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs)
           if(response.data.success ){
            const jwt = response.data.jwt;
            localStorage.setItem('token',jwt)
            toast.success(`${type === "signup" ? "Logged In Successfully" : "Signed In Successfully"}`)
            navigate("/blogs")
            SetLoading(false)
           }
           
        } catch (error) {
            SetLoading(false)
            toast.error(`${type === "signin" ? "Sign In" : "Sign up"} Failed`)
        }
    }

    if(loading){
        return <div className="flex justify-center items-center h-screen w-half">
            <Spinner />
        </div>
    }

    return <div className="h-screen flex justify-center items-center flex-col">
        <div>
        <div className="text-3xl font-semibold ">
                Create an account
            </div>  
            <div className="text-slate-400 pb-[0.6rem]">
                {type === 'signin' ? "Don't have an Account ?" : "Already have an Account ?"}
                <Link className="pl-2 underline" to={type === 'signin' ? "/" : "/signin"} >
                {type === "signin" ? "Sign up" : "Sign in"}
                </Link>
            </div>
            {type === "signup" ? <LabelledInput label = "Name" placeholder="Enter your name" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }} /> : null}

            <LabelledInput label = "Username" placeholder="Enter your Username or email" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    username:e.target.value
                })
            }} />

            <LabelledInput type="Password" label = "Password" placeholder="eg: 123456" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password:e.target.value
                })
            }} />

            <button onClick={SendRequest} type="button" className="mt-[0.6rem] w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg 
            text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                {type === "signup" ? "Sign Up" : "Sign In"}
                </button>

        </div>
            
        
        
    </div>
}

interface LabelledInputType {
    label:string,
    placeholder:string,
    onChange : (e:  ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabelledInput({label, placeholder, onChange,type} : LabelledInputType ) {
return <div className="pb-[0.5rem]">
    <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type || "text"} onChange={onChange} id={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
</div>
}