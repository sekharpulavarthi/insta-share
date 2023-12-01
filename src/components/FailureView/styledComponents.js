import tw from "twin.macro";
import styled from "styled-components";

export const FailureViewContainer = styled.div`
  ${tw`w-full flex justify-center h-screen`};
`;

export const FailureViewDiv = styled.div`
  ${tw`w-[75%] flex justify-center items-center border`};
`;

export const ErrorContainer = styled.div`
  ${tw`flex flex-col justify-center items-center w-[50%]`};
`;

export const ErrorIcon = styled.img`
  ${tw`w-12 h-12 mb-4`};
`;

export const ErrorMessage = styled.p`
  ${tw`text-base mb-4`};
`;

export const RetryButton = styled.button`
  ${tw`bg-[#4094EF] text-base text-white py-1 px-3 rounded-md`};
`;
