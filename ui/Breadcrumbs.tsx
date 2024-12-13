import Link from "next/link";
import { ReactElement } from "react";

const Breadcrumbs = ({ links }: { links: ReactElement[] }) => {
  return (
    <p key="breadcrumbs" className="text-xs text-secondary">
      <Link className="hover:underline" href="/">
        Home
      </Link>
      {links.map((link) => {
        return <> / {link}</>;
      })}
    </p>
  );
};

export default Breadcrumbs;
