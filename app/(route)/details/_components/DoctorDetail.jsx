import { Button } from '@/components/ui/button'
import { GraduationCap, Instagram, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Skeleton loader component
const SkeletonLoader = () => (
  <div className='animate-pulse'>
    <div className='h-[270px] bg-slate-200 w-full rounded-lg'></div>
    <div className='mt-5 flex md:px-10 flex-col gap-3'>
      <div className='h-8 bg-slate-200 w-2/3 rounded-md'></div>
      <div className='h-6 bg-slate-200 w-1/2 rounded-md mt-2'></div>
      <div className='h-6 bg-slate-200 w-3/4 rounded-md mt-2'></div>
      <div className='h-4 bg-slate-200 w-1/3 rounded-md mt-2'></div>
      <div className='flex gap-2 mt-2'>
        <div className='h-8 w-8 bg-slate-200 rounded-full'></div>
        <div className='h-8 w-8 bg-slate-200 rounded-full'></div>
        <div className='h-8 w-8 bg-slate-200 rounded-full'></div>
      </div>
      <Button className='mt-3 rounded-full bg-slate-200 text-transparent hover:bg-slate-300'>Book Appointment</Button>
    </div>
    <div className='p-3 border-[1px] rounded-lg mt-5'>
      <div className='h-6 bg-slate-200 w-1/2 rounded-md'></div>
      <div className='h-4 bg-slate-200 w-full rounded-md mt-2'></div>
    </div>
  </div>
);

const DoctorDetail = ({ doctorData, loading }) => {
  const socials = [{
    social: {
      linkedin: 'https://www.linkedin.com/in/krishnapallan/',
      github: 'https://github.com/Krishnas-world',
      instagram: 'https://www.instagram.com/krishnasworld._/',
    }
  }];

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
        {/* Doctor image */}
        <div>
          <Image src={doctorData.image} width={200} height={200} alt='Doctor Image' className='rounded-lg w-full h-[270px] object-cover' />
        </div>

        <div className='col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline'>
          <h2 className='font-bold text-2xl'>{doctorData.name}</h2>
          <h2 className='flex gap-2 text-gray-500 text-md'>
            <GraduationCap />
            <span>{doctorData.experience} Years of Experience</span>
          </h2>
          <h2 className='text-md flex gap-2 text-gray-500'>
            <MapPin />
            <span>{doctorData.address}</span>
          </h2>
          <h2 className='text-[10px] bg-blue-100 p-1 rounded-lg px-2 text-blue-600'>{doctorData.speciality}</h2>
          {socials.map((member, i) => (
            <div key={i} className="rounded-md">
              <div className="flex flex-wrap">
                <div className="w-auto">
                  <Link href={member.social.linkedin}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                        <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M9,17H6.5v-7H9V17z M7.7,8.7c-0.8,0-1.3-0.5-1.3-1.2s0.5-1.2,1.4-1.2c0.8,0,1.3,0.5,1.3,1.2S8.6,8.7,7.7,8.7z M18,17h-2.4v-3.8c0-1.1-0.7-1.3-0.9-1.3	s-1.1,0.2-1.1,1.3c0,0.2,0,3.8,0,3.8h-2.5v-7h2.5v1c0.3-0.6,1-1,2.2-1s2.2,1,2.2,3.2V17z"></path>
                      </svg>
                    </div>
                  </Link>
                </div>
                <div className="w-auto pl-2">
                  <Link href={member.social.github}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                        <path d="M 12 2 C 6.476563 2 2 6.476563 2 12 C 2 17.523438 6.476563 22 12 22 C 17.523438 22 22 17.523438 22 12 C 22 6.476563 17.523438 2 12 2 Z M 12 4 C 16.410156 4 20 7.589844 20 12 C 20 12.46875 19.953125 12.929688 19.875 13.375 C 19.628906 13.320313 19.265625 13.253906 18.84375 13.25 C 18.53125 13.246094 18.140625 13.296875 17.8125 13.34375 C 17.925781 12.996094 18 12.613281 18 12.21875 C 18 11.257813 17.53125 10.363281 16.78125 9.625 C 16.988281 8.855469 17.191406 7.535156 16.65625 7 C 15.074219 7 14.199219 8.128906 14.15625 8.1875 C 13.667969 8.070313 13.164063 8 12.625 8 C 11.933594 8 11.273438 8.125 10.65625 8.3125 L 10.84375 8.15625 C 10.84375 8.15625 9.964844 6.9375 8.34375 6.9375 C 7.777344 7.507813 8.035156 8.953125 8.25 9.6875 C 7.484375 10.417969 7 11.28125 7 12.21875 C 7 12.546875 7.078125 12.859375 7.15625 13.15625 C 6.878906 13.125 5.878906 13.03125 5.46875 13.03125 C 5.105469 13.03125 4.542969 13.117188 4.09375 13.21875 C 4.03125 12.820313 4 12.414063 4 12 C 4 7.589844 7.589844 4 12 4 Z M 5.46875 13.28125 C 5.863281 13.28125 7.0625 13.421875 7.21875 13.4375 C 7.238281 13.492188 7.257813 13.542969 7.28125 13.59375 C 6.851563 13.554688 6.019531 13.496094 5.46875 13.5625 C 5.101563 13.605469 4.632813 13.738281 4.21875 13.84375 C 4.1875 13.71875 4.148438 13.597656 4.125 13.46875 C 4.5625 13.375 5.136719 13.28125 5.46875 13.28125 Z M 18.84375 13.5 C 19.242188 13.503906 19.605469 13.570313 19.84375 13.625 C 19.832031 13.691406 19.796875 13.746094 19.78125 13.8125 C 19.527344 13.753906 19.109375 13.667969 18.625 13.65625 C 18.390625 13.652344 18.015625 13.664063 17.6875 13.6875 C 17.703125 13.65625 17.707031 13.625 17.71875 13.59375 C 18.058594 13.546875 18.492188 13.496094 18.84375 13.5 Z M 6.09375 13.78125 C 6.65625 13.785156 7.183594 13.824219 7.40625 13.84375 C 7.929688 14.820313 8.988281 15.542969 10.625 15.84375 C 10.222656 16.066406 9.863281 16.378906 9.59375 16.75 C 9.359375 16.769531 9.113281 16.78125 8.875 16.78125 C 8.179688 16.78125 7.746094 16.160156 7.375 15.625 C 7 15.089844 6.539063 15.03125 6.28125 15 C 6.019531 14.96875 5.929688 15.117188 6.0625 15.21875 C 6.824219 15.804688 7.097656 16.5 7.40625 17.125 C 7.683594 17.6875 8.265625 18 8.90625 18 L 9.03125 18 C 9.011719 18.109375 9 18.210938 9 18.3125 L 9 19.40625 C 6.691406 18.472656 4.933594 16.5 4.28125 14.0625 C 4.691406 13.960938 5.152344 13.855469 5.5 13.8125 C 5.660156 13.792969 5.863281 13.777344 6.09375 13.78125 Z M 18.625 13.90625 C 19.074219 13.917969 19.472656 14.003906 19.71875 14.0625 C 19.167969 16.132813 17.808594 17.855469 16 18.90625 L 16 18.3125 C 16 17.460938 15.328125 16.367188 14.375 15.84375 C 15.957031 15.554688 16.988281 14.863281 17.53125 13.9375 C 17.910156 13.910156 18.355469 13.898438 18.625 13.90625 Z M 12.5 18 C 12.773438 18 13 18.226563 13 18.5 L 13 19.9375 C 12.671875 19.980469 12.339844 20 12 20 L 12 18.5 C 12 18.226563 12.226563 18 12.5 18 Z M 10.5 19 C 10.773438 19 11 19.226563 11 19.5 L 11 19.9375 C 10.664063 19.894531 10.324219 19.832031 10 19.75 L 10 19.5 C 10 19.226563 10.226563 19 10.5 19 Z M 14.5 19 C 14.742188 19 14.953125 19.175781 15 19.40625 C 14.675781 19.539063 14.34375 19.660156 14 19.75 L 14 19.5 C 14 19.226563 14.226563 19 14.5 19 Z"></path>
                      </svg>
                    </div>
                  </Link>
                </div>
                <div className="w-auto pl-2">
                  <Link href={member.social.instagram}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                        <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <Button className='mt-3 rounded-full bg-blue-600 hover:bg-white hover:text-black hover:border border-blue-600'>Book Appointment</Button>
        </div>
      </div>
      <div className='p-3 border-[1px] rounded-lg mt-5'>
        <h2 className='font-bold text-[20px]'>About me</h2>
        <p className='text-gray-500 tracking-wide'>{doctorData.about}</p>
      </div>
    </>
  )
}

export default DoctorDetail
