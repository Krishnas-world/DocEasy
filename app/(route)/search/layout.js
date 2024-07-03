import React from 'react'
import CategoryList from './_components/CategoryList'

const layout = ({ children, params }) => {
  return (
    <div className='grid grid-cols-4'>
      <div className='hidden md:block'> 
      <div>
        {/* Category */}
        <CategoryList/> 
      </div>
      </div>
      <div className='col-span-3'>
        {children}
      </div>
    </div>
  )
}

export default layout