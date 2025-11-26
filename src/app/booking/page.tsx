'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

const BookingPage = () => {
  const router = useRouter();
  const { user } = useAppContext();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/booking');
    }
  }, [user, router]);

  // Generate available time slots for a given date
  const generateTimeSlots = (date: string) => {
    // For demo purposes, generate slots every 30 minutes from 9 AM to 6 PM
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    
    return slots;
  };

  // Handle date selection and generate available time slots
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset selected time when date changes
    
    // Generate available time slots for the selected date
    const slots = generateTimeSlots(date);
    setAvailableSlots(slots);
  };

  // Handle booking submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!selectedDate || !selectedTime) {
        throw new Error('Please select both date and time');
      }

      // Combine date and time into ISO string
      const appointmentDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
      
      // Make API call to create appointment
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming JWT token
        },
        body: JSON.stringify({
          appointment_date: appointmentDateTime.toISOString(),
          notes: notes
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to book appointment');
      }

      setSuccess(true);
      // Reset form after successful booking
      setSelectedDate('');
      setSelectedTime('');
      setNotes('');
      setAvailableSlots([]);
      
      setTimeout(() => {
        router.push('/appointments'); // Redirect to appointments page
      }, 2000);
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err.message || 'An error occurred while booking the appointment');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="booking" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book a Consultation</h1>

        {success ? (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">Your consultation has been successfully booked.</p>
            <button
              onClick={() => router.push('/appointments')}
              className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              View Appointments
            </button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Date & Time</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]} // Today's date as minimum
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 text-sm rounded-md border ${
                          selectedTime === slot
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Any specific requirements or questions for the consultation..."
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !selectedDate || !selectedTime}
                  className={`flex-1 py-3 px-4 rounded-md text-white font-medium ${
                    loading || !selectedDate || !selectedTime
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {loading ? 'Booking...' : 'Book Consultation'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;