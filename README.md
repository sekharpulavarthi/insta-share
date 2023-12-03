// <HeaderLinkMobileDiv>
// {shouldShowMenuItems ? (
// <div className="flex items-center">
// <HomeLink to="/" path={path}>
// Home
// </HomeLink>
// {!shouldShowSearchInput && (
// <SearchText
// onClick={() => {
// setShouldShowSearchInput(true);
// setShouldShowMenuItems(false);
// }}
// >
// Search
// </SearchText>
// )}
// <ProfileLink to="/my-profile" path={path}>
// Profile
// </ProfileLink>
// <LogoutButton onClick={onClickLogout}>Logout</LogoutButton>
// </div>
// ) : (
// <IoIosMenu
// onClick={() => {
// setShouldShowMenuItems(true);
// setShouldShowSearchInput(false);
// }}
// />
// )}
// </HeaderLinkMobileDiv>
//<>{shouldShowSearchInput && renderSearchInput()}</>
