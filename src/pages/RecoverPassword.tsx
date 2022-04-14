import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '@components/Input';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { handleValidationErrors } from '@utils/getValidationErrors';

import logo from '@image/prov.svg';

const RecoverPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback( async ({ email }) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(email, {
        abortEarly: false,
      });

    } catch (error: unknown) {
      handleValidationErrors(error, formRef);
    }
  }, [])

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen bg-cover bg-center bg-no-repeat bg-background' >
      <header className="flex flex-col justify-center align-center gap-2">
        <img className='self-center w-16 h-16' src={logo} alt="Logo" />
        <p className="font-poppins text-white	text-center font-semibold text-2xl mb-[20px]">DePara</p>
      </header>
      <div className='w-[382px] flex bg-white flex-col items-center justify-center py-10 px-[51px] rounded-xl' >
        {/* <h1 className='font-bold text-2xl text-blue' >
          DePara
        </h1>  */}
        <Form ref={formRef} onSubmit={handleSubmit} className='w-full flex flex-col mx-auto'>

          <h1 className='font-roboto font-bold mb-[20px] text-center text-4xl text-[#374151]'>Solicitar nova senha</h1>

          <Input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="email" name="email" placeholder='E-mail' />
        
          <button
            type='submit'
            className='bg-blue py-3 text-lg font-bold rounded-md text-white mt-5 mb-[49px]'
            >
            Enviar e-mail de recuperação
          </button>

          {/* <a className='text-center text-sm mt-8 text-green-700' href="login">Esqueci minha senha</a> */}
          <section className="flex flex-col justify-between gap-[19px]">
            <Link className='text-center text-sm font-medium text-title' to="/">Fazer login</Link>
            <Link className='text-center text-sm font-medium p text-title' to="/signup">Cadastre-se</Link>
          </section>

        </Form>

      </div>
    </div>
  )

}

export { RecoverPassword }