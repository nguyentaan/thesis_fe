import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { auth, googleProvider } from "../../firebaseConfig";
import { emailLogin, googleLogin } from "../../Slices/AuthenSlice";
import { signInWithPopup } from "firebase/auth";
import OtpVerification from "./OtpVerification";
import SignUp from "./SignUp";

const Login = ({ showLoginModal, closeLoginModal }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      dispatch(googleLogin(token));
      setOtpVisible(true);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(emailLogin({ email, password }));
      setOtpVisible(true);
    } catch (error) {
      console.error("Email login error:", error);
    }
  };

  const handleBackToLogin = () => {
    setOtpVisible(false);
    setSignUpVisible(false);
  };

  const handleCloseModal = () => {
    closeLoginModal(false);
    setOtpVisible(false);
    setSignUpVisible(false);
    setEmail("");
    setPassword("");
  };

  return (
    <Modal
      show={showLoginModal}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <img src={logo} alt="Logo" style={{ width: "40%" }} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "2rem 4rem" }}>
        <div className="text-center">
          {otpVisible ? (
            <OtpVerification email={email} password={password} onBack={handleBackToLogin} />
          ) : signUpVisible ? (
            <SignUp showLoginModal={showLoginModal} closeLoginModal={closeLoginModal} onBack={handleBackToLogin} />
          ) : (
            <form onSubmit={handleEmailLogin}>
              <h4 className="text-success-s2 font-weight-bold">Welcome Back</h4>
              <h6 className="text-secondary">Login with your email & password</h6>

              <div className="mt-4">
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-group mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-success" type="button" onClick={togglePasswordVisibility}>
                      <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
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

              <button
                type="button"
                className="btn btn-danger w-100 d-flex justify-content-center"
                style={{ padding: "0.7rem 0.2rem" }}
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <i className="fab fa-google fa-lg align-self-center mr-3" />
                {isLoading ? "Signing in with Google..." : "Login with Google"}
              </button>

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
