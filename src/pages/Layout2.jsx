import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";

function Layout2() {
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState("Dr.");
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");
  const doctorId = localStorage.getItem("docId");

  const sendEmailToPatient = (appointment, status) => {
    const emailData = {
      appointment_time: appointment.timeSlot,
      to_name: appointment.patientName,
      doctor_name: doctorName,
      message: `has been ${status}`,
      to_email: appointment.patient_email,
    };

    console.log("send email function is running...", emailData);

    emailjs
      .send(
        "service_omortcj",
        "template_4uloria",
        emailData,
        "doD97DMTtFOIjZUqo"
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
        },
        (error) => {
          console.error("Failed to send email:", error);
        }
      );
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await axios.put(
        `https://doctor-app-l8mc.onrender.com/api/v1/appointments/updateStatus/${appointmentId}`,
        { status },
        { headers: { Authorization: "Bearer " + token } }
      );

      const updatedAppointment = appointments.find(
        (appt) => appt._id === appointmentId
      );

      if (updatedAppointment) {
        sendEmailToPatient(updatedAppointment, status);
      }

      getAppointments(); // Refresh the list
    } catch (error) {
      console.error(`Error updating appointment status: ${error}`);
    }
  };

  const getDoctorData = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        "https://doctor-app-l8mc.onrender.com/api/v1/doctor/getDoctorData",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setDoctorName(res.data.data.name);
      localStorage.setItem("docId", res.data.data.id);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  }, [token]);

  const getAppointments = useCallback(async () => {
    if (!doctorId) return;
    try {
      const res = await axios.get(
        `https://doctor-app-l8mc.onrender.com/api/v1/appointments/appointments?doctorId=${doctorId}`
      );
      setAppointments(res.data.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }, [doctorId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("docId");
    navigate("/login");
  };

  useEffect(() => {
    getDoctorData();
    getAppointments();
  }, [getDoctorData, getAppointments]);

  return (
    <div className="p-2 h-screen">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-72 bg-red-900 text-white rounded-md shadow-md mr-5 flex flex-col items-center">
          <div className="mt-6 mb-3">
            <h6 className="text-2xl text-center">DOC APP</h6>
            <hr className="my-4 border-gray-300 w-full" />
          </div>
          <div className="mt-12 w-full">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-md gap-5 text-lg cursor-pointer text-white"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-full flex flex-col">
          {/* Header */}
          <div className="h-1/10 bg-white shadow-md mb-5 flex items-center justify-end">
            <div className="text-lg font-semibold flex gap-4 items-center mr-14">
              <i className="fa-solid fa-bell text-red-900"></i>
              <p className="text-red-900">Hi, Dr. {doctorName}</p>
            </div>
          </div>

          {/* Appointment List */}
          <div className="flex-1 bg-white shadow-md p-4 overflow-auto">
            <h2 className="text-2xl font-semibold mb-4 text-red-600 text-center">
              Your Appointments
            </h2>
            {appointments.length === 0 ? (
              <p className="text-center text-gray-500">No appointments found.</p>
            ) : (
              <ul className="space-y-4">
                {appointments.map((appointment) => (
                  <li
                    key={appointment._id}
                    className="p-4 border rounded-md shadow-sm"
                  >
                    <p>
                      <strong>Patient Name:</strong> {appointment.patientName}
                    </p>
                    <p>
                      <strong>Phone:</strong> {appointment.phoneNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {appointment.patient_email}
                    </p>
                    <p>
                      <strong>Time Slot:</strong> {appointment.timeSlot}
                    </p>
                    <p>
                      <strong>Status:</strong> {appointment.status}
                    </p>

                    {appointment.status === "pending" && (
                      <div className="flex gap-4 mt-3">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded"
                          onClick={() =>
                            updateAppointmentStatus(appointment._id, "approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() =>
                            updateAppointmentStatus(appointment._id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout2;
