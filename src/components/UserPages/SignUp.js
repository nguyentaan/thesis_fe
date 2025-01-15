import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import GoogleButton from "./googleButton";
import { createUser } from "../../Slices/AuthenSlice"; // Adjust path if necessary
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const SignUp = ({ showLoginModal, closeLoginModal, onBack }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [dataInput, setDataInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const successfulRegisterNotification = () => {
    toast.success("Register successful!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const unSuccessfulRegisterNotification = () => {
    toast.error("Register failed. Please try again.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCloseModal = () => {
    // Reset dataInput when closing the modal
    setDataInput({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    });
    closeLoginModal(false); // Close the modal
    onBack();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, phoneNumber } = dataInput;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await dispatch(createUser({ name, email, password, phoneNumber })).unwrap();
      if (response.status === "OK") {
        successfulRegisterNotification();
        alert("Register successfully!");
        handleCloseModal();
      } else {
        unSuccessfulRegisterNotification();
      }
    } catch (error) {
      unSuccessfulRegisterNotification();
      console.error("Registration error:", error);
    }
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
            <h4 className="text-success-s2 font-weight-bold">
              Welcome to Our Registration
            </h4>
            <h6 className="text-secondary">
              Fill in the following to create an account
            </h6>

            <div className="mt-4">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="What should we call you"
                name="name"
                value={dataInput.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                name="email"
                value={dataInput.email}
                onChange={handleChange}
                required
              />
              <div className="input-group mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={dataInput.password}
                  onChange={handleChange}
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
              <div className="input-group mb-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={dataInput.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-success"
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <i
                      className={
                        showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    />
                  </button>
                </div>
              </div>
              <input
                type="tel"
                className="form-control mb-2"
                placeholder="Phone number"
                name="phoneNumber"
                value={dataInput.phoneNumber}
                onChange={handleChange}
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

            <div className="mt-3">
              <div className="d-flex justify-content-center">
                <GoogleButton />
              </div>
            </div>

            <p style={{ fontSize: "1rem", margin: "0.7rem 0rem" }}>
              Already have an account?
              <button
                className="btn btn-link p-0 text-success-s2 ml-1"
                onClick={onBack}
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </Modal.Body>
      <ToastContainer />
    </Modal>
  );
};

export default SignUp;
