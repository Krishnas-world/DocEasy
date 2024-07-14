"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Explore = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'DoctorsList'));
                const doctorsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDoctors(doctorsData);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className='px-4 sm:px-10 mt-10'>
            <h2 className='font-bold text-2xl mb-6'>Explore Doctors</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {doctors.map(doctor => (
                    <div key={doctor.id} className='flex flex-col border-[1px] rounded-lg p-4 hover:border-blue-600 hover:shadow-lg transition-all ease-in-out'>
                        <div className='flex flex-col items-center'>
                            {doctor.image && (
                                <div className='relative w-32 h-32'>
                                    <Image
                                        src={doctor.image}
                                        alt={doctor.name}
                                        layout='fill'
                                        className='object-cover rounded-full border-[2px] border-black'
                                    />
                                </div>
                            )}
                            <h3 className='font-bold text-lg text-center mt-2'>{doctor.name}</h3>
                            <p className='text-sm text-center'>{doctor.specialty}</p>
                            <p className='text-sm text-center'>{doctor.address}</p>
                            <Link href={`/details/${doctor.id}`}>
                                <Button className='bg-blue-500 text-white mt-4'>View Details</Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
