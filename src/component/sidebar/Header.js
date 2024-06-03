import React from 'react'
import Logo from "../../assets/book-and-studen-logo-free-vector - Copy.png"

const Header = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <img src={Logo} width={150} />
        <h1 className='uppercase font-bold'><span className='text-5xl max-lg:text-3xl'>Silva</span> <br /><span className='text-lg max-lg:text-xs'>Publications</span></h1>
    </div>
  )
}

export default Header