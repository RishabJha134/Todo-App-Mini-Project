import React from 'react'

function Navbar() {
  return (
    <>
    <div className='navbar flex justify-between bg-slate-800 p-2  text-white'>
        <div className='mx-5 text-1xl font-bold'>
            <span>iTask</span>
        </div>
        <div>
            <ul className='flex gap-2 mx-5'>
                <li>Home</li>
                <li>Your Tasks</li>
            </ul>
        </div>

    </div>
    </>
  )
}

export default Navbar