import React from 'react';
import { Button, Header, LocationTable } from '../components';
// import { Container } from './styles';
const mock = [
  {
    code: '999999',
    name: 'Colégio ABC não sei o que lá',
  },
  {
    code: '999999',
    name: 'Colégio ABC não sei o que lá',
  },
  {
    code: '999999',
    name: 'Colégio ABC não sei o que lá',
  },
]

const aux = ['ANDREA NUZZI, E M MAESTRO-EF', 'ANITA CORREIA, C M E I', 'ANITA CORREIA, C M E I', 'ANITA CORREIA, C M E I']

export const Pairing: React.FC = () => {
  return (
    <>
      <Header />  
      <main className="mx-auto py-4 w-[70rem]">
        <LocationTable data={mock} aux={aux} />
        <Button label="Atualizar planilha" mt={4} />
      </main>
    </>
  )
}