import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        full_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirm_password) {
            setError("Mật khẩu nhập lại không khớp");
            return;
        }

        setLoading(true);

        try {
            await register({
                full_name: form.full_name,
                username: form.username,
                email: form.email,
                password: form.password
            });

            alert("Đăng ký thành công! Hãy đăng nhập.");
            navigate("/login");

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Đăng ký thất bại"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-image">
                <div>
                    <h1>Khám phá Việt Nam</h1>
                    <p>
                        Hành trình tuyệt vời bắt đầu từ
                        những điểm đến tuyệt đẹp.
                    </p>
                </div>
            </div>

            <div className="auth-form-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <Link to="/" className="back-home">
                        ← Về trang chủ
                    </Link>

                    <h2>Tạo tài khoản</h2>
                    <p>Đăng ký để khám phá những địa điểm thú vị.</p>

                    {error && <div className="error">{error}</div>}

                    <label>Họ và tên</label>
                    <input
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        required
                        placeholder="Nhập họ và tên"
                    />

                    <label>Tên đăng nhập</label>
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        minLength={3}
                        placeholder="Nhập tên đăng nhập"
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="example@gmail.com"
                    />

                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                        placeholder="Tối thiểu 8 ký tự"
                    />

                    <label>Nhập lại mật khẩu</label>
                    <input
                        type="password"
                        name="confirm_password"
                        value={form.confirm_password}
                        onChange={handleChange}
                        required
                        placeholder="Nhập lại mật khẩu"
                    />

                    <button disabled={loading}>
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>

                    <p className="auth-switch">
                        Đã có tài khoản?
                        <Link to="/login"> Đăng nhập</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;