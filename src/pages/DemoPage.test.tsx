import { render, screen, fireEvent } from "@testing-library/react";
import DemoPage from "./DemoPage";

test("submits the form and shows the card", () => {
  render(<DemoPage />);

  // check that input is there
  const input = screen.getByLabelText("Name");
  expect(input).toBeInTheDocument();

  // type into the input
  fireEvent.change(input, { target: { value: "Alice" } });

  // click submit
  fireEvent.click(screen.getByText("Submit"));

  // card should now appear
  expect(screen.getByText("Submitted!")).toBeInTheDocument();
  expect(screen.getByText(/Hello, Alice/)).toBeInTheDocument();
});
