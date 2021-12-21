import { ReactElement, useContext } from 'react'; // we need this to make JSX compile

import { fieldItemType } from '../../configuration/configuration';
import InputBuilder from './InputBuilder';

import * as S from './Form.styles';
import { FormContext } from '../../context/FormContext';

type FormBuilderProps = {
    fields: fieldItemType[]
}


const FormBuilder = ({fields} : FormBuilderProps): ReactElement => {

    const { formKeys } = useContext(FormContext);

    const checkstore = () => {
      console.log(formKeys);
    }

    return (
      <S.FormContainer>
        <S.FormContent>
          {fields && fields.length > 0 ? 
          fields.map(field => {
            return(
            <S.FormLine key={field.key}>
                <InputBuilder field={field} />
            </S.FormLine>)
          }) 
          : <div>No fields</div>}
        </S.FormContent>
        <button onClick={checkstore}>check the store</button>
      </S.FormContainer>
    )
}

export default FormBuilder;
