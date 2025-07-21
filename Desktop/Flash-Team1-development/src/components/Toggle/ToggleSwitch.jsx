import React, { useState } from "react";
import "./Toggle.scss"; // Falls du SCSS/CSS für den Switch hast

export default function ToggleSwitch() {
  const [active, setActive] = useState(false);

  const handleToggle = () => setActive(!active);

  return (
    <div
      className={`toggle-switch${active ? " active" : ""}`}
      onClick={handleToggle}
      tabIndex={0}
      role="button"
      aria-pressed={active}
      style={{ outline: "none" }}
    >
      <div className="toggle-knob">{active && <span className="moon-icon">🌙</span>}</div>
    </div>
  );
}
