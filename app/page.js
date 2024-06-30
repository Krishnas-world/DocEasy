import DoctorsList from "@/components/ui/DoctorsList";
import Hero from "@/components/ui/Hero";
import Search from "@/components/ui/Search";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero/>

      {/* Search Bar and Category Search */}
      <Search/>

      {/* Doctors List */}
      <DoctorsList/>
    </>
  );
}
