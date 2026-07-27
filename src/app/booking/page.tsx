'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import {
  ConsultationContainer,
  ConsultationHero,
  BenefitsSection,
  BenefitsGrid,
  BenefitCard,
  BookingSection,
  BookingCard,
  BookingHeader,
  BookingForm,
  FormGroup,
  TimeSlotGrid,
  TimeSlotButton,
  ButtonGroup,
  Button,
  SuccessMessage,
  ErrorAlert,
  LoadingSpinner,
  TrustSection,
  TrustStats,
  TrustStat
} from '@/styles/ConsultationStyles';

const BookingPage = () => {
  const router = useRouter();
  const { user } = useAppContext();

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Pre-fill user details if logged in
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  // Generate time slots on initial load
  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(selectedDate);
      setAvailableSlots(slots);
    }
  }, []);

  // Generate available time slots for a given date
  const generateTimeSlots = (date: string) => {
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
    setSelectedTime('');
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
      if (!selectedDate) {
        throw new Error('Please select a date');
      }

      if (!name || !email || !phone) {
        throw new Error('Please fill in all contact details');
      }

      // If time is selected, include it; otherwise just use the date with a default time
      const appointmentDateTime = selectedTime
        ? new Date(`${selectedDate}T${selectedTime}:00`)
        : new Date(`${selectedDate}T09:00:00`); // Default to 9 AM if no time selected

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          appointment_date: appointmentDateTime.toISOString(),
          name,
          email,
          phone,
          notes: notes || '',
          service_type: selectedTime ? `Preferred time: ${selectedTime}` : 'No time preference'
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit consultation request');
      }

      setSuccess(true);
      // Don't clear the form or redirect - just show success message
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err.message || 'An error occurred while submitting your request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConsultationContainer>
      <Header activePage="booking" />

      {/* Hero Section */}
      <ConsultationHero>
        <div className="hero-content">
          <h1>Book a Consultation</h1>
          <p>Transform your space with expert guidance</p>
        </div>
      </ConsultationHero>

      {/* Benefits Section */}
      <BenefitsSection>
        <div className="container">
          <h2>Why Book a Consultation?</h2>
          <BenefitsGrid>
            <BenefitCard>
              <div className="icon">
                <i className="fas fa-user-check"></i>
              </div>
              <h3>Expert Advice</h3>
              <p>Get personalized recommendations from our experienced interior designers</p>
            </BenefitCard>

            <BenefitCard>
              <div className="icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Creative Solutions</h3>
              <p>Discover innovative design ideas tailored to your unique style and needs</p>
            </BenefitCard>

            <BenefitCard>
              <div className="icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Budget Planning</h3>
              <p>Receive accurate cost estimates and timeline projections for your project</p>
            </BenefitCard>

            <BenefitCard>
              <div className="icon">
                <i className="fas fa-gift"></i>
              </div>
              <h3>Free Initial Session</h3>
              <p>Your first 30-minute consultation is completely complimentary</p>
            </BenefitCard>
          </BenefitsGrid>
        </div>
      </BenefitsSection>

      {/* Booking Form Section */}
      <BookingSection>
        <div className="container">
          <BookingCard>
            <BookingHeader>
              <h2>Schedule Your Consultation</h2>
              <p>Select your preferred date and time</p>
            </BookingHeader>

            {success ? (
              <SuccessMessage>
                <div className="icon">
                  <i className="fas fa-check"></i>
                </div>
                <h3>Thank You for Contacting Us!</h3>
                <p>We have received your consultation request. Our team will review it and get back to you shortly via email or phone.</p>
                <Button
                  $variant="primary"
                  onClick={() => {
                    setSuccess(false);
                    setSelectedDate(getTodayDate());
                    setSelectedTime('');
                    setNotes('');
                    if (!user) {
                      setName('');
                      setEmail('');
                      setPhone('');
                    }
                  }}
                >
                  Submit Another Request
                </Button>
              </SuccessMessage>
            ) : (
              <BookingForm onSubmit={handleSubmit}>
                {error && <ErrorAlert>{error}</ErrorAlert>}

                {/* Contact Information */}
                <FormGroup>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="john@example.com"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+1 (555) 000-0000"
                  />
                </FormGroup>

                {/* Date Selection */}
                <FormGroup>
                  <label htmlFor="date">Select Date *</label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange(e.target.value)}
                    required
                  />
                </FormGroup>

                {/* Time Slot Selection - Optional */}
                {selectedDate && (
                  <FormGroup>
                    <label>Preferred Time (Optional)</label>
                    <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                      Select a preferred time or leave blank and we'll contact you to schedule
                    </p>
                    <TimeSlotGrid>
                      {availableSlots.map((slot, index) => (
                        <TimeSlotButton
                          key={index}
                          type="button"
                          $selected={selectedTime === slot}
                          onClick={() => setSelectedTime(selectedTime === slot ? '' : slot)}
                        >
                          {slot}
                        </TimeSlotButton>
                      ))}
                    </TimeSlotGrid>
                  </FormGroup>
                )}

                {/* Notes */}
                <FormGroup>
                  <label htmlFor="notes">Additional Notes (Optional)</label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about your project, style preferences, or any specific requirements..."
                  />
                </FormGroup>

                {/* Submit Buttons */}
                <ButtonGroup>
                  <Button
                    type="button"
                    $variant="secondary"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    $variant="primary"
                    disabled={loading || !selectedDate || !name || !email || !phone}
                  >
                    {loading ? 'Submitting...' : 'Request Consultation'}
                  </Button>
                </ButtonGroup>
              </BookingForm>
            )}
          </BookingCard>
        </div>
      </BookingSection>

      {/* Trust Section */}
      <TrustSection>
        <div className="container">
          <h3>Trusted by Hundreds of Happy Clients</h3>
          <TrustStats>
            <TrustStat>
              <div className="number">500+</div>
              <div className="label">Projects Completed</div>
            </TrustStat>

            <TrustStat>
              <div className="number">98%</div>
              <div className="label">Client Satisfaction</div>
            </TrustStat>

            <TrustStat>
              <div className="number">15+</div>
              <div className="label">Years Experience</div>
            </TrustStat>

            <TrustStat>
              <div className="number">50+</div>
              <div className="label">Design Awards</div>
            </TrustStat>
          </TrustStats>
        </div>
      </TrustSection>

      <Footer />
    </ConsultationContainer>
  );
};

export default BookingPage;
