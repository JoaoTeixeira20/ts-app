import { ReactElement, useContext } from 'react';
import { FormValuesContext } from '../../context/FormValuesContext';

const CheckFormStateTest = (): ReactElement => {
  const { values } = useContext(FormValuesContext);

  const checkValues = () => {
    console.log(values);
  };
  return <button onClick={checkValues}>check context state</button>;
};

export default CheckFormStateTest;
