import { render, screen } from "@testing-library/react";
import Card from "./Card";

test("renders card with title and description", () => {
  render(<Card title="Hello" description="World" />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
  expect(screen.getByText("World")).toBeInTheDocument();
});
