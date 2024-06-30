import DoctorsList from "@/components/ui/DoctorsList";
import Hero from "@/components/ui/Hero";
import Search from "@/components/ui/Search";

// Fetch data directly in the component
async function fetchDoctors() {
  try {
    const response = await fetch("http://localhost:3000/api/doctors");
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching doctors data:", error);
    return [];
  }
}

export default async function Home() {
  const doctorList = await fetchDoctors();

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
