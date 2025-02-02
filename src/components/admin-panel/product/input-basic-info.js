import React, { useState, useEffect } from "react";
import { useNewProductProvider } from "../../../hooks/use-new-product-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useStepper } from "../../ui/stepper/Stepper.tsx";
import { useDispatch } from "react-redux";
import { getAllUniqueIndexName } from "../../../Slices/UserSlice";
import { Select } from "../../ui/select";
const InputBasicInfo = () => {
  const { product, setProduct } = useNewProductProvider();
  const dispatch = useDispatch();
  const [basicInfo, setBasicInfo] = useState({
    name: product?.name || "",
    category: product?.category || "",
    color: product?.color || "",
    description: product?.description || "",
    index_name: product?.index_name || "",
    price: product?.price || "",
    total_stock: product?.total_stock || "",
  });
  const [uniqueIndexName, setUniqueIndexName] = useState(null);

  useEffect(() => {
    const fetchUniqueIndexName = async () => {
      const result = await dispatch(getAllUniqueIndexName()).unwrap();
      setUniqueIndexName(result?.index_names); // Store the result in state
      console.log("unique_index_name", uniqueIndexName);
    };

    fetchUniqueIndexName();
  }, [dispatch]);

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
        value={basicInfo?.name}
        onChange={handleChange}
        placeholder="Name"
        className="input"
        required
      />
      <Input
        type="text"
        name="category"
        value={basicInfo?.category}
        onChange={handleChange}
        placeholder="category"
        className="input"
        required
      />
      <Input
        type="text"
        name="color"
        value={basicInfo?.color}
        onChange={handleChange}
        placeholder="color"
        className="input"
        required
      />
      <Input
        type="text"
        name="description"
        value={basicInfo?.description}
        onChange={handleChange}
        placeholder="description...."
        className="input"
      />
      <select
        name="index_name"
        value={basicInfo?.index_name}
        onChange={handleChange}
        className="input flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 input"
      >
        <option value="">Select an index name</option>
        {uniqueIndexName?.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      <Input
        type="number"
        name="Product Price"
        value={basicInfo?.price}
        onChange={handleChange}
        placeholder="$0.00"
        className="input"
      />
      <Input
        type="number"
        name="Intial Stock"
        value={basicInfo?.total_stock}
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
