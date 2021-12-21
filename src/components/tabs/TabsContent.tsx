import { ReactElement } from 'react'; // we need this to make JSX compile

import { uploadConfiguration, fieldItemType } from '../../configuration/configuration'

import FormBuilder from '../form/FormBuilder';

type TabsContentType = {
  index?: string
}

const TabsContent = ({index} : TabsContentType): ReactElement => {

    const menuContent: fieldItemType[] | undefined = uploadConfiguration.find(menuItem => menuItem.key === index)?.fields;

    return menuContent ? <FormBuilder fields={menuContent}/> : <div>No form to present</div>
}

export default TabsContent;
