import React, {useCallback, useMemo, useState} from 'react';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';

import { useAuth} from '../hooks/auth'

import { Link } from 'react-router-dom';

import logo from '../img/prov.svg'

import { Oval } from  'react-loader-spinner'
import { InputObjectProps } from '../hooks/DTO/useFormsDTO';
import { useForms } from '../hooks/useForms';
import { emailRegex } from '../utils/regex/email';

interface SignInData {
  email: string,
  password: string
}

const SignIn: React.FC = () =>{
  const [isLoading, setIsLoading] = useState(false);

  const { createInputs, checkFieldPattern, values } = useForms<SignInData>();

  const {signIn} = useAuth()

  const history = useHistory()


  const handleSubmit = useCallback(async () =>{
    try {
      setIsLoading(true)

      await signIn(values)

      history.push('/city');
      
    } catch {}
    finally {
      setIsLoading(false)
    }

  }, [history, signIn, values]);

  const inputsObject = useMemo(() => {
    return {
      email: {
        placeholder: 'E-mail *',
        type: 'email',
        validate: {
          required: 'Campo Obrigatório',
          extraValidations: {
            isEmailValid: checkFieldPattern(emailRegex, 'E-mail inválido!'),
          }
        },
      },
      password: {
        placeholder: 'Senha *',
        type: 'password',
        validate: {
          required: 'Campo Obrigatório',
        },
      },
    } as InputObjectProps<SignInData>
  }, [checkFieldPattern]);

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen bg-cover bg-center bg-no-repeat bg-background' >
      <header className="flex flex-col justify-center align-center gap-2">
        <img className='self-center w-16 h-16' src={logo} alt="Logo" />
        <p className="font-poppins text-white	text-center font-semibold text-2xl mb-[20px]">DePara</p>
      </header>
      <div className='w-[382px] flex bg-white flex-col items-center justify-center p-10 rounded-xl' >
        <Form onSubmit={handleSubmit} className='w-full flex flex-col '>

          <h1 className='font-roboto font-bold mb-5 text-center text-4xl text-[#374151]'>Entrar</h1>

          {createInputs(['email', 'password'], inputsObject)}
            <button 
              type='submit'
              disabled= {isLoading}
              className='bg-blue py-3 text-lg font-bold rounded-md text-white mt-5 flex justify-center items-center'
              >
              {isLoading ? (<Oval color="#ffffff" height={24} strokeWidth={4} width={24} />) : 'Entrar' }
            </button>
          <Link className='text-center text-sm font-medium mt-[19px] text-title' to="/signup">Cadastre-se</Link>
          <Link className='text-center text-sm font-medium mt-[50px] p text-title' to="/recover">Esqueci minha senha</Link>
        </Form>

      </div>
    </div>
  )

}

export {SignIn}