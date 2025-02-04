import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify"; // Added import for ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Ensure Toastify styles are imported
import logo from "../../assets/logo.png";
import "../Users.css";
import { emailLogin } from "../../Slices/AuthenSlice"; // Adjust path if necessary
import { loginSuccess } from "../../Slices/AuthenSlice";
import GoogleButton from "../UserPages/googleButton";
import { Input } from "../ui/input";
const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dataInput, setDataInput] = useState({
    email: "minhthanh5346@gmail.com",
    password: "12345678",
  });
  // const [otpVisible, setOtpVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access auth state from Redux
  const { isAuth, user, error } = useSelector((state) => state.auth);

  // Notifications
  const successfulLoginNotification = () => {
    toast.success("Login successful!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const unSuccessfulLoginNotification = () => {
    toast.error("Login failed. Please try again.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const unAuthoriaztionLoginNotification = () => {
    toast.error("Unauthorized access. Admin only.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  // Redirect if authenticated and admin
  useEffect(() => {
    if (isAuth && user?.isAdmin === true) {
      navigate("/admin/dashboard");
    } else if (isAuth && user?.isAdmin === false) {
      unAuthoriaztionLoginNotification();
      navigate("/");
    }
  }, [isAuth, navigate, user]);

  // useEffect(() => {
  //   if (isAuth && user?.isAdmin === true) {
  //     navigate("/admin/dashboard");
  //   } else if (isAuth && user?.isAdmin === false) {
  //     unAuthoriaztionLoginNotification();
  //     navigate("/");
  //   }
  // }, [isAuth, navigate, user]);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataInput((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle login submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(emailLogin(dataInput)).unwrap();
      if (response.status === "OK") {
        successfulLoginNotification();
        const { data, access_token, refresh_token } = response; // Destructure the result
        console.log("response", response);
        dispatch(
          loginSuccess({
            user: data,
            accessToken: access_token,
            refreshToken: refresh_token,
          })
        );
        alert("Login sucessfully!");
        // setOtpVisible(true); // Show OTP verification step
      } else {
        unSuccessfulLoginNotification();
      }
    } catch (error) {
      unSuccessfulLoginNotification();
      console.error("Email login error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-admin">
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>
            <img src={logo} alt="Admin Login" style={{ width: "40%" }} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "2rem 4rem", paddingBottom: "4rem" }}>
          <div className="text-center">
            <h4 className="text-success-s2 font-weight-bold">
              Welcome Back, Admin.
            </h4>
            <h6 className="text-secondary">Login with your email & password</h6>

            {error && (
              <Alert variant="danger">
                <Alert.Heading className="h6 my-0">{error}</Alert.Heading>
              </Alert>
            )}

            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  value={dataInput.email}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  placeholder="Admin's email"
                  aria-label="Admin's email"
                  required
                />
                <div className="input-group mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={dataInput.password}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Admin's password"
                    aria-label="Admin's password"
                    required
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className="btn btn-outline-success input-group-append"
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <i
                      className={
                        showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    />
                  </button>
                </div>
                <button
                  className="btn btn-success w-100"
                  style={{ padding: "0.7rem 0.2rem" }}
                  type="submit"
                >
                  Login
                </button>
                <p style={{ fontSize: "1rem", margin: "0.7rem 0rem" }}>or</p>

                <div className="mt-3">
                  <div className="d-flex justify-content-center">
                    <GoogleButton />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer /> {/* Added ToastContainer here */}
    </div>
  );
};

export default AdminLogin;
