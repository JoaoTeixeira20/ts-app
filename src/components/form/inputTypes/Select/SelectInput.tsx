import { SyntheticEvent, ReactElement, useEffect, useState } from 'react';
import {
  inputTypePropsType,
  formType,
} from '../../../../configuration/configuration';
import * as S from '../../Form.styles';
import FormBuilder from '../../FormBuilder';

const SelectInput = ({ ...props }: inputTypePropsType): ReactElement => {
  const [active, setActive] = useState<string>();

  const [additionalFields, setAdditionalFields] = useState<
    formType | undefined
  >();

  const changeItems = (event: SyntheticEvent<HTMLSelectElement>): void => {
    const selectedIndex: number = event.currentTarget.selectedIndex;
    const currentValue =
      event.currentTarget.options[selectedIndex].dataset['key'];
    setActive(currentValue);
    props.onChangeAction && props.onChangeAction(event);
  };

  useEffect(() => {
    !active && setActive(props.content.fields?.[0].key || '');
    setAdditionalFields(
      props.content.fields?.find((field) => field.key === active)?.fields
    );
  }, [active, props.content.fields]);

  return (
    <>
      <S.SelectType onChange={changeItems}>
        <FormBuilder fields={props.content.fields} />
      </S.SelectType>
      <FormBuilder fields={additionalFields} />
    </>
  );
};

export default SelectInput;
