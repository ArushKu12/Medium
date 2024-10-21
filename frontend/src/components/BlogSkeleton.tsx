export const BlogSkeleton = () => {
  return (
    <div>
      <div role="status" className="max-w-sm animate-pulse">
      <div className="border-b py-4">
      <div className="flex">
        <div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>


        </div>
        <div className="flex items-center pl-2 font-semibold">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

        </div>
        
      </div>
      <div className="text-2xl font-semibold pt-2">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      

      </div>
      <div className="font-thin py-2">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      </div>
      <div className="flex">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

      </div>
      </div>
       
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
