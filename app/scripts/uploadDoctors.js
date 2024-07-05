// scripts/uploadDoctors.js
import { db } from '../../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import { doctors } from '../utils/doctors.js';
// Make sure the path to doctors.js is correct

const uploadDoctors = async () => {
    try {
        for (const doctor of doctors) {
            await addDoc(collection(db, 'DoctorsList'), doctor);
        }
        console.log('Doctors are added successfully');
    } catch (error) {
        console.error('Error uploading the data:', error);
    }
};

uploadDoctors();
