"use client"; // Ensure this component runs on the client side

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from './_components/BookingList';
import { getUserDataFromSession } from '@/app/utils/session';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { toast } from 'sonner';
import Modal from '@/app/utils/modal';
import Cookies from 'js-cookie';

const MyBooking = () => {
    const [bookingList, setBookingList] = useState([]);
    const [doctorsList, setDoctorsList] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userData = getUserDataFromSession();

    useEffect(() => {
        if (!userData || !userData.email) {
            toast.error("User is not authenticated or email is missing.");
            return;
        }
        getUserBookingList();
    }, [userData?.email]);

    const getUserBookingList = async () => {
        try {
            const q = query(collection(db, 'appointments'), where('email', '==', userData.email));
            const querySnapshot = await getDocs(q);
            const filteredAppointments = querySnapshot.docs.map(appointment => ({ id: appointment.id, ...appointment.data() }));
            setBookingList(filteredAppointments);

            // Store appointments in cookies
            Cookies.set('appointments', JSON.stringify(filteredAppointments), { expires: 1 }); // Store for 1 day
            console.log("Appointments stored in cookies:", Cookies.get('appointments')); // Debug log

            // Fetch doctors data based on bookings
            const doctorIds = filteredAppointments.map(appointment => appointment.doctor).filter(Boolean);
            if (doctorIds.length > 0) {
                getDoctors(doctorIds);
            }
        } catch (error) {
            console.error("Error fetching Appointments:", error);
            toast.error("Error fetching Appointments");
        }
    };

    const getDoctors = async (doctorIds) => {
        try {
            const q = query(collection(db, 'DoctorsList'), where('id', 'in', doctorIds));
            const querySnapshot = await getDocs(q);
            const filteredDoctors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDoctorsList(filteredDoctors);
        } catch (error) {
            console.error("Error fetching doctors data:", error);
            toast.error("Error fetching doctors data");
        }
    };

    const filterUserBooking = (type) => {
        return bookingList.filter(item => type === 'Upcoming' ? new Date(item.date) >= new Date() : new Date(item.date) < new Date());
    };

    const handleCancel = async (appointmentId) => {
        setSelectedAppointment(appointmentId);
        setIsModalOpen(true);
    };

    const confirmCancel = async () => {
        try {
            const cookiesAppointments = JSON.parse(Cookies.get('appointments') || '[]');
            console.log("Appointments from cookies before cancel:", cookiesAppointments); // Debug log
            const appointmentToCancel = cookiesAppointments.find(app => app.id === selectedAppointment);
            if (appointmentToCancel) {
                // Find document with matching 'id' field in Firestore
                const q = query(collection(db, 'appointments'), where('id', '==', appointmentToCancel.id));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    // Delete the first matching document
                    const docToDelete = querySnapshot.docs[0];
                    await deleteDoc(doc(db, 'appointments', docToDelete.id));
                    toast.success("Appointment canceled successfully.");

                    // Update cookies to reflect the cancellation
                    const updatedAppointments = cookiesAppointments.filter(app => app.id !== selectedAppointment);
                    Cookies.set('appointments', JSON.stringify(updatedAppointments), { expires: 1 }); // Update cookie

                    setIsModalOpen(false);
                    setSelectedAppointment(null);
                    getUserBookingList(); // Refresh the booking list
                } else {
                    toast.error("Appointment not found in Firestore.");
                }
            } else {
                toast.error("Appointment not found in cookies.");
            }
        } catch (error) {
            console.error("Error canceling appointment:", error);
            toast.error("Failed to cancel the appointment. Error: " + error.message);
        }
    };

    return (
        <div className="my-4 mx-2">
            <Tabs defaultValue="Upcoming" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="Past">Past</TabsTrigger>
                </TabsList>
                <TabsContent value="Upcoming">
                    <BookingList bookingList={filterUserBooking('Upcoming')} doctorList={doctorsList} expired={false} onCancel={getUserBookingList} />
                </TabsContent>
                <TabsContent value="Past">
                    <BookingList bookingList={filterUserBooking('Past')} doctorList={doctorsList} expired={true} onCancel={getUserBookingList} />
                </TabsContent>
            </Tabs>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmCancel}
                message="Are you sure you want to cancel this appointment?"
            />
        </div>
    );
};

export default MyBooking;
