import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export function getValidationErrors(err: ValidationError): Record<string, string> {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path ? error.path: 'unknow'] = error.message;
  });

  return validationErrors;
}
