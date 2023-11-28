import Loader from "react-loader-spinner";

const LoadingView = () => (
  <div className="w-full flex justify-center items-center h-screen">
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  </div>
);

export default LoadingView;
