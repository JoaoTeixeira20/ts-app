import { getValueFromDotNotationIndex } from '../helpers/utils';

export type avaliableActions = 'sumValues' | 'default';

type actionsType = Record<avaliableActions, any>;
type valuesType = { [key: string]: any };

export const actions: actionsType = {
  sumValues: (rootValues: valuesType, path: string) => {
    console.log(path);
    const values = getValueFromDotNotationIndex(rootValues, path);
    console.log(parseInt(values['sum1']) + parseInt(values['sum2']));
    console.log(values['radioinput']);
  },
  default: () => {
    console.log('no action');
  },
};
