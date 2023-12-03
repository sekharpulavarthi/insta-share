import tw from "twin.macro";
import styled from "styled-components";

export const StoriesContainer = styled.div`
  ${tw`flex justify-around bg-[#FAFAFA] h-[30%]`}
`;

export const StoriesSubContainer = styled.ul`
  ${tw`w-[75%] p-[40px]`}
`;

export const StoriesLoadingViewContainer = styled.div`
  ${tw`w-full flex justify-center items-center h-[200px]`}
`;
