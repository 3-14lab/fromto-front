import React from 'react';
import { Link } from 'react-router-dom';
import { BodyText } from '..';
import logo from '../../img/logo.svg';

function index() {
  return (
    <header className="bg-blue " >
        <div className="mx-auto py-4 lg:w-[70rem] md:w-[48rem] flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img  className="h-16 mr-4" src={logo} alt="logo" />
            <p className="text-white font-poppins font-bold text-lg">DePara</p>
          </Link>
          <div className="flex justify-between items-center gap-3">
            <div className="w-[48px] h-[48px] bg-white rounded-full text-blue flex items-center justify-center font-roboto font-bold text-lg">P</div>
            <div>
              <p className="font-roboto text-xs text-white font-bold">
                Paulo Henrique Rosa
              </p>
              <p className="font-roboto text-white text-xs font-normal	">
                paulohenriquerosa@gmail.com
              </p>
            </div>
          </div>
        </div>
      </header>
  )
}

export default index
