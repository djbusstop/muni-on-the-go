import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

const OptionalLink = ({
  children,
  href,
  className,
  ...rest
}: PropsWithChildren<Partial<LinkProps> & { className?: string }>) => {
  if (href)
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  return <div className={className}>{children}</div>;
};

export default OptionalLink;
