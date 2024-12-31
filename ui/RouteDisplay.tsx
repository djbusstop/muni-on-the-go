const LINE_COLORS = {
  E: { background: "#666666", color: "white" },
  F: { background: "#f0e78d", color: "black" },
  J: { background: "#faa832", color: "white" },
  K: { background: "#539ec0", color: "white" },
  L: { background: "#941d91", color: "white" },
  M: { background: "#008950", color: "white" },
  N: { background: "#004789", color: "white" },
  S: { background: "#ffcd00", color: "black" },
  T: { background: "#d50241", color: "white" },
  BUS: { background: "#d41144", color: "white" },
};

const RouteDisplay = ({ route }: { route: string }) => {
  const isBus = !(route in LINE_COLORS);
  const lineColor = isBus
    ? LINE_COLORS.BUS
    : LINE_COLORS[route as keyof typeof LINE_COLORS];

  if (!route) return null;

  return (
    <span
      style={{
        fontFamily: "arial",
        background: lineColor.background,
        color: lineColor.color,
        padding: isBus ? `3.2px 6px 3px 5.5px` : `3.2px 5.5px 2.5px 5.5px`,
        borderRadius: "3px",
      }}
    >
      {route}
    </span>
  );
};

export default RouteDisplay;
