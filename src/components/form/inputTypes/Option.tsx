import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { fieldItemType } from "../../../configuration/configuration";
import InputBuilder from "../InputBuilder";
import * as S from '../Form.styles';

type OptionType = {
    parameters: fieldItemType
}

const Option = ({parameters}: OptionType): ReactElement => {

    const [ active, setActive ] = useState<string>();

    const [ additionalFields, setAdditionalFields ] = useState<fieldItemType[] | undefined>();

    const changeItems = (event: ChangeEvent<HTMLSelectElement>): void => {
        const value = event.currentTarget.value
        setActive(value);
    }

    useEffect(() => {
        !active && setActive(parameters.options?.[0].key || '');
        console.log('changed to ', active);
        setAdditionalFields(parameters.options?.find(option => option.key === active)?.additionalFields);
    },[active, parameters.options])

    useEffect(() => {
        console.log('additional fields are ', additionalFields);
    },[additionalFields])

    return (
    <>
        <S.SelectType onChange={changeItems}>
            {parameters.options && parameters.options.length > 0 && parameters.options.map(option => {

                return (<option key={option.key} value={option.key}>{option.text}</option>)
            })}
        </S.SelectType>
        {additionalFields && additionalFields.length > 0 && additionalFields.map(field => {
            return(<S.FormLine key={field.key}>
                <InputBuilder field={field} />
            </S.FormLine>)
        })}
    </>)
}

export default Option