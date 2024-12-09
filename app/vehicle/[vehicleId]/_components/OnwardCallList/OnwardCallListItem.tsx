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
      className="flex items-center p-4"
      style={{
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
      <div className="flex flex-col flex-grow">
        {nextStop && <span className="text-secondary">Next stop</span>}
        <h3 className="mb-1 font-bold text-xl hover:underline">
          {onwardCall.StopPointName}
        </h3>
        <p>
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
