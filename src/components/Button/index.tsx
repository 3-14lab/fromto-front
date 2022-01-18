import React from 'react'

function index({ label, type, mt }: any) {
  console.log(mt)
  return (
    <div className={`max-w-fit mt-${!!mt && mt} mx-auto py-2 px-5 bg-[#14B8A6] rounded text-white uppercase font-inter font-medium cursor-pointer`} >
      { label }
    </div>
  )
}

export default index
