import { ReactElement, useContext } from 'react';
import { formType } from '../../configuration/configuration';
import { FormContext } from '../../context/FromContext';
import { FormContextConsumer } from '../../context/FromContext';
import ItemComponent from './ItemComponent';

type formComponentType = {
  content: formType;
};

const FormBuilder = (props: formType): ReactElement => {
  const { id } = useContext(FormContext);

  return (
    <>
      <div style={{ border: '1px solid black' }}>form id: {id}</div>
      {props.fields.map((field) => {
        return <ItemComponent key={field.name} {...field}></ItemComponent>;
      })}
    </>
  );
};

const FormComponent = (props: formComponentType): ReactElement => {
  return (
    <>
      <FormContextConsumer id={props.content?.id}>
        <FormBuilder {...props.content} />
      </FormContextConsumer>
    </>
  );
};

export default FormComponent;
