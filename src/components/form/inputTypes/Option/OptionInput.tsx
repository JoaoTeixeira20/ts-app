import { ReactElement } from 'react'; // we need this to make JSX compile

import { inputTypePropsType } from '../../../../configuration/configuration';

const OptionInput = ({ ...props }: inputTypePropsType): ReactElement => {
  return (
    <option
      key={props.content.key}
      data-key={props.content.key}
      value={props.content.value?.toString()}
    >
      {props.content.text}
    </option>
  );
};

export default OptionInput;
