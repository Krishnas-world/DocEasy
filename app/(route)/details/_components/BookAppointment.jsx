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
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';

const BookAppointment = ({ user, doctorData }) => {
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
            const currentHour = new Date().getHours();
            const [slotHour, slotMinute] = timeSlot.split(':');
            const slotHourNumber = slotHour.includes('PM') ? parseInt(slotHour) + 12 : parseInt(slotHour);
            const slotMinuteNumber = slotMinute === '30 AM' || slotMinute === '30 PM' ? 30 : 0;
            const slotTime = slotHourNumber * 100 + slotMinuteNumber;

            const currentTime = currentHour * 100 + (new Date().getMinutes() >= 30 ? 30 : 0);

            return slotTime < currentTime;
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

    const saveAppointment = async () => {
        if (!user || !user.email) {
            toast.error("User is not authenticated or email is missing.");
            return;
        }

        const appointmentData = {
            name: user.displayName || '',
            email: user.email,
            time: selectedTimeSlot,
            date: date.toISOString().split('T')[0], // save only the date part
            doctor: doctorData.id,
            note: notes,
        };

        try {
            await setDoc(doc(db, 'appointments', `${user.email}-${date.toISOString()}-${selectedTimeSlot}`), appointmentData);
            toast.success("Appointment booked successfully!");
        } catch (error) {
            console.error("Error booking appointment:", error);
            toast.error("Failed to book the appointment.");
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
                                        onSelect={setDate}
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
