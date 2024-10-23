
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Blog } from './pages/Blog'
import {Blogs} from "./pages/Blogs"
import PrivateRoute from './components/PrivateRoute'
import { PersonalBlogs } from './pages/PersonalBlogs'
import { Publish } from './pages/Publish'


function App() {
  
  
  return (
    <>
    <div className='flex flex-col'>
      
    <Routes>
        <Route path='/' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/blog/:id' element={<PrivateRoute><Blog /></PrivateRoute>}></Route>
        <Route path='/blogs' element={<PrivateRoute><Blogs /></PrivateRoute>}></Route>
        <Route path='/publish' element={<PrivateRoute><Publish /></PrivateRoute>} ></Route>
        <Route path='/personal' element={<PrivateRoute><PersonalBlogs /></PrivateRoute>} ></Route>
      </Routes>
    </div>
      
    </>
  )
}

export default App
