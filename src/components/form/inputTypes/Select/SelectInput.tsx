import { ReactElement, SyntheticEvent, useState } from 'react';
import { itemComponentType } from '../../ItemComponent';
import { getFormByFieldItemId } from '../../../../helpers/activeItemHelper';
import { formType } from '../../../../configuration/configuration';
import NestedFormComponent from '../../NestedFormComponent';

const SelectInput = (props: itemComponentType): ReactElement => {
  const [activeItem, setActiveItem] = useState<formType | undefined>();

  const onSelectChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    const selectedIndex: number = event.currentTarget.selectedIndex;
    const id = event.currentTarget.options[selectedIndex].dataset['key'];
    setActiveItem(getFormByFieldItemId(props.subForm, id));
    props.onChangeAction && props.onChangeAction(event);
  };

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
                data-key={field.name}
                defaultValue={props.defaultValue}
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
