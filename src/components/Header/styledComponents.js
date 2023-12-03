import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const HeaderContainer = styled.div`
  ${tw`w-full flex justify-center bg-white`};
`;

export const HeaderDiv = styled.div`
  ${tw`flex justify-between h-[64px] bg-[#FFF] border-b-[#DBDBDB] py-8 items-center w-full`};
`;

export const HeaderLeftPart = styled.div`
  ${tw`flex items-center w-[50%]`};
`;

export const LogoLink = styled(Link)`
  ${tw`flex items-center`};
`;

export const LogoDiv = styled.div`
  ${tw`h-10 w-20 flex flex-col items-center relative`};
`;

export const InstaIcon = styled.img`
  ${tw`w-10 h-6`};
`;

export const InstaVector = styled.img`
  ${tw`w-[59px] h-6 absolute top-2`};
`;

export const InstaLogoText = styled.p`
  ${tw`w-[102px] h-[24px] font-bold`};
`;

export const SearchDiv = styled.div`
  ${tw`flex border border-[#DBDBDB]`};
`;

export const SearchInput = styled.input`
  ${tw`bg-[#FAFAFA] pl-2 w-[180px] h-[26px] outline-none`};

  @media (max-width: 768px) {
    ${tw`w-[280px]`}
  }

  @media (min-width: 769px) {
    ${tw`w-[180px]`}
  }
`;

export const SearchButton = styled.button`
  ${tw`w-[34px] h-[26px] bg-[#DBDBDB] flex items-center justify-center`};
`;

export const SearchIcon = styled.img`
  ${tw`w-[10px] h-[10px]`};
`;

export const LinkDiv = styled.div`
  ${tw`flex items-center justify-around w-[50%]`};
`;

export const HomeLink = styled(Link)`
  ${tw`text-xs font-bold`}
  color: ${(props) => props.path === "/" && "#4094EF"};
`;

export const ProfileLink = styled(Link)`
  ${tw`text-xs font-bold`};
  color: ${(props) => props.path === "/my-profile" && "#4094EF"};
`;

export const LogoutButton = styled.button`
  ${tw`text-white text-xs w-[86px] rounded-sm py-2 px-5 bg-[#4094EF] ml-6`};
`;

export const SearchText = styled.p`
  ${tw`text-xs font-bold`}
`;

export const HeaderDiv1 = styled.div`
  ${tw``}
`;

export const HeaderMobileViewItemsDiv = styled.div`
  ${tw`flex items-center border justify-around`}
`;

export const SearchDivMobileViewContainer = styled.div`
  ${tw`w-full flex items-center justify-center`}
`;
