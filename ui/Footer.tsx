import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex gap-3 justify-center leading-tight">
      <Link className="text-secondary hover:underline text-sm" href="/about">
        About
      </Link>
    </footer>
  );
};

export default Footer;
