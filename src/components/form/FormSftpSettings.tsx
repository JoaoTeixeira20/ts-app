import { ReactElement } from 'react'; // we need this to make JSX compile

import { sftpConfiguration } from '../../configuration/configuration'
import FormBuilder from './FormBuilder';

import * as S from './Form.styles'

const SftpSettings = (): ReactElement => {

    return (
      <S.FormSftpSettingsContainer>
        <FormBuilder fields={sftpConfiguration}></FormBuilder>
      </S.FormSftpSettingsContainer>
    )
}

export default SftpSettings;
