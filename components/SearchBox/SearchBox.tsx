"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <input
      onChange={(e) => onSearch(e.target.value)}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
