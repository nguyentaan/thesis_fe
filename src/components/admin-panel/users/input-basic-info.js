import React, { useState } from "react";
import { useNewUserProvider } from "../../../hooks/use-new-user-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useStepper } from "../../ui/stepper/Stepper.tsx";

const InputBasicInfo = () => {
  const { user, setUser } = useNewUserProvider();
  const [basicInfo, setBasicInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });

  const { nextStep } = useStepper();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo({ ...basicInfo, [name]: value });
    setError(""); // Clear error when input changes
  };

  const handleNext = () => {
    const { name, email, phone } = basicInfo;
    if (!name || !email || !phone) {
      setError("Please fill in all required fields.");
      return;
    }
    setUser({ ...user, ...basicInfo });
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
        type="email"
        name="email"
        value={basicInfo.email}
        onChange={handleChange}
        placeholder="Email"
        className="input"
        required
      />
      <Input
        type="number"
        name="phone"
        value={basicInfo.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="input"
        required
      />
      <Input
        type="text"
        name="avatar"
        value={basicInfo.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
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
