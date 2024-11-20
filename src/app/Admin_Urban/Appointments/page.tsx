'use client';
import Header from '../Header/page';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { Calendar, Clock, User, Mail, Phone, Edit, Save } from 'lucide-react';

export interface Appointment {
  id: number;
  name: string;
  email: string;
  phone: string;
  disease_description: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

const TIME_SLOTS = [
  { value: '08:00', label: '8:00 AM' },
  // ... (previous time slots remain the same)
];

const fetchAppointments = async (): Promise<Appointment[] | null> => {
  const { data, error } = await supabase.from('appointments').select('*');
  if (error) {
    console.error('Error fetching appointments:', error);
    return null;
  }
  return data;
};

const fetchDisabledDates = async (): Promise<string[] | null> => {
  const { data, error } = await supabase.from('disable_date').select('date');
  if (error) {
    console.error('Error fetching disabled dates:', error);
    return null;
  }
  return data?.map((item: { date: string }) => item.date) || [];
};

const updateAppointment = async (id: number, updates: Partial<Appointment>): Promise<boolean> => {
  const { error } = await supabase.from('appointments').update(updates).eq('id', id);
  if (error) {
    console.error('Error updating appointment:', error);
    return false;
  }
  return true;
};

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [disabledDates, setDisabledDates] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const getData = async () => {
      const appointmentsData = await fetchAppointments();
      const disabledDatesData = await fetchDisabledDates();
      setAppointments(appointmentsData);
      setDisabledDates(disabledDatesData);
      setLoading(false);
    };

    getData();
  }, []);

  const isDateAndTimeAvailable = (
    newDate: string,
    newTime: string,
    appointmentId: number
  ): boolean => {
    if (disabledDates && disabledDates.includes(newDate)) {
      return false;
    }

    const isReserved = appointments?.some(
      (a) =>
        a.id !== appointmentId &&
        a.appointment_date === newDate &&
        a.appointment_time === newTime
    );

    return !isReserved;
  };

  const handleUpdate = async (id: number, newDate: string, newTime: string, newStatus: string) => {
    if (!isDateAndTimeAvailable(newDate, newTime, id)) {
      alert('The selected date and time are not available.');
      return;
    }

    const success = await updateAppointment(id, {
      appointment_date: newDate,
      appointment_time: newTime,
      status: newStatus,
    });

    if (success) {
      setAppointments((prev) =>
        prev
          ? prev.map((appointment) =>
              appointment.id === id
                ? {
                    ...appointment,
                    appointment_date: newDate,
                    appointment_time: newTime,
                    status: newStatus,
                  }
                : appointment
            )
          : null
      );
      setEditMode((prev) => ({ ...prev, [id]: false }));
      alert('Appointment updated successfully!');
    } else {
      alert('Failed to update appointment.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-emerald-50 animate-pulse">
        <div className="text-emerald-600 text-2xl font-bold flex items-center space-x-3">
          <Calendar className="w-10 h-10 animate-spin" />
          <span>Loading Appointments...</span>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div className="container mx-auto px-4 py-8 bg-emerald-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-emerald-900 mb-10 text-center tracking-tight">
        Clinic Appointments
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div 
              key={appointment.id} 
              className="bg-white border-2 border-emerald-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 p-6 space-y-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-8 h-8 text-emerald-600" />
                <h2 className="text-2xl font-semibold text-emerald-800">
                  {appointment.name}
                </h2>
              </div>
              <div className="space-y-3 text-emerald-700">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-emerald-500" />
                  <span>{appointment.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-emerald-500" />
                  <span>{appointment.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-emerald-500" />
                  <span>
                    {appointment.appointment_date} at {appointment.appointment_time}
                  </span>
                </div>
                <div className="italic">{appointment.disease_description}</div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Status:</span>
                  <span className={`
                    px-2 py-1 rounded-full text-sm 
                    ${appointment.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 
                      appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}
                  `}>
                    {appointment.status}
                  </span>
                </div>

                {editMode[appointment.id] ? (
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <label className="text-sm text-emerald-700 mb-1">Date</label>
                      <input
                        type="date"
                        defaultValue={appointment.appointment_date}
                        className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm text-emerald-700 mb-1">Time</label>
                      <select 
                        defaultValue={appointment.appointment_time}
                        className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button 
                      onClick={() => handleUpdate(
                        appointment.id,
                        appointment.appointment_date,
                        appointment.appointment_time,
                        appointment.status
                      )}
                      className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-300"
                    >
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() =>
                      setEditMode((prev) => ({
                        ...prev,
                        [appointment.id]: true,
                      }))
                    }
                    className="w-full flex items-center justify-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition duration-300"
                  >
                    <Edit className="w-5 h-5" />
                    <span>Edit Appointment</span>
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-emerald-600 text-xl">
            No appointments found.
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AppointmentsList;