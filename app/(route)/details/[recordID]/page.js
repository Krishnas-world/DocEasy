"use client"
import React, { useEffect, useState } from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { toast } from "sonner";
import DoctorDetail from '../_components/DoctorDetail';
import DoctorSuggestion from '../_components/DoctorSuggestion';

const Details = ({ params }) => {
  const [doctorData, setDoctorData] = useState(null);
  useEffect(() => {
    getDoctorById();
  }, [params]);

  const getDoctorById = async () => {
    try {
      toast.loading('Please Wait!')

      const q = query(collection(db, 'DoctorsList'), where('id', '==', Number(params.recordID)));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doctor = querySnapshot.docs[0].data();
        setDoctorData(doctor);
        toast.success('Loaded Successfully');
      } else {
        console.log("No such document!");
        toast.warning("No such doctor found!");
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      toast.error("Error Fetching the data")
    }
  };

  return (
    <div className='p-5 md:px-20'>
    <h2 className="font-bold text-[22px] pb-5">Details</h2>

    <div className='grid grid-cols-1 md:grid-cols-4'>
      <div className='col-span-3'>
      {doctorData && <DoctorDetail doctorData={doctorData} />}
      </div>
      <div className='col-span-2'> 
        <DoctorSuggestion/>
      </div>
    </div>
    </div>

  );
};

export default Details;
