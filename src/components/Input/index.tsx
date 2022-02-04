
import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import { useField } from '@unform/core';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({
  name,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, error} = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return(
    <input ref={inputRef} style={{borderColor: !!error ? '#d60f0f' : "" }} {...rest} />
  )
};

export default Input;