import React, { Component } from "react";
import { cn } from "../../lib/utils";

class Card extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow",
          className
        )}
        {...props}
      />
    );
  }
}

Card.displayName = "Card";

class CardHeader extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
      />
    );
  }
}

CardHeader.displayName = "CardHeader";

class CardTitle extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <h3
        className={cn("font-semibold leading-none tracking-tight", className)}
        {...props}
      />
    );
  }
}

CardTitle.displayName = "CardTitle";

class CardDescription extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <p
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
}

CardDescription.displayName = "CardDescription";

class CardContent extends Component {
  render() {
    const { className, ...props } = this.props;
    return <div className={cn("p-6 pt-0", className)} {...props} />;
  }
}

CardContent.displayName = "CardContent";

class CardFooter extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <div
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
      />
    );
  }
}

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
