import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const backendUrl = "https://prescripto-backend-gx6e.onrender.com";
    const storedAToken = localStorage.getItem("AToken") || "";
    
    const [aToken, setAToken] = useState(storedAToken);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState([]);

    const axiosInstance = axios.create({
        baseURL: backendUrl,
        headers: { aToken }
    });

    const getAllDoctors = async () => {
        try {
            const { data } = await axiosInstance.post("/api/admin/all-doctors", {});
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);  // Fetch doctors whenever `aToken` changes

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axiosInstance.post('/api/admin/change-availability', { docId });
            if (data.success) {
                getAllDoctors();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error(error);
        }
    };

    const getAllAppointments = async () => {
        try {
            const { data } = await axiosInstance.get('/api/admin/appointments');
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error(error);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axiosInstance.post("/api/admin/cancel-appointment", { appointmentId });
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error(error);
        }
    };

    const getDashData = async () => {
        try {
            const { data } = await axiosInstance.get('/api/admin/dashboard');
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error(error);
        }
    };

    const value = { aToken, setAToken, backendUrl, doctors, changeAvailability, appointments, setAppointments, getAllAppointments, cancelAppointment, getDashData, dashData };

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
