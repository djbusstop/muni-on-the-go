import clsx from "clsx";

const Alert = ({ label }: { label: string }) => {
  return (
    <div className={clsx(["flex", "items-center", "gap-4"])}>
      <span className="text-3xl">⚠️</span>
      <p className="text-lg">{label}</p>
    </div>
  );
};

export default Alert;
