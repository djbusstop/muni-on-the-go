"use client";
import { useState } from "react";

const DirectionPicker = ({
  directions,
  onChange,
}: {
  directions: Direction[];
  onChange: (value: Direction[]) => void;
}) => {
  const [pickerState, setPickerState] = useState<Direction[]>(directions);

  return (
    <div>
      <button
        onClick={() => {
          setPickerState(["IB"]);
          pickerState.length === 1 && pickerState.includes(Direction.OB)
            ? { background: "blue" }
            : {};
        }}
      >
        {"inbound".toUpperCase()}
      </button>
      <button
        onClick={() => {
          setPickerState(["OB"]);
        }}
        style={
          pickerState.length === 1 && pickerState.includes("OB")
            ? { background: "blue" }
            : {}
        }
      >
        {"OB".toUpperCase()}
      </button>
    </div>
  );
};

export default DirectionPicker;
