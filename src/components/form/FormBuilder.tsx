import { ReactElement, useContext } from 'react'; // we need this to make JSX compile
import { formType } from '../../configuration/configuration';
import {
  FormValuesContext,
  FormValuesContextProvider,
} from '../../context/FormValuesContext';
import CheckFormStateTest from '../testComponents/CheckFormStateTest';
import FormComponent from './FormComponent';

const Wrapper = () => {
  const { formConfig } = useContext(FormValuesContext);

  return <FormComponent content={formConfig} />;
};

type formBuilderType = {
  config: formType;
};

const FormBuilder = (props: formBuilderType): ReactElement => {
  return (
    <FormValuesContextProvider formConfig={props.config}>
      <Wrapper />
      <CheckFormStateTest />
    </FormValuesContextProvider>
  );
};

export default FormBuilder;
