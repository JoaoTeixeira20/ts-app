import { fieldType, formType } from '../configuration/configuration';

export const getActiveItemById = (
  form: formType | formType[] | undefined,
  id: string | undefined
): formType | undefined => {
  return Array.isArray(form) ? form.find((el) => el.id === id) : undefined;
};

export const getFormByFieldItemId = (
  form: formType | formType[] | undefined,
  id: string | undefined
): formType | undefined => {
  const result = !Array.isArray(form)
    ? form?.fields.find((el) => el.name === id)
    : undefined;
  return !Array.isArray(result?.subForm) ? result?.subForm : undefined;
};

export const isActiveItem = (
  form: formType | undefined,
  id: string
): boolean => {
  return form?.id === id;
};
