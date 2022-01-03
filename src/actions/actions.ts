export type avaliableActions = 'sumValues' | 'default';

type actionsType = Record<avaliableActions, any>;
type valuesType = { [key: string]: any };

export const actions: actionsType = {
  sumValues: (values: valuesType) => {
    console.log(parseInt(values['sum1']) + parseInt(values['sum2']));
  },
  default: () => {
    console.log('no action');
  },
};
