import tw from "twin.macro";
import styled from "styled-components";

export const PostsPageContainer = styled.div`
  ${tw`bg-[#FAFAFA] flex flex-col justify-center items-start`}
`;

export const SearchResultsText = styled.h1`
  ${tw`w-[75%] self-center font-bold mt-4 mb-4`}
`;

export const PostsContainer = styled.div`
  ${tw`w-full flex flex-col justify-center items-center`}
`;

export const PostsSubContainer = styled.div`
  ${tw`flex flex-col justify-center items-center w-[100%]`}
`;

export const NoSearchResultsViewContainer = styled.div`
  ${tw`flex flex-col items-center h-screen justify-center`}
`;

export const NoSearchResultsViewImg = styled.img`
  ${tw`w-[500px] h-[420px]`}
`;

export const SearchNotFoundText = styled.h1`
  ${tw`text-2xl font-medium mb-4`}
`;

export const TryDifferentKeyWordText = styled.p`
  ${tw`text-base text-center text-[#989898] mb-6`}
`;
