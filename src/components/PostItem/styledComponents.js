import tw from "twin.macro";
import styled from "styled-components";

export const PostItemContainer = styled.div`
  ${tw`w-[75%] mb-8 border border-[#DBDBDB]`};
`;

export const UserProfileDiv = styled.div`
  ${tw`flex items-center  py-3`};
`;

export const UserProfileImg = styled.img`
  ${tw`rounded-full w-8 h-8 p-0.5 border border-[#E20337] ml-6`};
`;

export const UserNameText = styled.p`
  ${tw`ml-3 text-xs font-bold`};
`;

export const PostImg = styled.img`
  ${tw`w-full h-[614px] object-fill`};
  @media (max-width: 768px) {
    ${tw`min-w-[250px] h-[400px]`}
  }
`;

export const PostItemDetailsContainer = styled.div`
  ${tw`py-4 px-5`};
`;

export const LikeCommentShareContainer = styled.div`
  ${tw`flex mb-3`};
`;

export const LikeButton = styled.button`
  ${tw``};
`;

export const LikesCount = styled.p`
  ${tw`mb-1 text-xs font-bold`};
`;

export const CaptionText = styled.p`
  ${tw`mb-1 text-xs`};
`;

export const CommentItemText = styled.p`
  ${tw`mb-1 text-xs`};
`;

export const CommentedUserName = styled.span`
  ${tw`font-bold mr-1`};
`;

export const CreatedAt = styled.div`
  ${tw`text-xs text-[#989898]`}
`;
