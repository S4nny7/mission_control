import { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

interface DropdownProps<T extends string> {
  id?: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
  className?: string;
  disabled?: boolean;
}

function Dropdown<T extends string>({
  id,
  value,
  options,
  onChange,
  className = "",
  disabled = false,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(option: T) {
    onChange(option);
    setIsOpen(false);
  }

  return (
    <div className={`pixel-dropdown ${className}`} ref={containerRef}>
      <button
        id={id}
        type="button"
        className="pixel-dropdown-trigger"
        onClick={() => setIsOpen((open) => !open)}
        disabled={disabled}
      >
        <span>{value}</span>
        <span className={`pixel-dropdown-arrow ${isOpen ? "open" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <ul className="pixel-dropdown-menu">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                className={`pixel-dropdown-option ${
                  option === value ? "selected" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
