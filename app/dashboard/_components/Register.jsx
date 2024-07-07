"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import stateDist from "./stateDist";
import { useState, useEffect } from "react";
import { db } from "@/firebaseConfig"; // Import the configured Firestore instance
import { collection, addDoc, query, orderBy, limit, getDocs, where, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner"; // Assuming you use the Sonner library for notifications

export default function Register({ user }) {
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    house: "",
    colony: "",
    city: "",
    state: "",
    district: "",
    country: "India",
    pincode: "",
    extraPhone: "",
    language: "",
  });
  const [photo, setPhoto] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const isFormValid = Object.values(formData).every(value => value !== "");
    setIsButtonDisabled(!isFormValid);
  }, [formData]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);

    const stateData = stateDist.states.find(s => s.state === state);
    if (stateData) {
      setDistricts(stateData.districts);
    } else {
      setDistricts([]);
    }

    setFormData((prevData) => ({
      ...prevData,
      state: state,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getNextDocumentName = async () => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const lastDoc = querySnapshot.docs[0];
      const lastDocId = lastDoc.id;
      const numberPart = parseInt(lastDocId.replace("DEasy", ""));
      const nextNumber = numberPart + 1;
      return `DEasy${nextNumber.toString().padStart(1, "0")}`;
    }
    return "DEasy1"; // Default for the first document
  };

  const checkPhoneNumberExists = async (phone) => {
    const q = query(collection(db, "users"), where("phone", "==", phone));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if primary phone number and extra phone number are the same
    if (formData.phone === formData.extraPhone) {
      toast.error("Primary phone number and extra phone number must be different.");
      return;
    }

    // Check if phone number already exists in the database
    if (await checkPhoneNumberExists(formData.phone)) {
      toast.error("Phone number already exists. Please use a different phone number.");
      return;
    }

    try {
      const documentName = await getNextDocumentName();
      const newDocRef = doc(collection(db, "users"), documentName);
      await setDoc(newDocRef, {
        ...formData,
        email: user.email,
        picture: user.picture,
        createdAt: new Date(),
      });
      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to save profile.");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <div className="bg-card border-[1px] text-card-foreground rounded-lg w-auto mx-auto p-6 m-4">
        <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <Image src={photo || user.picture} alt="Profile photo" width={100} height={100} className="rounded-full border border-muted" />
            <div>
              <label className="block text-sm font-medium text-muted-foreground">Profile photo</label>
              <input type="file" onChange={handlePhotoChange} className="mt-1 text-primary hover:underline" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Name</label>
            <input type="text" required name="name" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="John Doe" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Phone number</label>
            <div className="flex items-center space-x-2">
              <input type="text" required name="phone" maxLength={'10'} className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="630xxxxx27" value={formData.phone} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Email Address</label>
            <div className="flex items-center space-x-2">
              <input type="email" readOnly className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder={user.email} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Gender</label>
            <select name="gender" required className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.gender} onChange={handleChange}>
              <option>Select an option</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Date of birth</label>
            <input type="date" required name="dob" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.dob} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Blood group</label>
            <select name="bloodGroup" required className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.bloodGroup} onChange={handleChange}>
              <option>Select an option</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
        </div>
        <hr className="mt-5" />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">House No. / Street Name / Area</label>
            <input type="text" required name="house" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.house} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Colony / Street / Locality</label>
            <input type="text" required name="colony" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.colony} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">City / Town / Village</label>
            <input type="text" required name="city" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.city} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">State</label>
            <select name="state" required className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.state} onChange={handleStateChange}>
              <option>Select an option</option>
              {stateDist.states.map(state => (
                <option key={state.state} value={state.state}>{state.state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">District</label>
            <select name="district" required className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.district} onChange={handleChange}>
              <option>Select an option</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Country</label>
            <input type="text" readOnly name="country" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.country} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Pincode</label>
            <input type="text" required name="pincode" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.pincode} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Extra phone number</label>
            <div className="flex items-center space-x-2">
              <input type="text" required name="extraPhone" maxLength={'10'} className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="740xxxxx12" value={formData.extraPhone} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Language</label>
            <input type="text" required name="language" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.language} onChange={handleChange} />
          </div>
        </div>
        <div className="mt-6">
          <Button type="submit" disabled={isButtonDisabled} className={`${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
