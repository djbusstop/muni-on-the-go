"use client";
import { useState } from "react";

enum DirectionName {
  IB = "inbound",
  OB = "outbound",
}

const DirectionPicker = ({ directions }: { directions: Direction[] }) => {
  const [pickerState, setPickerState] = useState<Direction[]>(directions);

  if (directions.length <= 1) return null;

  return (
    <div>
      {directions.map((direction) => {
        return (
          <button
            key={direction}
            onClick={() => {
              setPickerState([direction]);
            }}
            style={
              pickerState.length === 1 && pickerState.includes(direction)
                ? { background: "blue" }
                : {}
            }
          >
            {DirectionName[direction].toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default DirectionPicker;
