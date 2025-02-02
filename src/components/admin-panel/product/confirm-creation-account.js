import React, { useState } from "react";
import { useNewProductProvider } from "../../../hooks/use-new-product-form";
import { Button } from "../../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import axios from "axios";
import { useStepper } from "../../ui/stepper/Stepper.tsx";

const ConfirmCreationAccount = () => {
  const { prevStep } = useStepper();

  const { product } = useNewProductProvider(); // Fetch product data from context
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
      const response = await axios.post(`${API_URL}/api/products/create`, {
        name: product?.name,
        category: product?.category,
        color: product?.color,
        description: product?.description,
        total_stock: product?.total_stock,
        price: product?.price,
        image_url: product?.imageUrl,
        index_name: product?.index_name,
      });
      if (response.status === 200) {
        successfulRegisterNotification();
        navigate("/admin/products"); // Navigate to /admin/products instead of /login
      } else {
        unSuccessfulRegisterNotification(response.data.message || "Unknown error");
      }
    } catch (error) {
      unSuccessfulRegisterNotification(error.message || "Server error");
      console.error("Product creation error:", error);
    } finally {
      setIsSubmitting(false); // Stop loading after the process finishes
    }
  };

  const handleBack = () => {
    prevStep();
  };

  console.log("product", product?.imageUrl);

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer />
      <div>
        <h3 className="text-lg font-semibold">Confirm Details</h3>
        <p>
          <strong>Name:</strong> {product?.name}
        </p>
        <p>
          <strong>Category:</strong> {product?.category}
        </p>
        <p>
          <strong>Color:</strong> {product?.color}
        </p>
        <p>
          <strong>Description:</strong> {product?.description}
        </p>
        <p>
          <strong>Index Name:</strong> {product?.index_name}
        </p>
        <p>
          <strong>Price:</strong> {product?.price}
        </p>
        <p>
          <strong>Intial Stock:</strong> {product?.total_stock}
        </p>
        <p>
          <strong>Product Display:</strong>
        </p>
        <img
          src={product?.imageUrl || "placeholder.jpg"}
          alt={product?.name || "Product Image"}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "contain",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 items-center w-full">
        <Button onClick={handleBack} className="btn-primary">
          Prev
        </Button>
        <Button
          onClick={handleSubmit}
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Confirm and Create"}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmCreationAccount;
