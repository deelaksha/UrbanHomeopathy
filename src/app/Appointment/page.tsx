'use client'
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Header from "../Header/page";

const isValidPhoneNumber = (phone: string): boolean => /^[0-9]{10}$/.test(phone);
const generateOTP = (): string => Math.floor(100000 + Math.random() * 900000).toString();

const TIME_SLOTS = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "18:00", label: "6:00 PM" },
];

export default function AppointmentBookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    disease_description: "",
    appointment_date: "",
    appointment_time: "",
  });
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBlockedDate, setIsBlockedDate] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "appointment_date") {
      checkBlockedDate(value);
      fetchBookedSlots(value); // Fetch booked slots for the selected date
    }
  };

  const fetchBookedSlots = async (selectedDate: string) => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("appointment_time")
        .eq("appointment_date", selectedDate);

      if (error) throw error;

      // Extract booked times from the response
      const booked = data.map((appointment: { appointment_time: string }) => appointment.appointment_time);
      setBookedSlots(booked);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
      setError("Unable to check available time slots.");
    }
  };

  const handleSendOtp = async () => {
    if (!isValidPhoneNumber(form.phone)) {
      setError("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    try {
      const generatedOtp = generateOTP();
      setOtp(generatedOtp);
      setIsOtpSent(true);
      setError(null);
      alert(`OTP sent to ${form.phone}: ${generatedOtp}`);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === otp) {
      setIsOtpVerified(true);
      setError(null);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const checkBlockedDate = async (selectedDate: string) => {
    try {
      const { data, error } = await supabase
        .from("blocked_date")
        .select("date")
        .eq("date", selectedDate);

      if (error) throw error;

      setIsBlockedDate(data && data.length > 0); // If data is found, it's a blocked date
    } catch (err) {
      console.error("Error fetching blocked dates:", err);
      setError("Unable to check availability for the selected date.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isOtpVerified) {
      setError("Please verify the OTP before submitting.");
      return;
    }

    if (!form.name || !form.email || !form.phone || !form.disease_description || !form.appointment_date || !form.appointment_time) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isBlockedDate) {
      setError("The selected date is not available. Please choose a different date.");
      return;
    }

    try {
      const { data, error } = await supabase.from("appointments").insert([form]);

      if (error) throw error;

      alert("Appointment booked successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        disease_description: "",
        appointment_date: "",
        appointment_time: "",
      });
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setOtp("");
      setEnteredOtp("");
    } catch (error) {
      console.error("Error inserting data:", error);
      setError("There was an error submitting your appointment. Please try again.");
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-green-50 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Book Appointment</h1>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            required
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            placeholder="10-Digit Phone Number"
            required
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
          {isOtpSent && !isOtpVerified && (
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter 6-Digit OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                maxLength={6}
                className="flex-grow px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button 
                type="button" 
                onClick={handleVerifyOtp}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Verify OTP
              </button>
            </div>
          )}
          
          {!isOtpSent && (
            <button 
              type="button" 
              onClick={handleSendOtp}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Send OTP
            </button>
          )}
          
          <textarea
            name="disease_description"
            value={form.disease_description}
            onChange={handleInputChange}
            placeholder="Brief Description of Condition"
            required
            disabled={!isOtpVerified}
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          
          <input
            type="date"
            name="appointment_date"
            value={form.appointment_date}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            required
            className={`w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isBlockedDate ? "bg-red-100" : ""
            }`}
          />
          
          {isBlockedDate && <p className="text-red-500 text-sm">This date is not available. Please choose another date.</p>}

          <select
            name="appointment_time"
            value={form.appointment_time}
            onChange={handleInputChange}
            required
            disabled={!isOtpVerified || isBlockedDate}
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select Available Time Slot</option>
            {TIME_SLOTS.map((slot) => (
              <option 
                key={slot.value} 
                value={slot.value}
                disabled={bookedSlots.includes(slot.value)} // Disable booked slots
              >
                {slot.label}
              </option>
            ))}
          </select>
          
          <button 
            type="submit" 
            disabled={!isOtpVerified || isBlockedDate}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
