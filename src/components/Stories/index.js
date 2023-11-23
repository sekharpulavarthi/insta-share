import Cookies from "js-cookie";
import { useEffect, useState } from "react";

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
    console.log(jsonData);
  };

  return (
    <div>
      <h1>Qwerty</h1>
    </div>
  );
};

export default Stories;
