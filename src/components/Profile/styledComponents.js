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

export const ProfileImg = styled.img`
  ${tw`w-[180px] h-[180px] rounded-full`};
`;

export const UserDetailsContainer = styled.div`
  ${tw`ml-16`};
`;

export const Username = styled.p`
  ${tw`text-3xl font-light pb-6`};
`;

export const UserAccountDetails = styled.div`
  ${tw`flex pb-4`};
`;

export const PostsText = styled.p`
  ${tw`mr-12 text-base`};
`;

export const PostsCount = styled.span`
  ${tw`font-bold`};
`;

export const FollowersText = styled.p`
  ${tw`mr-12 text-base`};
`;

export const FollowersCount = styled.span`
  ${tw`font-bold`};
`;

export const FollowingText = styled.p`
  ${tw`mr-12 text-base`};
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
  ${tw`flex`};
`;

export const StoryImg = styled.img`
  ${tw`w-[78px] h-[78px] rounded-full border border-[#DBDBDB] p-0.5 mr-10`};
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
  ${tw`flex flex-wrap justify-between`};
`;

export const PostImgDiv = styled.li`
  ${tw`list-none`};
`;

export const PostImg = styled.img`
  ${tw`w-[330px] h-[330px]`};
`;
