import React, {useCallback, useRef, useState} from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useAuth} from '@hooks/auth'

import Input from '@components/Input';
import { Link } from 'react-router-dom';

import logo from '@image/prov.svg'

import { handleValidationErrors } from '@utils/getValidationErrors'
import { Oval } from  'react-loader-spinner'

interface SignInData {
  email: string,
  password: string
}

const SignIn: React.FC = () =>{
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false)

  const {signIn} = useAuth()

  const history = useHistory()


  const handleSubmit = useCallback( async (data: SignInData )=>{
    try {
      formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

      setIsLoading(true)

      await signIn(data)

      setIsLoading(false)

      history.push('/city');

    } catch (error) {
      handleValidationErrors(error, formRef);
    }

  }, [history, signIn])

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen bg-cover bg-center bg-no-repeat bg-background' >
      <header className="flex flex-col justify-center align-center gap-2">
        <img className='self-center w-16 h-16' src={logo} alt="Logo" />
        <p className="font-poppins text-white	text-center font-semibold text-2xl mb-[20px]">DePara</p>
      </header>
      <div className='w-[382px] flex bg-white flex-col items-center justify-center p-10 rounded-xl' >
        <Form ref={formRef} onSubmit={handleSubmit} className='w-full flex flex-col '>

          <h1 className='font-roboto font-bold mb-5 text-center text-4xl text-[#374151]'>Entrar</h1>
          <Input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' name='email' type="email" placeholder='E-mail' />
          <Input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' name='password' type="password" placeholder='Senha' />
            <button 
              type='submit'
              disabled= {isLoading}
              className='bg-blue py-3 text-lg font-bold rounded-md text-white mt-5 flex justify-center items-center'
              >
              { 
                isLoading ? (<Oval color="#ffffff" height={24} strokeWidth={4} width={24} />) :'Entrar' 
              }
            </button>
          <Link className='text-center text-sm font-medium mt-[19px] text-title' to="/signup">Cadastre-se</Link>
          <Link className='text-center text-sm font-medium mt-[50px] p text-title' to="/recover">Esqueci minha senha</Link>
        </Form>

      </div>
    </div>
  )

}

export {SignIn}