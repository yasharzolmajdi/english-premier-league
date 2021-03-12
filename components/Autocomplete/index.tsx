import { useState, useMemo, useEffect } from "react";

import Input from "@components/Input";

export interface AutocompleteProps<T> {
  id: string;
  name?: string;
  placeholder?: string;
  onSelect: (value?: T) => void;
  options: T[];
  optionLabel: keyof T;
  search: string;
  onSearchChange: (search: string) => void;
}

export default function Autocomplete<T extends Object>({
  id,
  name,
  placeholder,
  onSelect,
  options,
  optionLabel,
  search,
  onSearchChange,
}: AutocompleteProps<T>) {
  const [inputFocus, setInputFocus] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const filterOptions = useMemo(() => {
    return options.filter((option) => {
      const label = (option[optionLabel] as any) as string;
      return label.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });
  }, [search]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <div className="relative rounded-md shadow-sm">
        <Input
          type="text"
          name={name || id}
          id={id}
          className="pr-10"
          placeholder={placeholder}
          onChange={(event) => onSearchChange(event.target.value)}
          value={search}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
          {!!search && (
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="times"
              className="svg-inline--fa fa-times fa-w-10 w-4 h-4 text-gray-500 cursor-pointer hover:bg-gray-200 rounded-sm"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              onClick={() => {
                onSearchChange("");
                onSelect(undefined);
              }}
            >
              <path
                fill="currentColor"
                d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
              ></path>
            </svg>
          )}
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="angle-down"
            className="svg-inline--fa fa-angle-down fa-w-8 w-5 h-5 text-gray-500 pointer-events-none"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
          >
            <path
              fill="currentColor"
              d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z"
            />
          </svg>
        </div>
      </div>
      {filterOptions.length > 0 && (inputFocus || mouseOver) && (
        <div className="absolute top-full left-0 w-full">
          <div className="p-2 flex flex-col bg-white border rounded mt-1">
            {filterOptions.map((option) => (
              <div
                className="w-full px-2 py-1 hover:bg-gray-100 rounded text-gray-800 cursor-pointer"
                onClick={() => {
                  onSelect(option);
                  onSearchChange((option[optionLabel] as any) as string);
                  setMouseOver(false);
                }}
              >
                {option[optionLabel]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
