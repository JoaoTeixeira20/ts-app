type actionsType = {
  [name: string]: any;
};

export const actions: actionsType = {
  sumvalues: (values: actionsType) => {
    console.log(parseInt(values['sum1']) + parseInt(values['sum2']));
  },
};
