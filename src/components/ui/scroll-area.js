import React, { Component } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../lib/utils";

class ScrollArea extends Component {
  render() {
    const { className, children, ...props } = this.props;

    return (
      <ScrollAreaPrimitive.Root
        ref={this.props.forwardedRef}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  }
}

class ScrollBar extends Component {
  render() {
    const { className, orientation = "vertical", ...props } = this.props;

    return (
      <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={this.props.forwardedRef}
        orientation={orientation}
        className={cn(
          "flex touch-none select-none transition-colors",
          {
            vertical: "h-full w-2.5 border-l border-transparent p-[1px]",
            horizontal: "h-2.5 w-full flex-col border-t border-transparent p-[1px]",
          }[orientation],
          className
        )}
        {...props}
      >
        <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
  }
}

export { ScrollArea, ScrollBar };
