
import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import { useField } from '@unform/core';
import InputMask from 'react-input-mask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  masked?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  masked,
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
    <>
      {masked ? 
        <InputMask mask={masked} inputRef={inputRef} style={{borderColor: !!error ? '#d60f0f' : "" }} {...rest} />
      :
        <input ref={inputRef} style={{borderColor: !!error ? '#d60f0f' : "" }} {...rest} />
      }
    </>
  )
};

export default Input;