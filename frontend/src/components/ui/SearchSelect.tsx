import { useEffect, useRef, useState } from "react";
import type { LookupOption } from "@/types/lookup";
import "./SearchSelect.css";

interface SearchSelectProps {
  id?: string;
  placeholder?: string;
  value: { code: string; name: string };
  onChange: (code: string, name: string) => void;
  fetchOptions: (query: string) => Promise<LookupOption[]>;
  hasError?: boolean;
}

export default function SearchSelect({
  id,
  placeholder = "Search by code or name…",
  value,
  onChange,
  fetchOptions,
  hasError,
}: SearchSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<LookupOption[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  // Reflect external value changes (e.g. form reset after submit)
  useEffect(() => {
    setQuery(value.code && value.name ? `${value.code} — ${value.name}` : "");
  }, [value.code, value.name]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function runSearch(text: string) {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    fetchOptions(text)
      .then((results) => {
        if (requestId === requestIdRef.current) {
          setOptions(results);
          setActiveIndex(0);
        }
      })
      .finally(() => {
        if (requestId === requestIdRef.current) setLoading(false);
      });
  }

  function handleInputChange(text: string) {
    setQuery(text);
    setOpen(true);
    onChange("", ""); // typing invalidates any prior selection until a new one is made

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(text), 250);
  }

  function handleFocus() {
    setOpen(true);
    if (options.length === 0) runSearch(query);
  }

  function selectOption(option: LookupOption) {
    onChange(option.code, option.name);
    setQuery(`${option.code} — ${option.name}`);
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!open) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (options[activeIndex]) selectOption(options[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="search-select" ref={containerRef}>
      <input
        id={id}
        ref={inputRef}
        className={"search-select__input" + (hasError ? " has-error" : "")}
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
      />

      {open && (
        <ul className="search-select__list" role="listbox">
          {loading && <li className="search-select__status">Searching…</li>}

          {!loading && options.length === 0 && (
            <li className="search-select__status">No matches</li>
          )}

          {!loading &&
            options.map((option, index) => (
              <li
                key={option.id}
                role="option"
                aria-selected={option.code === value.code}
                className={
                  "search-select__option" + (index === activeIndex ? " is-active" : "")
                }
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectOption(option)}
              >
                <span className="search-select__code">{option.code}</span>
                <span className="search-select__name">{option.name}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
