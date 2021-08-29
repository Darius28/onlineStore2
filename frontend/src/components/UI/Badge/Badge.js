import React from "react";
import "./Badge.css";

export default function Badge({ children, className }) {
  return <div className={`badge ${className}`}>{children}</div>;
}
