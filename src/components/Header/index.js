const Header = () => {
  return (
    <div className="flex justify-around h-[64px] bg-[#FFF] border border-b-[#DBDBDB] py-8">
      <div className="flex items-center">
        <div className="h-10 w-20 flex flex-col items-center relative">
          <img
            src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700496060/Vectorinsta-share-icon_pcz8o9.png"
            alt=""
            className="w-10 h-6"
          />
          <img
            src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700495613/Vector_1x_ujdtu3.png"
            alt=""
            className="w-[59px] h-6 absolute top-2"
          />
        </div>
        <p className="w-[102px] h-[24px] font-bold">Insta Share</p>
      </div>
      <div className="flex items-center">
        <div className="flex border border-[#DBDBDB]">
          <input
            type="text"
            placeholder="Search Caption"
            className="bg-[#FAFAFA] pl-2 w-[180px] focus:outline-none h-[26px]"
          />
          <div className="w-[34px] h-[26px] bg-[#DBDBDB] flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700586565/searchsearch-icon_dwqyt4.svg"
              alt="search-icon"
              className="w-[10px] h-[10px]"
            />
          </div>
        </div>
        <p className="ml-8">Home</p>
        <p className="ml-4">Profile</p>
        <button className="text-white w-[86px] rounded-sm py-2 px-5 bg-[#4094EF] ml-6">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
