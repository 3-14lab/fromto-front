import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks/auth';
import logo from '@image/logo.svg';

import { BiLogOut } from 'react-icons/bi';
import { IoIosClose } from 'react-icons/io';

function Index() {
  const [isLogoutButtonVisible, setIsLogoutButtonVisible] = useState<boolean>(false);

  const { user, signOut } = useAuth()

  function handleToggleIsLogoutButtonVisible() {
    setIsLogoutButtonVisible(prevState => !prevState);
  }
  
  return (
    <header className="bg-blue " >
      <div className="mx-auto py-4 lg:w-[70rem] md:w-[48rem] flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img className="h-16 mr-4" src={logo} alt="logo" />
          <p className="text-white font-poppins font-bold text-lg">DePara</p>
        </Link>
        <div className="relative">

          <div
            className="flex justify-between items-center gap-3 cursor-pointer"
            onClick={handleToggleIsLogoutButtonVisible}
          >
            <div className="w-[48px] h-[48px] bg-white rounded-full text-blue flex items-center justify-center font-roboto font-bold text-lg">{user.firstName.split('')[0]}</div>
            <div>
              <p className="font-roboto text-xs text-white font-bold">
                {user.firstName} {user.lastName}
              </p>
              <p className="font-roboto text-white text-xs font-normal	">
                {user.emailAddress}
              </p>
            </div>
          </div>

          {isLogoutButtonVisible && (
            <div className="bottom-[-4rem] absolute right-0 bg-[#4923b4] rounded zIndex-5">
              <div className="flex justify-end">
                <button onClick={handleToggleIsLogoutButtonVisible} >
                  <IoIosClose size={32} className="inline text-white" />
                </button>
              </div>
              <hr className="text-blue" />
              <button onClick={signOut} className="flex align-center gap-2 p-1 px-4 text-white font-bold">
                <BiLogOut size={24} />
                <span>
                  Sair
                </span>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  )
}

export default Index
