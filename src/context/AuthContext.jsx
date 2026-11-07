import {
    createContext,
    useContext,
    useState
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Kiểm tra token khi mở website
    async function loadUser() {
        const token = localStorage.getItem("access_token");

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.get("/auth/me");
            setUser(response.data);
        } catch (error) {
            localStorage.removeItem("access_token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    // Đăng nhập
    async function login(email, password) {
        const response = await api.post("/auth/login", {
            email,
            password
        });

        localStorage.setItem(
            "access_token",
            response.data.access_token
        );

        setUser(response.data.user);

        return response.data;
    }

    // Đăng ký
    async function register(data) {
        return await api.post("/auth/register", data);
    }

    // Đăng xuất
    function logout() {
        localStorage.removeItem("access_token");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                loadUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}