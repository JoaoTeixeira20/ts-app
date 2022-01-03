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
import { handleFileRead } from '../../helpers/filehandler';
import TextInput from './inputTypes/Text/TextInput';
import FileInput from './inputTypes/File/FileInput';
import ButtonInput from './inputTypes/Button/ButtonInput';
import CollapseInput from './inputTypes/Collapse/CollapseInput';
import CheckboxInput from './inputTypes/Checkbox/CheckboxInput';
import DateInput from './inputTypes/Date/DateInput';
import RadioInput from './inputTypes/Radio/RadioInput';
import SelectInput from './inputTypes/Select/SelectInput';
import RangeInput from './inputTypes/Range/RangeInput';
import Tabs from './inputTypes/Tabs/InputTabs';
import { validations } from '../../validators/schemaValidators';
import { actions } from '../../actions/actions';

export type itemComponentType = fieldType & {
  onChangeAction?: (
    event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onFileChangeAction?: (event: SyntheticEvent<HTMLInputElement>) => void;
  onClickAction?: (event: SyntheticEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  validationMessages: string[] | undefined;
};

const ItemComponent = (props: fieldType): ReactElement => {
  const { id } = useContext(FormPathContext);
  const {
    getValueFromPath,
    setValueOnPath,
    getValidationFromPath,
    getValuesFromPath,
  } = useContext(FormValuesContext);
  const [validationMessages, setValidationMessages] = useState<
    string[] | undefined
  >();
  const fieldidPath = `${id}.${props.name}`;

  const setMessages = async () => {
    const validationType = getValidationFromPath(id, props.name);
    validationType &&
      setValidationMessages(
        await validations[validationType](getValueFromPath(id, props.name))
      );
  };

  const onChangeAction = useCallback(
    async (
      event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>
    ): Promise<void> => {
      const actionValue = event.currentTarget.value;
      setValueOnPath(id, props.name, actionValue);
      setMessages();
    },
    [id, props.name, setValueOnPath]
  );

  const onFileChangeAction = useCallback(
    async (event: SyntheticEvent<HTMLInputElement>): Promise<void> => {
      const file: Blob =
        (event.currentTarget.files && event.currentTarget.files[0]) ||
        new Blob();
      const result = await handleFileRead(file);
      setValueOnPath(id, props.name, result?.toString() || '');
    },
    [id, props.name, setValueOnPath]
  );

  const onClickAction = (_: SyntheticEvent<HTMLInputElement>) => {
    // console.log('you clicked ', props?.name);
    // console.log('im on ', fieldidPath);
    props.action && actions[props.action](getValuesFromPath(id));
  };

  useEffect(() => {
    setMessages();
  }, []);

  const propsToInput: itemComponentType = {
    ...props,
    onChangeAction,
    onFileChangeAction,
    onClickAction,
    defaultValue: props.value || getValueFromPath(id, props.name),
    validationMessages,
  };

  const getType = (props: fieldType) => {
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
        return (
          <div style={{ color: 'orange' }}>
            WARNING: No implementation for {props.type}
          </div>
        );
    }
  };

  return (
    <>
      <div style={{ color: 'orange' }}>field id: {fieldidPath}</div>
      {getType(props)}
    </>
  );
};

export default ItemComponent;
