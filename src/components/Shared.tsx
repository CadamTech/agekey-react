import React from "react";
import { Ceremony } from "./types";

const AgeKeyStyleComponent: React.FC<{
  ceremony: Ceremony;
  onClick?: any;
  disabled?: boolean;
  innerRef?: any;
}> = ({ ceremony, onClick, disabled, innerRef }) => {
  const text = {
    register: "create my ",
    authenticate: "use my ",
    update: "upgrade my ",
    test: "test my ",
    manage: "manage my ",
  };

  return (
    <button
      ref={innerRef}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: "#392669", // bg-violet-clear
        width: "280px",
        height: "60px",
        borderRadius: "9999px", // rounded-full
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        color: "white",
        fontWeight: 400,
      }}
    >
      {/* ceremony text */}
      <span
        style={{
          fontWeight: 300, // font-light
          position: "absolute",
          left: "2.5rem", // left-10
          fontSize: "0.875rem", // text-sm
          top: "50%",
          transform: "translateY(-50%)", // vertically center
        }}
      >
        {text[ceremony || "register"]}
      </span>

      {/* AgeKey text logo */}
      <img
        src="https://public-assets.opale.io/agekey.org/logos/agekey-text.svg"
        alt="AgeKey"
        style={{
          position: "absolute",
          left: "7.5rem", // left-30
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />

      {/* Plus icon circle */}
      <div
        style={{
          minWidth: "2.5rem", // min-w-10
          minHeight: "2.5rem", // min-h-10
          backgroundColor: "#564787", // bg-lavander/20
          borderRadius: "9999px",
          position: "absolute",
          right: "0.75rem", // right-3
          top: "50%",
          transform: "translateY(-50%)",
          transition: "transform 200ms ease-in-out",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(90deg)",
            height: "3px",
            width: "1rem",
            backgroundColor: "white",
            borderRadius: "9999px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "3px",
            width: "1rem",
            backgroundColor: "white",
            borderRadius: "9999px",
            transition: "transform 200ms ease-in-out",
          }}
        />
      </div>
    </button>
  );
};

export default AgeKeyStyleComponent;
