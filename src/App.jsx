
// import { useEffect, useState } from "react";
// import api from "./services/api";

// function App() {
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         api.get("/api/hello")
//             .then((response) => {
//                 setMessage(response.data);
//             })
//             .catch((error) => {
//                 console.error("Lỗi gọi API:", error);
//                 setMessage("Không thể kết nối Backend");
//             });
//     }, []);

//     return (
//         <div>
//             <h1>Website Du Lịch Việt Nam</h1>
//             <h2>Response từ Backend:</h2>
//             <p>{message}</p>
//         </div>
//     );
// }

// export default App;
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useEffect } from "react";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";


function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <p className="loading">Đang tải...</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}


function AppContent() {
    const { loadUser } = useAuth();

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;