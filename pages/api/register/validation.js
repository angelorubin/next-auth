import * as Yup from 'yup'

export const schemaValidation = Yup.object().shape({
  nome: Yup.string().required('O campo nome é obrigatório'),
  email: Yup.string()
    .email('O campo email deve ser um email válido')
    .required('O campo email é obrigatório'),
  password: Yup.string()
})
