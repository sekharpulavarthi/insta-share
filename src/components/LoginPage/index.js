import { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [shouldShowError, setShouldShowError] = useState(false);

  const checkLoginCreds = async () => {
    const userDetails = { username, password };

    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetch("https://apis.ccbp.in/login", options);
    const jsonData = await response.json();
    console.log(jsonData);
    if (response.ok) {
      onSubmitSuccess(jsonData.jwt_token);
    } else {
      onSubmitFailure(jsonData.error_msg);
    }
  };

  const history = useHistory();

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    setShouldShowError(false);
    history.replace("/");
  };

  const onSubmitFailure = (errorMsg) => {
    setErrorMsg(errorMsg);
    setShouldShowError(true);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    checkLoginCreds();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700579963/Layer_2login-page-img_nqgn3p.png"
        alt="login-page-img"
        className="w-[582px] h-[373px] mr-10"
      />
      <form
        className="w-[456px] h-[490px] flex flex-col items-center shadow-lg pt-12"
        onSubmit={onSubmitForm}
      >
        <div className="flex flex-col items-center">
          <div className="h-10 w-20 flex flex-col items-center relative">
            <img
              src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700496060/Vectorinsta-share-icon_pcz8o9.png"
              alt=""
              className="w-12 h-6"
            />
            <img
              src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700495613/Vector_1x_ujdtu3.png"
              alt=""
              className="w-20 h-6 absolute top-3"
            />
          </div>
          <p className="w-[122px] h-[32px] font-bold text-center mb-8">
            Insta Share
          </p>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="w-[65px] h-4 font-bold font-roboto mb-3"
          >
            USERNAME
          </label>
          <input
            id="username"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="w-[360px] bg-[#EEEEEE] h-10 mb-6 pl-4 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="w-[65px] h-4 font-bold font-roboto mb-3"
          >
            PASSWORD
          </label>
          <input
            id="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-[360px] bg-[#EEEEEE] h-10 pl-4 focus:outline-none"
          />
        </div>
        {shouldShowError && (
          <p className="text-[#EF4444] self-start ml-12 ">{errorMsg}</p>
        )}
        <button
          type="submit"
          className="text-white bg-[#4094EF] w-[360px] h-10 rounded-md mt-6"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
