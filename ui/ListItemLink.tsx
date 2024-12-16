import clsx from "clsx";
import OptionalLink from "./OptionalLink";
import { PropsWithChildren } from "react";

const ListItemLink = ({
  children,
  href,
}: PropsWithChildren<{ href?: string }>) => {
  return (
    <li
      style={{
        borderTopRightRadius: "5px",
        borderTopLeftRadius: "5px",
        borderLeft: "1px solid lightgrey",
        borderRight: "1px solid lightgrey",
        borderTop: "1px solid lightgrey",
        borderBottom: "3px solid #cd3545",
      }}
    >
      <OptionalLink href={href}>
        <div
          className={clsx([
            "p-2.5",
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
