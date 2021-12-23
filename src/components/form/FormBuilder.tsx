import { ReactElement, useContext } from "react"; // we need this to make JSX compile

import { formType } from "../../configuration/configuration";
import InputBuilder from "./InputBuilder";

type FormBuilderProps = {
  fields?: formType;
};

const FormBuilder = ({ fields }: FormBuilderProps): ReactElement => {
  return (
    <>
      {fields &&
        fields?.length > 0 &&
        fields.map((field) => {
          return <InputBuilder key={field.key} field={field} />;
        })}
    </>
  );
};

export default FormBuilder;
