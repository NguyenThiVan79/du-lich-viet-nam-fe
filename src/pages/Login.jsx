import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Đăng nhập thất bại"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-image">
                <div>
                    <h1>Chào mừng trở lại!</h1>
                    <p>
                        Đăng nhập để tiếp tục khám phá
                        vẻ đẹp Việt Nam.
                    </p>
                </div>
            </div>

            <div className="auth-form-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <Link to="/" className="back-home">
                        ← Về trang chủ
                    </Link>

                    <h2>Đăng nhập</h2>
                    <p>Chào mừng bạn đến với Du Lịch Việt Nam.</p>

                    {error && <div className="error">{error}</div>}

                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Nhập email"
                    />

                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Nhập mật khẩu"
                    />

                    <button disabled={loading}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>

                    <p className="auth-switch">
                        Chưa có tài khoản?
                        <Link to="/register"> Đăng ký ngay</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;