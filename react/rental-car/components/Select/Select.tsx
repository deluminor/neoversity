"use client";

import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useOutsideClick } from "@/hooks/use-outside-click";

import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  isLoading?: boolean;
  onChange: (value: string) => void;
  renderValue?: (option: SelectOption) => string;
  className?: string;
}

export function Select({
  label,
  placeholder,
  value,
  options,
  isLoading = false,
  onChange,
  renderValue,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const listId = useId();

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  useOutsideClick(wrapperRef, close, isOpen);

  if (activeIndex >= options.length) {
    setActiveIndex(-1);
  }

  const selectedOption = options.find((option) => option.value === value);
  const triggerText = selectedOption
    ? (renderValue?.(selectedOption) ?? selectedOption.label)
    : placeholder;
  const optionId = (index: number) => `${listId}-option-${index}`;

  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    close();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      close();
      return;
    }

    if (event.key === "Tab") {
      close();
      return;
    }

    if (options.length === 0) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (!isOpen) {
        setIsOpen(true);
        setActiveIndex(options.findIndex((option) => option.value === value));
        return;
      }

      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((previous) => (previous + step + options.length) % options.length);
      return;
    }

    if (event.key === "Enter" && isOpen && activeIndex >= 0) {
      event.preventDefault();
      const option = options[activeIndex];

      if (option) {
        selectOption(option.value);
      }
    }
  };

  return (
    <div className={className ? `${styles.field} ${className}` : styles.field}>
      <span className={styles.label} id={labelId}>
        {label}
      </span>
      <div className={styles.wrapper} ref={wrapperRef} onKeyDown={onKeyDown}>
        <button
          type="button"
          role="combobox"
          className={styles.trigger}
          disabled={isLoading || options.length === 0}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          aria-activedescendant={isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined}
          aria-labelledby={labelId}
          aria-busy={isLoading}
          onClick={() => setIsOpen((previous) => !previous)}
        >
          <span className={selectedOption ? undefined : styles.placeholder}>{triggerText}</span>
          {isOpen ? (
            <FiChevronUp size={16} className={styles.icon} aria-hidden="true" />
          ) : (
            <FiChevronDown size={16} className={styles.icon} aria-hidden="true" />
          )}
        </button>
        {isOpen ? (
          <ul className={styles.popup} id={listId} role="listbox" aria-labelledby={labelId}>
            {options.map((option, index) => {
              const classNames = [
                styles.option,
                option.value === value ? styles.optionSelected : null,
                index === activeIndex ? styles.optionActive : null,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <li
                  key={option.value}
                  id={optionId(index)}
                  role="option"
                  aria-selected={option.value === value}
                  className={classNames}
                  onClick={() => selectOption(option.value)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
