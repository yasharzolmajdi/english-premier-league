import { ReactNode } from "react";

export interface TableProps<T, H> {
  rows: T[];
  headers: Partial<Record<keyof T, H | string>>;
}

export default function Table<T extends Object, H extends ReactNode>({
  headers,
  rows,
}: TableProps<T, H>) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {Object.values(headers).map((header) => (
            <th
              scope="col"
              className="md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr className="bg-white">
            {Object.keys(headers).map((key) => (
              <td className="md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row[key as keyof T]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
