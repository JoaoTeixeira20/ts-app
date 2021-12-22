import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { formItemType } from "../../../../configuration/configuration";
import InputBuilder from "../../InputBuilder";
import * as S from "../../Form.styles";

type OptionType = {
  parameters: formItemType;
};

const Option = ({ parameters }: OptionType): ReactElement => {
  const [active, setActive] = useState<string>();

  const [additionalFields, setAdditionalFields] = useState<
    formItemType[] | undefined
  >();

  const changeItems = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.currentTarget.value;
    setActive(value);
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
            <option key={field.key} value={field.key}>
              {field.text}
            </option>
          );
        })}
      </S.SelectType>
      {additionalFields &&
        additionalFields.length > 0 &&
        additionalFields.map((field) => {
          return (
            <S.FormLine key={field.key}>
              <InputBuilder field={field} />
            </S.FormLine>
          );
        })}
    </>
  );
};

export default Option;
