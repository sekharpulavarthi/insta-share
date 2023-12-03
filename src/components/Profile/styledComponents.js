import tw from "twin.macro";
import styled from "styled-components";

export const ProfileContainer = styled.div`
  ${tw`bg-[#FAFAFA]`};
`;

export const ProfileContainerHeaderPart = styled.div`
  ${tw`flex flex-col items-center py-8 `};
`;

export const ProfileContainerHeaderPartDiv = styled.div`
  ${tw`flex flex-col items-start w-[75%]`};
`;

export const ProfileImgContainer = styled.div`
  ${tw`flex w-[90%] pb-16`};
`;

export const ProfileImgMobileContainer = styled.div`
  ${tw`flex flex-col w-[90%] pb-16`};
`;

export const UserDetailsMobileViewContainer = styled.div`
  ${tw`flex items-center justify-around pb-2`};
`;

export const ProfileImg = styled.img`
  ${tw`w-[180px] h-[180px] rounded-full`};
  @media (max-width: 768px) {
    ${tw`w-[96px] h-[96px]`}
  }
`;

export const UserDetailsContainer = styled.div`
  ${tw`ml-16`};
`;

export const Username = styled.p`
  ${tw`text-3xl font-light pb-6`};
  @media (max-width: 768px) {
    ${tw`text-base`}
  }
`;

export const UserAccountDetails = styled.div`
  ${tw`flex pb-4 justify-between`};
  @media (max-width: 768px) {
    ${tw`w-[70%] justify-around`};
  }
`;

export const PostsText = styled.p`
  ${tw`text-base`};
  @media (min-width: 769px) {
    ${tw`ml-1`};
  }
`;

export const PostsCount = styled.span`
  ${tw`font-bold`};
`;

export const FollowersText = styled.p`
  ${tw`text-base`};
  @media (min-width: 769px) {
    ${tw`ml-1`};
  }
`;

export const PostsTextContainer = styled.div`
  ${tw`flex`}
  @media (max-width: 768px) {
    ${tw`flex flex-col items-center justify-center`}
  }
`;

export const FollowersTextContainer = styled.div`
  ${tw`flex`}
  @media (max-width: 768px) {
    ${tw`flex flex-col items-center justify-center `}
  }
`;

export const FollowingTextContainer = styled.div`
  ${tw`flex`}
  @media (max-width: 768px) {
    ${tw`flex flex-col items-center justify-center `}
  }
`;

export const FollowersCount = styled.span`
  ${tw`font-bold`};
`;

export const FollowingText = styled.p`
  ${tw`text-base`};
  @media (min-width: 769px) {
    ${tw`ml-1`};
  }
`;

export const FollowingCount = styled.span`
  ${tw`font-bold`};
`;

export const UserID = styled.p`
  ${tw`text-base font-bold pb-2`};
`;

export const UserBio = styled.p`
  ${tw`text-base`};
`;

export const StoriesContainer = styled.div`
  ${tw`flex justify-start w-full`};
`;

export const StoryImg = styled.img`
  ${tw`w-[78px] h-[78px] rounded-full border border-[#DBDBDB] p-0.5 mr-2`};
  @media (max-width: 567px) {
    ${tw`w-[64px] h-[64px]`};
  }
`;

export const BorderLineContainer = styled.div`
  ${tw`flex justify-center`};
`;

export const BorderLine = styled.hr`
  ${tw`w-[75%] text-center`};
`;

export const PostsContainer = styled.div`
  ${tw`flex flex-col items-center mt-6`};
`;

export const PostsContainerDiv = styled.div`
  ${tw`w-[75%] flex flex-col`};
`;

export const PostsTextDiv = styled.div`
  ${tw`flex items-center mb-6`};
`;

export const PostsHeadingText = styled.p`
  ${tw``};
`;

export const PostsImgsContainer = styled.ul`
  @media (max-width: 567px) {
    ${tw`flex flex-wrap`};
  }
  @media (min-width: 568px) {
    ${tw`flex flex-wrap`};
  }
`;

export const PostImgDiv = styled.li`
  ${tw`list-none m-1`};
  @media (max-width: 567px) {
    ${tw`flex flex-wrap m-0.5`};
  }
`;

export const PostImg = styled.img`
  ${tw`w-[330px] h-[330px]`};
  @media (max-width: 567px) {
    ${tw`w-[110px] h-[110px]`};
  }
`;
