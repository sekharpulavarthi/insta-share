import { Link } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { BiShareAlt } from "react-icons/bi";
import { FcLike } from "react-icons/fc";

import {
  PostItemContainer,
  UserProfileDiv,
  UserProfileImg,
  UserNameText,
  PostImg,
  PostItemDetailsContainer,
  LikeCommentShareContainer,
  LikeButton,
  LikesCount,
  CaptionText,
  CommentItemText,
  CommentedUserName,
  CreatedAt,
} from "./styledComponents";

const PostItem = (props) => {
  const { postItemDetails, updateLikeStatus } = props;
  const {
    comments,
    createdAt,
    likesCount,
    postDetails,
    postId,
    profilePic,
    userName,
    userId,
    likeStatus,
  } = postItemDetails;

  const { caption, imageUrl } = postDetails;

  return (
    <PostItemContainer>
      <Link to={`/posts/${userId}`}>
        <UserProfileDiv>
          <UserProfileImg src={profilePic} alt={userName} />
          <UserNameText>{userName}</UserNameText>
        </UserProfileDiv>
      </Link>
      <PostImg src={imageUrl} alt={userName} />
      <PostItemDetailsContainer>
        <LikeCommentShareContainer>
          {likeStatus === false ? (
            <LikeButton
              onClick={() => updateLikeStatus(!likeStatus, postId)}
              type="button"
            >
              <BsHeart className="w-6 mr-3" />
            </LikeButton>
          ) : (
            <LikeButton
              onClick={() => updateLikeStatus(!likeStatus, postId)}
              type="button"
            >
              <FcLike className="w-6 mr-3" />
            </LikeButton>
          )}
          <FaRegComment className="w-6 mr-3" />
          <BiShareAlt className="w-6 mr-3" />
        </LikeCommentShareContainer>
        <LikesCount>{likesCount} likes</LikesCount>
        <CaptionText>{caption}</CaptionText>
        {comments.map((comment) => (
          <CommentItemText key={comment.userId}>
            <CommentedUserName>{comment.userName}</CommentedUserName>
            {comment.comment}
          </CommentItemText>
        ))}
        <CreatedAt>{createdAt}</CreatedAt>
      </PostItemDetailsContainer>
    </PostItemContainer>
  );
};

export default PostItem;
