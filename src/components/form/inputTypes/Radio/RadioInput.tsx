import { ReactElement, SyntheticEvent, useEffect, useState } from 'react'; // we need this to make JSX compile
import { formType } from '../../../../configuration/configuration';
import { getFormByFieldItemName } from '../../../../helpers/activeItemHelper';

import { itemComponentType } from '../../ItemComponent';
import NestedFormComponent from '../../NestedFormComponent';

const RadioInput = (props: itemComponentType): ReactElement => {
  const [activeItem, setActiveItem] = useState<formType | undefined>();

  const onSelectChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const id = event.currentTarget.dataset['key'];
    setActiveItem(getFormByFieldItemName(props.subForm, id));
    props.onChangeAction && props.onChangeAction(event);
  };

  useEffect(() => {
    setActiveItem(
      getFormByFieldItemName(
        props.subForm,
        props.subForm?.fields.find((el) => el.value === props.defaultValue)
          ?.name
      )
    );
  }, [props.subForm]);

  return (
    <div>
      {props.subForm &&
        props.subForm?.fields.map((field) => {
          return (
            <div key={field.name}>
              <input
                type='radio'
                defaultChecked={props.defaultValue === field?.value}
                name={props.name}
                data-key={field.name}
                onChange={onSelectChange}
                value={field.value}
              ></input>
              <label>{field.label}</label>
            </div>
          );
        })}
      {activeItem && (
        <NestedFormComponent activeItem={activeItem} subForm={props.subForm} />
      )}
    </div>
  );
};

export default RadioInput;
