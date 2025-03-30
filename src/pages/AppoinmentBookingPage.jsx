import React, { useState, useEffect ,useContext} from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { PatientContext } from '../components/PatientProvider';
import axios from 'axios';

const AppointmentBookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const doctor = state?.doctor;
  const userId = localStorage.getItem("_id");

  useEffect(() => {
    if (!doctor) {
      alert("No doctor selected. Redirecting to doctor list.");
      navigate("/doctor-list");
    }
  }, [doctor, navigate]);
  const { patientData } = useContext(PatientContext);
  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
   

  const timeSlots = [];
  for (let hour = 10; hour < 17; hour++) {
    timeSlots.push(`${hour}:00 - ${hour + 1}:00`);
  }
  console.log(timeSlots);
  

  const handleBookNow = async (e) => {
    e.preventDefault();
  
    try{
      await axios.post('/api/v1/appointments/book', {
        doctorId: doctor._id,
        userId,
        patientName: customerName,
        phoneNumber: contact,
        patient_email:patientData.email,
        date: selectedDate,             
        timeSlot: selectedSlot.split(' - ')[0], 
        doctorName:doctor.name
      });
  
      alert(`Appointment booked with Dr. ${doctor.name} on ${selectedDate} at ${selectedSlot}`);
      navigate('/AppoinmentList');  
    } catch(error) {
      if (error.response && error.response.status === 400) {
        alert("This slot is already booked by someone.");
      } else {
        console.error("Error booking appointment:", error);
        alert("Failed to book appointment. Please try again.");
      }
    }
  };

  return doctor ? (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <Link to="/DoctorList">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h2 className="text-2xl font-semibold mb-4">Book Appointment with Dr. {doctor.name}</h2>
      <form onSubmit={handleBookNow}>
        <label className="block mb-2">Patient Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <label className="block mb-2">Contact Information:</label>
        <input
          type="tel"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <label className="block mb-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          min={new Date().toISOString().split('T')[0]} // Prevent past dates
          required
        />

        {selectedDate && (
          <>
            <label className="block mb-2">Select Time Slot:</label>
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
              required
            >
              <option value="" disabled>Select a time slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </>
        )}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Book Now
        </button>
      </form>
    </div>
  ) : null;
};

export default AppointmentBookingPage;
