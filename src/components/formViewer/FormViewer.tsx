import { useContext } from 'react';
import { FormValuesContext } from '../../context/FormValuesContext';

export const FormViewer = () => {
  const { values } = useContext(FormValuesContext);

  console.log('values are ', values);
  return (
    <>
      <div>form example</div>
      <div>{JSON.stringify(values, null, ' ')}</div>
    </>
  );
};
