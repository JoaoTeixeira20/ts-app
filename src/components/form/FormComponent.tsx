import { ReactElement, useContext } from 'react';
import { formType } from '../../configuration/configuration';
import {
  FormPathContext,
  FormPathContextConsumer,
} from '../../context/FromPathContext';
import ItemComponent from './ItemComponent';

type formComponentType = {
  content: formType;
};

const FormWrapper = (props: formType): ReactElement => {
  const { id } = useContext(FormPathContext);

  return (
    <div style={{ border: '2px dashed black' }}>
      <div style={{ border: '1px solid red', color: 'red' }}>form id: {id}</div>
      {props.fields.map((field) => {
        return <ItemComponent key={field.name} {...field}></ItemComponent>;
      })}
    </div>
  );
};

const FormComponent = (props: formComponentType): ReactElement => {
  return (
    <>
      <FormPathContextConsumer id={props.content?.id}>
        <FormWrapper {...props.content} />
      </FormPathContextConsumer>
    </>
  );
};

export default FormComponent;
