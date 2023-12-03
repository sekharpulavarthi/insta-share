import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import PostItem from "../PostItem";
import { useLocation } from "react-router-dom";
import LoadingView from "../LoadingView";
import FailureView from "../FailureView";

import {
  PostsSubContainer,
  PostsPageContainer,
  SearchResultsText,
  PostsContainer,
  NoSearchResultsViewContainer,
  NoSearchResultsViewImg,
  SearchNotFoundText,
  TryDifferentKeyWordText,
} from "./styledComponents";

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

  const renderNoSearchResultsView = () => (
    <NoSearchResultsViewContainer>
      <NoSearchResultsViewImg
        alt="search-not-found"
        src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1690380372/Group_jrlyey.png"
      />
      <SearchNotFoundText>Search Not Found</SearchNotFoundText>
      <TryDifferentKeyWordText>
        Try different keyword or try again.
      </TryDifferentKeyWordText>
    </NoSearchResultsViewContainer>
  );

  const renderPostsView = () => (
    <PostsPageContainer>
      <SearchResultsText>Search Results</SearchResultsText>
      <PostsContainer>
        <PostsSubContainer>
          {postsData.map((postItem) => (
            <PostItem
              postItemDetails={postItem}
              key={postItem.postId}
              updateLikeStatus={updateLikeStatus}
            />
          ))}
        </PostsSubContainer>
      </PostsContainer>
    </PostsPageContainer>
  );

  const renderPostsPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return postsData.length
          ? renderPostsView()
          : renderNoSearchResultsView();
      case apiStatusConstants.failure:
        return <FailureView />;
      case apiStatusConstants.loading:
        return <LoadingView />;
      default:
        return null;
    }
  };

  return <>{renderPostsPage()}</>;
};

export default SearchPosts;
