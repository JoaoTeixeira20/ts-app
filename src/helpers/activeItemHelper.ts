import { fieldType, formType } from '../configuration/configuration';

export const getFormByFieldItemName = (
  form: formType | undefined,
  name: string | undefined
): formType | undefined => {
  const result = form?.fields.find((el) => el.name === name);
  return result?.subForm;
};

export const getFormFieldByValue = (
  form: formType | undefined,
  value: string | undefined
): fieldType | undefined => {
  const result = form?.fields.find((el) => el.value === value);
  return result;
};
