import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Header from "../Header";
import { BsGrid3X3 } from "react-icons/bs";

const apiStatusConstatnts = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstatnts.initial);

  const { userId } = useParams();

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getFormattedData = (data) => ({
    followersCount: data.followers_count,
    followingCount: data.following_count,
    id: data.id,
    postsCount: data.posts_count,
    profilePic: data.profile_pic,
    userBio: data.user_bio,
    userId: data.user_id,
    userName: data.user_name,
    posts: data.posts,
    stories: data.stories,
  });

  const getProfileDetails = async () => {
    setApiStatus(apiStatusConstatnts.loading);
    const jwtToken = Cookies.get("jwt_token");

    const url = "https://apis.ccbp.in/insta-share/my-profile";
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData);
      const updatedData = getFormattedData(jsonData.profile);
      setApiStatus(apiStatusConstatnts.success);
      setProfileData(updatedData);
    } else {
      setApiStatus(apiStatusConstatnts.failure);
    }
  };

  const renderLoadingView = () => {
    return (
      <div className="products-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    );
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

  const renderProfileSuccessView = () => {
    const {
      profilePic,
      posts,
      followersCount,
      followingCount,
      postsCount,
      userBio,
      userId,
      userName,
      stories,
    } = profileData;

    return (
      <>
        <Header />
        <div className="bg-[#FAFAFA]">
          <div className="flex flex-col items-center py-8 ">
            <div className="flex flex-col items-start w-[75%]">
              <div className="flex w-[90%] pb-16">
                <img
                  src={profilePic}
                  alt={userName}
                  className="w-[180px] h-[180px] rounded-full"
                />
                <div className="ml-16">
                  <p className="text-3xl font-light pb-6">{userName}</p>
                  <div className="flex pb-4">
                    <p className="mr-12 text-base">
                      <span className="font-bold">{postsCount}</span> posts
                    </p>
                    <p className="mr-12 text-base">
                      <span className="font-bold">{followersCount}</span>{" "}
                      followers
                    </p>
                    <p className="mr-12 text-base">
                      <span className="font-bold">{followingCount}</span>{" "}
                      following
                    </p>
                  </div>
                  <p className="text-base font-bold pb-2">{userId}</p>
                  <p className="text-base">{userBio}</p>
                </div>
              </div>
              <div className="flex">
                {stories.map((storyItem) => (
                  <img
                    key={storyItem.id}
                    src={storyItem.image}
                    alt={storyItem.userName}
                    className="w-[78px] h-[78px] rounded-full border border-[#DBDBDB] p-0.5 mr-10"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <hr className="w-[75%] text-center" />
          </div>
          <div className="flex flex-col items-center mt-6">
            <div className="w-[75%] flex flex-col ">
              <div className="flex items-center mb-6">
                <BsGrid3X3 className="mr-2" />
                <p>Posts</p>
              </div>
              <ul className="flex frex-wrap justify-between">
                {posts.map((postItem) => (
                  <li className="list-none" key={postItem.id}>
                    <img
                      src={postItem.image}
                      alt={postItem.id}
                      className="w-[330px] h-[330px]"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderProfilePage = () => {
    switch (apiStatus) {
      case apiStatusConstatnts.success:
        return renderProfileSuccessView();
      case apiStatusConstatnts.failure:
        return renderFailureView();
      case apiStatusConstatnts.loading:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return <div>{renderProfilePage()}</div>;
};

export default Profile;
