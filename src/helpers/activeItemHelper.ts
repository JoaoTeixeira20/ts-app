import { fieldType, formType } from '../configuration/configuration';

export const getActiveItemById = (
  form: formType[] | undefined,
  id: string | undefined
): formType | undefined => {
  return form?.find((el) => el.id === id);
};

export const getActiveFieldById = (
  fields: fieldType[] | undefined,
  name: string | undefined
) => {
  return fields?.find((field) => field.name === name);
};

export const getFormByFieldItemName = (
  form: formType | undefined,
  name: string | undefined
): formType | undefined => {
  const result = form?.fields.find((el) => el.name === name);
  return result?.subForm;
};

export const isActiveItem = (
  form: formType | undefined,
  id: string | undefined
): boolean => {
  return form?.id === id;
};
