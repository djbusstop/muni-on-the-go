import clsx from "clsx";
import OptionalLink from "./OptionalLink";
import { PropsWithChildren } from "react";

const ListItemLink = ({
  children,
  highlight,
  href,
}: PropsWithChildren<{ href?: string; highlight?: boolean }>) => {
  return (
    <li
      style={{
        borderTopRightRadius: "5px",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: highlight ? "0px" : "5px",
        borderBottomRightRadius: highlight ? "0px" : "5px",
        borderLeft: "1px solid lightgrey",
        borderRight: "1px solid lightgrey",
        borderTop: "1px solid lightgrey",
        borderBottom: highlight ? "3px solid #cd3545" : "1px solid lightgrey",
      }}
    >
      <OptionalLink href={href}>
        <div
          className={clsx([
            "p-2",
            "bg-stone-100",
            href && ["hover:bg-stone-200", "active:bg-stone-200"],
          ])}
        >
          {children}
        </div>
      </OptionalLink>
    </li>
  );
};

export default ListItemLink;
