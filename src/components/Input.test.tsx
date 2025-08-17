import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

test("renders input with label", () => {
  render(<Input label="Username" placeholder="Enter username" />);
  expect(screen.getByText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
});

test("calls onChange when typing", () => {
  const handleChange = jest.fn();
  render(<Input label="Username" onChange={handleChange} />);
  const input = screen.getByLabelText("Username");
  fireEvent.change(input, { target: { value: "John" } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});
