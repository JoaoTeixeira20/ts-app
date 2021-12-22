export type formType = formItemType[]

export type formItemType = {
  key: string,
  text: string,
  inputType: string,
  inputClass?: string,
  fields?: formItemType[],
}

type optionsType = {
  key: string,
  text: string,
  value?: string,
  additionalFields?: fieldItemType[]
}

export type fieldItemType = {
  key: string,
  text: string,
  inputType: string,
  inputClass?: string,
  options?: optionsType[]
}

export const uploadConfiguration: formType = [
  {
    key: 'main',
    text: 'Form Title Example',
    inputType: 'tabs',
    fields: [
      {
        key: 'sftpconfig',
        text: 'SFTP upload with PGP',
        inputType: 'tabscontent',
        fields: [
          {
            key: 'pgpkey',
            text: 'insert pgp key here',
            inputType: 'file',
            inputClass: 'file-field-input',
          },
          {
            key: 'swosh',
            text: 'tab for test',
            inputType: 'tabs',
            fields:[
              {
                key: 'tab1',
                text: 'tab1 test',
                inputType: 'tabscontent',
                fields: [
                  {
                    key: 'fieldtest1',
                    text: 'insert pgp key here',
                    inputType: 'text',
                    inputClass: 'file-field-input',
                  },
                ]
              },
              {
                key: 'tab2',
                text: 'tab2 test',
                inputType: 'tabscontent',
                fields: [
                  {
                    key: 'fieldtest1',
                    text: 'insert pgp key here',
                    inputType: 'text',
                    inputClass: 'file-field-input',
                  },
                  {
                    key: 'fieldtest2',
                    text: 'insert pgp key here',
                    inputType: 'file',
                    inputClass: 'file-field-input',
                  },
                ]
              }
            ]
          },
          {
            key: 'pgpmessage',
            text: 'insert message to encrypt here',
            inputType: 'file',
            inputClass: 'file-field-input',
          },
          {
            key: 'inputmessage',
            text: 'insert some text here',
            inputType: 'text',
            inputClass: 'text-input'
          },
          {
            key: 'buttonKey',
            text: 'click me',
            inputType: 'button',
            inputClass: 'button-input'
          },
          {
            key: 'typekey',
            text: 'test field',
            inputType: 'password',
            inputClass: 'text-input'
          }
        ]
      },
      {
        key: 'rsaconfig',
        text: 'SFTP upload with RSA',
        inputType: 'tabscontent',
        fields: [
          {
            key: 'rsakey',
            text: 'insert rsa key here',
            inputType: 'file',
            inputClass: 'file-field-input',
          },
          {
            key: 'rsamessage',
            text: 'insert message to encrypt here',
            inputType: 'file',
            inputClass: 'file-field-input',
          },
          {
            key: 'optionKey',
            text: 'which option is required?',
            inputType: 'select',
            inputClass: 'multiple-field-input',
            fields: [
              {
                key: 'option1',
                text: 'credentials',
                inputType: 'option',
                fields: [
                  {
                    key: 'additionalField1',
                    text: 'username',
                    inputType: 'text',
                    inputClass: 'text-input'
                  },
                  {
                    key: 'additionalField2',
                    text: 'password',
                    inputType: 'password',
                    inputClass: 'text-input'
                  }
                ]
              },
              {
                key: 'option2',
                text: 'sshkey',
                inputType: 'option',
                fields: [
                  {
                    key: 'additionalField3',
                    text: 'ssh key file',
                    inputType: 'file',
                    inputClass: 'text-input'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        key: 'sftpaes',
        text: 'SFTP upload with AES',
        inputType: 'tabs',
        fields: []
      }
    ]
  }
];

export const sftpConfiguration: formType = [
  {
    key: 'sftpAddress',
    text: 'SFTP address',
    inputType: 'text',
    inputClass: 'file-field-input'
  },
  {
    key: 'sftpSshKey',
    text: 'SFTP SSH key',
    inputType: 'file',
    inputClass: 'file-field-input'
  },
  {
    key: 'sftpUser',
    text: 'SFTP user',
    inputType: 'text',
    inputClass: 'file-field-input'
  },
  {
    key: 'sftpPassword',
    text: 'SFTP password',
    inputType: 'password',
    inputClass: 'file-field-input'
  },
]