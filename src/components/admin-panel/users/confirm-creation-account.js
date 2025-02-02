import React, { useState } from "react";
import { useNewUserProvider } from "../../../hooks/use-new-user-form";
import { Button } from "../../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { createUser } from "../../../Slices/AuthenSlice"; // Adjust the path if necessary
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import axios from "axios"; 

const ConfirmCreationAccount = () => {
  const { user } = useNewUserProvider(); // Fetch user data from context
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false); // Local loading state
  const navigate = useNavigate();

  const successfulRegisterNotification = () => {
    toast.success("Account created successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const unSuccessfulRegisterNotification = (message) => {
    toast.error(`Account creation failed: ${message}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Direct axios request instead of using dispatch
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name: user?.name,
        email: user?.email,
        password: user?.password,
        phoneNumber: user?.phone,
        avatar: user?.avatar,
        isAdmin: user?.isAdmin,
      });
  
      console.log("response", response);
  
      if (response.data.status === "OK") {
        successfulRegisterNotification();
        navigate("/admin/users"); // Navigate to /admin/users instead of /login
      } else {
        unSuccessfulRegisterNotification(response.data.message || "Unknown error");
      }
    } catch (error) {
      unSuccessfulRegisterNotification(error.message || "Server error");
      console.error("Account creation error:", error);
    } finally {
      setIsSubmitting(false); // Stop loading after the process finishes
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer />
      <div>
        <h3 className="text-lg font-semibold">Confirm Details</h3>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Phone:</strong> {user?.phone}
        </p>
        <p>
          <strong>Avatar:</strong> {user?.avatar}
        </p>
        <p>
          <strong>Admin Role:</strong> {user?.isAdmin ? "Yes" : "No"}
        </p>
      </div>
      <Button
        onClick={handleSubmit}
        className="btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Confirm and Create"}
      </Button>
    </div>
  );
};

export default ConfirmCreationAccount;
