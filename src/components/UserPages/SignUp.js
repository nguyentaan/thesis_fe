import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { auth, googleProvider } from "../../firebaseConfig";
import { googleLogin } from "../../Slices/AuthenSlice";
import { signInWithPopup } from "firebase/auth";

const SignUp = ({ showLoginModal, closeLoginModal, onBack }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      dispatch(googleLogin(token));
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleCloseModal = () => {
    // Reset states when closing the modal
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
    closeLoginModal(false); // Close the modal
    onBack();
  };


  const handleEmailSignUp = async (e) => {
    e.preventDefault();
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
          <form onSubmit={handleEmailSignUp}>
            <h4 className="text-success-s2 font-weight-bold">Welcome to Our Registration</h4>
            <h6 className="text-secondary">Fill in the following to create an account</h6>

            <div className="mt-4">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="What should we call you"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              <div className="input-group mb-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-success" type="button" onClick={toggleConfirmPasswordVisibility}>
                    <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                  </button>
                </div>
              </div>
              <input
                type="tel"
                className="form-control mb-2"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-success w-100"
                style={{ padding: "0.7rem 0.2rem" }}
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            <p style={{ fontSize: "1rem", margin: "0.7rem 0rem" }}>or</p>

            <button
              type="button"
              className="btn btn-danger w-100 d-flex justify-content-center"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <i className="fab fa-google fa-lg align-self-center mr-3" />
              {isLoading ? "Signing up with Google..." : "Sign Up with Google"}
            </button>

            <p style={{ fontSize: "1rem", margin: "0.7rem 0rem" }}>
              Already have an account?
              <button className="btn btn-link p-0 text-success-s2 ml-1" onClick={onBack}>
                Login
              </button>
            </p>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;
