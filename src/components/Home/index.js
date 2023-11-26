import Header from "../Header";
import Stories from "../Stories";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import PostItem from "../PostItem";

const apiStatusConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  failure: "FAILURE",
  success: "SUCCESS",
};

const Home = () => {
  const [postsData, setPostsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [searchInput, setSearchInput] = useState("");
  const [searchButtonClickStatus, setSearchButtonClickStatus] = useState(false);

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
    }
  };

  const getSearchResults = async (searchInput) => {
    setSearchButtonClickStatus(true);
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`,
      options
    );
    if (response.ok) {
      const jsonData = await response.json();

      setApiStatus(apiStatusConstants.success);

      const updatedData = jsonData.posts.map((postItem) =>
        getFormattedData(postItem)
      );

      setPostsData(updatedData);
    }
  };

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

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

  const renderPostsView = () => (
    <div className="w-full flex flex-col justify-center items-center">
      {searchButtonClickStatus && <p>Search Results</p>}
      {postsData.map((postItem) => (
        <PostItem postItemDetails={postItem} key={postItem.postId} />
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
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#FAFAFA]">
      <>
        <Header
          getSearchResultsFn={getSearchResults}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <Stories />
        {renderPostsPage()}
      </>
    </div>
  );
};

export default Home;
