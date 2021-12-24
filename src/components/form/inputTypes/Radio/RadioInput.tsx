import { SyntheticEvent, ReactElement } from 'react'; // we need this to make JSX compile

import { formItemType } from '../../../../configuration/configuration';

type radioInputType = {
  content?: formItemType;
  onChangeAction: (event: SyntheticEvent<HTMLInputElement>) => void;
};

const RadioInput = ({
  content,
  onChangeAction,
}: radioInputType): ReactElement => {
  return (
    <div>
      {content?.fields?.map((field) => {
        return (
          <div key={field.key}>
            <input
              type='radio'
              checked={field.value === content?.value}
              name={content.key}
              onChange={onChangeAction}
            ></input>
            <label>{field.text}</label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioInput;
