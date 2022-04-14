import React, { useEffect, useRef, useState } from "react";
import "./style.css";

type PossibleValue = { label: string; value: string | null };

function SearchableSelector({
  data,
  onSelect,
  value,
}: {
  data?: PossibleValue[];
  onSelect: (value: string | null) => boolean;
  value?: any;
}) {
  const [toggle, setToggle] = useState(false);
  const [filter, setFilter] = useState("");
  const [currValue, setCurrValue] = useState<PossibleValue>({
    label: "Selecionar",
    value,
  });
  const dropdownRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (toggle) {
      const dropdown: HTMLElement | null = dropdownRef?.current;
      (dropdown as any)?.focus();
    }
  }, [toggle]);

  const closeDropdown = () => {
    setToggle(false);
    setFilter("");
  };

  function onClick(e: PossibleValue) {
    const clearSelect = () => {
      setCurrValue({
        label: "Selecionar",
        value,
      });
    }
    
    const success = onSelect(e.value);

    success ? setCurrValue(e) : clearSelect();

    closeDropdown();
  }

  return (
    <div className="relative col-span-3 w-full py-2.5">
      <div
        onClick={() => {
          setToggle((curr) => !curr);
        }}
        className="col-span-3 w-full px-3.5 py-2.5 border rounded-md border-[#D1D5DB] text-[#6B7280] bg-[#f0f2f5] text[#fff] ont-roboto font-medium outline-none"
        id="select-primary"
      >
        {currValue.label}
      </div>
      {toggle && (
        <div
          ref={dropdownRef}
          tabIndex={1}
          className="absolute top-full left-0 col-span-3 w-full px-3.5 py-2.5 border rounded-md border-[#D1D5DB] text-[#6B7280] bg-[#f0f2f5] text[#fff] ont-roboto font-medium outline-none z-[9999]"
          onBlur={(e) => {
            if (!(dropdownRef as any).current.contains(e.relatedTarget)) {
              closeDropdown();
            } else {
              e.preventDefault();
            }
          }}
        >
          <input
            onChange={(props) => {
              setFilter(props.target.value);
            }}
            placeholder="Filtro..."
            className="w-full border rounded-md border-[#D1D5DB] bg-transparent outline-none py-0.5 px-2.5"
            type="text"
          ></input>
          <div className="py-2.5 max-h-52 overflow-y-scroll">
            {data
              ?.filter((e) =>
                e.label.toLowerCase().includes(filter.toLocaleLowerCase())
              )
              .map((e) => (
                <div
                  key={e.value}
                  onClick={() => onClick(e)}
                >
                  {e.label}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchableSelector;
