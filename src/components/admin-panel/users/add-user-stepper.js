"use client";
import React from "react";

import {
    Step,
    Stepper,
} from "../../ui/stepper/Stepper.tsx";
import ConfirmCreationAccount from "./confirm-creation-account";
import InputBasicInfo from "./input-basic-info";
import SelectAccountRole from "./select-account-role";
import { useEffect, useState } from "react";

const newUserSteps = [
    {
        id: "step_1",
        label: "Step 1",
        description: "Input Basic Info",
        form: <InputBasicInfo />,
    },
    {
        id: "step_2",
        label: "Step 2",
        description: "Select Account Role",
        form: <SelectAccountRole />,
    },
    {
        id: "step_3",
        label: "Step 3",
        description: "Create Account",
        form: <ConfirmCreationAccount />,
    },
];

const AddUserStepper = () => {
    const [steps, setSteps] = useState(newUserSteps);
    useEffect(() => {
        setSteps(newUserSteps);
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

export default AddUserStepper;