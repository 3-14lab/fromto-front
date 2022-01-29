import React from 'react'
import { AiOutlineSwap } from "react-icons/ai";

function index({ data, aux }: any) {
  return (
    <>
    { data.map(({ code, name }: any, index: number) => (
      <div className={`flex w-full font-inter mt-4 pb-5 ${index !== data.length - 1 && "border-b-2 border-[#D1D5DB]"} justify-between gap-5 items-center`} >
        <div className="flex gap-5 items-center justify-center">
          <div>
            { index === 0 && (<p className="text-lg font-semibold text-[#14B8A6] text-center mb-3">código</p>)}
            <div className="flex justify-center items-center w-28 py-2 border rounded-md border-[#14B8A6]">
            <p className="text-[#14B8A6]">{ code }</p>
            </div>
          </div>
          <div className="flex-column">
          { index === 0 && (<p className="text-lg font-semibold text-[#14B8A6] text-center mb-3">nome da instituição</p>)}
            <div className="w-96 py-2 px-3 border rounded-md border-[#D1D5DB] bg-white" >
              <p className="text-[#6B7280]">
                {name}
              </p>
            </div>
          </div>
        </div>
        <AiOutlineSwap className={`${index === 0 && "mt-9"}`} />
        <div className="flex gap-5 items-center">
          <div className="flex-column">
            { index === 0 && (<p className="text-lg text-[#6B7280] font-semibold text-center mb-3">código</p>)}
              <div className="flex justify-center items-center w-28 py-2 border rounded-md border-[#14B8A6]">
                  <p className="text-[#14B8A6]">---</p>
              </div>
          </div>
          <div className="flex-column">
            { index === 0 && (<p className="text-lg text-[#6B7280] font-semibold text-center mb-3">nome da instituição</p>)}        
            <select className='w-96 py-2 px-3 border rounded-md border-[#D1D5DB] text-[#6B7280] placeholder-gray-400'>
              <option value="" selected disabled hidden>Nome da instituição</option>
              { aux.map((name: string) => (
                <option value="valor">{name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    ))}
    </>
  )
}

export default index
