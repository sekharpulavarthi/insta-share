import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import StoryItem from "../StoryItem";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "react-loader-spinner";
import FailureView from "../FailureView";

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
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const settings = {
    dots: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    infinite: false,
  };

  const renderStoriesSuccessView = () => (
    <div className="flex justify-around bg-[#FAFAFA] h-[30%]">
      <ul className="w-[75%] p-[40px] ">
        <Slider {...settings}>
          {storiesData.map((storyItem) => (
            <StoryItem storyData={storyItem} key={storyItem.userId} />
          ))}
        </Slider>
      </ul>
    </div>
  );

  const renderLoadingView = () => (
    <div className="w-full flex justify-center items-center h-[200px]">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    </div>
  );

  const renderStoriesPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderStoriesSuccessView();
      case apiStatusConstants.failure:
        return <FailureView onClickFunction={getStoriesData} />;
      case apiStatusConstants.loading:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return <div>{renderStoriesPage()}</div>;
};

export default Stories;
