import React from 'react'
import CategoryList from './_components/CategoryList'

const layout = ({ children, params }) => {
  return (
    <div className='grid lg:grid-cols-4 md:grid grid-cols-2'>
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