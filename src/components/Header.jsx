import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <header className="header">
            <Link to="/" className="logo">
                <span>V</span> DU LỊCH VIỆT NAM
            </Link>

            <nav>
                <Link to="/">Trang chủ</Link>
                <a href="/#destinations">Địa điểm</a>
                <a href="/#categories">Danh mục</a>
                <a href="/#about">Giới thiệu</a>
            </nav>

            <div className="header-actions">
                {user ? (
                    <>
                        <Link to="/profile" className="user-name">
                            Xin chào, {user.full_name}
                        </Link>

                        <button
                            className="btn-outline"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn-login">
                            Đăng nhập
                        </Link>

                        <Link to="/register" className="btn-primary">
                            Đăng ký
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;