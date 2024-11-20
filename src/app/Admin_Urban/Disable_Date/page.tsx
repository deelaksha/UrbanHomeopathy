'use client'
import Header from '../Header/page';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { Calendar, Info, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const DisableDateForm = () => {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [disabledDates, setDisabledDates] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDateToDelete, setSelectedDateToDelete] = useState(null);

  // Fetch all the disabled dates and reasons when the component mounts
  useEffect(() => {
    const fetchDisabledDates = async () => {
      const { data, error } = await supabase
        .from('disable_date')
        .select('id, date, reason'); // Include 'id' for deletion
        
      if (error) {
        console.error('Error fetching dates:', error);
      } else {
        setDisabledDates(data || []);
      }
    };

    fetchDisabledDates();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!date || !reason) {
      setMessage('Please select a valid date and provide a reason.');
      return;
    }

    const { data, error } = await supabase
      .from('disable_date')
      .insert([{ date, reason }]);

    if (error) {
      console.error('Supabase error:', error);
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Date inserted successfully!');
      setDate('');
      setReason('');
    }
  };

  // Function to delete a date after confirmation
  const handleDelete = async () => {
    const { error } = await supabase
      .from('disable_date')
      .delete()
      .eq('id', selectedDateToDelete); // Delete by ID

    if (error) {
      console.error('Error deleting date:', error);
      setMessage(`Error: ${error.message}`);
    } else {
      // Update the UI after successful deletion
      setDisabledDates(disabledDates.filter((date) => date.id !== selectedDateToDelete));
      setMessage('Date deleted successfully!');
    }

    // Close the confirmation modal
    setShowConfirmation(false);
  };

  const handleDeleteClick = (id) => {
    setSelectedDateToDelete(id);
    setShowConfirmation(true); // Show confirmation modal
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-8 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border-4 border-emerald-500 mt-5"
      >
        <h1 className="text-3xl font-bold text-emerald-600 mb-6 flex items-center">
          <Calendar className="mr-3 text-emerald-500" />
          Disable Date Management
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-emerald-700 mb-2">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-emerald-700 mb-2">Reason</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full p-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-all h-24"
              placeholder="Explain why this date is disabled..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-emerald-500 text-white p-3 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center"
          >
            <Check className="mr-2" /> Submit Disabled Date
          </motion.button>
        </form>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-lg text-center ${
              message.includes('Error')
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </motion.div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4 flex items-center">
            <Info className="mr-3 text-emerald-500" /> Disabled Dates
          </h2>

          {disabledDates.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center"
            >
              No disabled dates found.
            </motion.p>
          ) : (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {disabledDates.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-emerald-50 p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <strong className="text-emerald-700">{item.date}</strong>
                    <p className="text-gray-600 text-sm">{item.reason}</p>
                  </div>
                  <X
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDeleteClick(item.id)} // Trigger deletion
                  />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </motion.div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg w-80"
          >
            <h3 className="text-xl font-semibold text-emerald-700">Are you sure?</h3>
            <p className="text-gray-600 mt-2">Do you want to delete this disabled date?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-gray-700 p-2 rounded-lg"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                Confirm
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
    </>
  );
};

export default DisableDateForm;
