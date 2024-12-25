import Link from "next/link";
import { ReactElement } from "react";

const Breadcrumbs = ({ links }: { links?: ReactElement[] }) => {
  return (
    <p key="breadcrumbs" className="text-lg text-gray-300">
      <Link className="active:opacity-70" href="/">
        🌁
      </Link>
      {links?.map((link) => {
        return (
          <>
            <span className="ml-2 mr-1">/</span>
            {link}
          </>
        );
      })}
    </p>
  );
};

export default Breadcrumbs;
