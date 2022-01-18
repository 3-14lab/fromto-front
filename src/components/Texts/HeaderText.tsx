import React from 'react'

interface BodyHeaderProps {
  children: React.ReactNode;
  type?: "small" | "medium" | "large";
}

function HeaderText({ children }: BodyHeaderProps) {
  return <h1 className="text-2xl font-bold text-title">{children}</h1>
}

export default HeaderText;
