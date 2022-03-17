import { FieldName } from './useFormsDTO';

export type Error<T> = {
  field: FieldName<T>;
  errorName: string;
  message: string;
};

export type FieldToClear<T> = {
  field: FieldName<T>;
  errorName: string;
}
