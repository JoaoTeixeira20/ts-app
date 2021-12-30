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
      <div style={{ whiteSpace: 'pre-wrap', fontSize: '10px' }}>
        {JSON.stringify(values, null, ' ')}
      </div>
      ;
    </>
  );
};

export default CheckFormStateTest;
