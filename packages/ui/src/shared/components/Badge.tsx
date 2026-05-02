import React from "react";
import "./Badge.css";

interface BadgeProps {
  label: string;
  variant: "locked" | "available" | "complete" | "in-progress";
}

export function Badge({ label, variant }: BadgeProps) {
  return (
    <span className={`badge badge--${variant}`}>{label}</span>
  );
}
