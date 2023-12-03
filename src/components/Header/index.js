import Cookies from "js-cookie";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useRouteMatch,
  withRouter,
} from "react-router-dom/cjs/react-router-dom.min";
import { IoIosMenu, IoMdCloseCircle } from "react-icons/io";

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
  HeaderDiv1,
  HeaderMobileViewItemsDiv,
  SearchDivMobileViewContainer,
} from "./styledComponents";

const Header = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const [shouldShowSearchInput, setShouldShowSearchInput] = useState(false);
  const [shouldShowMenuItems, setShouldShowMenuItems] = useState(false);

  const match = useRouteMatch();

  const { path } = match;
  const [currentPath, setCurrentPath] = useState(path);

  const shouldDisplayonMinDevice = window.matchMedia("(max-width: 768px)")
    .matches;

  const onClickLogout = () => {
    const jwtToken = Cookies.get("jwt_token");
    Cookies.remove(jwtToken);
    history.replace("/login");
  };

  const onClickSearch = () => {
    if (searchInput === "") {
      history.replace("/");
    } else history.replace(`/posts?search=${searchInput}`);
  };

  const onEnterSearchInput = (event) => {
    if (event.key === "Enter") {
      onClickSearch();
    }
  };

  const renderSearchInput = () => (
    <SearchDiv>
      <SearchInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        type="search"
        placeholder="Search Caption"
        onKeyDown={(e) => onEnterSearchInput(e)}
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
      <HeaderDiv1 className="w-[75%]">
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

          {shouldDisplayonMinDevice ? (
            <IoIosMenu
              className="w-6 h-6"
              onClick={() => {
                setShouldShowMenuItems(true);
                setShouldShowSearchInput(false);
              }}
            />
          ) : (
            <LinkDiv>
              {renderSearchInput()}

              <HomeLink
                to="/"
                onClick={() => setCurrentPath("/")}
                path={currentPath}
              >
                Home
              </HomeLink>

              <ProfileLink
                to="/my-profile"
                onClick={() => setCurrentPath("/my-profile")}
                path={currentPath}
              >
                Profile
              </ProfileLink>

              <LogoutButton onClick={onClickLogout}>Logout</LogoutButton>
            </LinkDiv>
          )}
        </HeaderDiv>
        {shouldShowMenuItems && (
          <HeaderMobileViewItemsDiv>
            <HomeLink
              to="/"
              onClick={() => setCurrentPath("/")}
              path={currentPath}
            >
              Home
            </HomeLink>

            {!shouldShowSearchInput && (
              <SearchText
                onClick={() => {
                  setShouldShowSearchInput(true);
                  setShouldShowMenuItems(false);
                }}
              >
                Search
              </SearchText>
            )}

            <ProfileLink
              to="/my-profile"
              onClick={() => setCurrentPath("/")}
              path={currentPath}
            >
              Profile
            </ProfileLink>

            <LogoutButton onClick={onClickLogout}>Logout</LogoutButton>
            <IoMdCloseCircle
              className="w-6 h-6"
              onClick={() => {
                setShouldShowMenuItems(false);
              }}
            />
          </HeaderMobileViewItemsDiv>
        )}
        <SearchDivMobileViewContainer>
          {shouldShowSearchInput && renderSearchInput()}
        </SearchDivMobileViewContainer>
      </HeaderDiv1>
    </HeaderContainer>
  );
};

export default withRouter(Header);
