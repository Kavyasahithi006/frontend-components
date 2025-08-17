import React from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500",
  outlined: "border border-gray-400 focus:ring-2 focus:ring-blue-500",
  ghost: "bg-transparent border-b border-gray-400 focus:ring-0",
};

export default function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
}: InputFieldProps) {
  const id = label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled || loading}
        aria-invalid={invalid}
        className={`rounded-lg focus:outline-none ${sizeClasses[size]} ${
          variantClasses[variant]
        } ${invalid ? "border-red-500 focus:ring-red-500" : ""} ${
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
      />
      {loading && <span className="text-xs text-gray-500">Loading...</span>}
      {invalid && errorMessage && (
        <span className="text-xs text-red-600">{errorMessage}</span>
      )}
      {helperText && !invalid && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
    </div>
  );
}
