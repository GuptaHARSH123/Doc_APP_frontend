import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { PatientContext } from "./PatientProvider";
 

const Layout = () => {
  const navigate = useNavigate();
  const { patientData, setPatientData } = useContext(PatientContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    setPatientData(null);
    navigate("/login");
    console.log("Logout button clicked");
  };

  return (
    <div className="p-2 h-screen">
      <div className="flex h-full">
        <div className="w-72 bg-red-900 text-white rounded-md shadow-md mr-5 flex flex-col items-center">
          <div className="mt-6 mb-3">
            <h6 className="text-2xl text-center">DOC APP</h6>
            <hr className="my-4 border-gray-300 w-full" />
          </div>
          <div className="mt-12 w-full">
            {/* <div className="flex items-center px-4 py-2 rounded-md my-2 gap-5 text-lg">
              <i className="fa-solid fa-house"></i>
              <Link to="/" className="text-lg text-white">Home</Link>
            </div> */}
            <div className="flex items-center px-4 py-2 rounded-md my-2 gap-5 text-lg">
              <i className="fa-solid fa-list"></i>
              <Link to="/AppoinmentList" className="text-lg text-white">Appointments</Link>
            </div>
            <div className="flex items-center px-4 py-2 rounded-md my-2 gap-5 text-lg">
              <i className="fa-solid fa-user-doctor"></i>
              <Link to="/DoctorList" className="text-lg text-white">Apply Doctor</Link>
            </div>
            {patientData ? (
              <div className="flex items-center px-4 py-2 rounded-md my-2 gap-5 text-lg">
                <i className="fa-solid fa-right-from-bracket"></i>
                <span onClick={handleLogout} className="cursor-pointer text-lg text-white">Logout</span>
              </div>
            ) : (
              <div className="flex items-center px-4 py-2 rounded-md my-2 gap-5 text-lg">
                <i className="fa-solid fa-user"></i>
                <Link to="/login" className="text-lg text-white">LogIn</Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 h-full flex flex-col">
          <div className="h-1/10 bg-white shadow-md mb-5 flex items-center justify-end">
            <div className="text-lg font-semibold flex gap-4 items-center mr-14">
              <i className="fa-solid fa-bell text-red-900"></i>
              <p className="text-red-900">Hi, {patientData?.name || "User"}</p>
            </div>
          </div>
          <div className="flex-1 bg-white shadow-md p-4 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
