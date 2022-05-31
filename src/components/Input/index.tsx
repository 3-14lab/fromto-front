
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useField } from '@unform/core';
import { telephone } from './mask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  masked?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  masked,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, error} = useField(name);

  const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    telephone(e);
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return(
    <input ref={inputRef} onKeyUp={masked ? handleKeyUp : undefined} style={{borderColor: !!error ? '#d60f0f' : "" }} {...rest} />
  )
};

export default Input;