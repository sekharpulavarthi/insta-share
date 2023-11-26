import React from "react";

const StoryItem = (props) => {
  const { storyData } = props;
  const { storyUrl, userName } = storyData;

  return (
    <li className="w-[70px]">
      <img
        className="w-[70px] h-[70px] rounded-full"
        src={storyUrl}
        alt={userName}
      />
      <p className="mt-2 text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
        {userName}
      </p>
    </li>
  );
};

export default StoryItem;
