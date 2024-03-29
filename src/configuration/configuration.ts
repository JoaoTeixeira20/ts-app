import { avaliableActions } from '../actions/actions';
import { avaliableValidations } from '../validators/schemaValidators';

export type formType = {
  id: string;
  label?: string;
  active?: boolean;
  fields: fieldType[];
  onSubmit?: (event: any) => void;
};

interface fieldParams {
  [name: string]: any;
}

export type fieldType = fieldParams & {
  label: string;
  name: string;
  type: string;
  validation?: avaliableValidations;
  value?: string;
  subForm?: formType;
  action?: avaliableActions;
};

export const formConfig2: formType = {
  id: 'mainform',
  fields: [
    {
      label: 'collapse content',
      name: 'collapsecontent',
      type: 'collapse',
      subForm: {
        id: 'collapseform',
        fields: [
          {
            label: 'input text',
            name: 'inputtext',
            type: 'text',
          },
          {
            label: 'upload file',
            name: 'uploadfile',
            type: 'file',
          },
          {
            label: 'click me',
            name: 'clickme',
            type: 'button',
          },
        ],
      },
    },
    {
      label: 'tabs content',
      name: 'tabscontent',
      type: 'tabs',
      subForm: {
        id: 'tabsform',
        fields: [
          {
            label: 'tab content 1',
            name: 'tabcontent1',
            type: 'tabsform',
            subForm: {
              id: 'tabsform1',
              fields: [
                {
                  label: 'tabform1 text',
                  name: 'tabform1text',
                  type: 'text',
                },
                {
                  label: 'tabform2 text',
                  name: 'tabform2text',
                  type: 'text',
                },
              ],
            },
          },
          {
            label: 'tab content 2',
            name: 'tabcontent2',
            type: 'tabsform',
            subForm: {
              id: 'tabsform2',
              fields: [
                {
                  label: 'tabform4 text',
                  name: 'tabform1text',
                  type: 'text',
                },
                {
                  label: 'tabform5 text',
                  name: 'tabform2text',
                  type: 'text',
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

export const formConfig: formType = {
  id: 'mainform',
  fields: [
    {
      label: 'collapse content',
      name: 'collapsecontent',
      type: 'collapse',
      subForm: {
        id: 'collapseform',
        fields: [
          {
            label: 'input text',
            name: 'inputtext',
            type: 'text',
          },
          {
            label: 'upload file',
            name: 'uploadfile',
            type: 'file',
          },
          {
            label: 'click me',
            name: 'clickme',
            type: 'button',
          },
        ],
      },
    },
    {
      label: 'checkbox content',
      name: 'checkboxcontent',
      type: 'checkbox',
    },
    {
      label: 'date input',
      name: 'dateinput',
      type: 'date',
    },
    {
      label: 'radio input',
      name: 'radioinput',
      type: 'radio',
      subForm: {
        id: 'radiooptionsroot',
        fields: [
          {
            label: 'option 1',
            name: 'option1',
            type: 'radiooption',
            value: 'option1',
          },
          {
            label: 'option 2',
            name: 'option2',
            type: 'radiooption',
            value: 'option2',
          },
          {
            label: 'option 3',
            name: 'option3',
            type: 'radiooption',
            value: 'option3',
            subForm: {
              id: 'radiooption3form',
              fields: [
                {
                  label: 'option 3 form',
                  name: 'option3form',
                  type: 'text',
                },
              ],
            },
          },
        ],
      },
    },
    {
      label: 'select input',
      name: 'selectinput',
      type: 'select',
      subForm: {
        id: 'selectoptions',
        fields: [
          {
            label: 'option 1',
            name: 'option1',
            type: 'option',
            value: 'option1',
          },
          {
            label: 'option 2',
            name: 'option2',
            type: 'option',
            value: 'option2',
            subForm: {
              id: 'option2form',
              fields: [
                {
                  label: 'input text',
                  name: 'inputtext',
                  type: 'text',
                },
                {
                  label: 'upload file',
                  name: 'uploadfile',
                  type: 'file',
                },
                {
                  label: 'click me',
                  name: 'clickme',
                  type: 'button',
                },
                {
                  label: 'tabs content',
                  name: 'tabscontent',
                  type: 'tabs',
                  subForm: {
                    id: 'tabsform',
                    fields: [
                      {
                        label: 'tab content 1',
                        name: 'tabcontent1',
                        type: 'tabsform',
                        subForm: {
                          id: 'tabsform1',
                          fields: [
                            {
                              label: 'tabform1 text',
                              name: 'tabform1text',
                              type: 'text',
                            },
                            {
                              label: 'tabform2 text',
                              name: 'tabform2text',
                              type: 'text',
                            },
                          ],
                        },
                      },
                      {
                        label: 'tab content 2',
                        name: 'tabcontent2',
                        type: 'tabsform',
                        subForm: {
                          id: 'tabsform2',
                          fields: [
                            {
                              label: 'tabform4 text',
                              name: 'tabform3text',
                              type: 'text',
                            },
                            {
                              label: 'tabform5 text',
                              name: 'tabform4text',
                              type: 'text',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            label: 'option 3',
            name: 'option3',
            type: 'option',
            value: 'option3',
          },
        ],
      },
    },
    {
      label: 'tabs content',
      name: 'tabscontent',
      type: 'tabs',
      subForm: {
        id: 'tabsform',
        fields: [
          {
            label: 'tab content 1',
            name: 'tabcontent1',
            type: 'tabsform',
            subForm: {
              id: 'tabsform1',
              fields: [
                {
                  label: 'tabform1 text',
                  name: 'tabform1text',
                  type: 'text',
                },
                {
                  label: 'tabform2 text',
                  name: 'tabform2text',
                  type: 'text',
                },
              ],
            },
          },
          {
            label: 'tab content 2',
            name: 'tabcontent2',
            type: 'tabsform',
            subForm: {
              id: 'tabsform2',
              fields: [
                {
                  label: 'tabform4 text',
                  name: 'tabform3text',
                  type: 'text',
                },
                {
                  label: 'tabform5 text',
                  name: 'tabform4text',
                  type: 'text',
                },
              ],
            },
          },
        ],
      },
    },
    {
      label: 'range input',
      name: 'rangeinput',
      type: 'range',
    },
    {
      label: 'sum val 1',
      name: 'sum1',
      type: 'number',
      validation: 'number',
    },
    {
      label: 'sum val 2',
      name: 'sum2',
      type: 'number',
      validation: 'number',
    },
    {
      label: 'sum two values',
      name: 'sumvalues',
      type: 'button',
      action: 'sumValues',
    },
  ],
};

// export const formConfig: formType = {
//   id: 'mainform',
//   fields: [
//     {
//       label: 'insert username',
//       name: 'username',
//       type: 'text',
//     },
//     {
//       label: 'insert password',
//       name: 'password',
//       type: 'password',
//     },
//     {
//       label: 'tabs example',
//       name: 'tabexample',
//       type: 'tabs',
//       subForm: [
//         {
//           id: 'sftpconfig',
//           label: 'sftp configuration',
//           fields: [
//             {
//               label: 'sftp username',
//               name: 'sftpusername',
//               type: 'text',
//             },
//             {
//               label: 'sftp username',
//               name: 'sftppassword',
//               type: 'password',
//             },
//           ],
//         },
//         {
//           id: 'pgpconfig',
//           label: 'pgp configuration',
//           fields: [
//             {
//               label: 'pgp username',
//               name: 'pgppusername',
//               type: 'text',
//             },
//             {
//               label: 'sftp username',
//               name: 'pgpppassword',
//               type: 'password',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       label: 'nesting test',
//       name: 'nestingtest',
//       type: 'form',
//       subForm: {
//         id: 'subform',
//         fields: [
//           {
//             label: 'subform label',
//             name: 'subformlabel',
//             type: 'text',
//             subForm: {
//               id: 'subsubform',
//               fields: [
//                 {
//                   label: 'subsubform label',
//                   name: 'subsubformlabel',
//                   type: 'text',
//                 },
//                 {
//                   label: 'subsubform label2',
//                   name: 'subsubformlabel2',
//                   type: 'text',
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     },
//   ],
// };
