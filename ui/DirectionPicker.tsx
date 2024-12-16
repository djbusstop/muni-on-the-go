"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const DIRECTION_SEARCH_PARAM = "direction";

enum DirectionName {
  IB = "inbound",
  OB = "outbound",
}

const DirectionPicker = ({
  directions,
  value,
}: {
  directions: Direction[];
  value?: Direction;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  console.log(searchParams);
  console.log(pathName);

  if (directions.length <= 1) return null;

  return (
    <div>
      {directions.map((direction) => {
        const searchParamsWithUpdatedDirection = {
          ...searchParams,
          direction: direction,
        };
        const redirectUrl =
          pathName +
          `?${Object.entries(searchParamsWithUpdatedDirection).map(
            ([key, value]) => `${key}=${value}`
          )}`;
        return (
          <button
            key={direction}
            onClick={() => {
              router.push(redirectUrl);
            }}
            style={value === direction ? { background: "blue" } : {}}
          >
            {DirectionName[direction].toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default DirectionPicker;
