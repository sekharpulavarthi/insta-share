import { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import {
  FormContainer,
  LoginImg,
  LoginForm,
  IconContainerDiv,
  IconContainer,
  IconTopPart,
  IconBottomPart,
  LogoText,
  InputContainer,
  InputLabel,
  LoginInput,
  ErrorMessage,
  LoginButton,
} from "./styledComponents";

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
    <FormContainer>
      <LoginImg
        src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700579963/Layer_2login-page-img_nqgn3p.png"
        alt="login-page-img"
      />
      <LoginForm onSubmit={onSubmitForm}>
        <IconContainerDiv>
          <IconContainer>
            <IconTopPart
              src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700496060/Vectorinsta-share-icon_pcz8o9.png"
              alt=""
            />
            <IconBottomPart
              src="https://res.cloudinary.com/dafvz3qwu/image/upload/v1700495613/Vector_1x_ujdtu3.png"
              alt=""
            />
          </IconContainer>
          <LogoText>Insta Share</LogoText>
        </IconContainerDiv>

        <InputContainer>
          <InputLabel htmlFor="username">USERNAME</InputLabel>
          <LoginInput
            id="username"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="password">PASSWORD</InputLabel>
          <LoginInput
            id="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        {shouldShowError && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
    </FormContainer>
  );
};

export default LoginPage;
