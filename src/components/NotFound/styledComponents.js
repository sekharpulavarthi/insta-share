import tw from "twin.macro";
import styled from "styled-components";

export const NotFoundContainer = styled.div`
  ${tw`w-full flex justify-center items-center h-screen`};
`;

export const NotFoundSubContainer = styled.div`
  ${tw`flex flex-col justify-center items-center w-[30%]`};
`;

export const NotFoundImg = styled.img`
  ${tw`w-[270px] h-[300px] mb-12`};
`;

export const NotFoundHeadingText = styled.h1`
  ${tw`text-2xl font-medium mb-4`};
`;

export const NotFoundDescriptionText = styled.p`
  ${tw`text-base text-center text-[#989898] mb-6`};
`;

export const NotFoundButton = styled.button`
  ${tw`bg-[#4094EF] text-base text-white py-1 px-3 rounded-md`};
`;
