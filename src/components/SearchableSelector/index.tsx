import React, { useEffect, useRef, useState } from "react";
import "./style.css";

type PossibleValue = { label: string; value: string | null };

function SearchableSelector({
  data,
  onChange,
  value,
}: {
  data?: PossibleValue[];
  onChange?: any;
  value?: any;
}) {
  const [toggle, setToggle] = useState(false);
  const [filter, setFilter] = useState("");
  const [currValue, setCurrValue] = useState<PossibleValue>({
    label: "Selecionar",
    value: null,
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

  return (
    <div
      className="col-span-3 w-full py-2.5"
      style={{
        position: "relative",
      }}
    >
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
          className="col-span-3 w-full px-3.5 py-2.5 border rounded-md border-[#D1D5DB] text-[#6B7280] bg-[#f0f2f5] text[#fff] ont-roboto font-medium outline-none"
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            zIndex: "9999",
          }}
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
            className="border rounded-md border-[#D1D5DB]"
            style={{
              width: "100%",
              background: "none",
              outline: "none",
              padding: "2px 10px",
            }}
            type="text"
          ></input>
          <div
            className="py-2.5"
            style={{
              maxHeight: "200px",
              overflowY: "scroll",
            }}
          >
            {data
              ?.filter((e) =>
                e.label.toLowerCase().includes(filter.toLocaleLowerCase())
              )
              .map((e) => (
                <div
                  key={e.value}
                  onClick={() => {
                    setCurrValue(e);
                    closeDropdown();
                  }}
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
