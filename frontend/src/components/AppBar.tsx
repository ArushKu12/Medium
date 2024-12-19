import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useState } from "react";
import toast from "react-hot-toast";

export const AppBar = ({name} : {name:string}) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function LogOutHandler() {
    localStorage.removeItem('token');
    toast.success("Logged Out Successfully")
  }


  return (
    <div className="flex justify-between w-full w-screen px-10 py-1.5 border-b">
      <Link to="/blogs">
      <div className="text-lg font-semibold">Medium</div>

      </Link>
      <div className="flex">
        <Link to={'/publish'}>
        <button type="button" className="text-white bg-gradient-to-r from-green-300 to-green-600 hover:from-green-400 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 mr-3">Publish</button>

        </Link>
        <div onClick={toggleDropdown} className="cursor-pointer">
        <Avatar name={name} size="big" />
        </div>
        

        {isDropdownOpen && (
          <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
            <ul className="py-1 text-gray-800">
              <li>
                <Link
                  to="/personal"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  My Blogs
                </Link>
              </li>
              <li>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-200" onClick={LogOutHandler}>
                  Log Out
                </Link>
              </li>
              
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
