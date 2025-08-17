import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export default function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // handle sorting
  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey as keyof T];
    const bVal = b[sortKey as keyof T];
    if (aVal === bVal) return 0;
    if (aVal! > bVal!) return sortAsc ? 1 : -1;
    return sortAsc ? -1 : 1;
  });

  // handle row select
  const toggleRow = (index: number) => {
    const newSet = new Set(selected);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelected(newSet);
    if (onRowSelect) {
      onRowSelect(Array.from(newSet).map(i => sortedData[i]));
    }
  };

  if (loading) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  if (!data.length) {
    return <div className="p-4 text-gray-500">No data available</div>;
  }

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="p-2 border">Select</th>}
          {columns.map(col => (
            <th
              key={col.key}
              className="p-2 border cursor-pointer select-none"
              onClick={() => {
                if (!col.sortable) return;
                if (sortKey === col.key) {
                  setSortAsc(!sortAsc);
                } else {
                  setSortKey(col.key);
                  setSortAsc(true);
                }
              }}
            >
              {col.title}
              {col.sortable && sortKey === col.key && (sortAsc ? " ▲" : " ▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={i} className="hover:bg-gray-50">
            {selectable && (
              <td className="p-2 border text-center">
                <input
                  type="checkbox"
                  checked={selected.has(i)}
                  onChange={() => toggleRow(i)}
                />
              </td>
            )}
            {columns.map(col => (
              <td key={col.key} className="p-2 border">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
