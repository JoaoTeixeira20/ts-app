import {
  ReactElement,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fieldType } from '../../configuration/configurationv2';
import { FormValuesContext } from '../../context/FormValuesContext';
import { FormContext } from '../../context/FromContextv2';
import { getValueFromDotNotationIndex, strToObj } from '../../helpers/utils';
import FormComponent from './FormComponent';
import { handleFileRead } from '../../helpers/filehandler';
import TextInput from './inputTypes/Text/TextInput';
import Tabs from './inputTypes/Tabs/InputTabs';
import FileInput from './inputTypes/File/FileInput';
import ButtonInput from './inputTypes/Button/ButtonInput';
import CollapseInput from './inputTypes/Collapse/CollapseInput';
import CheckboxInput from './inputTypes/Checkbox/CheckboxInput';
import DateInput from './inputTypes/Date/DateInput';
import RadioInput from './inputTypes/Radio/RadioInput';

export type itemComponentType = fieldType & {
  onChangeAction?: (event: SyntheticEvent<HTMLInputElement>) => void;
  onClickAction?: (event: SyntheticEvent<HTMLInputElement>) => void;
};

const ItemComponent = (props: fieldType): ReactElement => {
  const [value, setValue] = useState<string>('');
  const { id } = useContext(FormContext);
  const { values, mergeValues } = useContext(FormValuesContext);
  const fieldidPath = `${id}.${props.name}`;

  const onChangeAction = (event: SyntheticEvent<HTMLInputElement>): void => {
    const actionValue = event.currentTarget.value;
    const nestedValue = strToObj(fieldidPath, actionValue);
    setValue(actionValue);
    mergeValues(nestedValue);
  };

  const handleFileSelected = async (
    event: SyntheticEvent<HTMLInputElement>
  ): Promise<void> => {
    const file: Blob =
      (event.currentTarget.files && event.currentTarget.files[0]) || new Blob();
    const result = await handleFileRead(file);
    const nestedValue = strToObj(fieldidPath, result?.toString() || '');
    setValue(result?.toString() || '');
    mergeValues(nestedValue);
  };

  const onClickAction = (_: SyntheticEvent<HTMLInputElement>) => {
    console.log('you clicked ', props?.name);
    console.log('im on ', fieldidPath);
  };

  useEffect(() => {
    try {
      const filteredValue = getValueFromDotNotationIndex(values, fieldidPath);
      setValue(filteredValue);
    } catch (e) {
      console.log('cannot find key on values context');
    }
  }, []);

  const propsToInput: itemComponentType = {
    ...props,
    onChangeAction,
    onClickAction,
    value,
  };

  switch (props.type) {
    case 'tabs':
      return <Tabs {...props} />;
    case 'text':
    case 'password':
    case 'email':
    case 'tel':
    case 'number':
    case 'search':
    case 'url':
      return <TextInput {...propsToInput} />;
    case 'file':
      const propsToFile = {
        ...props,
        onChangeAction: handleFileSelected,
        value,
      };
      return <FileInput {...propsToFile} />;
    case 'button':
      return <ButtonInput {...propsToInput} />;
    case 'collapse':
      return <CollapseInput {...propsToInput} />;
    case 'checkbox':
      return <CheckboxInput {...propsToInput} />;
    case 'date':
      return <DateInput {...propsToInput} />;
    case 'radio':
      return <RadioInput {...propsToInput} />;
    default:
      return (
        <>
          <div style={{ border: '1px solid red' }}>
            itemformid: {fieldidPath}
          </div>
          <div> label: {props.label}</div>
          <div> name: {props.name}</div>
          <input type='text' value={value} onChange={onChangeAction} />
          {Array.isArray(props.subForm)
            ? props.subForm.map((form) => {
                return <FormComponent key={form.id} content={form} />;
              })
            : props.subForm && <FormComponent content={props.subForm} />}
        </>
      );
  }
};

export default ItemComponent;
