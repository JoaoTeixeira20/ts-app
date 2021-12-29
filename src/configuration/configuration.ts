export type formType = {
  id: string;
  label?: string;
  fields: fieldType[];
  onSubmit?: (event: any) => void;
};

export type fieldType = {
  label: string;
  name: string;
  type: string;
  validation?: any;
  value?: string;
  subForm?: formType | formType[];
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
            validation: 'collapseValidation',
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
        id: 'radiooptions',
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
      label: 'tabs example',
      name: 'tabexample',
      type: 'tabs',
      subForm: [
        {
          id: 'sftpconfig',
          label: 'sftp configuration',
          fields: [
            {
              label: 'sftp username',
              name: 'sftpusername',
              type: 'text',
              validation: 'usernameValidation',
            },
            {
              label: 'sftp username',
              name: 'sftppassword',
              type: 'password',
              validation: 'passwordValidation',
            },
          ],
        },
        {
          id: 'pgpconfig',
          label: 'pgp configuration',
          fields: [
            {
              label: 'pgp username',
              name: 'pgppusername',
              type: 'text',
            },
            {
              label: 'pgp password',
              name: 'pgpppassword',
              type: 'password',
            },
            {
              label: 'radio input',
              name: 'radioinput',
              type: 'radio',
              subForm: {
                id: 'radiooptions',
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
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      label: 'range input',
      name: 'rangeinput',
      type: 'range',
    },
    {
      label: 'input validation test',
      name: 'inputvalidationtest',
      type: 'text',
      validation: 'testvalidation',
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
