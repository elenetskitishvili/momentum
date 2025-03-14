import { useState, useRef, useEffect } from "react";
import ArrowIcon from "./ArrowIcon";

interface Option {
  value: string;
  label: string;
  image?: string; // Optional: for employee options to display image
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export default function CustomSelect({
  options,
  placeholder = "",
  onChange,
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [borderOpen, setBorderOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const borderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (borderTimeoutRef.current) clearTimeout(borderTimeoutRef.current);
    };
  }, []);

  function toggleSelect() {
    if (disabled) return;
    if (isOpen) {
      setIsOpen(false);
      borderTimeoutRef.current = setTimeout(() => setBorderOpen(false), 150);
    } else {
      if (borderTimeoutRef.current) clearTimeout(borderTimeoutRef.current);
      setBorderOpen(true);
      setIsOpen(true);
    }
  }

  function handleSelect(value: string) {
    if (disabled) return;
    setSelected(value);
    setIsOpen(false);
    borderTimeoutRef.current = setTimeout(() => {
      setBorderOpen(false);
      if (onChange) onChange(value);
    }, 150);
  }

  const selectedOption = selected
    ? options.find((opt) => opt.value === selected)
    : null;

  return (
    <div className="relative w-full">
      <div
        className={`h-[42px] pl-2.5 pr-4 text-sm leading-[100%] flex justify-between items-center w-full transition-colors duration-300 ${
          disabled
            ? "cursor-not-allowed border border-border-grey-darker rounded-[5px]"
            : borderOpen
            ? "border-t border-x border-primary rounded-t-md cursor-pointer"
            : "border border-border-grey-darker rounded-[5px] cursor-pointer"
        }`}
        onClick={toggleSelect}
      >
        <div className="flex items-center">
          {selectedOption && selectedOption.image ? (
            <img
              src={selectedOption.image}
              alt={selectedOption.label}
              className="w-6 h-6 rounded-full mr-2"
            />
          ) : null}
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        <span
          className={`ml-auto transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ArrowIcon
            width={10}
            height={5}
            color={disabled ? "#ced4da" : isOpen ? "#8338ec" : "currentColor"}
          />
        </span>
      </div>

      <ul
        className={`absolute bg-white border-b border-x border-primary rounded-b-md w-full z-10 transform transition-all duration-300 origin-top ${
          isOpen && !disabled
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        {options.map((option) => (
          <li
            key={option.value}
            className={`py-3 px-3 text-sm flex items-center ${
              disabled
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer hover:bg-gray-100"
            }`}
            onClick={() => handleSelect(option.value)}
          >
            {option.image ? (
              <img
                src={option.image}
                alt={option.label}
                className="w-6 h-6 rounded-full mr-2"
              />
            ) : null}
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
