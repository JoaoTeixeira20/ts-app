import {
  ReactElement,
  ChangeEvent,
  MouseEvent,
  useState,
  useEffect,
  useContext,
} from "react"; // we need this to make JSX compile

import { handleFileRead } from "../../configuration/filehandler";

import { formItemType } from "../../configuration/configuration";

import { FormContext } from "../../context/FormContext";

import Option from "./inputTypes/Option/Option";
import InputTabs from "./inputTypes/Tabs/InputTabs";
import TextInput from "./inputTypes/Text/TextInput";
import FileInput from "./inputTypes/File/FileInput";
import ButtonInput from "./inputTypes/Button/ButtonInput";

type FormBuilderProps = {
  field?: formItemType;
};

const InputBuilder = ({ field }: FormBuilderProps): ReactElement => {
  const { formKeys, setKeyValue } = useContext(FormContext);

  const [fieldValue, setFieldValue] = useState<string>("");

  useEffect(() => {
    setFieldValue(formKeys?.[field?.key || ""] || "");
  }, [formKeys, field?.key]);

  const handleFileSelected = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file: Blob =
      (event.currentTarget.files && event.currentTarget.files[0]) || new Blob();
    const result = await handleFileRead(file);
    setKeyValue({ key: field?.key || "", value: result?.toString() || "" });
    setFieldValue(result?.toString() || "");
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyValue({
      key: field?.key || "",
      value: event.currentTarget.value,
    });
    setFieldValue(event.currentTarget.value);
  };

  const handleClick = (_: MouseEvent<HTMLInputElement>) => {
    console.log("you clicked ", field?.key);
  };

  switch (field?.inputType) {
    case "text":
    case "password":
      return (
        <TextInput
          content={field}
          value={fieldValue}
          onChangeAction={handleTextChange}
        />
      );
    case "file":
      return (
        <FileInput
          content={field}
          value={fieldValue}
          onChangeAction={handleFileSelected}
        />
      );
    case "button":
      return <ButtonInput content={field} onClickAction={handleClick} />;
    case "select":
      return <Option parameters={field} />;
    case "tabs":
      return <InputTabs content={field} />;
    case "tabscontent":
      return (
        <>
          {field.fields?.map((el) => (
            <InputBuilder key={el.key} field={el} />
          ))}
        </>
      );
    default:
      return <></>;
  }
};

export default InputBuilder;
