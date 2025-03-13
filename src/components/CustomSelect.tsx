import { useState, useRef, useEffect } from "react";
import ArrowIcon from "./ArrowIcon";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function CustomSelect({
  options,
  placeholder = "",
  onChange,
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
    if (isOpen) {
      setIsOpen(false);
      borderTimeoutRef.current = setTimeout(() => {
        setBorderOpen(false);
      }, 150);
    } else {
      if (borderTimeoutRef.current) {
        clearTimeout(borderTimeoutRef.current);
      }
      setBorderOpen(true);
      setIsOpen(true);
    }
  }

  function handleSelect(value: string) {
    setSelected(value);
    setIsOpen(false);
    borderTimeoutRef.current = setTimeout(() => {
      setBorderOpen(false);
      if (onChange) onChange(value);
    }, 150);
  }

  return (
    <div className="relative w-full">
      <div
        className={`py-3 pl-2.5 pr-4 text-sm leading-[100%] cursor-pointer flex justify-between items-center w-full transition-colors duration-300 ${
          borderOpen
            ? "border-t border-x border-primary rounded-t-md"
            : "border border-border-grey-darker rounded-md"
        }`}
        onClick={toggleSelect}
      >
        {selected
          ? options.find((opt) => opt.value === selected)?.label
          : placeholder}
        <span
          className={`ml-auto transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ArrowIcon
            width={10}
            height={5}
            color={isOpen ? "#8338ec" : "currentColor"}
          />
        </span>
      </div>
      <ul
        className={`absolute bg-white border-b border-x border-primary rounded-b-md w-full z-10 transform transition-all duration-300 origin-top ${
          isOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        {options.map((option) => (
          <li
            key={option.value}
            className="py-2 px-3 text-sm cursor-pointer"
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
