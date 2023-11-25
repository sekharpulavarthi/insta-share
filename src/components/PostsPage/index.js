import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";

const apiStatusConstants = {
  initial: "INITIAL",
  loading: "LOADING",
  failure: "FAILURE",
  success: "SUCCESS",
};

const PostsPage = () => {
  const [postsData, setPostsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getPostsData();
  }, []);

  const formatCommentsData = (commentItem) => {};

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
      console.log(jsonData);
      setApiStatus(apiStatusConstants.success);

      const updatedData = jsonData.posts.map((postItem) => ({
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
      }));
      console.log(updatedData);
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

  const renderPostsView = () => <h1>success</h1>;

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

  return <div>{renderPostsPage()}</div>;
};

export default PostsPage;
