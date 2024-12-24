import { useState } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const CustomPopoverConfirm = ({ children, button, onConfirm }) => {
    const [open, setOpen] = useState(false);
    return (
        <Popover modal={true} open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="w-full bg-white">
                {button || <Button>Delete</Button>}
            </PopoverTrigger>
            <PopoverContent className='bg-white'>
                {children || (
                    <>
                        <div>This action cannot be undone, are you sure?</div>
                        <div className="flex justify-end gap-2">
                            <Button
                                onClick={() => setOpen(false)}
                                size={"sm"}
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant={"destructive"}
                                size={"sm"}
                                onClick={() => {
                                    if (onConfirm) {
                                        onConfirm();
                                    }
                                    setOpen(false);
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </>
                )}
            </PopoverContent>
        </Popover>
    );
};
