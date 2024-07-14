import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { db } from '@/firebaseConfig';
import { doc, deleteDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { toast } from 'sonner';
import Modal from '@/app/utils/modal';
import Cookies from 'js-cookie';

const BookingList = ({ bookingList, doctorList = [], expired, onCancel }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);

    // Create a map to easily access doctor details by their ID
    const doctorMap = doctorList.reduce((map, doctor) => {
        map[doctor.id] = doctor;
        return map;
    }, {});

    const handleCancel = (appointmentId) => {
        setAppointmentToCancel(appointmentId);
        setIsModalOpen(true);
    };

    const handleConfirmCancel = async () => {
        if (appointmentToCancel) {
            try {
                // Get appointments from cookies
                const cookiesAppointments = JSON.parse(Cookies.get('appointments') || '[]');
                console.log("Appointments from cookies before cancel:", cookiesAppointments); // Debug log
                
                const appointmentToCancelItem = cookiesAppointments.find(app => app.id === appointmentToCancel);
                if (appointmentToCancelItem) {
                    // Find document with matching 'id' field in Firestore
                    const q = query(collection(db, 'appointments'), where('id', '==', appointmentToCancelItem.id));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        // Delete the first matching document
                        const docToDelete = querySnapshot.docs[0];
                        await deleteDoc(doc(db, 'appointments', docToDelete.id));
                        toast.success("Appointment canceled successfully.");

                        // Update cookies to reflect the cancellation
                        const updatedAppointments = cookiesAppointments.filter(app => app.id !== appointmentToCancel);
                        Cookies.set('appointments', JSON.stringify(updatedAppointments), { expires: 1 }); // Update cookie

                        setIsModalOpen(false);
                        setAppointmentToCancel(null);
                        // Optionally trigger a refresh or update here
                        onCancel(); // Call the onCancel function passed as prop to refresh data
                    } else {
                        toast.error("Appointment not found in Firestore.");
                    }
                } else {
                    toast.error("Appointment not found in cookies.");
                }
            } catch (error) {
                console.error("Error canceling appointment:", error);
                toast.error("Failed to cancel appointment. Error: " + error.message);
            }
        }
    };

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmCancel}
                message="Are you sure you want to cancel this appointment?"
            />
            <div className='flex flex-wrap gap-6 m-2'>
                {bookingList.map((item) => {
                    const doctor = doctorMap[item.doctor];
                    return (
                        <div className='flex flex-col sm:flex-row w-full border-[1px] rounded-lg p-3 cursor-pointer hover:border-blue-600 hover:shadow-sm transition-all ease-in-out' key={item.id}>
                            <div className='flex flex-col justify-center items-center sm:w-1/3'>
                                {doctor?.image && <Image src={doctor.image} alt={doctor.name || 'doctor'} width={70} height={70} className='h-[70px] object-cover rounded-full border-[2px] border-black' />}
                                <h2 className='font-bold text-[18px] text-center sm:text-left flex gap-2'>{doctor?.name}</h2>
                                <h2 className='font-bold text-[18px] text-center sm:text-left flex gap-2'><Phone className='text-blue-600'/>{doctor?.phone}</h2>
                                <h2 className='font-bold text-[18px] text-center sm:text-left flex gap-2'><MapPin className='text-blue-600'/>{doctor?.address}</h2>
                            </div>
                            <div className='flex flex-col justify-center items-center sm:w-2/3 gap-2'>
                                <div className='flex flex-col items-center sm:items-start gap-2'>
                                    <h2 className='font-bold text-[16px] flex gap-2'><Calendar className='text-blue-600'/> Appointment on {new Date(item.date).toLocaleDateString()}</h2>
                                    <h2 className='font-bold text-[16px] flex gap-2'><Clock className='text-blue-600'/> Time: {new Date(item.date).toLocaleTimeString()}</h2>
                                    <p className='font-medium text-sm'>{item.notes}</p>
                                    {!expired && (
                                        <Button onClick={() => handleCancel(item.id)} className='bg-red-500 text-white mt-2'>
                                            Cancel Appointment
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default BookingList;
