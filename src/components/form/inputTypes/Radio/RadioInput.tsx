import { ReactElement, SyntheticEvent, useEffect, useState } from 'react'; // we need this to make JSX compile
import { formType } from '../../../../configuration/configuration';
import { getFormByFieldItemId } from '../../../../helpers/activeItemHelper';

import { itemComponentType } from '../../ItemComponent';
import NestedFormComponent from '../../NestedFormComponent';

const RadioInput = (props: itemComponentType): ReactElement => {
  const [activeItem, setActiveItem] = useState<formType | undefined>();

  const onSelectChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const id = event.currentTarget.dataset['key'];
    setActiveItem(getFormByFieldItemId(props.subForm, id));
    props.onChangeAction && props.onChangeAction(event);
  };

  useEffect(() => {
    setActiveItem(
      getFormByFieldItemId(props.subForm, props.subForm?.fields[0].name)
    );
  }, []);

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
