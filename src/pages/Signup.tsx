import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { getValidationErrors } from '@utils/getVAlidationErrors'
import { Oval } from  'react-loader-spinner'
import { useAuth } from '@hooks/auth'


import Input from '@components/Input';


import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

//import logo from '@image/logo.svg'
//import api from '@services/api';

interface SignUpData {
  firstName: string,
  lastName: string,
	emailAddress: string,
  phoneNumber: string,
	password: string
}

const SignUp: React.FC = () =>{
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false)
  
  const {signUp} = useAuth()

  const history = useHistory()

  const handleSubmit = useCallback( async (data: SignUpData )=>{
    try {
      formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          firstName: Yup.string().required('Primeiro nome obrigatório'),
          lastName: Yup.string().required('último nome obrigatório'),
          emailAddress: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          phoneNumber: Yup.string().required('Telefone obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
          password_confirm: Yup.string().required('Confirmar senha obrigatório'),
        });

        
        await schema.validate(data, {
          abortEarly: false,
        });
        
      setIsLoading(true)
      
      await signUp(data)

      setIsLoading(false)

      history.push('/');

    } catch (error) {

      
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        
        formRef.current?.setErrors(errors);
          return;
        }

    }

  }, [history, signUp])

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-cover bg-center bg-no-repeat bg-background' >
      <div className='w-[382px] flex bg-white flex-col items-center justify-center p-10 rounded-xl' >
        
        <Form ref={formRef} onSubmit={handleSubmit} className='w-full flex flex-col mx-auto'>

          <h1 className='font-roboto font-bold text-center text-4xl text-title mb-[20px]'>Cadastre-se</h1>

          <Input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="text" name="firstName" placeholder='Primeiro nome' />
          <Input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="text" name="lastName" placeholder='Último nome' />
          <Input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="email"name="emailAddress" placeholder='E-mail' />
          <Input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="text" name="phoneNumber" placeholder='Telefone' />
          <Input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="password" name="password" placeholder='Senha' />
          <Input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="password" name="password_confirm"placeholder='Confirmar senha' />
            <button
              type='submit'
              disabled= {isLoading}
              className='bg-blue py-3 text-lg font-bold rounded-md text-white mt-5 flex justify-center items-center'
              >
              { 
                isLoading ? (<Oval color="#ffffff" height={24} strokeWidth={4} width={24} />) :'Cadastrar' 
              }
              
            </button>


          <Link className='text-center text-sm font-medium mt-10 text-title' to="/">Já tem uma conta? Fazer login</Link>

        </Form>

      </div>
    </div>
  )

}

export {SignUp}