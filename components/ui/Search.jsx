import React from 'react'
import { Input } from './input'
import { Button } from './button'
import { SearchIcon } from 'lucide-react'
import { category } from '@/app/utils/category'
import Image from 'next/image'

function Search() {
  return (
    <div className='mb-10 flex items-center flex-col gap-2 p-2'>
      <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-blue-600'>Doctors</span></h2>
      <h2 className='text-gray-500 text-xl text-center'>Search Your Doctors and Book Appointment in One Click</h2>
      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Search..." />
        <Button type="submit"><SearchIcon className='h-4 w-4 mr-2'/> Search</Button>
      </div>
      <br />
      <div className='grid grid-cols-3  md:grid-cols-4 lg:grid-cols-6'>
        {category.map((item, index) => (
          <div key={index} className='flex flex-col items-center text-center p-5 bg-blue-50 m-2 rounded-lg gap-2 hover:scale-110 transition-all ease-in-out shadow-sm'>
            <Image src={item.icon} alt='icon' width={40} height={40} />
            <label>{item.description}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
