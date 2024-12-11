import React, { Component } from "react";
import { ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

class Breadcrumb extends Component {
  render() {
    const { ...props } = this.props;
    return <nav aria-label="breadcrumb" {...props} />;
  }
}

Breadcrumb.displayName = "Breadcrumb";

class BreadcrumbList extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
          className
        )}
        {...props}
      />
    );
  }
}

BreadcrumbList.displayName = "BreadcrumbList";

class BreadcrumbItem extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <li
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      />
    );
  }
}

BreadcrumbItem.displayName = "BreadcrumbItem";

class BreadcrumbLink extends Component {
  render() {
    const { asChild, className, ...props } = this.props;
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        className={cn("transition-colors hover:text-foreground", className)}
        {...props}
      />
    );
  }
}

BreadcrumbLink.displayName = "BreadcrumbLink";

class BreadcrumbPage extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn("font-normal text-foreground", className)}
        {...props}
      />
    );
  }
}

BreadcrumbPage.displayName = "BreadcrumbPage";

class BreadcrumbSeparator extends Component {
  render() {
    const { children, className, ...props } = this.props;
    return (
      <li
        role="presentation"
        aria-hidden="true"
        className={cn("[&>svg]:size-3.5", className)}
        {...props}
      >
        {children ?? <ChevronRightIcon />}
      </li>
    );
  }
}

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

class BreadcrumbEllipsis extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <span
        role="presentation"
        aria-hidden="true"
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
      >
        <DotsHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">More</span>
      </span>
    );
  }
}

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
