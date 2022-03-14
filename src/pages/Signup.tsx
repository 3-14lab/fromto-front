import React, { useCallback, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'

import { Form } from '@unform/web';

import api from '../services/api';
import { InputObjectProps } from '../hooks/DTO/useFormsDTO';
import { useForms } from '../hooks/useForms';
import { emailRegex } from '../utils/regex/email';

interface SignUpData {
  username: string,
  registration: string,
  state: string,
  email: string,
  confirmEmail: string,
  password: string,
  confirmPassword: string,
}

const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()
  const { createInputs, compareFields, checkFieldPattern, values } = useForms<SignUpData>();

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await api.post('/user', values)

      history.push('/');
    } catch {}
    finally {
      setIsLoading(false)
    }
  }, [history, values])

  const inputsObject = useMemo(() => {
    return {
      username: {
        placeholder: 'Nome completo *',
        validate: {
          required: 'Nome completo obrigatório'
        },
      },
      registration: {
        placeholder: 'CPF *',
        validate: {
          required: 'CPF obrigatório'
        },
      },
      state: {
        placeholder: 'Estado *',
        validate: {
          required: 'Estado obrigatório',
        },
      },
      email: {
        placeholder: 'E-mail *',
        type: 'email',
        validate: {
          required: 'Campo Obrigatório',
          extraValidations: {
            compareEmails: compareFields('email', 'confirmEmail', 'E-mail não conferem'),
            isEmailValid: checkFieldPattern(emailRegex, 'E-mail inválido!'),
          }
        },
      },
      confirmEmail: {
        placeholder: 'Confirm seu e-mail *',
        type: 'email',
        validate: {
          required: 'Campo Obrigatório',
          extraValidations: {
            compareEmails: compareFields('confirmEmail', 'email', 'Emails não conferem'),
            isEmailValid: checkFieldPattern(emailRegex, 'E-mail inválido!'),
          }
        },
      },
      password: {
        placeholder: 'Senha *',
        type: 'password',
        validate: {
          required: 'Campo Obrigatório',
          extraValidations: {
            comparePasswords: compareFields('password', 'confirmPassword', 'Senhas não conferem'),
          }
        },
      },
      confirmPassword: {
        placeholder: 'Confirme sua senha *',
        type: 'password',
        validate: {
          required: 'Campo Obrigatório',
          extraValidations: {
            comparePasswords: compareFields('confirmPassword', 'password', 'Senhas não conferem'),
          }
        },
      },
    } as InputObjectProps<SignUpData>
  }, [checkFieldPattern, compareFields]);

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-cover bg-center bg-no-repeat bg-background' >
      <div className='w-[382px] flex bg-white flex-col items-center justify-center p-10 rounded-xl' >

        <Form onSubmit={handleSubmit} className='w-full flex flex-col mx-auto'>

          <h1 className='font-roboto font-bold text-center text-4xl text-title mb-[20px]'>Cadastre-se</h1>

          {createInputs(['username', 'registration', 'state', 'email', 'confirmEmail', 'password', 'confirmPassword'], inputsObject)}

          <button
            type='submit'
            disabled={isLoading}
            className='bg-blue py-3 text-lg font-bold rounded-md text-white mt-5 flex justify-center items-center'
          >
            {isLoading ? (<Oval color="#ffffff" height={24} strokeWidth={4} width={24} />) : 'Cadastrar'}
          </button>

          <Link className='text-center text-sm font-medium mt-10 text-title' to="/">Já tem uma conta? Fazer login</Link>

        </Form>
      </div>
    </div>
  )

}

export { SignUp }