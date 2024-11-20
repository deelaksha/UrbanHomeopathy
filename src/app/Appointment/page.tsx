'use client'
import React, { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';

// Types
interface AppointmentType {
  id: string;
  type: 'Initial Consultation' | 'Follow-up' | 'Quick Review';
  duration: number;
  price: number;
  description: string;
}

interface PatientInfo {
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  previousVisit: boolean;
  mainComplaints: string;
  currentMedications?: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const appointmentTypes: AppointmentType[] = [
  {
    id: '1',
    type: 'Initial Consultation',
    duration: 60,
    price: 150,
    description: 'Comprehensive first visit with detailed case analysis',
  },
  {
    id: '2',
    type: 'Follow-up',
    duration: 45,
    price: 100,
    description: 'Review progress and adjust treatment',
  },
  {
    id: '3',
    type: 'Quick Review',
    duration: 30,
    price: 75,
    description: 'Brief check-in for existing patients',
  },
];

const Appointment = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [patientInfo, setPatientInfo] = useState<Partial<PatientInfo>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^\d{10}$/.test(phone.replace(/[-()\s]/g, ''));
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!patientInfo.name?.trim()) {
      errors.name = 'Name is required';
    }
    if (!patientInfo.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(patientInfo.email)) {
      errors.email = 'Invalid email format';
    }
    if (!patientInfo.phone?.trim()) {
      errors.phone = 'Phone is required';
    } else if (!validatePhone(patientInfo.phone)) {
      errors.phone = 'Invalid phone format';
    }
    if (!patientInfo.mainComplaints?.trim()) {
      errors.mainComplaints = 'Please describe your main complaints';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setBookingComplete(true);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-xl rounded-lg transition-all duration-300">
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold flex items-center justify-between">
            Homeopathy Appointment Booking
            {currentStep === 1 && <Calendar className="w-6 h-6" />}
            {currentStep === 2 && <Clock className="w-6 h-6" />}
            {currentStep === 3 && <User className="w-6 h-6" />}
          </h2>
          <div className="flex justify-between text-sm mt-2">
            <span className={`font-medium ${currentStep >= 1 ? 'text-white' : 'text-gray-300'}`}>
              1. Select Date & Time
            </span>
            <span className={`font-medium ${currentStep >= 2 ? 'text-white' : 'text-gray-300'}`}>
              2. Choose Consultation
            </span>
            <span className={`font-medium ${currentStep >= 3 ? 'text-white' : 'text-gray-300'}`}>
              3. Patient Details
            </span>
          </div>
        </div>

        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-green-600 font-semibold mb-4">
                {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day) => (
                  <div key={day} className="text-center font-semibold text-gray-600 p-2">
                    {day}
                  </div>
                ))}

                {Array(new Date(currentYear, currentMonth, 1).getDay())
                  .fill(null)
                  .map((_, index) => (
                    <div key={`empty-${index}`} className="p-2" />
                  ))}

                {Array(new Date(currentYear, currentMonth + 1, 0).getDate())
                  .fill(null)
                  .map((_, index) => {
                    const day = index + 1;
                    const date = `${currentYear}-${(currentMonth + 1)
                      .toString()
                      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

                    return (
                      <div
                        key={day}
                        onClick={() => setSelectedDate(date)}
                        className={`
                          p-2 text-center cursor-pointer transition-all duration-300
                          hover:bg-green-100 rounded-lg
                          ${selectedDate === date ? 'bg-green-500 text-white' : ''}
                        `}
                      >
                        {day}
                      </div>
                    );
                  })}
              </div>

              {selectedDate && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-700">Available Times</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`
                          p-2 rounded-lg border transition-all duration-300 hover:scale-105
                          ${selectedTime === time 
                            ? 'bg-green-500 text-white border-green-500 hover:bg-green-600' 
                            : 'border-green-200 hover:border-green-300'}
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDate && selectedTime && (
                <button
                  className="w-full p-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                  onClick={() => setCurrentStep(2)}
                >
                  Continue to Consultation Type
                </button>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-green-700">Select Consultation Type</h3>
              <div className="grid gap-4">
                {appointmentTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`
                      p-4 border rounded-lg cursor-pointer transition-all duration-300
                      ${selectedType === type.id ? 'border-green-500 bg-green-50' : ''}
                      hover:border-green-300 hover:bg-green-50
                    `}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-green-700">{type.type}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                        <p className="text-sm text-gray-600">{type.duration} minutes</p>
                      </div>
                      <div className="text-lg font-semibold text-green-600">${type.price}</div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedType && (
                <button
                  className="w-full p-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                  onClick={() => setCurrentStep(3)}
                >
                  Continue to Patient Details
                </button>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-green-700">Enter Patient Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={patientInfo.name || ''}
                    onChange={(e) =>
                      setPatientInfo({ ...patientInfo, name: e.target.value })
                    }
                    placeholder="Full Name"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={patientInfo.email || ''}
                    onChange={(e) =>
                      setPatientInfo({ ...patientInfo, email: e.target.value })
                    }
                    placeholder="Email Address"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={patientInfo.phone || ''}
                    onChange={(e) =>
                      setPatientInfo({ ...patientInfo, phone: e.target.value })
                    }
                    placeholder="Phone Number"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Complaints
                  </label>
                  <textarea
                    value={patientInfo.mainComplaints || ''}
                    onChange={(e) =>
                      setPatientInfo({ ...patientInfo, mainComplaints: e.target.value })
                    }
                    placeholder="Describe your main health concerns"
                    rows={4}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {validationErrors.mainComplaints && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.mainComplaints}</p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full p-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Book Appointment'}
                </button>
              </div>
            </div>
          )}

          {bookingComplete && (
            <div className="text-center p-6">
              <h2 className="text-green-700 text-lg font-semibold">Booking Confirmed!</h2>
              <p className="text-gray-600">Thank you for booking an appointment with us.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;