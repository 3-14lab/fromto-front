import React from 'react';

import logo from '../img/logo.svg'

const SignIn: React.FC = () =>{
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-cover bg-center bg-no-repeat bg-background-1' >
      <div className='flex bg-white flex-col w-auto items-center justify-center p-8 rounded-xl' >
        <img className=' w-16 h-16' src={logo} alt="Logo" />
        <h1 className='font-bold text-2xl text-blue' >
          DePara
        </h1>
        <form className='flex flex-col mx-auto w-96 mt-8 '>

          <h1 className='font-bold text-center text-2xl text-title'>Entrar</h1>

          <input className='px-3 py-2 placeholder-gray-400 border-[#E8E8E8] border rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="email" placeholder='E-mail' />
          <input className='px-3 py-2 placeholder-gray-400 border-[#E8E8E8] border rounded-md focus:outline-none focus:border-blue focus:ring-blue mt-2' type="password" placeholder='Senha' />
            <button
              type='submit'
              className='bg-blue py-3 text-lg font-bold rounded-md text-white mt-8'
              >
              Entrar
            </button>

          {/* <a className='text-center text-sm mt-8 text-green-700' href="login">Esqueci minha senha</a> */}

          <a className='text-center text-sm font-medium mt-16 text-title' href="logout">Criar uma conta</a>

        </form>

      </div>
    </div>
  )

}

export {SignIn}