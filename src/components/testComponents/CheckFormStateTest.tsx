import { ReactElement, useContext, useState } from 'react';
import {
  formConfig2,
  formConfig as tempConfig,
  fieldType,
} from '../../configuration/configuration';
import { FormValuesContext } from '../../context/FormValuesContext';
import { buildFormPath } from '../../helpers/utils';

const CheckFormStateTest = (): ReactElement => {
  const { values, setFormConfig, formConfig } = useContext(FormValuesContext);
  const [config, setConfig] = useState<boolean>(false);

  const checkValues = () => {
    console.log(JSON.stringify(values, null, ' '));
  };

  const toggleFormConfig = () => {
    setConfig(!config);
    setFormConfig(config ? tempConfig : formConfig2);
  };

  const changeOptions = () => {
    const fieldsToAdd: fieldType[] = [
      {
        label: 'addedoption1',
        name: '1',
        type: 'text',
        value: '1',
      },
      {
        label: 'addedoption2',
        name: '2',
        type: 'text',
        value: '2',
      },
      {
        label: 'addedoption3',
        name: '3',
        type: 'select',
        value: '3',
        subForm: {
          id: 'newId',
          fields: [
            {
              label: 'from1',
              name: 'from1',
              type: 'selectoption',
              value: 'from1',
            },
            {
              label: 'from2',
              name: 'from2',
              type: 'selectoption',
              value: 'from2',
            },
            {
              label: 'from2',
              name: 'from3',
              type: 'selectoption',
              value: 'from3',
            },
          ],
        },
      },
    ];

    const morphForm = buildFormPath(
      'mainform.selectoptions.option2form',
      // 'mainform',
      formConfig,
      fieldsToAdd
    );

    console.log('formconfig', formConfig);
    console.log('morphing', morphForm);
    setFormConfig(morphForm);
    // console.log('morphing', morphForm);
    // console.log('formconfig', formConfig);
    // setFormConfig(result);
  };

  return (
    <>
      <button onClick={checkValues}>check context state brah</button>
      <button onClick={toggleFormConfig}>toggle form config</button>
      <button onClick={changeOptions}>change options on form</button>
      {/* <div>{JSON.stringify(values)}</div> */}
    </>
  );
};

export default CheckFormStateTest;
