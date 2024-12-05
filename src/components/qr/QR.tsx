export const QRCodePlaceholder: React.FC<{ size: number }> = ({ size }) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: "#fff",
      margin: "10px auto",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundImage: `
      linear-gradient(to right, black 25%, transparent 25%, transparent 75%, black 75%, black),
      linear-gradient(to bottom, black 25%, transparent 25%, transparent 75%, black 75%, black)
    `,
        backgroundSize: `${size / 5}px ${size / 5}px`,
        opacity: 0.8,
      }}
    />
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "10%",
        right: "10%",
        bottom: "10%",
        border: "4px solid black",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: "20%",
        left: "20%",
        width: "20%",
        height: "20%",
        backgroundColor: "black",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: "20%",
        right: "20%",
        width: "20%",
        height: "20%",
        backgroundColor: "black",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: "20%",
        left: "20%",
        width: "20%",
        height: "20%",
        backgroundColor: "black",
      }}
    />
  </div>
);
