import { ReactElement } from 'react'; // we need this to make JSX compile

import { formItemType } from '../../../../configuration/configuration';

type optionInputType = {
  content: formItemType;
};

const OptionInput = ({ content }: optionInputType): ReactElement => {
  return (
    <option
      key={content.key}
      data-key={content.key}
      value={content.value?.toString()}
    >
      {content.text}
    </option>
  );
};

export default OptionInput;
