import {
  ReactElement,
  useState,
  useEffect,
  useContext,
  SyntheticEvent,
} from 'react'; // we need this to make JSX compile

import { handleFileRead } from '../../helpers/filehandler';
import { inputValidator } from '../../helpers/inputValidator';

import {
  formItemType,
  validationStateType,
} from '../../configuration/configuration';

import { FormContext } from '../../context/FormContext';

import SelectInput from './inputTypes/Select/SelectInput';
import InputTabs from './inputTypes/Tabs/InputTabs';
import TextInput from './inputTypes/Text/TextInput';
import FileInput from './inputTypes/File/FileInput';
import ButtonInput from './inputTypes/Button/ButtonInput';
import CollapseInput from './inputTypes/Collapse/CollapseInput';
import DateInput from './inputTypes/Date/DateInput';
import OptionInput from './inputTypes/Option/OptionInput';
import RadioInput from './inputTypes/Radio/RadioInput';
import CheckboxInput from './inputTypes/Checkbox/CheckboxInput';
import RangeInput from './inputTypes/Range/RangeInput';
import FormBuilder from './FormBuilder';

type FormBuilderProps = {
  field?: formItemType;
  mainFormKey?: string;
};

const InputBuilder = ({
  field,
  mainFormKey,
}: FormBuilderProps): ReactElement => {
  const { formKeys, setKeyValue } = useContext(FormContext);

  const [fieldValue, setFieldValue] = useState<string | number | boolean>();

  const [validationParameters, setValidationParameters] =
    useState<validationStateType>();

  const handleValidation = (
    event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const validityResult = inputValidator(
      event.currentTarget,
      field?.validation?.validationMessages
    );
    console.log('im validating ', field?.key, 'with ', validityResult);
    setValidationParameters(validityResult);
  };

  const cleanValidation = (): void => {
    setValidationParameters({
      status: true,
      message: '',
    });
  };

  useEffect(() => {
    setFieldValue(formKeys?.[field?.key || ''] || '');
  }, [formKeys, field?.key]);

  const handleFileSelected = async (
    event: SyntheticEvent<HTMLInputElement>
  ): Promise<void> => {
    const file: Blob =
      (event.currentTarget.files && event.currentTarget.files[0]) || new Blob();
    const result = await handleFileRead(file);
    // setKeyValue({ key: field?.key || '', value: result?.toString() || '' });
    setFieldValue(result?.toString() || '');
  };

  const handleValueChange = (
    event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // this will convert true/false strings to boolean(useful for checkbox options) and also strings to numbers
    // this will throw an error if the string is empty or has other formats like a date
    const eventValue = event.currentTarget.value;
    let value = '';
    try {
      value = JSON.parse(eventValue);
    } catch {
      value = eventValue;
    }
    // setKeyValue({
    //   key: field?.key || '',
    //   value: value,
    // });
    setFieldValue(value);
  };

  const handleClick = (_: SyntheticEvent<HTMLInputElement>) => {
    console.log('you clicked ', field?.key);
  };

  const element = (): ReactElement => {
    switch (field?.inputType) {
      case 'text':
      case 'password':
      case 'email':
      case 'tel':
      case 'number':
      case 'search':
      case 'url':
        return (
          <TextInput
            content={field}
            value={fieldValue}
            onChangeAction={handleValueChange}
            onBlurAction={handleValidation}
            onFocusAction={cleanValidation}
            pattern={field.validation?.pattern || ''}
            required={field.validation?.required || false}
            validationParameters={validationParameters}
            form={mainFormKey}
          />
        );
      case 'file':
        return (
          <FileInput
            content={field}
            value={fieldValue}
            onFileAction={handleFileSelected}
          />
        );
      case 'button':
      case 'submit':
        return <ButtonInput content={field} onClickAction={handleClick} />;
      case 'select':
        return (
          <SelectInput
            content={field}
            value={fieldValue}
            onChangeAction={handleValueChange}
          />
        );
      case 'option':
        return <OptionInput content={field} />;
      case 'tabs':
        return <InputTabs content={field} />;
      case 'tabscontent':
        return <FormBuilder content={field.fields} mainFormKey={field.key} />;
      case 'collapse':
        return <CollapseInput content={field} />;
      case 'date':
      case 'datetime-local':
      case 'month':
      case 'time':
      case 'week':
        return (
          <DateInput
            content={field}
            value={fieldValue}
            onChangeAction={handleValueChange}
          />
        );
      case 'radio':
        return (
          <RadioInput
            content={field}
            onChangeAction={handleValueChange}
            value={fieldValue}
          />
        );
      case 'checkbox':
        return (
          <CheckboxInput
            content={field}
            onChangeAction={handleValueChange}
            value={fieldValue}
          />
        );
      case 'range':
        return (
          <RangeInput
            content={field}
            onChangeAction={handleValueChange}
            value={fieldValue}
          />
        );
      default:
        return <></>;
    }
  };
  return field?.inputType !== 'option' ? (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      {element()}
      {mainFormKey ? (
        <div style={{ color: 'red' }}>{mainFormKey}</div>
      ) : (
        <div style={{ color: 'brown' }}>empty</div>
      )}
    </div>
  ) : (
    element()
  );
};

export default InputBuilder;
