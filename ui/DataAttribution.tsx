import Link from "next/link";

const DataAttribution = () => {
  return (
    <div className="pt-3">
      <span className="text-xs text-secondary">
        Data provided by{" "}
        <Link className="hover:underline" href="https://511.org/open-data">
          511.org
        </Link>
      </span>
    </div>
  );
};

export default DataAttribution;
