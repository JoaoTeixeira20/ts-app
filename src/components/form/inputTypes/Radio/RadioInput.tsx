import { SyntheticEvent, ReactElement } from 'react'; // we need this to make JSX compile

import { formItemType } from '../../../../configuration/configuration';

type radioInputType = {
  content?: formItemType;
  value?: string;
  onChangeAction: (event: SyntheticEvent<HTMLInputElement>) => void;
};

const RadioInput = ({
  content,
  value,
  onChangeAction,
}: radioInputType): ReactElement => {
  return (
    <div>
      {content?.fields?.map((field) => {
        return (
          <div key={field.key}>
            <input
              type='radio'
              checked={value === field?.value}
              name={content.key}
              onChange={onChangeAction}
              value={field.value?.toString() || ''}
            ></input>
            <label>{field.text}</label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioInput;
