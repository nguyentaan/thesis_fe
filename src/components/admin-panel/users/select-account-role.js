import React, { useState } from "react";
import { useNewUserProvider } from "../../../hooks/use-new-user-form";
import { useStepper } from "../../ui/stepper/Stepper.tsx";
import { Label } from "../../ui/label.js";
import { Input } from "../../ui/input.js";
import { Button } from "../../ui/button.js";

const SelectAccountRole = () => {
    const { user, setUser } = useNewUserProvider();
    const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);

    const handleToggle = () => {
        setIsAdmin((prev) => !prev);
    };

    const handleNext = () => {
        setUser({ ...user, isAdmin });
        nextStep();
    };

    const { nextStep } = useStepper();


    return (
        <div className="flex flex-col gap-4">
            <Label className="flex items-center gap-2">
                <Input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={handleToggle}
                    className="checkbox w-auto"
                />
                Admin Role
            </Label>
            <Button onClick={handleNext} className="btn-primary">
                Next
            </Button>
        </div>
    );
};

export default SelectAccountRole;
