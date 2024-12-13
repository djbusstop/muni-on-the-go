import RelativeTime from "../../../../../ui/RelativeTime";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import clsx from "clsx";
import ListItemLink from "@/ui/ListItemLink";

dayjs.extend(localizedFormat);

const OnwardCallListItem = ({
  nextStop,
  onwardCall,
}: {
  nextStop: boolean;
  onwardCall: OnwardCall | MonitoredCall;
}) => {
  const expectedArrivalTime = dayjs(
    onwardCall.ExpectedArrivalTime ||
      onwardCall.ExpectedDepartureTime ||
      onwardCall.AimedArrivalTime
  );
  const scheduledArrivalTime = dayjs(onwardCall.AimedArrivalTime);

  return (
    <ListItemLink href={`/stop/${onwardCall.StopPointRef}`}>
      {/* Row */}
      <div className={clsx(["flex", "items-center", "gap-2"])}>
        {/* Left col */}
        <div className="flex flex-col flex-grow leading-relaxed">
          {nextStop && (
            <span className="text-secondary text-xs">Next stop</span>
          )}
          <h3 className="font-bold text-md">{onwardCall.StopPointName}</h3>
          <span className="text-xs">
            <RelativeTime
              scheduled={scheduledArrivalTime.toDate()}
              expected={expectedArrivalTime.toDate()}
            />
          </span>
        </div>
        {/* Right col */}
        <div className="text-lg shrink-0">
          <span>{expectedArrivalTime.format("HH:mm")}</span>
        </div>
      </div>
    </ListItemLink>
  );
};

export default OnwardCallListItem;
