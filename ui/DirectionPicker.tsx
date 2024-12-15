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
          setPickerState([Direction.IB]);
          pickerState.length === 1 && pickerState.includes(Direction.OB)
            ? { background: "blue" }
            : {};
        }}
      >
        {Direction.IB.toUpperCase()}
      </button>
      <button
        onClick={() => {
          setPickerState([Direction.OB]);
        }}
        style={
          pickerState.length === 1 && pickerState.includes(Direction.OB)
            ? { background: "blue" }
            : {}
        }
      >
        {Direction.OB.toUpperCase()}
      </button>
    </div>
  );
};

export default DirectionPicker;
