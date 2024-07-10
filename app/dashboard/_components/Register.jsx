"use client";
import { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, where, orderBy, limit, getDocs, doc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import stateDist from './stateDist';
import Image from 'next/image';

export default function Register({ user }) {
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    extraPhone: "",
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
    language: "",
  });
  const [photo, setPhoto] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialPhone, setInitialPhone] = useState("");
  const [docId, setDocId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email) {
        try {
          const q = query(collection(db, 'users'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            setFormData(userDoc);
            setPhoto(userDoc.picture);
            setSelectedState(userDoc.state);
            setDistricts(stateDist.states.find(s => s.state === userDoc.state)?.districts || []);
            setInitialPhone(userDoc.phone);
            setDocId(querySnapshot.docs[0].id);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    const isFormValid = Object.values(formData).every(value => value !== "") && formData.phone !== formData.extraPhone;
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
    setFormData(prevData => ({
      ...prevData,
      state: state,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
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
    return "DEasy1";
  };

  const checkPhoneNumberExists = async (phone) => {
    const q = query(collection(db, "users"), where("phone", "==", phone));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setIsButtonDisabled(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // If not in edit mode, return early
    if (!isEditMode) {
      return;
    }
  
    // Validation for phone numbers only if not in edit mode
    if (formData.phone && formData.phone !== initialPhone && await checkPhoneNumberExists(formData.phone)) {
      toast.error("Phone number already exists. Please use a different phone number.");
      return;
    }
    if (formData.extraPhone && formData.extraPhone !== initialPhone && await checkPhoneNumberExists(formData.extraPhone)) {
      toast.error("Extra phone number already exists. Please use a different extra phone number.");
      return;
    }
  
    try {
      if (docId) {
        await setDoc(doc(db, "users", docId), {
          ...formData,
          email: user.email,
          picture: photo || user.picture,
          createdAt: new Date(),
        });
        toast.success("Profile updated successfully!");
      } else {
        const newDocName = await getNextDocumentName();
        const newDocRef = doc(db, "users", newDocName);
        await setDoc(newDocRef, {
          ...formData,
          email: user.email,
          picture: photo,
          createdAt: new Date(),
        });
        toast.success("Profile saved successfully!");
      }
      setIsEditMode(false);
      setIsButtonDisabled(true);
    } catch (error) {
      console.error("Error updating document: ", error);
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
    <form onSubmit={handleSave} className="p-8">
      <div className="bg-card border border-border text-card-foreground rounded-lg w-auto mx-auto p-6 m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <Image src={photo || user.picture} alt="Profile photo" width={100} height={100} className="rounded-full border border-muted" />
            <div>
              <label className="block text-sm font-medium text-muted-foreground">Profile photo</label>
              <input type="file" onChange={handlePhotoChange} className="mt-1 text-primary hover:underline" disabled={!isEditMode} />
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Name <span className="text-red-500">*</span></label>
            <input type="text" required name="name" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="John Doe" value={formData.name} onChange={handleChange} readOnly={!isEditMode} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Email <span className="text-red-500">*</span></label>
            <input type="email" required name="email" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="example@example.com" value={user.email} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Phone number <span className="text-red-500">*</span></label>
            <input type="text" required name="phone" maxLength="10" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="630xxxxx27" value={formData.phone} onChange={handleChange} readOnly={!isEditMode} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Extra Phone number</label>
            <input type="text" name="extraPhone" maxLength="10" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="630xxxxx28" value={formData.extraPhone} onChange={handleChange} readOnly={!isEditMode} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Gender <span className="text-red-500">*</span></label>
            <select name="gender" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.gender} onChange={handleChange} disabled={!isEditMode}>
              <option>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Date of Birth <span className="text-red-500">*</span></label>
            <input type="date" required name="dob" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="DD-MM-YYYY" value={formData.dob} onChange={handleChange} readOnly={!isEditMode} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Blood Group <span className="text-red-500">*</span></label>
            <select name="bloodGroup" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.bloodGroup} onChange={handleChange} disabled={!isEditMode}>
              <option>Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">House No. <span className="text-red-500">*</span></label>
            <input type="text" required name="house" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="A-123" value={formData.house} onChange={handleChange} readOnly={!isEditMode} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Colony <span className="text-red-500">*</span></label>
            <input type="text" required name="colony" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="Banjara Hills" value={formData.colony} onChange={handleChange} readOnly={!isEditMode} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">City <span className="text-red-500">*</span></label>
            <input type="text" required name="city" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="Hyderabad" value={formData.city} onChange={handleChange} readOnly={!isEditMode} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">State <span className="text-red-500">*</span></label>
            <select name="state" required className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={selectedState} onChange={handleStateChange} disabled={!isEditMode}>
              <option>Select State</option>
              {stateDist.states.map((state) => (
                <option key={state.state} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">District <span className="text-red-500">*</span></label>
            <select name="district" required className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" value={formData.district} onChange={handleChange} disabled={!isEditMode}>
              <option>Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Country <span className="text-red-500">*</span></label>
            <input type="text" required name="country" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="India" value={formData.country} onChange={handleChange} readOnly={!isEditMode} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Pincode <span className="text-red-500">*</span></label>
            <input type="text" required name="pincode" maxLength="6" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="500001" value={formData.pincode} onChange={handleChange} readOnly={!isEditMode} />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Language <span className="text-red-500">*</span></label>
            <input type="text" required name="language" className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring focus:ring-primary" placeholder="Telugu" value={formData.language} onChange={handleChange} readOnly={!isEditMode} />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          {!isEditMode && (
            <Button type="button" className="mr-2" onClick={handleEdit}>
              Edit
            </Button>
          )}
          {isEditMode && (
            <Button type="submit" disabled={isButtonDisabled}>
              Save
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
