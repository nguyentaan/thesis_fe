import React, { useState } from "react";
import { useNewProductProvider } from "../../../hooks/use-new-product-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useStepper } from "../../ui/stepper/Stepper.tsx";

const InputBasicInfo = () => {
  const { product, setProduct } = useNewProductProvider();
  const [basicInfo, setBasicInfo] = useState({
    name: product?.name || "",
    category: product?.category || "",
    color: product?.color || "",
    description: product?.description || "",
    price: product?.price || "",
    total_stock: product?.total_stock || "",
  });

  const { nextStep } = useStepper();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo({ ...basicInfo, [name]: value });
    setError(""); // Clear error when input changes
  };

  const handleNext = () => {
    const { name, category, color } = basicInfo;
    if (!name || !category || !color) {
      setError("Please fill in all required fields.");
      return;
    }
    setProduct({ ...product, ...basicInfo });
    nextStep();
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        name="name"
        value={basicInfo.name}
        onChange={handleChange}
        placeholder="Name"
        className="input"
        required
      />
      <Input
        type="text"
        name="category"
        value={basicInfo.category}
        onChange={handleChange}
        placeholder="category"
        className="input"
        required
      />
      <Input
        type="text"
        name="color"
        value={basicInfo.color}
        onChange={handleChange}
        placeholder="color"
        className="input"
        required
      />
      <Input
        type="text"
        name="description"
        value={basicInfo.description}
        onChange={handleChange}
        placeholder="description...."
        className="input"
      />
      <Input
        type="number"
        name="Product Price"
        value={basicInfo.price}
        onChange={handleChange}
        placeholder="$0.00"
        className="input"
      />
      <Input
        type="number"
        name="Intial Stock"
        value={basicInfo.total_stock}
        onChange={handleChange}
        placeholder="0"
        className="input"
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={handleNext} className="btn-primary">
        Next
      </Button>
    </div>
  );
};

export default InputBasicInfo;
