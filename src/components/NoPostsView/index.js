import { BiCamera } from "react-icons/bi";

const NoPostsView = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <div className="w-[86px] h-[86px] rounded-full border border-black flex items-center justify-center mb-4">
        <BiCamera className="w-12 h-11" />
      </div>
      <p className="text-[32px] font-light">No Posts Yet</p>
    </div>
  );
};

export default NoPostsView;
