import React, {createContext, useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-Decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(Cookies.get("token") || null);

    useEffect(() => {
        // kiem tra token khi load trang
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            }catch (error) {
                console.error("Token không hợp lệ:", error);
                logout(); 
            }
        }
    }, [token]);

    const login = (newtoken) => {
        try {
            const decodedUser = jwtDecode(newtoken);
            setUser(decodedUser);
            setToken(newtoken);
            // luu token vao cookie, thiet lap thoi gian het han
            Cookies.set("token", newtoken, { expires: 0.01 }); // 0.01 ngay ~ 15 phut
        } catch (error) {
            console.erroe("lỗi khi đăng nhập:", error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        Cookies.remove("admin_token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};