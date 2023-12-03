import tw from "twin.macro";
import styled from "styled-components";

export const StoryItemContainer = styled.li`
  ${tw`w-[70px]`}
`;

export const StoryImg = styled.img`
  ${tw`w-[70px] h-[70px] rounded-full`}
  @media (max-width: 768px) {
    ${tw`w-[50px] h-[50px]`}
  }
`;

export const StoryUserName = styled.p`
  ${tw`mt-2 text-xs overflow-hidden whitespace-nowrap overflow-ellipsis`}
  @media (max-width: 567px) {
    ${tw`w-[50px] h-[50px]`}
  }
`;
