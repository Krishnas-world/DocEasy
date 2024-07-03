"use client"
import DoctorsList from '@/components/ui/DoctorsList';
import React, { useEffect, useState } from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
db

const Search = ({ params }) => {
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    getDoctors();
  }, [params]);

  const getDoctors = async () => {
    try {
      const q = query(collection(db, 'DoctorsList'), where('speciality', '==', params.cname));
      const querySnapshot = await getDocs(q);
      const filteredDoctors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctorsList(filteredDoctors);
    } catch (error) {
      console.error("Error fetching doctors data:", error);
    }
  };

  return (
    <DoctorsList heading={params.cname} doctorList={doctorsList} />
  );
}

export default Search;
