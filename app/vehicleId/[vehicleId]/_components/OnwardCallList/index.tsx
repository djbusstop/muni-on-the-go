import OnwardCallListItem from "./OnwardCallListItem";

const OnwardCallList = ({
  onwardCalls,
}: {
  onwardCalls: Array<OnwardCall>;
}) => {
  return (
    <ul className="flex flex-col list-none gap-4">
      {onwardCalls.map((onwardCall, index) => {
        return (
          <OnwardCallListItem
            key={index}
            onwardCall={onwardCall}
            nextStop={index === 0}
          />
        );
      })}
    </ul>
  );
};

export default OnwardCallList;
