"use client";
import React, { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { toast } from "sonner";
import DoctorDetail from '../_components/DoctorDetail';
import DoctorSuggestion from '../_components/DoctorSuggestion';

const Details = ({ params }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [doctorList, setDoctorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getDoctorById();
    fetchDoctorList();
  }, [params]);

  const getDoctorById = async () => {
    let toastId; // Variable to store toast ID
    try {
      toastId = toast.loading('Please wait...'); // Show loading toast

      const q = query(collection(db, 'DoctorsList'), where('id', '==', Number(params.recordID)));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doctor = querySnapshot.docs[0].data();
        setDoctorData(doctor);
        toast.success('Loaded Successfully', { id: toastId }); // Show success toast with the same ID
      } else {
        toast.warning("No such doctor found!", { id: toastId }); // Show warning toast with the same ID
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      toast.error("Error fetching the data", { id: toastId }); // Show error toast with the same ID
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId); // Dismiss the loading toast
    }
  };

  const fetchDoctorList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'DoctorsList'));
      const doctors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctorList(doctors);
    } catch (error) {
      console.error("Error fetching doctors data:", error);
    }
  };

  return (
    <div className='p-5 md:px-20'>
      <h2 className="font-bold text-[22px] pb-5">Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        <div className='col-span-3'>
          {doctorData ? (
            <DoctorDetail doctorData={doctorData} loading={isLoading} />
          ) : (
            <div className='animate-pulse'>
              <div className='h-[270px] bg-slate-200 rounded-lg'></div>
              <div className='mt-5'>
                <div className='h-[20px] bg-slate-200 rounded-md'></div>
                <div className='mt-2 h-[20px] bg-slate-200 rounded-md'></div>
                <div className='mt-2 h-[20px] bg-slate-200 rounded-md'></div>
              </div>
            </div>
          )}
        </div>
        <div>
          <DoctorSuggestion doctorList={doctorList} />
        </div>
      </div>
    </div>
  );
};

export default Details;
