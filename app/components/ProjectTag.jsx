import React from 'react'

const ProjectTag = ({name,onClick,isSelected}) => {
    const buttonStyle = isSelected
    ? "text-white border-green-500"
    :"text-[#ADB7BE] border-slate-600 hover:border-white"
  return (
    <div>
        <button onClick={() =>onClick(name)} className={`${buttonStyle} rounded-full border-2  py-3 px-6 text-xl cursor-pointer`}>{name}</button>
      
    </div>
  )
}

export default ProjectTag
