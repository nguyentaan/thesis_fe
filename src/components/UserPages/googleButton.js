import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../Slices/AuthenSlice";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GoogleButton = () => {  
  const dispatch = useDispatch();

  const onSuccess = (response) => {
    // console.log("Google login successful:", response);
    dispatch(googleLogin(response.credential)); // use response.credential for Google Login v2
  };

  const onFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div data-testid="google-button-component">
        <GoogleLogin
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          access_type="offline"
          prompt="consent"
          scope="profile email"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleButton;
