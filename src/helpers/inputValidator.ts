// import {
//   validationMessages,
//   validationStateType,
// } from '../configuration/configuration';

// export const inputValidator = (
//   inputTarget: HTMLInputElement | HTMLSelectElement,
//   customMessages?: validationMessages
// ): validationStateType => {
//   // the validity object is the most weird thing i saw on JS, can't iterate it only with a for .. in
//   // it's not a class instance, it's not an object, i don't have idea what he is
//   const validations = inputTarget.validity;

//   for (const key in validations) {
//     const indexKey = key as keyof typeof validations;
//     if (indexKey === 'valid' && validations[indexKey]) {
//       return {
//         status: true,
//         message: '',
//       };
//     }
//     if (validations[indexKey] && customMessages) {
//       return {
//         status: false,
//         message: (customMessages && customMessages[indexKey]) || '',
//       };
//     }
//   }
//   return {
//     status: true,
//     message: '',
//   };
// };

const hello = { hello: 'world' };

export { hello };
