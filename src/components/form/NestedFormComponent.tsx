import { ReactElement } from 'react';
import { formType } from '../../configuration/configuration';
import FormComponent from './FormComponent';

type nestedFormComponentType = {
  subForm: formType | formType[] | undefined;
  activeItem: formType;
};

const NestedFormComponent = (props: nestedFormComponentType): ReactElement => {
  const formPath =
    props.subForm && !Array.isArray(props.subForm) && props.subForm.id;

  return (
    <FormComponent
      content={{
        ...props.activeItem,
        id: formPath
          ? `${formPath}.${props.activeItem.id}`
          : `${props.activeItem.id}`,
      }}
    />
  );
};

export default NestedFormComponent;
