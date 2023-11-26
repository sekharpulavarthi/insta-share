import React from "react";
import { Link } from "react-router-dom";

const PostItem = (props) => {
  const { postItemDetails } = props;
  const {
    comments,
    createdAt,
    likesCount,
    postDetails,
    postId,
    profilePic,
    userName,
    userId,
  } = postItemDetails;

  const { caption, imageUrl } = postDetails;

  return (
    <div className="w-[75%] mb-8 border border-[#DBDBDB]">
      <Link to={`/posts/${userId}`}>
        <div className="flex items-center  py-3">
          <img
            className="rounded-full w-8 h-8 p-0.5 border border-[#E20337] ml-6"
            src={profilePic}
            alt={userName}
          />
          <p className="ml-3 text-xs font-bold">{userName}</p>
        </div>
      </Link>
      <img
        src={imageUrl}
        alt={userName}
        className="w-full h-[614px] object-fill"
      />
      <div className="py-4 px-5">
        <div className="flex mb-3">
          <img
            src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700984263/Frame_1437_eu1nyl.svg"
            alt="like-icon"
            className="w-6 mr-3"
          />
          <img
            src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700984263/Frame_1450_lkfb07.svg"
            alt="comment-icon"
            className="w-6 mr-3"
          />
          <img
            src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700984263/Frame_1437_eu1nyl.svg"
            alt="like-icon"
            className="w-6 mr-3"
          />
        </div>
        <p className="mb-1 text-xs font-bold">{likesCount} likes</p>
        <p className="mb-1 text-xs">{caption}</p>
        {comments.map((comment) => (
          <p key={comment.userId} className="mb-1 text-xs">
            <span className="font-bold mr-1">{comment.userName}</span>
            {comment.comment}
          </p>
        ))}
        <p className="text-xs text-[#989898]">{createdAt}</p>
      </div>
    </div>
  );
};

export default PostItem;
