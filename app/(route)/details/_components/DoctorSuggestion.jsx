import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const DoctorSuggestion = ({ doctorList = [] }) => {
    // Shuffle the doctorList array and slice the first 8 items
    const shuffledDoctors = shuffleArray([...doctorList]).slice(0, 4);

    return (
        <div className='mb-10 ml-5 p-8 mt-5 border-[1px] rounded-lg'>
            <h2 className='font-bold tracking-wide flex'>Suggestions</h2>
            <br />
            <div className='flex flex-col gap-7'>
                {shuffledDoctors.length > 0 ? shuffledDoctors.map((doctor) => (
                    <Link href={'/details/'+doctor.id}><div className='flex items-center border-[1px] rounded-lg p-3 cursor-pointer hover:border-blue-600 hover:shadow-sm transition-all ease-in-out' key={doctor.id}>
                        {doctor.image && (
                            <Image
                                src={doctor.image}
                                alt={doctor.name || 'doctor'}
                                width={60}
                                height={60}
                                className='rounded-full h-[60px] object-cover'
                            />
                        )}
                        <div className='ml-4 flex flex-col items-baseline'>
                            <h2 className='text-[10px] bg-blue-100 p-1 rounded-lg px-2 text-blue-600'>{doctor.speciality}</h2>
                            <h2 className='font-bold text-xs'>{doctor.name}</h2>
                            <h2 className='text-blue-600 text-xs'>{doctor.experience}</h2>
                        </div>
                    </div></Link>
                )) :
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className='h-[100px] bg-slate-200 w-full rounded-lg animate-pulse'></div>
                    ))}
            </div>
        </div>
    );
};

export default DoctorSuggestion;
