"use client";
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { CalendarHeart, Clock } from 'lucide-react';
import { isPast, isToday } from 'date-fns';
import { DialogClose } from '@radix-ui/react-dialog';
import { db } from '@/firebaseConfig'; // Import the configured Firestore instance
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'sonner';
import { getUserDataFromSession } from '@/app/utils/session';
import sendEmail from '@/app/api/GlobalAPI';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs


const BookAppointment = ({ doctorData }) => {
    const [date, setDate] = useState(new Date());
    const [timeslot, setTimeSlot] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        getTime();
    }, []);

    const getTime = () => {
        const timeList = [];
        for (let i = 10; i < 12; i++) {
            timeList.push({ time: i + ':00 AM' });
            timeList.push({ time: i + ':30 AM' });
        }
        for (let i = 1; i < 7; i++) {
            timeList.push({ time: i + ':00 PM' });
            timeList.push({ time: i + ':30 PM' });
        }
        setTimeSlot(timeList);
    };

    const isPastDay = (day) => {
        return isPast(day);
    };

    const isPastTimeSlot = (timeSlot) => {
        if (isToday(date)) {
            const currentISTTime = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
            const currentISTDate = new Date(currentISTTime.getTime() + istOffset);

            const [slotHour, slotMinutePeriod] = timeSlot.split(':');
            const [slotMinute, period] = slotMinutePeriod.split(' ');

            let slotHourNumber = parseInt(slotHour);
            if (period === 'PM' && slotHourNumber !== 12) {
                slotHourNumber += 12;
            } else if (period === 'AM' && slotHourNumber === 12) {
                slotHourNumber = 0;
            }

            const slotMinuteNumber = parseInt(slotMinute);
            const slotTime = new Date(date);
            slotTime.setHours(slotHourNumber, slotMinuteNumber, 0, 0);

            return slotTime < currentISTDate;
        }
        return false;
    };

    const handleTimeSlotClick = (time) => {
        if (selectedTimeSlot === time) {
            setSelectedTimeSlot(null);
        } else {
            setSelectedTimeSlot(time);
        }
    };

    const userData = getUserDataFromSession();

    const saveAppointment = async () => {
        if (!userData || !userData.email) {
            toast.error("User is not authenticated or email is missing.");
            return;
        }
        const appointmentId = uuidv4(); // Generate a unique ID
        const appointmentData = {
            id: appointmentId,
            name: userData.name,
            email: userData.email,
            time: selectedTimeSlot,
            date: date.toDateString(), // save only the date part
            doctor: doctorData.id,
            note: notes,
        };
    
        console.log("Saving appointment:", appointmentData); // Debug log
    
        try {
            await addDoc(collection(db, 'appointments'), appointmentData);
            
            const emailResponse = await sendEmail(appointmentData);
            console.log("Email response:", emailResponse); // Debug log
    
            toast.success("Booking Confirmed!");
        } catch (error) {
            console.error("Error booking appointment or sending email:", error); // Debug log
            toast.error("Failed to book the appointment or send the email.");
        }
    };
    

    return (
        <Dialog>
            <DialogTrigger>
                <Button className='mt-3 rounded-full bg-blue-600 hover:bg-white hover:text-black hover:border border-blue-600'>
                    Book Appointment
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center'>Book Appointment</DialogTitle>
                    <DialogDescription>
                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
                                {/* Calendar */}
                                <div className='flex flex-col gap-3 items-baseline'>
                                    <h2 className='flex gap-2 items-center font-bold'>
                                        <CalendarHeart className='text-blue-600 h-5 w-5' /> Select The Date
                                    </h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(day) => {
                                            console.log("Selected date:", day); // Add this line to debug
                                            setDate(day);
                                        }}
                                        disabled={isPastDay}
                                        className="rounded-md border text-black"
                                        style={{
                                            '--highlight-color': '#1E40AF', // Custom highlight color
                                            '--text-color': '#000', // Custom text color
                                            '--border-color': '#CBD5E1', // Custom border color
                                        }}
                                    />
                                </div>
                                {/* TimeSlot */}
                                <div className='mt-3 md:mt-0'>
                                    <h2 className='flex gap-2 items-center mb-3 font-bold'>
                                        <Clock className='text-blue-600 h-5 w-5' /> Select Time Slot
                                    </h2>
                                    <div className='grid grid-cols-3 gap-3 border rounded-lg p-4'>
                                        {timeslot.map((item, index) => (
                                            <h2
                                                onClick={() => handleTimeSlotClick(item.time)}
                                                key={index}
                                                className={`p-2 border hover:bg-blue-600 cursor-pointer hover:text-white transition-all ease-in-out border-gray-500 text-center rounded-full text-black ${item.time === selectedTimeSlot ? 'bg-blue-600 text-white' : ''} ${isPastTimeSlot(item.time) ? 'bg-gray-300 cursor-not-allowed' : ''}`}
                                                style={{ cursor: isPastTimeSlot(item.time) ? 'not-allowed' : 'pointer' }}
                                            >
                                                {item.time}
                                            </h2>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Text Area */}
                            <div className='mt-5'>
                                <h2 className='mb-2 font-bold'>Additional Notes</h2>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows="4"
                                    className='w-full border rounded-md p-2'
                                    placeholder='Enter any additional notes or requests here...'
                                />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" className='text-red-500 border-red-500' variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={saveAppointment}
                        type="button"
                        className='bg-blue-600 border text-white hover:text-blue-600 hover:border-blue-600 hover:bg-white'
                        disabled={!(date && selectedTimeSlot)}
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default BookAppointment;
