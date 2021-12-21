import React, { ReactElement, MouseEvent, useEffect, useState } from 'react'; // we need this to make JSX compile

import { uploadConfiguration } from '../../configuration/configuration'
import FormSftpSettings from '../form/FormSftpSettings';
import Portal from '../hocs/Portal';

import TabsContent from './TabsContent';

import * as S from './Tabs.styles';

const Tabs = (): ReactElement => {

    const [ activeItem, setActiveItem ] = React.useState<string | undefined>('');

    const [ sftpSettingsOpen, setSftpSettingsOpen ] = useState(false);

    const toggleSftpSettings = (): void => {
      setSftpSettingsOpen(!sftpSettingsOpen);
    };

    const changeItems = (event: MouseEvent<HTMLDivElement>): void => {
      const value = event.currentTarget.dataset
      setActiveItem(value['index']);
    }

    const isActiveItem = (activeItem: string | undefined, key: string): boolean => activeItem === key

    useEffect(() => {
      setActiveItem(uploadConfiguration[0].key);
    },[]);

    return (
      <>
        <Portal 
          modalState={sftpSettingsOpen} 
          animation="fadeIn"
          width='auto'
          height='auto'
        >
          <FormSftpSettings/>
        </Portal>
        <S.TabsContainer>
          {uploadConfiguration.map(menuItem => {
            return(
              <S.TabItem
                isActive={isActiveItem(activeItem, menuItem.key)}
                onClick={changeItems} 
                key={menuItem.key} 
                data-index={menuItem.key}
              >
                {menuItem.text}
              </S.TabItem>
            )
          })}
        </S.TabsContainer>
        <S.TabsContentContainer>
          <TabsContent index={activeItem}/>
        </S.TabsContentContainer>
          <S.sftpToggleButton
            onClick={toggleSftpSettings}
          >
            {sftpSettingsOpen ? 'Close SFTP settings' : 'Open SFTP settings'}
          </S.sftpToggleButton>
        
      </>
    )
}

export default Tabs;
