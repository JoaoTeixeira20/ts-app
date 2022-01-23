import { ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import { itemComponentType } from '../../ItemComponent';
import {
  getFormByFieldItemName,
  getFormFieldByValue,
} from '../../../../helpers/activeItemHelper';
import { formType } from '../../../../configuration/configuration';
import NestedFormComponent from '../../NestedFormComponent';

const SelectInput = (props: itemComponentType): ReactElement => {
  const [activeItem, setActiveItem] = useState<formType | undefined>();

  const onSelectChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    const selectedIndex: number = event.currentTarget.selectedIndex;
    const name = event.currentTarget.options[selectedIndex].dataset['name'];
    setActiveItem(getFormByFieldItemName(props.subForm, name));
    props.onChangeAction && props.onChangeAction(event);
  };

  useEffect(() => {
    setActiveItem(
      getFormByFieldItemName(
        props.subForm,
        getFormFieldByValue(props.subForm, props.defaultValue)?.name
      )
    );
  }, [props.subForm, props.defaultValue]);

  return (
    <>
      <select
        name={props.name}
        onChange={onSelectChange}
        defaultValue={props.defaultValue}
      >
        <option disabled value=''>
          --select one--
        </option>
        {props.subForm &&
          props.subForm?.fields.map((field) => {
            return (
              <option
                key={field.name}
                data-name={field.name}
                value={field.value}
              >
                {field.label}
              </option>
            );
          })}
      </select>
      {activeItem && (
        <NestedFormComponent activeItem={activeItem} subForm={props.subForm} />
      )}
    </>
  );
};

export default SelectInput;
