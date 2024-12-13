"use client";

import { redirect, RedirectType } from "next/navigation";
import { useRef, useState } from "react";

const VehicleIdForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [inputValue, setInputValue] = useState<string>();

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-2"
      onSubmit={(event) => event.preventDefault()}
    >
      <input
        name="itemId"
        className="text-xl appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="Current bus or train number"
        placeholder="Vehicle or Stop #"
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        type="submit"
        value="vehicle"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-lg"
        onClick={(event) => {
          event.preventDefault();
          formRef.current?.reportValidity();
          if (inputValue && typeof inputValue === "string") {
            const vehicleId = parseInt(inputValue);
            redirect(`/vehicle/${vehicleId}`, RedirectType.push);
          }
        }}
      >
        Vehicle
      </button>
      <button
        type="submit"
        value="stop"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-lg"
        onClick={(event) => {
          event.preventDefault();
          formRef.current?.reportValidity();
          if (inputValue && typeof inputValue === "string") {
            const stopId = parseInt(inputValue);
            redirect(`/stop/${stopId}`, RedirectType.push);
          }
        }}
      >
        Stop
      </button>
    </form>
  );
};

export default VehicleIdForm;
