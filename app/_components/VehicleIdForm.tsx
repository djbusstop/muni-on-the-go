"use client";
const VehicleIDForm = () => {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
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
        style={{
          fontSize: "xx-large",
        }}
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="Current bus or train number"
        placeholder="Vehicle #"
      />
      <button type="submit" style={{ fontSize: "x-large" }}>
        Go
      </button>
    </form>
  );
};

export default VehicleIDForm;
