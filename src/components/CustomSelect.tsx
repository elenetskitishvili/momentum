import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AddEmployeeBtnSecondary from "./AddEmployeeBtnSecondary";
import ArrowIcon from "./ArrowIcon";

interface Option {
  value: string;
  label: string;
  image?: string;
  icon?: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  showAddEmployee?: boolean;
  onAddEmployee?: () => void;
}

export default function CustomSelect({
  options,
  placeholder = "",
  onChange,
  disabled = false,
  showAddEmployee = false,
  onAddEmployee,
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
            <Image
              src={selectedOption.image}
              alt={selectedOption.label}
              width={28}
              height={28}
              className="rounded-full mr-1.5"
            />
          ) : selectedOption && selectedOption.icon ? (
            <Image
              src={selectedOption.icon}
              alt={selectedOption.label}
              width={16}
              height={18}
              className="mr-1.5"
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
        {showAddEmployee && (
          <li
            className="hover:bg-grey-hover"
            onClick={(e) => {
              e.stopPropagation();
              if (onAddEmployee) onAddEmployee();
              setIsOpen(false);
              borderTimeoutRef.current = setTimeout(
                () => setBorderOpen(false),
                150
              );
            }}
          >
            <AddEmployeeBtnSecondary />
          </li>
        )}
        {options.map((option) => (
          <li
            key={option.value}
            className={`py-2.5 px-3.5 text-sm flex items-center ${
              disabled
                ? "cursor-not-allowed text-border-grey-darker"
                : "cursor-pointer hover:bg-grey-hover"
            }`}
            onClick={() => handleSelect(option.value)}
          >
            {option.image ? (
              <Image
                src={option.image}
                alt={option.label}
                width={28}
                height={28}
                className="rounded-full mr-1.5"
              />
            ) : option.icon ? (
              <Image
                src={option.icon}
                alt={option.label}
                width={16}
                height={18}
                className="mr-1.5"
              />
            ) : null}
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
