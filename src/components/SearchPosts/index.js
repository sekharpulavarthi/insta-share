import Header from "../Header";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import PostItem from "../PostItem";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import LoadingView from "../LoadingView";

const apiStatusConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  failure: "FAILURE",
  success: "SUCCESS",
};

const SearchPosts = () => {
  const [postsData, setPostsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("search");

  useEffect(() => {
    getPostsData();
  }, [searchParam]);

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
      `https://apis.ccbp.in/insta-share/posts?search=${searchParam}`,
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
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  const renderNoSearchResultsView = () => (
    <div className="flex flex-col items-center h-screen justify-center">
      <img
        className="w-[500px] h-[420px]"
        alt="search-not-found"
        src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1690380372/Group_jrlyey.png"
      />
      <h1 className="text-2xl font-medium mb-4">Search Not Found</h1>
      <p className="text-base text-center text-[#989898] mb-6">
        Try different keyword or try again.
      </p>
    </div>
  );

  const renderPostsView = () => (
    <div className="flex flex-col justify-center items-start">
      <h1 className="w-[75%] self-center font-bold mt-4 mb-4">
        Search Results
      </h1>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[100%]">
          {postsData.map((postItem) => (
            <PostItem
              postItemDetails={postItem}
              key={postItem.postId}
              updateLikeStatus={updateLikeStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderPostsPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return postsData.length
          ? renderPostsView()
          : renderNoSearchResultsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.loading:
        return <LoadingView />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#FAFAFA]">
      <>
        <Header />
        {renderPostsPage()}
      </>
    </div>
  );
};

export default SearchPosts;
