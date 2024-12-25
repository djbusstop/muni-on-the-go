import clsx from "clsx";

const Alert = ({ label, icon }: { label: string; icon?: string }) => {
  return (
    <div className={clsx(["flex", "items-center", "gap-4", "px-3"])}>
      <span className="text-3xl">{icon || "⚠️"}</span>
      <p className="text-lg">{label}</p>
    </div>
  );
};

export default Alert;
