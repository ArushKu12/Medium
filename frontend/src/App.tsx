
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Blog } from './pages/Blog'
import {Blogs} from "./pages/Blogs"
import { Publish } from './pages/Publish'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/blog/:id' element={<Blog />}></Route>
        <Route path='/blogs' element={<Blogs />}></Route>
        <Route path='/publish' element={<Publish />} ></Route>
      </Routes>
    </>
  )
}

export default App
