import { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'

import './style.css'

import closeImg from '@image/close.svg'

interface NewDataModalProps  {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  placeholder: string
  children?: any;
  firstLabelText?: string;
  handleSubmit: (data: string) => void;
}


function NewDataModal({ isOpen, onRequestClose, placeholder, title, children, firstLabelText, handleSubmit }:NewDataModalProps){
  
  const [value, setValue] = useState('')
  const [emptyField, setEmptyField] = useState(true)

  function handleCreateNewDataModal (event: FormEvent){
    event.preventDefault()

    if(value){
      handleSubmit(value)
      setValue('')
      onRequestClose()
      setEmptyField(false)

      return 
    }

    setEmptyField(true)
  }

  useEffect(() => {
    Modal.setAppElement('body');
  }, [])

  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      // ariaHideApp={false}
    >
      <button type='button' onClick={() => { setEmptyField(false); onRequestClose()}} className='react-modal-close' >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <form onSubmit={handleCreateNewDataModal}>

      <h2 className="font-roboto font-medium text-2xl text-blue mb-[30px]">{title}</h2>

      <label className="font-roboto font-medium text-blue text-sm">{!!firstLabelText ? firstLabelText : "Título"}</label>
      <input 
        className="w-full font-roboto font-medium text-sm px-6 py-3 mb-5 mt-0.5 rounded-t-md	bg-[#F3F4F6] text-[#9CA3AF]"
        placeholder={placeholder}
        value={value}
        onChange={event=> setValue(event.target.value) }
        style={{borderColor: !!emptyField ? '#d60f0f' : "" }}
        />
        
      { children }
       
       <button type="submit">Cadastrar</button>

      </form>
    </Modal>
  )
}

export default NewDataModal;