import { SyntheticEvent, ReactElement, useEffect, useState } from 'react';
import {
  formItemType,
  formType,
} from '../../../../configuration/configuration';
import * as S from '../../Form.styles';
import FormBuilder from '../../FormBuilder';

type OptionType = {
  parameters: formItemType;
  value?: string | number | boolean;
  onChangeAction: (event: SyntheticEvent<HTMLSelectElement>) => void;
};

const SelectInput = ({
  parameters,
  onChangeAction,
}: OptionType): ReactElement => {
  const [active, setActive] = useState<string>();

  const [additionalFields, setAdditionalFields] = useState<
    formType | undefined
  >();

  const changeItems = (event: SyntheticEvent<HTMLSelectElement>): void => {
    const selectedIndex: number = event.currentTarget.selectedIndex;
    const currentValue =
      event.currentTarget.options[selectedIndex].dataset['key'];
    setActive(currentValue);
    onChangeAction(event);
  };

  useEffect(() => {
    !active && setActive(parameters.fields?.[0].key || '');
    setAdditionalFields(
      parameters.fields?.find((field) => field.key === active)?.fields
    );
  }, [active, parameters.fields]);

  return (
    <>
      <S.SelectType onChange={changeItems}>
        <FormBuilder fields={parameters.fields} />
      </S.SelectType>
      <FormBuilder fields={additionalFields} />
    </>
  );
};

export default SelectInput;
