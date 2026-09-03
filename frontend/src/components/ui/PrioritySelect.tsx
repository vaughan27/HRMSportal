import { useEffect, useRef, useState } from "react";
import type { Priority } from "@/types/leadEnquiry";
import "./PrioritySelect.css";

const OPTIONS: Priority[] = ["Low", "Medium", "High"];

interface PrioritySelectProps {
  id?: string;
  value: Priority;
  onChange: (value: Priority) => void;
}

export default function PrioritySelect({ id, value, onChange }: PrioritySelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(OPTIONS.indexOf(value));
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function openList() {
    setActiveIndex(OPTIONS.indexOf(value));
    setOpen(true);
  }

  function selectOption(option: Priority) {
    onChange(option);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openList();
    }
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, OPTIONS.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectOption(OPTIONS[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <div className="priority-select" ref={containerRef}>
      <button
        id={id}
        ref={triggerRef}
        type="button"
        className="priority-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className={`priority-dot priority-dot--${value.toLowerCase()}`} />
        <span className="priority-select__label">{value}</span>
        <svg
          className="priority-select__chevron"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden="true"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          className="priority-select__list"
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`priority-option-${OPTIONS[activeIndex]}`}
          onKeyDown={handleListKeyDown}
          ref={(el) => el?.focus()}
        >
          {OPTIONS.map((option, index) => (
            <li
              key={option}
              id={`priority-option-${option}`}
              role="option"
              aria-selected={option === value}
              className={
                "priority-select__option" +
                (option === value ? " is-selected" : "") +
                (index === activeIndex ? " is-active" : "")
              }
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectOption(option)}
            >
              <span className={`priority-dot priority-dot--${option.toLowerCase()}`} />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
