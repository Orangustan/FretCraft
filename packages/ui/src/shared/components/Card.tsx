import React from "react";
import "./Card.css";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "highlighted" | "locked";
}

export function Card({ title, children, variant = "default" }: CardProps) {
  return (
    <div className={`card card--${variant}`}>
      {title && <div className="card__title">{title}</div>}
      <div className="card__body">{children}</div>
    </div>
  );
}
