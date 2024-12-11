import React, { Component } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils";

class Avatar extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <AvatarPrimitive.Root
        ref={this.props.forwardedRef}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      />
    );
  }
}

Avatar.displayName = AvatarPrimitive.Root.displayName;

class AvatarImage extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <AvatarPrimitive.Image
        ref={this.props.forwardedRef}
        className={cn("aspect-square h-full w-full", className)}
        {...props}
      />
    );
  }
}

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

class AvatarFallback extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <AvatarPrimitive.Fallback
        ref={this.props.forwardedRef}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-muted",
          className
        )}
        {...props}
      />
    );
  }
}

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
