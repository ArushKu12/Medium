import { Link } from "react-router-dom";

interface BlogCardProps {
  id:string,
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="border-b py-4">
      <div className="flex">
        <div>
          <Avatar name={authorName} />
        </div>
        <div className="flex items-center pl-2 font-semibold">{authorName}</div>
        <div className="flex items-center pl-2 pr-2">
          <Circle />
        </div>
        <div className="flex items-center">{publishedDate}</div>
      </div>
      <div className="text-2xl font-semibold pt-2">{title}</div>
      <div className="font-thin py-2">
        {content.length > 100 ? `${content.slice(0, 100)} ...` : content}
      </div>
      <div className="">{`${Math.ceil(content.length / 100)} minutes`}</div>
    </div>
    </Link>
    
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
        size === "small" ? "w-7 h-7" : "w-9 h-9"
      } overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
