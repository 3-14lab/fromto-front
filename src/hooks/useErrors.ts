/* eslint-disable no-param-reassign */
import { ChangeEvent, useState } from 'react';

import { Error, FieldToClear } from './DTO/useErrorsDTO';
import { ExtraValidation, FieldName } from './DTO/useFormsDTO';

export function useErrors<T>() {
  const [errors, setErrors] = useState<Error<T>[]>([]);

  function setError({ field, message, errorName }: Error<T>) {
    const errorAlreadyExists = errors?.find((error) => error.field === field
      && error.errorName === errorName);

    if (errorAlreadyExists) return;

    setErrors((prevState) => [{ field, message, errorName }, ...prevState]);
  }

  function removeError(fieldName: FieldName<T>, errorName: string) {
    setErrors((prevState) => prevState
      .filter((error) => !(error.errorName === errorName && error.field === fieldName)));
  }

  function getErrorMessageByFieldName(field: FieldName<T>) {
    return errors?.find((error) => error?.field === field)?.message;
  }

  function handleRequiredFieldChange(
    name: FieldName<T>,
    errorMessage: string,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    if (!event.target.value) {
      setError({ field: name, errorName: 'required', message: errorMessage });
    } else {
      removeError(name, 'required');
    }
  }

  function handleExtraValidations(
    name: FieldName<T>,
    validations: ExtraValidation,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    Object.keys(validations).forEach((validationName) => {
      if (!event.target.value) return;

      const messageIfHasError = validations[validationName](event.target.value, validationName);

      if (messageIfHasError) {
        setError({ field: name, errorName: validationName, message: messageIfHasError });
      } else {
        removeError(name, validationName);
      }
    });
  }

  function clearErrors(fieldsToClear: FieldToClear<T>[]) {
    fieldsToClear.forEach(({ field, errorName }) => {
      removeError(field, errorName);
    });
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
    handleRequiredFieldChange,
    handleExtraValidations,
    clearErrors,
  };
}
