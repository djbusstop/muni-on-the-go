"use client";
const VehicleIDForm = () => {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const vehicleIDInput = formData.get("vehicleID");
        if (vehicleIDInput && typeof vehicleIDInput === "string") {
          const vehicleID = parseInt(vehicleIDInput);
          console.log(vehicleID);
        }
      }}
    >
      <input
        name="vehicleID"
        className="text-2xl"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="Current bus or train number"
        placeholder="Vehicle #"
      />
      <button type="submit" className="text-xl">
        Go
      </button>
    </form>
  );
};

export default VehicleIDForm;
