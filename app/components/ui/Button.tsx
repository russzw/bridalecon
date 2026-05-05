import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", icon, iconPosition = "left", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-500)/0.4)] disabled:opacity-50 disabled:pointer-events-none gap-2";
    
    const variants = {
      primary: "bg-[hsl(var(--brand-500))] text-white hover:bg-[hsl(var(--brand-600))] shadow-md hover:shadow-lg active:scale-95",
      secondary: "bg-[hsl(var(--surface-overlay))] text-[hsl(var(--text-primary))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--surface-elevated))] hover:border-[hsl(var(--brand-500)/0.4)]",
      ghost: "text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface-overlay))]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

Button.displayName = "Button";
