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
  subForm?: formType | formType[];
};

export const formConfig: formType = {
  id: 'mainform',
  fields: [
    {
      label: 'insert username',
      name: 'username',
      type: 'text',
    },
    {
      label: 'insert password',
      name: 'password',
      type: 'password',
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
            },
            {
              label: 'sftp username',
              name: 'sftppassword',
              type: 'password',
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
              label: 'sftp username',
              name: 'pgpppassword',
              type: 'password',
            },
          ],
        },
      ],
    },
    {
      label: 'nesting test',
      name: 'nestingtest',
      type: 'form',
      subForm: {
        id: 'subform',
        fields: [
          {
            label: 'subform label',
            name: 'subformlabel',
            type: 'text',
            subForm: {
              id: 'subsubform',
              fields: [
                {
                  label: 'subsubform label',
                  name: 'subsubformlabel',
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
