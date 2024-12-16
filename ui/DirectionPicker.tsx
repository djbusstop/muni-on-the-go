"use client";
import clsx from "clsx";
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

  const setDirection = (direction: Direction) => {
    const searchParamsWithUpdatedDirection = {
      ...searchParams,
      direction: direction,
    };
    const redirectUrl =
      pathName +
      `?${Object.entries(searchParamsWithUpdatedDirection).map(
        ([key, value]) => `${key}=${value}`
      )}`;
    router.push(redirectUrl);
  };

  const removeDirection = (direction: Direction) => {
    const searchParamsWithoutDirection = Object.entries(searchParams).filter(
      ([key]) => key !== direction
    );
    const redirectUrl =
      pathName +
      `?${Object.entries(searchParamsWithoutDirection).map(
        ([key, value]) => `${key}=${value}`
      )}`;
    router.push(redirectUrl);
  };

  return (
    <div className={clsx(["flex", "gap-1"])}>
      {directions.map((direction) => {
        const isActive = value === direction;
        return (
          <button
            className={clsx([
              "text-xs",
              "py-1",
              "px-3",
              "rounded-full",
              isActive
                ? ["bg-blue-500", "hover:bg-blue-700", "text-white"]
                : [
                    "text-gray-800",
                    "border",
                    "border-gray-800",
                    "hover:bg-gray-200",
                  ],
            ])}
            key={direction}
            onClick={() => {
              if (isActive) {
                removeDirection(direction);
              } else {
                setDirection(direction);
              }
            }}
          >
            {DirectionName[direction].charAt(0).toUpperCase() +
              DirectionName[direction].slice(1)}{" "}
            {isActive ? " X" : ""}
          </button>
        );
      })}
    </div>
  );
};

export default DirectionPicker;
