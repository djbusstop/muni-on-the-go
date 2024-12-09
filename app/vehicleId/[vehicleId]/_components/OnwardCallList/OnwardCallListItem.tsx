import RelativeTime from "./RelativeTime";

const OnwardCallListItem = ({
  nextStop,
  onwardCall,
}: {
  nextStop: boolean;
  onwardCall: OnwardCall | MonitoredCall;
}) => {
  const expectedArrivalTime = new Date(
    onwardCall.ExpectedArrivalTime ||
      onwardCall.ExpectedDepartureTime ||
      onwardCall.AimedArrivalTime
  );
  const scheduledArrivalTime = new Date(onwardCall.AimedArrivalTime);

  return (
    <li
      className="OnwardCallListItem"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "1em",
        backgroundColor: "whitesmoke",
        borderTopRightRadius: "5px",
        borderTopLeftRadius: "5px",
        borderLeft: "1px solid lightgrey",
        borderRight: "1px solid lightgrey",
        borderTop: "1px solid lightgrey",
        borderBottom: "5px solid #cd3545",
      }}
    >
      {/* Left col */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {nextStop && (
          <span style={{ color: "gray", marginBottom: "0.1em" }}>
            Next stop
          </span>
        )}
        <h3 style={{ margin: 0, marginBottom: "0.5em" }}>
          {onwardCall.StopPointName}
        </h3>
        <p style={{ margin: 0 }}>
          Arriving{" "}
          <RelativeTime
            scheduled={scheduledArrivalTime}
            expected={expectedArrivalTime}
          />{" "}
          at <b>{expectedArrivalTime.toLocaleTimeString("en-US")}</b>
        </p>
      </div>
      {/* Right col */}
      <div></div>
    </li>
  );
};

export default OnwardCallListItem;
