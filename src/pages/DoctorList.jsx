import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorList = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchDoctors = async () => {
  setLoading(true);
  try {
    const endpoint = `https://doctor-app-l8mc.onrender.com/api/v1/doctor/doctors/search${query ? `?query=${query}` : ''}`;
    const response = await axios.get(endpoint);
    setDoctorsList(response.data.data);
  } catch (error) {
    console.error("Error fetching doctor list:", error);
  } finally {
    setLoading(false);
  }
};


    fetchDoctors();
  }, [query]);

  const handleBookAppointment = (doctor) => {
    if (!authToken) {
      navigate("/login");
    } else {
      navigate("/AppoinmentBookingPage", { state: { doctor } });
    }
  };

  return (
    <div className='flex flex-col'>
      <input
        className='border-b-2 py-2 px-2 mb-4 w-full max-w-md mx-auto'
        type="text"
        placeholder="Search Doctor by Name or Specialization"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
        </div>
      ) : (
        <div className="doctor-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {doctorsList.length === 0 ? (
            <div className='text-xl text-red-700 font-bold'>
              No Doctor Found...
            </div>
          ) : (
            doctorsList.map((doctor) => (
              <div key={doctor._id} className="doctor-card p-4 shadow-md rounded-lg border">
                <img
                  src={doctor.image || "https://media.istockphoto.com/id/1298800629/photo/portrait-of-confident-male-doctor-looking-at-camera.jpg?s=1024x1024&w=is&k=20&c=YZqLotGgfGkQMmLrsanq56g-z5yWFOhovcGlBz20KPQ="}
                  alt={doctor.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">Specialization: {doctor.specialization}</p>
                  <p className="text-sm text-gray-600">Experience: {doctor.experience} years</p>
                  <p className="text-sm text-gray-600">Qualification: {doctor.qualification}</p>
                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
