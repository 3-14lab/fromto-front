export type FieldName<T> = keyof T & string;

export type ExtraValidation = {
  [field: string]: (value: string, validationName: string) => string
};

export type ValidateOptions = {
  required: string;
  extraValidations: ExtraValidation;
}

export type InputProps = {
  label?: string;
  type?: string,
  placeholder?: string;
  validate?: Partial<ValidateOptions>;
}

export type InputObjectProps<T> = {
  [field in FieldName<T>]: InputProps;
}
