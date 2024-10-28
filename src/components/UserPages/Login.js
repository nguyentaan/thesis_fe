import React from "react";
import { Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
// import { auth, googleProvider } from "../../firebaseConfig";
// import { googleLogin } from "../../Slices/AuthenSlice";
// import { signInWithPopup } from "firebase/auth";
import GoogleButton from "./googleButton";

const Login = ({ showLoginModal, closeLoginModal, onLoginSuccess }) => {
  // const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  // Handles Google Sign-In and dispatches token to the backend
  // const handleGoogleLogin = async () => {
  //   try {
  //     console.log("Google Provider:", googleProvider); // Log to check if it's defined
  //     console.log("Auth:", auth); // Log to check if it's defined

  //     const result = await signInWithPopup(auth, googleProvider); // Pass auth as the first argument
  //     console.log(result);

  //     const token = await result.user.getIdToken();
  //     dispatch(googleLogin(token));
  //   } catch (error) {
  //     console.error("Google login error:", error);
  //   }
  // };

  // Placeholder for form submission logic if needed
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add email/password login handling here
    const loginSuccessful = true; // Replace this with your actual login logic
    if (loginSuccessful) {
      onLoginSuccess(); // Close the modal on success
    }
  };

  return (
    <Modal show={showLoginModal} onHide={() => closeLoginModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          <img src={logo} alt="Logo" style={{ width: "40%" }} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "2rem 4rem" }}>
        <div className="text-center">
          <form onSubmit={handleFormSubmit}>
            <h4 className="text-success-s2 font-weight-bold">Welcome Back</h4>
            <h6 className="text-secondary">Login with your email & password</h6>

            <div className="mt-4">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Email"
                aria-label="Email"
                required
              />
              <div className="input-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-success" type="button">
                    <i className="fas fa-eye" />
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

            {/* <button
              type="button"
              className="btn btn-danger w-100 d-flex justify-content-center"
              style={{ padding: "0.7rem 0.2rem" }}
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <i className="fab fa-google fa-lg align-self-center mr-3" />
              {isLoading ? "Signing in with Google..." : "Login with Google"}
            </button> */}
            <div className="mt-3">
              <div className="d-flex justify-content-center">
                <GoogleButton />
              </div>
            </div>

            <p style={{ fontSize: "1rem", margin: "0.7rem 0rem" }}>
              Don't have an account?
              <button className="btn btn-link p-0 text-success-s2 ml-1">
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
