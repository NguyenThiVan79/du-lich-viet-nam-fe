import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
    const { user } = useAuth();

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="avatar">
                    {user?.full_name?.charAt(0).toUpperCase()}
                </div>

                <h2>Thông tin tài khoản</h2>

                <p><strong>Họ tên:</strong> {user?.full_name}</p>
                <p><strong>Tên đăng nhập:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>

                <Link to="/" className="btn-primary">
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
}

export default Profile;