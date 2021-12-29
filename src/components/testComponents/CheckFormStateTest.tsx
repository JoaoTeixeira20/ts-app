import { ReactElement, useContext } from 'react';
import { FormValuesContext } from '../../context/FormValuesContext';

const CheckFormStateTest = (): ReactElement => {
  const { values } = useContext(FormValuesContext);

  const checkValues = () => {
    console.log(JSON.stringify(values, null, ' '));
  };
  return (
    <>
      <button onClick={checkValues}>check context state brah</button>;
      <div>{JSON.stringify(values, null, ' ')}</div>;
    </>
  );
};

export default CheckFormStateTest;
