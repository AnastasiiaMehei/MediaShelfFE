import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "lg" | "icon";
}

export function Button({ variant = "default", size = "sm", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-md font-medium transition-colors",
        variant === "default" && "bg-primary text-white hover:bg-primary/90",
        variant === "outline" && "border border-gray-300 hover:bg-gray-100",
        variant === "ghost" && "hover:bg-gray-50",
        size === "sm" && "px-3 py-1 text-sm",
        size === "lg" && "px-6 py-2 text-lg",
        size === "icon" && "p-2"
      )}      
    />
  );
}
