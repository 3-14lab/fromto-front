import { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'

import './style.css'

import closeImg from '../../img/close.svg'

interface NewDataModalProps  {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  placeholder: string
  children?: any;
  firstLabelText?: string;
  handleSumit: (name: string) => void;
}

function ModalFile({ isOpen, onRequestClose, placeholder, title, children, firstLabelText, handleSumit}:NewDataModalProps){
  
  
  const [error, setError] = useState(false)
  const [value, setValue] = useState('')

  // function handleError() {
  //   setError(prev => ({ ...error, visible: true }))
  // }

  function handleCreateNewDataModal (event: FormEvent){
    event.preventDefault()

    console.log(
      value,
    )
  }

  function handlePairing() {
    if (value === "") {
      setError(true);

      return;
    } 
    handleSumit(value)
  }


  useEffect(() => {
    if (value !== "") {
      setError(false);
    }
  }, [value])

  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        setError(false);
        onRequestClose()
      }}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type='button' onClick={onRequestClose} className='react-modal-close' >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <form onSubmit={handleCreateNewDataModal}>

      <h2 className="font-roboto font-medium text-2xl text-blue mb-[30px]">{title}</h2>

      <label className="font-roboto font-medium text-blue text-sm">Título</label>
      <div className="mb-5">
        <input 
          className="w-full font-roboto font-normal text-sm px-6 py-3 mt-0.5 rounded-t-md	bg-[#F3F4F6] text-[#9CA3AF]"
          placeholder={placeholder}
          value={value}
          onChange={event=> setValue(event.target.value) }
          />
          { error && <label className="text-red-400 font-medium text-xs">Campo obrigatório*</label> }
      </div>
      { children }
       
       <button onClick={handlePairing}type="submit">Cadastrar</button>

      </form>
    </Modal>
  )
}

export default ModalFile;