import Link from "next/link";

const DataAttribution = () => {
  return (
    <div className="pt-2">
      <span className="text-sm text-secondary">
        Data provided by{" "}
        <Link className="hover:underline" href="https://511.org/open-data">
          511.org
        </Link>
      </span>
    </div>
  );
};

export default DataAttribution;
