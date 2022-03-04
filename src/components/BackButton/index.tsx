import React from 'react'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useHistory } from 'react-router';

function BackButton() {

  const history = useHistory();

  function handleBack() {
    history.goBack();
  }

  return (
    <button onClick={handleBack} className="flex items-center gap-2 my-5 bg-blue px-4 py-1 text-white font-poppins rounded">
      <HiOutlineArrowNarrowLeft size={30} />
      Voltar
    </button>  
    )
}

export default BackButton