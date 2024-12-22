import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { emailLogin } from "../../Slices/AuthenSlice";
// import OtpVerification from "./OtpVerification";
import SignUp from "./SignUp";
import GoogleButton from "./googleButton";
import { loginSuccess } from "../../Slices/AuthenSlice";

const Login = ({ showLoginModal, closeLoginModal, onLoginSuccess }) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("20521920@gm.uit.edu.vn");
  const [password, setPassword] = useState("12345678");
  const [otpVisible, setOtpVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const token = await result.user.getIdToken();
  //     dispatch(googleLogin(token));
  //     setOtpVisible(true);
  //   } catch (error) {
  //     console.error("Google login error:", error);
  //   }
  // };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(emailLogin({ email, password })).unwrap();
      if (response.status === "OK") {
        const { data, access_token, refresh_token } = response; // Destructure the result
        dispatch(loginSuccess({ user: data, accessToken: access_token, refreshToken: refresh_token }));
        alert("Login sucessfully!");
      } else {
        console.error("Login failed:", response.message);
      }
    } catch (error) {
      console.error("Email login error:", error);
    }
  };


  const handleBackToLogin = () => {
    // setOtpVisible(false);
    // setSignUpVisible(false);
  };

  const handleCloseModal = () => {
    closeLoginModal(false);
    // setOtpVisible(false);
    setSignUpVisible(false);
    setEmail("");
    setPassword("");
  };

  return (
    <Modal show={showLoginModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <img src={logo} alt="Logo" style={{ width: "40%" }} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "2rem 4rem" }}>
        <div className="text-center">
          {signUpVisible ? (
            <SignUp
              showLoginModal={showLoginModal}
              closeLoginModal={closeLoginModal}
              onBack={handleBackToLogin}
            />
          ) : (
            <form onSubmit={handleEmailLogin}>
              <h4 className="text-success-s2 font-weight-bold">Welcome Back</h4>
              <h6 className="text-secondary">
                Login with your email & password
              </h6>

              <div className="mt-4">
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  aria-label="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="input-group mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-success"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      <i
                        className={
                          showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                        }
                      />
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  style={{ padding: "0.7rem 0.2rem" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>

              <p style={{ fontSize: "1rem", margin: "0.7rem 0rem" }}>or</p>

              <div className="mt-3">
                <div className="d-flex justify-content-center">
                  <GoogleButton />
                </div>
              </div>

              <p style={{ fontSize: "1rem", margin: "0.7rem 0rem" }}>
                Don't have an account?
                <button
                  className="btn btn-link p-0 text-success-s2 ml-1"
                  onClick={() => {
                    setSignUpVisible(true);
                    setOtpVisible(false);
                  }}
                >
                  Sign Up
                </button>
              </p>
            </form>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
