import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

const OptionalLink = ({
  children,
  href,
  ...rest
}: PropsWithChildren<Partial<LinkProps>>) => {
  if (href)
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  return <div>{children}</div>;
};

export default OptionalLink;
