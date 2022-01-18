import React from 'react'

interface BodyHeaderProps {
  children: React.ReactNode;
  type?: "small" | "medium" | "large";
  bold?: boolean;
  color?: string;
}

function BodyText({ children, type, bold, color }: BodyHeaderProps) {
  return <h1 className={`text-${color} font-${bold ? 'semibold' : 'light'} text-${type === "small" ? "xs" : type === "medium" ? "sm" : "xl"}`}>{children}</h1>
}

export default BodyText
