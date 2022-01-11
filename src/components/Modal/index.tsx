import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import './style.css'

import closeImg from '../../img/close.svg'

interface NewDataModalProps  {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  placeholder: string

}

export function NewDataModal({ isOpen, onRequestClose, placeholder, title }:NewDataModalProps){
  const [value, setValue] = useState('')

  function handleCreateNewDataModal (event: FormEvent){
    event.preventDefault()

    console.log(
      value,
    )
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

        <h2>{title}</h2>

      <input 
        placeholder={placeholder}
        value={value}
        onChange={event=> setValue(event.target.value) }
      />
       
       <button type="submit">Cadastrar</button>

      </form>
    </Modal>
  )
}