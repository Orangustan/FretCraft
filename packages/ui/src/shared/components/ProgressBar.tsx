import React from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercent?: boolean;
  color?: string;
}

export function ProgressBar({
  value,
  label,
  showPercent = true,
  color,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="progress-bar">
      {(label || showPercent) && (
        <div className="progress-bar__header">
          {label && <span className="progress-bar__label">{label}</span>}
          {showPercent && (
            <span className="progress-bar__percent">{clamped}%</span>
          )}
        </div>
      )}
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{
            width: `${clamped}%`,
            ...(color ? { background: color } : {}),
          }}
        />
      </div>
    </div>
  );
}
