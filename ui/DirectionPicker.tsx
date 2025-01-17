"use client";
import clsx from "clsx";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const DIRECTION_SEARCH_PARAM = "direction";

const buildUrlWithQueryParameters = (
  path: string,
  queryParameters: Record<string, string | number | boolean>
) => {
  const url =
    path +
    `?${Object.entries(queryParameters)
      .map(([key, value]) => `${key}=${value}`)
      .join("&")}`;

  return url;
};

enum DirectionName {
  IB = "Inbound",
  OB = "Outbound",
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

  if (directions.length <= 1) return null;

  const setDirection = (newDirection: Direction) => {
    const searchParamsWithUpdatedDirection = {
      ...Object.fromEntries(searchParams.entries()),
      direction: newDirection,
    };
    const redirectUrl = buildUrlWithQueryParameters(
      pathName,
      searchParamsWithUpdatedDirection
    );
    router.push(redirectUrl);
  };

  const removeDirection = () => {
    const searchParamsWithoutDirection = searchParams
      .entries()
      .filter(([key]) => key !== DIRECTION_SEARCH_PARAM);
    const redirectUrl = buildUrlWithQueryParameters(
      pathName,
      Object.fromEntries(searchParamsWithoutDirection)
    );
    router.push(redirectUrl);
  };

  return (
    <div className={clsx(["flex", "gap-1"])}>
      {directions.sort().map((direction) => {
        const isActive = value === direction;
        return (
          <button
            className={clsx([
              "flex",
              "items-center",
              "gap-1",
              "text-xs",
              "py-1",
              "px-2",
              "rounded-full",
              isActive
                ? ["bg-emerald-600", "hover:bg-emerald-700", "text-white"]
                : [
                    "text-gray-700",
                    "border",
                    "border-gray-700",
                    "hover:bg-gray-100",
                  ],
            ])}
            key={direction}
            onClick={() => {
              if (isActive) {
                removeDirection();
              } else {
                setDirection(direction);
              }
            }}
          >
            {DirectionName[direction]}{" "}
            {isActive && <span className="leading-none">x</span>}
          </button>
        );
      })}
    </div>
  );
};

export default DirectionPicker;
