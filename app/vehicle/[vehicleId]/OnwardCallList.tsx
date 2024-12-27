import ListItemLink from "@/ui/ListItemLink";
import clsx from "clsx";
import { normalizeStopName } from "@/app/stop/getStopsByName";
import { localDate } from "@/lib/date";
import HourMin from "@/ui/time/HourMin";
import Punctuality from "@/ui/time/Punctuality";
import WaitTime from "@/ui/time/WaitTime";

const OnwardCallList = ({
  onwardCalls,
  vehicleId,
  boardingStopId,
}: {
  onwardCalls: Array<OnwardCall>;
  vehicleId: number;
  boardingStopId?: string;
}) => {
  return (
    <ul className="flex flex-col list-none gap-3">
      {onwardCalls.map((onwardCall, index) => {
        const expectedArrivalTime = localDate(
          onwardCall.ExpectedArrivalTime ||
            onwardCall.ExpectedDepartureTime ||
            onwardCall.AimedArrivalTime
        );
        const scheduledArrivalTime = localDate(onwardCall.AimedArrivalTime);

        return (
          <ListItemLink
            key={onwardCall.StopPointRef}
            href={`/stop/group/${encodeURIComponent(
              normalizeStopName(onwardCall.StopPointName)
            )}?arrivingOn=${vehicleId}`}
            highlight={boardingStopId === onwardCall.StopPointRef}
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
                  <HourMin date={expectedArrivalTime} /> •{" "}
                  <Punctuality
                    scheduled={scheduledArrivalTime.toDate()}
                    expected={expectedArrivalTime.toDate()}
                  />
                </span>
              </div>
              {/* Right col */}
              <div className="text-lg shrink-0">
                <WaitTime
                  expectedTime={expectedArrivalTime.toDate()}
                  tracking
                />
              </div>
            </div>
          </ListItemLink>
        );
      })}
    </ul>
  );
};

export default OnwardCallList;
