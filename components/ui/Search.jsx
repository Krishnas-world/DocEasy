import React from 'react'
import { Input } from './input'
import { Button } from './button'
import { SearchIcon } from 'lucide-react'

function Search() {
  return (
    <div className='mb-10 flex items-center flex-col gap-2'>
      <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-blue-600'>Doctors</span></h2>
      <h2 className='text-gray-500 text-xl'>Search Your Doctors and Book Appointment in One Click</h2>
      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Search..." />
        <Button type="submit"><SearchIcon className='h-4 w-4 mr-2'/> Subscribe</Button>
      </div>
    </div>
  )
}

export default Search
