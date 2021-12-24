import {
  ReactElement,
  useState,
  useEffect,
  useContext,
  SyntheticEvent,
} from 'react'; // we need this to make JSX compile

import { handleFileRead } from '../../helpers/filehandler';

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
import { inputValidator } from '../../helpers/inputValidator';

type FormBuilderProps = {
  field?: formItemType;
};

const InputBuilder = ({ field }: FormBuilderProps): ReactElement => {
  const { formKeys, setKeyValue } = useContext(FormContext);

  const [fieldValue, setFieldValue] = useState<string>('');

  const [valid, setValid] = useState<validationStateType>();

  const handleValidation = (
    event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const validityResult = inputValidator(
      event.currentTarget,
      field?.validation?.validationMessages
    );
    console.log('im validating ', field?.key, 'with ', validityResult);
    setValid(validityResult);
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
    setKeyValue({ key: field?.key || '', value: result?.toString() || '' });
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
    setKeyValue({
      key: field?.key || '',
      value: value,
    });
    setFieldValue(value);
  };

  const handleClick = (_: SyntheticEvent<HTMLInputElement>) => {
    console.log('you clicked ', field?.key);
  };

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
          pattern={field.validation?.pattern || ''}
          required={field.validation?.required || false}
        />
      );
    case 'file':
      return (
        <FileInput
          content={field}
          value={fieldValue}
          onChangeAction={handleFileSelected}
        />
      );
    case 'button':
    case 'submit':
      return <ButtonInput content={field} onClickAction={handleClick} />;
    case 'select':
      return (
        <SelectInput
          parameters={field}
          value={fieldValue}
          onChangeAction={handleValueChange}
        />
      );
    case 'option':
      return <OptionInput content={field} />;
    case 'tabs':
      return <InputTabs content={field} />;
    case 'tabscontent':
      return (
        <>
          {field.fields?.map((el) => (
            <InputBuilder key={el.key} field={el} />
          ))}
        </>
      );
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
      return <RadioInput content={field} onChangeAction={handleValueChange} />;
    case 'checkbox':
      return (
        <CheckboxInput content={field} onChangeAction={handleValueChange} />
      );
    case 'range':
      return <RangeInput content={field} onChangeAction={handleValueChange} />;
    default:
      return <></>;
  }
};

export default InputBuilder;
