import { FormEvent, useState } from 'react'
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
  handleSumit: () => void
}

function ModalFile({ isOpen, onRequestClose, placeholder, title, children, firstLabelText, handleSumit}:NewDataModalProps){
  
  
  
  const [value, setValue] = useState('')

  function handleCreateNewDataModal (event: FormEvent){
    event.preventDefault()

    console.log(
      value,
    )
  }

  function handlePairing() {
    handleSumit()
  }

  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type='button' onClick={onRequestClose} className='react-modal-close' >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <form onSubmit={handleCreateNewDataModal}>

      <h2 className="font-roboto font-medium text-2xl text-blue mb-[30px]">{title}</h2>

      <label className="font-roboto font-medium text-blue text-sm">Título</label>
      <input 
        className="w-full font-roboto font-normal text-sm px-6 py-3 mb-5 mt-0.5 rounded-t-md	bg-[#F3F4F6] text-[#9CA3AF]"
        placeholder={placeholder}
        value={value}
        onChange={event=> setValue(event.target.value) }
        />
        
      { children }
       
       <button onClick={handlePairing}type="submit">Cadastrar</button>

      </form>
    </Modal>
  )
}

export default ModalFile;