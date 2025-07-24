"use client";
import { useState, ChangeEvent } from "react";

interface SelectOption {
  value: string;
  text: string;
}

interface SelectBoxProps {
  selectOptions: SelectOption[];
  onKeySelect: (selectedValue: string) => void;
}

export default function SelectBox({ selectOptions, onKeySelect }: SelectBoxProps) {
  const [key, setKey] = useState<string>("all");

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setKey(selectedValue);
    console.log("React Select Key:", selectedValue);
    onKeySelect(selectedValue);
  };

  return (
    <select className="form-select" value={key} onChange={onSelect}>
      {selectOptions.map((k, index) => (
        <option key={index} value={k.value}>
          {k.text}
        </option>
      ))}
    </select>
  );
}
