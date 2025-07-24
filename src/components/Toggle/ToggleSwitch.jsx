import React, { useEffect, useState } from "react";
import "./Toggle.scss";

export default function ToggleSwitch() {
  const [active, setActive] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (active) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [active]);

  const handleToggle = () => setActive((prev) => !prev);

  return (
    <div
      className={`toggle-switch${active ? " active" : ""}`}
      onClick={handleToggle}
      tabIndex={0}
      role="button"
      aria-pressed={active}
      style={{ outline: "none" }}
    >
      <div className="toggle-knob">
        {active ? <span className="moon-icon">🌙</span> : <span className="sun-icon">☀️</span>}
      </div>
    </div>
  );
}
