import axios from "axios";
import { useEffect , useState , createContext } from "react";
export const PatientContext = createContext({
  patientData: null,
  setPatientData: () => {},
  fetchPatientData: () => {},
});

export const PatientProvider = ({ children }) => {
  const [patientData, setPatientData] = useState(null);

  const fetchPatientData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(
        "https://doctor-app-l8mc.onrender.com/api/v1/user/getUserData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPatientData(res.data.data);
      localStorage.setItem("_id", res.data.data.id);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  return (
    <PatientContext.Provider value={{ patientData, setPatientData, fetchPatientData }}>
      {children}
    </PatientContext.Provider>
  );
};
