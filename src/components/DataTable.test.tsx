import { render, screen, fireEvent } from "@testing-library/react";
import DataTable, { Column } from "./DataTable";

interface User {
  id: number;
  name: string;
}

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
];

const data: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

test("renders table rows", () => {
  render(<DataTable<User> data={data} columns={columns} />);
  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("Bob")).toBeInTheDocument();
});

test("handles row selection", () => {
  const onRowSelect = jest.fn();
  render(<DataTable<User> data={data} columns={columns} selectable onRowSelect={onRowSelect} />);
  fireEvent.click(screen.getAllByRole("checkbox")[0]);
  expect(onRowSelect).toHaveBeenCalled();
});

test("shows loading state", () => {
  render(<DataTable<User> data={[]} columns={columns} loading />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("shows empty state", () => {
  render(<DataTable<User> data={[]} columns={columns} />);
  expect(screen.getByText("No data available")).toBeInTheDocument();
});
