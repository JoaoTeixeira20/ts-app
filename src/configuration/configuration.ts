type menuType = menuItemType[]

type menuItemType = {
    key: string,
    text: string,
    fields: fieldItemType[],
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

export const uploadConfiguration: menuType = [
    {
        key: 'sftppgp',
        text: 'SFTP upload with PGP',
        fields: [
            {
                key: 'pgpkey',
                text: 'insert pgp key here',
                inputType: 'file',
                inputClass: 'file-field-input',
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
                inputType: 'text',
                inputClass: 'text-input'
            }
        ]
    },
    {
        key: 'sftprsa',
        text: 'SFTP upload with RSA',
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
                options: [
                    {
                        key: 'option1',
                        text: 'credentials',
                        additionalFields: [
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
                        additionalFields: [
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
        key: 'aesRSA',
        text: 'AES encryption',
        fields: [],
    },
]

export const sftpConfiguration: fieldItemType[] = [
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