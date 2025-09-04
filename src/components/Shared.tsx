import React, { useState } from "react";

// Define the Ceremony type since it's imported
type Ceremony = "register" | "authenticate" | "update" | "test" | "manage";

export const AgeKeyStyleComponent: React.FC<{
  ceremony: Ceremony;
  onClick?: any;
  disabled?: boolean;
  innerRef?: any;
}> = ({ ceremony, onClick, disabled, innerRef }) => {
  const [hovered, setHovered] = useState(false);

  const text = {
    register: "create my",
    authenticate: "use my",
    update: "upgrade my",
    test: "test my",
    manage: "manage my",
  };

  return (
    <button
      ref={innerRef}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#392669",
        width: "280px",
        height: "60px",
        borderRadius: "9999px",
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 10px 0 10px",
        cursor: disabled ? "not-allowed" : "pointer",
        overflow: "hidden",
        gap: '0px 10px',
        color: "white",
        fontWeight: 400,
        border: "none",
        transition: "all 200ms ease-in-out",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {/* ceremony text */}
      <span
        style={{
          fontWeight: 300,
          fontSize: "15px",
          letterSpacing: '1px'
        }}
      >
        {text[ceremony || "register"]}
      </span>

      {/* AgeKey text logo */}
      <img
        src="https://public-assets.opale.io/agekey.org/logos/agekey-text.svg"
        alt="AgeKey"
        style={{
          height: "24px",
        }}
      />

      {/* Plus icon circle */}
      <div
        style={{
          minWidth: "2.5rem",
          minHeight: "2.5rem",
          backgroundColor: "#564787",
          borderRadius: "9999px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 200ms ease-in-out",
          transform: hovered 
            ? "rotate(90deg)" 
            : "rotate(0deg)",
        }}
      >
        {/* horizontal bar */}
        <div
          style={{
            position: "absolute",
            height: "3px",
            width: "1rem",
            backgroundColor: "white",
            borderRadius: "9999px",
          }}
        />
        {/* vertical bar */}
        <div
          style={{
            position: "absolute",
            height: "1rem",
            width: "3px",
            backgroundColor: "white",
            borderRadius: "9999px",
          }}
        />
      </div>
    </button>
  );
};

export default AgeKeyStyleComponent