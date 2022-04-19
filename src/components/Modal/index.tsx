import { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'

import './style.css'

import closeImg from '@image/close.svg'

interface props  {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  placeholder: string
  children?: any;
  firstLabelText?: string;
  sector?: boolean;
  handleSubmit: (name: string, type: any) => void;
}

enum TypeSector {
  Default_sector,
  Third_services
}

function NewDataModal(props: props){
  
  const [value, setValue] = useState('')
  const [emptyField, setEmptyField] = useState(true)
  const [typeSector, setTypeSector] = useState<TypeSector>(0)

  function handleCreateNewDataModal (event: FormEvent){
    event.preventDefault()

    if(value && props.sector){
      props.handleSubmit(value, TypeSector[typeSector])
      setValue('')
      setTypeSector(0)
      props.onRequestClose()
      setEmptyField(false)
    }
    else if(value){
      props.handleSubmit(value, null)
      setValue('')
      props.onRequestClose()
      setEmptyField(false)
    }
    else {
      setEmptyField(false)
    }
  }

  useEffect(() => {
    Modal.setAppElement('body');
  }, [])

  return(
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      // ariaHideApp={false}
    >
      <button type='button' onClick={() => { setEmptyField(false); props.onRequestClose()}} className='react-modal-close' >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <form onSubmit={handleCreateNewDataModal}>

      <h2 className="font-roboto font-medium text-2xl text-blue mb-[30px]">{props.title}</h2>

      <label className="font-roboto font-medium text-blue text-sm">{!!props.firstLabelText ? props.firstLabelText : "Título"}</label>
      <input 
        className="w-full font-roboto font-medium text-sm px-6 py-3 mb-5 mt-0.5 rounded-t-md	bg-[#F3F4F6] text-[#9CA3AF]"
        placeholder={props.placeholder}
        value={value}
        onChange={event=> setValue(event.target.value) }
        style={{borderColor: !!emptyField ? '#d60f0f' : "" }}
      />

      {props.sector && 
        <div>
          <div className="form-check">
            <input
              className="form-check-input h-4 w-4 mt-1 float-left mr-2 cursor-pointer"
              type="radio"
              value={0}
              checked={ typeSector === 0 }
              onChange={() => setTypeSector(0)}
            />
            <label
              className="form-check-label font-roboto font-medium text-blue text-sm "
              htmlFor="flexRadioDefault1"
            >
              Demais Setores
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input h-4 w-4 mt-1 float-left mr-2 cursor-pointer"
              type="radio"
              value={1}
              checked={ typeSector === 1 }
              onChange={() => setTypeSector(1)}
            />
            <label
              className="form-check-label font-roboto font-medium text-blue text-sm"
              htmlFor="flexRadioDefault2"
            >
              Serviços de Terceiros - PJ
            </label>
          </div>
        </div>
      }
      { props.children }
       
       <button type="submit">Cadastrar</button>

      </form>
    </Modal>
  )
}

export default NewDataModal;