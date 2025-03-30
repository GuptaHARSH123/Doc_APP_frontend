import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patientData, setPatientData] = useState(null);
  const token = localStorage.getItem("token");

  const fetchPatientData = async () => {
    if (!token) return;
    try {
      const res = await axios.get("/api/v1/user/getUserData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatientData(res.data.data);
      localStorage.setItem("_id", res.data.data.id);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, [token]);

  return (
    <PatientContext.Provider value={{ patientData, setPatientData }}>
      {children}
    </PatientContext.Provider>
  );
};
