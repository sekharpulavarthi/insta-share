import { BiCamera } from "react-icons/bi";
import {
  NoPostsViewContainer,
  NoPostsViewSubContainer,
  NoPostsViewTest,
} from "./styledComponents";

const NoPostsView = () => {
  return (
    <NoPostsViewContainer>
      <NoPostsViewSubContainer>
        <BiCamera className="w-12 h-11" />
      </NoPostsViewSubContainer>
      <NoPostsViewTest>No Posts Yet</NoPostsViewTest>
    </NoPostsViewContainer>
  );
};

export default NoPostsView;
