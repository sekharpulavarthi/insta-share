import Header from "../Header";
import Stories from "../Stories";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import PostItem from "../PostItem";
import LoadingView from "../LoadingView";

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

  const renderFailureView = () => (
    <div className="w-full flex justify-center h-screen">
      <div className="w-[75%] flex justify-center items-center border">
        <div className="flex flex-col justify-center items-center w-[50%]">
          <img
            src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1701149344/alert-triangle_zn9pox.svg"
            alt="all-stories-error"
            className="w-12 h-12 mb-4"
          />
          <h1 className="text-base mb-4">
            Something went wrong. Please try again
          </h1>
          <button
            onClick={getPostsData}
            className="bg-[#4094EF] text-base text-white py-1 px-3 rounded-md"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );

  const renderPostsView = () => (
    <div className="w-full flex flex-col justify-center items-center">
      {postsData.map((postItem) => (
        <PostItem
          postItemDetails={postItem}
          key={postItem.postId}
          updateLikeStatus={updateLikeStatus}
        />
      ))}
    </div>
  );

  const renderPostsPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderPostsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.loading:
        return <LoadingView />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#FAFAFA] h-[100%]">
      <>
        <Header />
        <Stories />
        {renderPostsPage()}
      </>
    </div>
  );
};

export default Home;
