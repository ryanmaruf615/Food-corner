const LoadingUi = () => {
  return (
    <div className="w-full mt-20 flex items-center justify-center">
      <div className="flex items-center justify-center gap-4 ">
        <div className="flex-col gap-4 w-full flex items-center justify-center ">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-green-500 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-orange-400 rounded-full"></div>
          </div>
          <h1 className="text-lg font-semibold">Loading...</h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingUi;
