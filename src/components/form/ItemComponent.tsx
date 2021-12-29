import {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fieldType } from '../../configuration/configuration';
import { FormValuesContext } from '../../context/FormValuesContext';
import { FormPathContext } from '../../context/FromPathContext';
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
import SelectInput from './inputTypes/Select/SelectInput';
import RangeInput from './inputTypes/Range/RangeInput';

export type itemComponentType = fieldType & {
  onChangeAction?: (
    event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onFileChangeAction?: (event: SyntheticEvent<HTMLInputElement>) => void;
  onClickAction?: (event: SyntheticEvent<HTMLInputElement>) => void;
  defaultValue?: string;
};

const ItemComponent = (props: fieldType): ReactElement => {
  console.log('i rerendered item component');

  const { id } = useContext(FormPathContext);
  const { getValueFromPath, setValueOnPath } = useContext(FormValuesContext);
  const fieldidPath = `${id}.${props.name}`;

  const onChangeAction = useCallback(
    (event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>): void => {
      const actionValue = event.currentTarget.value;
      setValueOnPath(id, props.name, actionValue);
    },
    []
  );

  const onFileChangeAction = useCallback(
    async (event: SyntheticEvent<HTMLInputElement>): Promise<void> => {
      const file: Blob =
        (event.currentTarget.files && event.currentTarget.files[0]) ||
        new Blob();
      const result = await handleFileRead(file);
      setValueOnPath(id, props.name, result?.toString() || '');
    },
    []
  );

  const onClickAction = (_: SyntheticEvent<HTMLInputElement>) => {
    console.log('you clicked ', props?.name);
    console.log('im on ', fieldidPath);
  };

  const propsToInput: itemComponentType = {
    ...props,
    onChangeAction,
    onFileChangeAction,
    onClickAction,
    defaultValue: props.value || getValueFromPath(id, props.name),
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
      return <FileInput {...propsToInput} />;
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
    case 'select':
      return <SelectInput {...propsToInput} />;
    case 'range':
      return <RangeInput {...propsToInput} />;
    default:
      return <div>No implementation for {props.type}</div>;
  }
};

export default ItemComponent;
