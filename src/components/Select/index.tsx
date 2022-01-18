import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";

function index() {
  return (
    <div className="flex items-center relative border-2">
      <AiOutlineSearch color="#9CA3AF" size={16} className="absolute ml-4"/>
      <input type="text" className="px-10 py-2 outline-none text-lg text-[#6B7280] bg-white" placeholder="Nome da instituição" />
    </div>
  )
}

export default index
