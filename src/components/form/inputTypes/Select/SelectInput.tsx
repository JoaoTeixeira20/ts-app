import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import {
  formItemType,
  formType,
} from "../../../../configuration/configuration";
import * as S from "../../Form.styles";
import FormBuilder from "../../FormBuilder";

type OptionType = {
  parameters: formItemType;
  value?: string;
  onChangeAction: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput = ({
  parameters,
  value,
  onChangeAction,
}: OptionType): ReactElement => {
  const [active, setActive] = useState<string>();

  const [additionalFields, setAdditionalFields] = useState<
    formType | undefined
  >();

  const changeItems = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedIndex: number = event.currentTarget.selectedIndex;
    const currentValue = event.target.options[selectedIndex].dataset["key"];
    console.log("value is ", currentValue);
    setActive(currentValue);
    onChangeAction(event);
  };

  useEffect(() => {
    !active && setActive(parameters.fields?.[0].key || "");
    setAdditionalFields(
      parameters.fields?.find((field) => field.key === active)?.fields
    );
  }, [active, parameters.fields]);

  return (
    <>
      <S.SelectType onChange={changeItems}>
        {parameters.fields?.map((field) => {
          return (
            <option key={field.key} data-key={field.key} value={field.value}>
              {field.text}
            </option>
          );
        })}
      </S.SelectType>
      <FormBuilder fields={additionalFields} />
    </>
  );
};

export default SelectInput;
