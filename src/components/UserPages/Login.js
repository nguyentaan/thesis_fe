import React from "react";
import { Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";

const Login = (props) => {
  return (
    <div>
      <Modal
        show={props.showLoginModal}
        onHide={() => props.closeLoginModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={logo} alt="Logo" style={{ width: "40%" }} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "2rem 4rem" }}>
          <Modal.Title>
            <div className="text-center">
              <form>
                <h4 className="text-success-s2 font-weight-bold">
                  Welcome Back
                </h4>
                <h6 className="text-secondary">
                  Login with your email & password
                </h6>

                <div className="mt-4">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Email"
                    aria-label="Recipient's username"
                  />
                  <div className="input-group mb-2">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
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
                  >
                    Login
                  </button>
                </div>

                <p style={{ fontSize: "1rem", margin: "0.7rem 0rem" }}>or</p>

                <div>
                  <button
                    type="button"
                    className="btn btn-danger w-100 d-flex d-row justify-content-center"
                    style={{ padding: "0.7rem 0.2rem" }}
                  >
                    <i className="fab fa-google fa-lg align-self-center mr-3" />
                    Login with Google
                  </button>
                </div>

                <p style={{ fontSize: "1rem", margin: "0.7rem 0rem" }}>
                  Don't have any account?
                  <button className="btn btn-link p-0 text-success-s2 ml-1">
                    Sign Up
                  </button>
                </p>
              </form>
            </div>
          </Modal.Title>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
