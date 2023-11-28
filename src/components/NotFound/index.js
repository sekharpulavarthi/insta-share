const NotFound = (props) => {
  const onClickHomeBtn = () => {
    const { history } = props;
    history.replace("/");
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center w-[30%]">
        <img
          className="w-[270px] h-[300px] mb-12"
          alt="page-not-found"
          src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1690380381/Group_1_gkti6y.png "
        />
        <h1 className="text-2xl font-medium mb-4">Page Not Found</h1>
        <p className="text-base text-center text-[#989898] mb-6">
          We are sorry, the page you requested could not be found.Please go back
          to the homepage.
        </p>
        <button
          onClick={onClickHomeBtn}
          className="bg-[#4094EF] text-base text-white py-1 px-3 rounded-md"
          type="button"
        >
          HomePage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
