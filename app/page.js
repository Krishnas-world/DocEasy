import DoctorsList from "@/components/ui/DoctorsList";
import Hero from "@/components/ui/Hero";
import Search from "@/components/ui/Search";
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../firebaseConfig";

// Fetch data directly in the component

export default async function Home() {
  let doctorList = [];

  try {
    const querySnapshot = await getDocs(collection(db, 'DoctorsList'));
    doctorList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching doctors data:", error);
  }
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Search Bar and Category Search */}
      <Search />

      {/* Doctors List */}
      <DoctorsList doctorList={doctorList} />
    </>
  );
}
