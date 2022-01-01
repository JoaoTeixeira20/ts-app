import { ReactElement, useContext, useState } from 'react';
import { formConfig2, formConfig } from '../../configuration/configuration';
import { FormValuesContext } from '../../context/FormValuesContext';

const CheckFormStateTest = (): ReactElement => {
  const { values, setFormConfig } = useContext(FormValuesContext);
  const [config, setConfig] = useState<boolean>(false);

  const checkValues = () => {
    console.log(JSON.stringify(values, null, ' '));
  };

  const toggleFormConfig = () => {
    setConfig(!config);
    setFormConfig(config ? formConfig : formConfig2);
  };

  return (
    <>
      <button onClick={checkValues}>check context state brah</button>
      <button onClick={toggleFormConfig}>toggle form config</button>
      {/* <div>{JSON.stringify(values)}</div> */}
    </>
  );
};

export default CheckFormStateTest;
