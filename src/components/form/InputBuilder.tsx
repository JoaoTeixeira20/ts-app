import { ReactElement, ChangeEvent, MouseEvent, useState, useEffect, useContext } from 'react'; // we need this to make JSX compile

import { handleFileRead } from '../../configuration/filehandler'

import { fieldItemType } from '../../configuration/configuration';

import * as S from './Form.styles';
import { FormContext } from '../../context/FormContext';
import Option from './inputTypes/Option';

type FormBuilderProps = {
    field: fieldItemType
}


const InputBuilder = ({field} : FormBuilderProps): ReactElement => {

    const { formKeys, setKeyValue } = useContext(FormContext)

    const [ fieldValue, setFieldValue ] = useState<string>('');

    const [ showPreview, setShowPreview ] = useState<boolean>(false);

    const togglePreview = (() => {
        setShowPreview(!showPreview);
    })

    useEffect(() => {
        setFieldValue(formKeys?.[field.key] || '');
    }, [formKeys, field.key]);

    const handleFileSelected = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const index: string | undefined = event.currentTarget.dataset['index'];
        const file: Blob = (event.currentTarget.files && event.currentTarget.files[0]) || new Blob();
        const result = await handleFileRead(file);
        setKeyValue({key:index || '', value: result?.toString() || ''});
        setFieldValue(result?.toString() || '');
    }

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyValue({key:event.currentTarget.dataset['index'] || '', value: event.currentTarget.value});
        setFieldValue(event.currentTarget.value);
    }

    const handleClick = (event: MouseEvent<HTMLInputElement>) => {
        console.log('you clicked ', event.currentTarget.dataset['index']);
    }

    const buildInputType = (fieldParameters: fieldItemType): ReactElement[] => {
        const InputField: ReactElement[] = [];
        !(fieldParameters.inputType === 'button') && 
            InputField.push(<S.InputLabel key="1">{fieldParameters.text}</S.InputLabel>);

        switch(fieldParameters.inputType) {
            case 'text':
                InputField.push(<S.InputType
                    key="2"
                    type={fieldParameters.inputType}
                    data-index={fieldParameters.key}
                    onChange={handleTextChange}
                    value={fieldValue}
                />)
                break;
            case 'file':
                InputField.push(<S.InputType 
                    key="2"
                    type={fieldParameters.inputType} 
                    data-index={fieldParameters.key}
                    onChange={handleFileSelected}
                />)
                break;
            case 'button':
                InputField.push(<S.InputType 
                    key="2"
                    type={fieldParameters.inputType} 
                    data-index={fieldParameters.key}
                    value={fieldParameters.text}
                    onClick={handleClick}
                />)
                break;
            case 'password':
                InputField.push(<S.InputType 
                    key="2"
                    type={fieldParameters.inputType} 
                    data-index={fieldParameters.key}
                    onChange={handleTextChange}
                    value={fieldValue}
                />)
                break;
            case 'select':
                InputField.push(
                    <Option key="3" parameters={fieldParameters}/>
                )
                break;
            default:
                break;
        }

        (fieldParameters.inputType === 'file') &&
            InputField.push(
                <S.FilePreviewContainer key="4" >
                    <div>
                        <input type="checkbox" onChange={togglePreview} checked={showPreview}></input>
                        <label>Show content?</label>
                    </div>
                    {showPreview && <S.FilePreview dangerouslySetInnerHTML={{__html: fieldValue }}></S.FilePreview>}
                </S.FilePreviewContainer>
            );

        return (InputField);
    }

    return(
    <>
        {buildInputType(field)}
    </>)
}

export default InputBuilder;
