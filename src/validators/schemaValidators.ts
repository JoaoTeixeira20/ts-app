import * as yup from 'yup';

export type avaliableValidations = 'number' | 'default';

const number = yup
  .number()
  .required('need to insert a number')
  .max(50000, 'this field must be less than 50000 chars')
  .min(20, 'this field must be more than 20')
  .typeError('please insert a number');

type validationType = Record<avaliableValidations, any>;

export const validations: validationType = {
  number: (value: any) =>
    number
      .validate(value)
      .then((_) => {
        return undefined;
      })
      .catch((err) => {
        return err.errors;
      }),
  default: () => {
    console.log('default validation');
    return undefined;
  },
};
