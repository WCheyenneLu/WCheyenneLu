function Line({ width, color }) {
  return (
    <div
      style={{
        width: `${width}`,
        height: "2px",
        backgroundColor: `${color}`,
      }}
    ></div>
  );
}

export default Line;
