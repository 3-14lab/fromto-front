import React from 'react'

const titles = ['Nome', 'Quantidade', 'Modificação', 'Ação'];
interface DataProps {
  name: string;
  amount: number;
  updatedAt: string;
}
function index({ data }: any) {
  return (
    <table className="w-full" >
      <thead>
        <tr>
          {titles.map(title => (
            <th className="text-body font-normal py-4 px-8 text-left leading-6">{title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map(({ name, amount, updatedAt }: DataProps) => (
          <tr> 
              <td className="bg-white border-0 rounded py-4 px-8 text-body">{name}</td>
              <td className="bg-white rounded py-4 px-8 text-body">{amount} setores</td>
              <td className="bg-white rounded py-4 px-8 text-body">{updatedAt}</td>
              <td className="bg-white rounded py-4 px-8 text-body">
                <div className="flex">
                  <button >
                    {/* <img  src={EditImg} alt="" /> */}
                  </button>
                  <button>
                    {/* <img className="pl-2" src={TrashImg} alt="" /> */}
                  </button>
                </div>
              </td>
          </tr>
          ))}
      </tbody>
    </table>
  )
}

export default index
