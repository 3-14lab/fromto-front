import React from 'react';
import { Link } from 'react-router-dom';


import logo from '../img/logo.svg'

const SignUp: React.FC = () =>{
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-cover bg-center bg-no-repeat bg-background' >
      <div className='w-[382px] flex bg-white flex-col items-center justify-center p-10 rounded-xl' >
        {/* <img className=' w-16 h-16' src={logo} alt="Logo" />
        <h1 className='font-bold text-2xl text-blue' >
          DePara
        </h1> */}
        <form className='w-full flex flex-col mx-auto'>

          <h1 className='font-roboto font-bold text-center text-4xl text-title mb-[20px]'>Cadastre-se</h1>

          <input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="text" placeholder='Primeiro nome' />
          <input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="text" placeholder='Sobrenome' />
          <input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="email" placeholder='E-mail' />
          <input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="password" placeholder='Senha' />
          <input className='w-full px-3 py-2 bg-white font-roboto font-normal	text-sm	placeholder-gray-400 border-2 border-[#E5E7EB] rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="password" placeholder='Confirmar senha' />
            <button
              type='submit'
              className='bg-blue py-3 text-lg font-bold rounded-md text-white mt-[20px]'
              >
              Próximo
            </button>

          {/* <a className='text-center text-sm mt-8 text-green-700' href="login">Esqueci minha senha</a> */}

          <Link className='text-center text-sm font-medium mt-10 text-title' to="/">Já tem uma conta? Fazer login</Link>

        </form>

      </div>
    </div>
  )

}

export {SignUp}