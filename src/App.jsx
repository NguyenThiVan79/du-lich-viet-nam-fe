import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
    const [message, setMessage] = useState("Đang kết nối Backend...");
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/api/hello")
            .then((response) => {
                setMessage(response.data);
            })
            .catch((err) => {
                console.error(err);
                setError("Không thể kết nối Backend!");
            });
    }, []);

    return (
        <div className="app">
            <h1>DU LỊCH VIỆT NAM</h1>

            <h2>Kiểm tra kết nối Frontend - Backend</h2>

            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <p style={{ color: "green" }}>{message}</p>
            )}
        </div>
    );
}

export default App;