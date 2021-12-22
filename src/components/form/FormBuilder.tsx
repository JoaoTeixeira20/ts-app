import { ReactElement, useContext } from "react"; // we need this to make JSX compile

import { fieldItemType } from "../../configuration/configuration";
import InputBuilder from "./InputBuilder";
import { FormContext } from "../../context/FormContext";

type FormBuilderProps = {
  fields: fieldItemType[];
};

const FormBuilder = ({ fields }: FormBuilderProps): ReactElement => {
  const { formKeys } = useContext(FormContext);

  const checkstore = () => {
    console.log(formKeys);
  };

  return (
    <>
      {fields?.length > 0 ? (
        fields.map((field) => {
          return <InputBuilder key={field.key} field={field} />;
        })
      ) : (
        <div>No fields</div>
      )}
      <button onClick={checkstore}>check the store</button>
    </>
  );
};

export default FormBuilder;
