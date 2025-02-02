"use client";
import React from "react";

import {
    Step,
    Stepper,
} from "../../ui/stepper/Stepper.tsx";
import ConfirmCreationAccount from "./confirm-creation-account.js";
import InputBasicInfo from "./input-basic-info.js";
import SelectUploadImage from "./select-upload-image.js";
import { useEffect, useState } from "react";

const newProductSteps = [
    {
        id: "step_1",
        label: "Step 1",
        description: "Input Basic Info",
        form: <InputBasicInfo />,
    },
    {
        id: "step_2",
        label: "Step 2",
        description: "Select Image",
        form: <SelectUploadImage />,
    },
    {
        id: "step_3",
        label: "Step 3",
        description: "Create Product",
        form: <ConfirmCreationAccount />,
    },
];

const AddProductStepper = () => {
    const [steps, setSteps] = useState(newProductSteps);
    useEffect(() => {
        setSteps(newProductSteps);
    }, []);
    return (
        <div className="flex w-full flex-col gap-4">
            <Stepper initialStep={0} steps={steps} variant="circle">
                {steps.map(({ id, label, description, form }) => (
                    <Step key={id} label={label} description={description}>
                        {form}
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}

export default AddProductStepper;