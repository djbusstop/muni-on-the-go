"use client";

import { redirect, RedirectType } from "next/navigation";

const VehicleIdForm = () => {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const vehicleIdInput = formData.get("vehicleId");
        if (vehicleIdInput && typeof vehicleIdInput === "string") {
          const vehicleId = parseInt(vehicleIdInput);
          redirect(`/vehicle/${vehicleId}`, RedirectType.push);
        }
      }}
    >
      <input
        name="vehicleId"
        className="text-2xl appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="Current bus or train number"
        placeholder="Vehicle #"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-xl"
      >
        Go
      </button>
    </form>
  );
};

export default VehicleIdForm;
