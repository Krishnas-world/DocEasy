// scripts/uploadDoctors.js
import { db } from '../../firebaseConfig.js/index.js';
import { collection, addDoc } from 'firebase/firestore';
import { doctors } from '../utils/doctors.js';

const uploadDoctors = async () => {
    try {
        for (const doctor of doctors) {
            await addDoc(collection(db, 'DoctorsList'), doctor);
        }
        console.log('====================================');
        console.log("Doctors are added successfully");
        console.log('====================================');
    } catch (error) {
        console.error("Error uploading the data:", error);
    }
};

uploadDoctors();
