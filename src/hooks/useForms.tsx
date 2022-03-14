import { ChangeEvent, useState } from 'react';

import { FormGroup } from '../components';

import { FieldName, InputObjectProps, ValidateOptions } from './DTO/useFormsDTO';
import { useErrors } from './useErrors';

export function useForms<T>() {
  const [values, setValues] = useState<T>({} as T);

  const {
    getErrorMessageByFieldName,
    handleRequiredFieldChange,
    handleExtraValidations,
    errors,
    clearErrors,
  } = useErrors<T>();

  function handleFieldsChange(validate: Partial<ValidateOptions> | undefined) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      if (validate) {
        if (validate.required) {
          handleRequiredFieldChange(name as FieldName<T>, validate.required, event);
        }
        if (validate.extraValidations) {
          if (Object.keys(validate.extraValidations).length) {
            handleExtraValidations(
              name as FieldName<T>,
              validate.extraValidations,
              event,
            );
          }
        }
      }
    };
  }

  function createInputs(fields: FieldName<T>[], fieldsObject: InputObjectProps<T>) {
    return fields.map((field) => {
      const {
        label, type, validate, placeholder
      } = fieldsObject[field];

      return (
        <FormGroup key={field as string} error={getErrorMessageByFieldName(field)}>
          {label && <label htmlFor={field as string}>{label}</label>}
          
          <input 
            className={`w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue ${getErrorMessageByFieldName(field) && 'border-red-400 focus:border-red-400'}`} 
            placeholder={placeholder || ''}
            type={type || 'text'}
            name={field as string}
            id={field as string}
            value={values[field] as any ?? ''}
            onChange={handleFieldsChange(validate)}
          />
        </FormGroup>
      );
    });
  }

  function checkFieldPattern(pattern: RegExp, errorMessage: string) {
    return (value: string) => {
      if (!pattern.test(value)) {
        return errorMessage;
      }
    };
  }

  function compareFields(
    field: FieldName<T>,
    fieldToCompare: FieldName<T>,
    errorMessage: string,
  ) {
    return (value: string, errorName: string) => {
      if (value !== values[fieldToCompare] as unknown) {
        return errorMessage;
      }
      clearErrors([{ field, errorName }, { field: fieldToCompare, errorName }]);
    };
  }

  return {
    values,
    errors,
    handleFieldsChange,
    createInputs,
    checkFieldPattern,
    compareFields,
  };
}
