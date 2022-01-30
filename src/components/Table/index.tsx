import React from 'react'
import { Link } from 'react-router-dom'
import EditImg from '../../img/edit.svg'
import TrashImg from '../../img/trash.svg'


const titles = ['Nome', 'Quantidade', 'Modificação', 'Ação'];
interface DataProps {
  id: string,
  name: string;
  amount: number;
  created_at: string;
  arq?: string;
  local?: string;
}
function Table({ data, titles }: any) {

  return (
    <table className="w-full" >
      <thead>
        <tr>
          {titles.map((title: string, index: number) => (
            <th key={index} className={`text-body font-normal py-4 ${index === 0 && "px-8"} text-left leading-6`}>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map(({ id ,name, amount, arq, local, created_at }: DataProps) => (
          
          <tr key={id} className="bg-white text-body text-sm"> 
              <Link to={`sector/${id}`} >
                  <td className="font-medium rounded-lg py-6 px-5">{name}</td>
              </Link>
              { !!arq && <td>{arq}</td> }
              { !!local && <td>{local}</td>}
              <td>{amount} setores</td>
              <td className="pl-8">{new Date(created_at).toLocaleDateString('pt-br')}</td>
              <td className="rounded-lg">
                <div className="flex">
                  <button>
                    <img className="w-5 h-5" src={EditImg} alt="" />
                  </button>
                  <button>
                    <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
                  </button>
                </div>
              </td>
          </tr>
          ))}
      </tbody>
    </table>
  )
}

export default Table
