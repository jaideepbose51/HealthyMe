import { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const currencySymbol = "$";
    const backendUrl = "http://localhost:3000"; // Fixed protocol

    const storedToken = localStorage.getItem("token") || "";
    const [token, setToken] = useState(storedToken);
    const [doctors, setDoctors] = useState([]);
    const [userData, setUserData] = useState(null); // Changed from false to null

    // Recreate axios instance when the token changes
    const axiosInstance = useMemo(() => {
        return axios.create({
            baseURL: backendUrl,
            headers: { Authorization: `Bearer ${token}` }, // Use proper auth header
        });
    }, [token]);

    const getAllDoctors = async () => {
        try {
            const { data } = await axiosInstance.get("/api/doctor/list");
            setDoctors(data.doctors);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch doctors!");
        }
    };

    const loadUserProfileData = async () => {
        if (!token) return; // Prevent unnecessary calls

        try {
            const { data } = await axiosInstance.get("/api/user/get-profile");
            if (data.success) {
                setUserData(data.userData);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error loading user profile!");
        }
    };

    useEffect(() => {
        getAllDoctors();
    }, []);

    useEffect(() => {
        loadUserProfileData();
    }, [token]); // Calls when token changes

    const value = {
        doctors,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        getAllDoctors,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
