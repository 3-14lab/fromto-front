import { ReactNode } from 'react';

type FormGroupProps = {
  children: ReactNode;
  error?: string;
}

export default function FormGroup({ children, error }: FormGroupProps) {
  return (
    <div className="mt-2">
      {children}
      {error && <small  className="block text-xs mt-1 text-right text-red-400">{error}</small>}
    </div>
  );
}
