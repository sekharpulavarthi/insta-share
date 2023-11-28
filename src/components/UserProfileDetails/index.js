import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import { BsGrid3X3 } from "react-icons/bs";
import LoadingView from "../LoadingView";
import NoPostsView from "../NoPostsView";

const apiStatusConstatnts = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

const UserProfileDetails = () => {
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

    const url = `https://apis.ccbp.in/insta-share/users/${userId}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const jsonData = await response.json();
      const updatedData = getFormattedData(jsonData.user_details);
      setApiStatus(apiStatusConstatnts.success);
      setProfileData(updatedData);
    } else {
      setApiStatus(apiStatusConstatnts.failure);
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
            onClick={getProfileDetails}
            className="bg-[#4094EF] text-base text-white py-1 px-3 rounded-md"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );

  const renderUserProfileDetailsSuccessView = () => {
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
        <div className="bg-[#FAFAFA] h-screen">
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
              {posts ? (
                <ul className="flex frex-wrap justify-between">
                  {posts.map((postItem) => (
                    <li className="list-none" key={postItem.id}>
                      <img
                        src={postItem.image}
                        alt={postItem.id}
                        className="w-[340px] h-[340px]"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <NoPostsView />
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderUserProfileDetailsPage = () => {
    switch (apiStatus) {
      case apiStatusConstatnts.success:
        return renderUserProfileDetailsSuccessView();
      case apiStatusConstatnts.failure:
        return renderFailureView();
      case apiStatusConstatnts.loading:
        return <LoadingView />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      {renderUserProfileDetailsPage()}
    </div>
  );
};

export default UserProfileDetails;
