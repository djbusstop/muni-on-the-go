import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex gap-3 justify-center">
      <Link
        className="text-secondary hover:underline text-sm"
        href="https://github.com/djbusstop/muni-on-the-go"
      >
        Github
      </Link>
    </footer>
  );
};

export default Footer;
