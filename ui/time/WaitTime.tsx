"use client";

import { getRelativeMinutes } from "@/lib/date";

const WaitTime = ({
  expectedTime,
  tracking,
}: {
  expectedTime: Date;
  tracking: boolean;
}) => {
  const delayInMinutes = getRelativeMinutes(new Date(), expectedTime);
  return (
    <div
      // If there is no vehicle monitoring, greyscale the text
      className={`shrink-0 text-center leading-none ${
        tracking ? "" : "text-secondary"
      } `}
    >
      <p className="text-lg leading-none">{delayInMinutes}</p>
      <span className="text-xs text-secondary">min</span>
    </div>
  );
};

export default WaitTime;
