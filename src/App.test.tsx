import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Demo Form heading", () => {
  render(<App />);
  expect(screen.getByText(/Demo Form/i)).toBeInTheDocument();
});
