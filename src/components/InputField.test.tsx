import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";

test("renders label and helper text", () => {
  render(<InputField label="Email" helperText="Enter a valid email" />);
  expect(screen.getByText("Email")).toBeInTheDocument();
  expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
});

test("shows error message when invalid", () => {
  render(<InputField label="Email" invalid errorMessage="Invalid email" />);
  expect(screen.getByText("Invalid email")).toBeInTheDocument();
});

test("calls onChange when typing", () => {
  const handleChange = jest.fn();
  render(<InputField label="Email" onChange={handleChange} />);
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test" } });
  expect(handleChange).toHaveBeenCalled();
});
