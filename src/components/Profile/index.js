import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { BsGrid3X3 } from "react-icons/bs";
import LoadingView from "../LoadingView";
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
  PostsTextContainer,
  FollowersTextContainer,
  FollowingTextContainer,
  ProfileImgMobileContainer,
  UserDetailsMobileViewContainer,
} from "./styledComponents";
import NoPostsView from "../NoPostsView";

const apiStatusConstatnts = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstatnts.initial);

  useEffect(() => {
    getProfileDetails();
  }, []);

  const shouldDisplayonMinDevice = window.matchMedia("(max-width: 768px)")
    .matches;

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

      const updatedData = getFormattedData(jsonData.profile);
      setApiStatus(apiStatusConstatnts.success);
      setProfileData(updatedData);
    } else {
      setApiStatus(apiStatusConstatnts.failure);
    }
  };

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
        <ProfileContainer>
          <ProfileContainerHeaderPart>
            <ProfileContainerHeaderPartDiv>
              {!shouldDisplayonMinDevice ? (
                <ProfileImgContainer>
                  <ProfileImg src={profilePic} alt={userName} />
                  <UserDetailsContainer>
                    <Username>{userName}</Username>
                    <UserAccountDetails>
                      <PostsTextContainer>
                        <PostsCount>{postsCount}</PostsCount>
                        <PostsText>posts</PostsText>
                      </PostsTextContainer>
                      <FollowersTextContainer>
                        <FollowersCount>{followersCount}</FollowersCount>
                        <FollowersText>followers</FollowersText>
                      </FollowersTextContainer>
                      <FollowingTextContainer>
                        <FollowingCount>{followingCount}</FollowingCount>
                        <FollowingText>following</FollowingText>
                      </FollowingTextContainer>
                    </UserAccountDetails>
                    <UserID>{userId}</UserID>
                    <UserBio>{userBio}</UserBio>
                  </UserDetailsContainer>
                </ProfileImgContainer>
              ) : (
                <ProfileImgMobileContainer>
                  <Username>{userName}</Username>
                  <UserDetailsMobileViewContainer>
                    <ProfileImg src={profilePic} alt={userName} />
                    <UserAccountDetails>
                      <PostsTextContainer>
                        <PostsCount>{postsCount}</PostsCount>
                        <PostsText>posts</PostsText>
                      </PostsTextContainer>
                      <FollowersTextContainer>
                        <FollowersCount>{followersCount}</FollowersCount>
                        <FollowersText>followers</FollowersText>
                      </FollowersTextContainer>
                      <FollowingTextContainer>
                        <FollowingCount>{followingCount}</FollowingCount>
                        <FollowingText>following</FollowingText>
                      </FollowingTextContainer>
                    </UserAccountDetails>
                  </UserDetailsMobileViewContainer>
                  <UserID>{userId}</UserID>
                  <UserBio>{userBio}</UserBio>
                </ProfileImgMobileContainer>
              )}
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

  const renderProfilePage = () => {
    switch (apiStatus) {
      case apiStatusConstatnts.success:
        return renderProfileSuccessView();
      case apiStatusConstatnts.failure:
        return <FailureView onClickFunction={getProfileDetails} />;
      case apiStatusConstatnts.loading:
        return <LoadingView />;
      default:
        return null;
    }
  };

  return <div>{renderProfilePage()}</div>;
};

export default Profile;
