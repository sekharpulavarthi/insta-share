import Cookies from "js-cookie";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { IoIosMenu } from "react-icons/io";
import {
  HeaderDiv,
  HeaderLeftPart,
  LogoLink,
  LogoDiv,
  InstaIcon,
  InstaVector,
  InstaLogoText,
  SearchDiv,
  SearchInput,
  SearchButton,
  SearchIcon,
  LinkDiv,
  HomeLink,
  ProfileLink,
  LogoutButton,
  HeaderContainer,
  SearchText,
  HeaderLinkMobileDiv,
} from "./styledComponents";

const Header = (props) => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const [shouldShowSearchInput, setShouldShowSearchInput] = useState(false);
  const [shouldShowMenuItems, setShouldShowMenuItems] = useState(false);
  const match = useRouteMatch();
  const { path } = match;

  const onClickLogout = () => {
    const jwtToken = Cookies.get("jwt_token");
    Cookies.remove(jwtToken);
    history.replace("/login");
  };

  const onClickSearch = () => {
    history.replace(`/posts?search=${searchInput}`);
  };

  const renderSearchInput = () => (
    <SearchDiv>
      <SearchInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        type="search"
        placeholder="Search Caption"
      />
      <SearchButton onClick={onClickSearch}>
        <SearchIcon
          src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700586565/searchsearch-icon_dwqyt4.svg"
          alt="search-icon"
        />
      </SearchButton>
    </SearchDiv>
  );

  return (
    <HeaderContainer>
      <div className="w-[75%]">
        <HeaderDiv>
          <HeaderLeftPart>
            <LogoLink to="/">
              <LogoDiv>
                <InstaIcon
                  src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700496060/Vectorinsta-share-icon_pcz8o9.png"
                  alt=""
                />
                <InstaVector
                  src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700495613/Vector_1x_ujdtu3.png"
                  alt=""
                />
              </LogoDiv>
              <InstaLogoText>Insta Share</InstaLogoText>
            </LogoLink>
          </HeaderLeftPart>

          <LinkDiv>
            {renderSearchInput()}
            <HomeLink to="/" path={path}>
              Home
            </HomeLink>
            <ProfileLink to="/my-profile" path={path}>
              Profile
            </ProfileLink>
            <LogoutButton onClick={onClickLogout}>Logout</LogoutButton>
          </LinkDiv>
          <HeaderLinkMobileDiv>
            {shouldShowMenuItems ? (
              <div className="flex items-center">
                <HomeLink to="/" path={path}>
                  Home
                </HomeLink>
                {shouldShowSearchInput && (
                  <SearchText
                    onClick={() => {
                      setShouldShowSearchInput(true);
                      setShouldShowMenuItems(false);
                    }}
                  >
                    Search
                  </SearchText>
                )}
                <ProfileLink to="/my-profile" path={path}>
                  Profile
                </ProfileLink>
                <LogoutButton onClick={onClickLogout}>Logout</LogoutButton>
              </div>
            ) : (
              <IoIosMenu
                onClick={() => {
                  setShouldShowMenuItems(true);
                  setShouldShowSearchInput(false);
                }}
              />
            )}
          </HeaderLinkMobileDiv>
        </HeaderDiv>
        <>{shouldShowSearchInput && renderSearchInput()}</>
      </div>
    </HeaderContainer>
  );
};

export default Header;
