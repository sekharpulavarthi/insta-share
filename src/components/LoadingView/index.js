import Loader from "react-loader-spinner";
import { LoadingViewContainer, LoadingViewDiv } from "./styledComponents";

const LoadingView = () => (
  <LoadingViewContainer>
    <LoadingViewDiv className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </LoadingViewDiv>
  </LoadingViewContainer>
);

export default LoadingView;
