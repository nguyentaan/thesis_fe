import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { cn } from "../../lib/utils";
import { useState, useImperativeHandle, forwardRef } from "react";

const DialogCustom = (
  {
    children,
    button,
    title,
    description,
    footer,
    noButton,
    noFooter,
    size,
    headerClassName,
  },
  ref
) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
        close,
      };
    },
    []
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {noButton ? null : button ?? <Button variant="outline">Open</Button>}
      </DialogTrigger>
      <DialogContent
        className={cn(
          "overflow-y-auto hover:overflow--scroll overflow-x-hidden inline-block max-w-screen-xl",
          size === "sm" && "w-[640px]",
          size === "md" && "w-[768px]",
          size === "lg" && "w-[1024px]",
          size === "xl" && "w-[1280px]"
        )}
      >
        <DialogHeader className={headerClassName}>
          <DialogTitle>{title ?? "Dialog Title"}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[640px]">
          {children?.({ open, close }) ?? (
            <div className="grid gap-4 py-4">Dialog Content</div>
          )}
        </div>
        <DialogFooter>
          {noFooter
            ? null
            : footer ?? (
                <DialogClose asChild>
                  <Button type="submit">Close</Button>
                </DialogClose>
              )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const CustomDialog = forwardRef(DialogCustom);
