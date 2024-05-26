import React from 'react'
import NavLink from './NavLink'

const MenuOverlay = ({links}) => {
  return (
    <ul className='flex flex-col py-4 items-center'>
        {links.map((links,index) =>(
        <li key={index}>
        <NavLink href ={links.path} title={links.title}/>
        </li>
        ))}
    </ul>
  )
}

export default MenuOverlay
