import React, { useEffect, useState } from 'react';
import axios from 'axios';
const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("_id");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`https://doctor-app-l8mc.onrender.com/api/v1/appointments/Myappointments?userId=${userId}`,);  
        setAppointments(response.data.data);  
        console.log(response.data.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <h1 className="font-bold text-lg">You have no appointments yet!</h1>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id} className="border-b p-4">
              <p><strong>Doctor:</strong> {appointment.doctorName}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> { appointment.timeSlot}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentList;
