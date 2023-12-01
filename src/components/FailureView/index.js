import {
  FailureViewContainer,
  ErrorIcon,
  FailureViewDiv,
  ErrorMessage,
  RetryButton,
  ErrorContainer,
} from "./styledComponents";

const FailureView = ({ onClickFunction }) => (
  <FailureViewContainer>
    <FailureViewDiv>
      <ErrorContainer>
        <ErrorIcon
          src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1701149344/alert-triangle_zn9pox.svg"
          alt="all-stories-error"
        />
        <ErrorMessage>Something went wrong. Please try again</ErrorMessage>
        <RetryButton onClick={onClickFunction}>Try again</RetryButton>
      </ErrorContainer>
    </FailureViewDiv>
  </FailureViewContainer>
);

export default FailureView;
