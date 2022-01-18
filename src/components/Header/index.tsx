import React from 'react';
import { BodyText } from '..';
import logo from '../../img/logo.svg';

function index() {
  return (
    <header className="bg-blue" >
        <div className="mx-auto py-4 w-[70rem] flex items-center justify-between">
          <div className="flex items-center">
            <img  className="h-16 mr-4" src={logo} alt="logo" />
            <BodyText color="white" bold >DePara</BodyText>
          </div>
          <div>
            <BodyText 
              type="medium" 
              color="white"
              bold
            >
              Paulo Henrique Rosa
            </BodyText>
            <BodyText 
              type="small" 
              color="white"
            >
              paulohenriquerosa@gmail.com
            </BodyText>
          </div>
        </div>
      </header>
  )
}

export default index
