import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import DoctorList from "./pages/DoctorList";
import AppoinmentBookingPage from "./pages/AppoinmentBookingPage";
import AppointmentList from "./pages/AppointmentList";
import DoctorRegisterPage from "./pages/DoctorRegisterPage";
import Layout2 from "./pages/Layout2";
import { PatientProvider } from "./components/PatientProvider";

function App() {
  return (
    <PatientProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DoctorList />} />  
          <Route path="DoctorList" element={<DoctorList   />} />  
          <Route path="AppoinmentList" element={<AppointmentList/>}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/DoctorRegisterPage" element={<DoctorRegisterPage/>}></Route>
       <Route path="/AppoinmentBookingPage" element={<AppoinmentBookingPage />} />
       <Route path="/Layout2" element={<Layout2/>}/>
      </Routes>
    </BrowserRouter>
    </PatientProvider> 
  );
}

export default App;
