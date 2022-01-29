import React from 'react'

interface BodyHeaderProps {
  children: React.ReactNode;
  type?: "small" | "medium" | "large";
}

function HeaderText({ children }: BodyHeaderProps) {
  return <h1 className="font-roboto font-medium text-4xl text-title">{children}</h1>
}

export default HeaderText;
