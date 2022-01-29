import React from 'react'
import EditImg from '../../img/edit.svg'
import TrashImg from '../../img/trash.svg'


const titles = ['Nome', 'Quantidade', 'Modificação', 'Ação'];
interface DataProps {
  name: string;
  amount: number;
  updatedAt: string;
  arq?: string;
  local?: string;
}
function Index({ data, titles }: any) {
  return (
    <table className="w-full" >
      <thead>
        <tr>
          {titles.map((title: string, index: number) => (
            <th className={`text-body font-normal py-4 ${index === 0 && "px-8"} text-left leading-6`}>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map(({ name, amount, arq, local, updatedAt }: DataProps) => (
          <tr className="bg-white text-body text-sm"> 
              <td className="font-medium rounded-lg py-6 px-5">{name}</td>
              { !!arq && <td>{arq}</td> }
              { !!local && <td>{local}</td>}
              { !!amount && <td>{amount} setores</td>}
              <td className={`${!!amount && "pl-8"}`}>{updatedAt}</td>
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

export default Index
