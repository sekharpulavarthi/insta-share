import tw from "twin.macro";
import styled from "styled-components";

export const FormContainer = styled.div`
  ${tw`flex items-center justify-center h-screen`};
`;

export const LoginImg = styled.img`
  ${tw`w-[582px] h-[373px] mr-10`};
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const LoginForm = styled.form`
  ${tw`w-[456px] h-[490px] flex flex-col items-center shadow-lg pt-12`};

  @media (max-width: 576px) {
    ${tw`w-[360px] h-[640px]`};
  }
`;

export const IconContainerDiv = styled.div`
  ${tw`flex flex-col items-center`};
`;

export const IconContainer = styled.div`
  ${tw`h-10 w-20 flex flex-col items-center relative`};
`;

export const IconTopPart = styled.img`
  ${tw`w-12 h-6`};
`;

export const IconBottomPart = styled.img`
  ${tw`w-20 h-6 absolute top-3`};
`;

export const LogoText = styled.p`
  ${tw`w-[122px] h-[32px] font-bold text-center mb-8`};
`;
export const InputContainer = styled.div`
  ${tw`flex flex-col`};
`;

export const InputLabel = styled.label`
  ${tw`w-[65px] h-4 font-bold mb-3`};
`;

export const LoginInput = styled.input`
  ${tw`w-[360px] bg-[#EEEEEE] h-10 mb-6 pl-4 focus:outline-none`};
  @media (max-width: 576px) {
    ${tw`w-[312px]`};
  }
`;

export const ErrorMessage = styled.p`
  ${tw`text-[#EF4444] self-start ml-12`};
`;

export const LoginButton = styled.button`
  ${tw`text-white bg-[#4094EF] w-[360px] h-10 rounded-md mt-6`};
  @media (max-width: 576px) {
    ${tw`w-[312px]`};
  }
`;
