import dayjs from "dayjs";
import ListItemLink from "@/ui/ListItemLink";
import clsx from "clsx";
import RelativeTime from "@/ui/RelativeTime";

const OnwardCallList = ({
  onwardCalls,
}: {
  onwardCalls: Array<OnwardCall>;
}) => {
  return (
    <ul className="flex flex-col list-none gap-4">
      {onwardCalls.map((onwardCall, index) => {
        const expectedArrivalTime = dayjs(
          onwardCall.ExpectedArrivalTime ||
            onwardCall.ExpectedDepartureTime ||
            onwardCall.AimedArrivalTime
        );
        const scheduledArrivalTime = dayjs(onwardCall.AimedArrivalTime);

        return (
          <ListItemLink
            key={onwardCall.StopPointRef}
            href={`/stop/${onwardCall.StopPointRef}`}
          >
            {/* Row */}
            <div className={clsx(["flex", "items-center", "gap-2"])}>
              {/* Left col */}
              <div className="flex flex-col flex-grow leading-relaxed">
                {index === 0 && (
                  <span className="text-secondary text-xs">Next stop</span>
                )}
                <h3 className="font-semibold text-md">
                  {onwardCall.StopPointName}
                </h3>
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
      })}
    </ul>
  );
};

export default OnwardCallList;
