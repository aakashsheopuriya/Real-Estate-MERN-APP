import React from 'react'
import AddButton from '../../components/buttons/AddButton'
import { useNavigate } from 'react-router-dom'

export default function NoPage() {
    const navigate=useNavigate();
    const handleBack=async ()=>{
         navigate(-1);
    }
  return (
    <div className="relative top-11 bg-slate-100 h-screen">
     No Page Found
    <div className="">
      {/* <BreadCrumbs items={items} /> */}
      <AddButton name="Back" className="text-white bg-blue-700 p-3 m-5 border border-gray-300 rounded-xl hover:bg-slate-900" onClick={handleBack}/>
    </div>
    </div>
  )
}
