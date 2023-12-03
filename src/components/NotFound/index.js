import {
  NotFoundContainer,
  NotFoundDescriptionText,
  NotFoundSubContainer,
  NotFoundImg,
  NotFoundHeadingText,
  NotFoundButton,
} from "./styledComponents";

const NotFound = (props) => {
  const onClickHomeBtn = () => {
    const { history } = props;
    history.replace("/");
  };

  return (
    <NotFoundContainer>
      <NotFoundSubContainer>
        <NotFoundImg
          alt="page-not-found"
          src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1690380381/Group_1_gkti6y.png "
        />
        <NotFoundHeadingText>Page Not Found</NotFoundHeadingText>
        <NotFoundDescriptionText>
          We are sorry, the page you requested could not be found.Please go back
          to the homepage.
        </NotFoundDescriptionText>
        <NotFoundButton onClick={onClickHomeBtn} type="button">
          HomePage
        </NotFoundButton>
      </NotFoundSubContainer>
    </NotFoundContainer>
  );
};

export default NotFound;
