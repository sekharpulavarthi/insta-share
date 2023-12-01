import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import { BsGrid3X3 } from "react-icons/bs";
import LoadingView from "../LoadingView";
import NoPostsView from "../NoPostsView";
import FailureView from "../FailureView";

import {
  ProfileContainer,
  ProfileContainerHeaderPart,
  ProfileContainerHeaderPartDiv,
  ProfileImgContainer,
  ProfileImg,
  UserDetailsContainer,
  Username,
  UserAccountDetails,
  PostsText,
  PostsCount,
  FollowersText,
  FollowersCount,
  FollowingText,
  FollowingCount,
  UserID,
  UserBio,
  StoriesContainer,
  StoryImg,
  BorderLineContainer,
  BorderLine,
  PostsContainer,
  PostsContainerDiv,
  PostsTextDiv,
  PostsHeadingText,
  PostsImgsContainer,
  PostImgDiv,
  PostImg,
} from "./styledComponents";

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
        <ProfileContainer>
          <ProfileContainerHeaderPart>
            <ProfileContainerHeaderPartDiv>
              <ProfileImgContainer>
                <ProfileImg src={profilePic} alt={userName} />
                <UserDetailsContainer>
                  <Username>{userName}</Username>
                  <UserAccountDetails>
                    <PostsText>
                      <PostsCount>{postsCount}</PostsCount>
                      posts
                    </PostsText>
                    <FollowersText>
                      <FollowersCount>{followersCount}</FollowersCount>
                      followers
                    </FollowersText>
                    <FollowingText>
                      <FollowingCount>{followingCount}</FollowingCount>
                      following
                    </FollowingText>
                  </UserAccountDetails>
                  <UserID>{userId}</UserID>
                  <UserBio>{userBio}</UserBio>
                </UserDetailsContainer>
              </ProfileImgContainer>
              <StoriesContainer>
                {stories.map((storyItem) => (
                  <StoryImg
                    key={storyItem.id}
                    src={storyItem.image}
                    alt={storyItem.userName}
                  />
                ))}
              </StoriesContainer>
            </ProfileContainerHeaderPartDiv>
          </ProfileContainerHeaderPart>
          <BorderLineContainer>
            <BorderLine />
          </BorderLineContainer>
          <PostsContainer>
            <PostsContainerDiv>
              <PostsTextDiv>
                <BsGrid3X3 className="mr-2" />
                <PostsHeadingText>Posts</PostsHeadingText>
              </PostsTextDiv>
              {posts ? (
                <PostsImgsContainer>
                  {posts.map((postItem) => (
                    <PostImgDiv key={postItem.id}>
                      <PostImg src={postItem.image} alt={postItem.id} />
                    </PostImgDiv>
                  ))}
                </PostsImgsContainer>
              ) : (
                <NoPostsView />
              )}
            </PostsContainerDiv>
          </PostsContainer>
        </ProfileContainer>
      </>
    );
  };

  const renderUserProfileDetailsPage = () => {
    switch (apiStatus) {
      case apiStatusConstatnts.success:
        return renderUserProfileDetailsSuccessView();
      case apiStatusConstatnts.failure:
        return <FailureView />;
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
