import Header from "../Header";
import Stories from "../Stories";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import PostItem from "../PostItem";
import LoadingView from "../LoadingView";
import FailureView from "../FailureView";
import { HomeContainer, PostsContainer } from "./styledComponents";

const apiStatusConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  failure: "FAILURE",
  success: "SUCCESS",
};

const Home = () => {
  const [postsData, setPostsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getPostsData();
  }, []);

  const getFormattedData = (postItem) => ({
    comments: postItem.comments.map((commentItem) => ({
      comment: commentItem.comment,
      userId: commentItem.user_id,
      userName: commentItem.user_name,
    })),
    createdAt: postItem.created_at,
    likesCount: postItem.likes_count,
    postDetails: {
      caption: postItem.post_details.caption,
      imageUrl: postItem.post_details.image_url,
    },
    postId: postItem.post_id,
    profilePic: postItem.profile_pic,
    userId: postItem.user_id,
    userName: postItem.user_name,
    likeStatus: false,
  });

  const getPostsData = async () => {
    setApiStatus(apiStatusConstants.loading);
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(
      "https://apis.ccbp.in/insta-share/posts",
      options
    );

    if (response.ok) {
      const jsonData = await response.json();

      setApiStatus(apiStatusConstants.success);

      const updatedData = jsonData.posts.map((postItem) =>
        getFormattedData(postItem)
      );

      setPostsData(updatedData);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const updateLikeStatus = async (likeStatus, postId) => {
    console.log(likeStatus, postId);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`;

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "POST",
      body: JSON.stringify({ like_status: likeStatus }),
    };
    const response = await fetch(url, options);

    if (response.ok) {
      const updatedHomePosts = postsData.map((postItem) => {
        if (postItem.postId === postId) {
          return {
            ...postItem,
            likeStatus: likeStatus,
            likesCount:
              likeStatus === true
                ? postItem.likesCount + 1
                : postItem.likesCount - 1,
          };
        }
        return postItem;
      });

      setPostsData(updatedHomePosts);
    }
  };

  const renderPostsView = () => (
    <PostsContainer>
      {postsData.map((postItem) => (
        <PostItem
          postItemDetails={postItem}
          key={postItem.postId}
          updateLikeStatus={updateLikeStatus}
        />
      ))}
    </PostsContainer>
  );

  const renderPostsPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderPostsView();
      case apiStatusConstants.failure:
        return <FailureView onClickFunction={getPostsData} />;
      case apiStatusConstants.loading:
        return <LoadingView />;
      default:
        return null;
    }
  };

  return (
    <HomeContainer>
      <>
        <Stories />
        {renderPostsPage()}
      </>
    </HomeContainer>
  );
};

export default Home;
