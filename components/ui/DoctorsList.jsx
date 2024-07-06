import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DoctorsList = ({ doctorList = [], heading = 'Popular Doctors' }) => { 
  return (
    <div className='mb-10 p-8'>
      <h2 className='font-bold text-4xl tracking-wide flex justify-center'>{heading}</h2>
      <h2 className='text-gray-500 pt-6 text-xl text-center'>A List of Popular doctors in the town</h2>
      <br />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
        {doctorList.length > 0 ? doctorList.slice(0, 8).map((doctor) => (
          <div className='border-[1px] rounded-lg p-3 cursor-pointer hover:border-blue-600 hover:shadow-sm transition-all ease-in-out' key={doctor.id}> {/* Ensure 'id' is unique */}
            {doctor.image && <Image src={doctor.image} alt={doctor.name || 'doctor'} width={500} height={500} className='h-[200px] w-full object-cover rounded-md' />}
            <div className='mt-3 items-baseline flex flex-col gap-1'>
              <h2 className='text-[10px] bg-blue-100 p-1 rounded-lg px-2 text-blue-600'>{doctor.speciality}</h2>
              <h2 className='font-bold'>{doctor.name}</h2>
              <h2 className='text-blue-600 text-sm'>{doctor.experience}</h2>
              <h2 className='text-gray-500 text-sm'>{doctor.address}</h2>
              <Link href={'/details/'+doctor.id} className='w-full'>
                <h2 className='p-2 px-3 border-[1px] border-blue-600 text-blue-600 rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-all ease-in-out'>
                  Book Now
                </h2>
              </Link>
            </div>
          </div>
        )) : 
        [1, 2, 3, 4, 5, 6].map((item, index) => (
          <div key={index} className='h-[220px] bg-slate-200 w-full rounded-lg animate-pulse'></div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
