import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const AppBar = () => {
  return (
    <div className="flex justify-between w-full px-10 py-1.5 border-b">
      <Link to="/blogs">
      <div className="text-lg font-semibold">Medium</div>

      </Link>
      <div className="">
        <Link to={'/publish'}>
        <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 mr-3">Publish</button>

        </Link>

        <Avatar name="Arush" size="big" />
      </div>
    </div>
  );
};
