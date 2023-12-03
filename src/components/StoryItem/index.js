import {
  StoryItemContainer,
  StoryUserName,
  StoryImg,
} from "./styledComponents";

const StoryItem = (props) => {
  const { storyData } = props;
  const { storyUrl, userName } = storyData;

  return (
    <StoryItemContainer>
      <StoryImg src={storyUrl} alt={userName} />
      <StoryUserName>{userName}</StoryUserName>
    </StoryItemContainer>
  );
};

export default StoryItem;
