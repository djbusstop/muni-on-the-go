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
        className="text-xl appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="Current bus or train number"
        placeholder="Stop or Vehicle #"
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-lg"
        onClick={(event) => {
          event.preventDefault();
          formRef.current?.reportValidity();
          if (inputValue && typeof inputValue === "string") {
            const searchId = parseInt(inputValue);
            if (inputValue.length === 4) {
              redirect(`/vehicle/${searchId}`, RedirectType.push);
            }
            redirect(`/stop/${searchId}`, RedirectType.push);
          }
        }}
      >
        Search
      </button>
    </form>
  );
};

export default VehicleIdForm;
