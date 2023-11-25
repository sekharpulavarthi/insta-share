import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Header from "../Header";
import StoryItem from "../StoryItem";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

const Stories = () => {
  const [storiesData, setStoriesData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getStoriesData();
  }, []);

  const getStoriesData = async () => {
    const jwtToken = Cookies.get("jwt_token");
    setApiStatus(apiStatusConstants.loading);
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      "https://apis.ccbp.in/insta-share/stories",
      options
    );
    const jsonData = await response.json();

    if (response.ok) {
      setApiStatus(apiStatusConstants.success);
      const updatedData = jsonData.users_stories.map((storyItem) => ({
        storyUrl: storyItem.story_url,
        userId: storyItem.user_id,
        userName: storyItem.user_name,
      }));
      setStoriesData(updatedData);
    }
  };

  const settings = {
    dots: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    infinite: false,
  };

  return (
    <div>
      {apiStatus === "Loading" ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex justify-around">
          <ul className="w-[75%] p-[40px] bg-[#FAFAFA]">
            <Slider {...settings}>
              {storiesData.map((storyItem) => (
                <StoryItem storyData={storyItem} key={storyItem.userId} />
              ))}
            </Slider>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stories;
