
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";

function Home() {
    const [destinations, setDestinations] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [categoryResponse, destinationResponse] =
                    await Promise.all([
                        api.get("/categories"),
                        api.get("/destinations")
                    ]);

                setCategories(categoryResponse.data);
                setDestinations(destinationResponse.data);
            } catch (err) {
                console.error("Lỗi tải dữ liệu trang chủ:", err);
                setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    return (
        <>
            <Header />

            <main>
                <section className="hero">
                    <div className="hero-content">
                        <span className="hero-label">
                            KHÁM PHÁ VẺ ĐẸP VIỆT NAM
                        </span>

                        <h1>
                            Mỗi hành trình
                            <br />
                            là một trải nghiệm
                        </h1>

                        <p>
                            Cùng khám phá những điểm đến tuyệt đẹp,
                            văn hóa đặc sắc và con người Việt Nam.
                        </p>

                        <a href="#destinations" className="hero-button">
                            Khám phá ngay →
                        </a>
                    </div>
                </section>

                <section className="search-section">
                    <input
                        type="text"
                        placeholder="Bạn muốn khám phá địa điểm nào?"
                    />

                    <button
                        onClick={() => {
                            document.getElementById("destinations")
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        Tìm kiếm
                    </button>
                </section>

                <section className="section" id="categories">
                    <div className="section-heading">
                        <span>KHÁM PHÁ THEO SỞ THÍCH</span>
                        <h2>Danh mục du lịch</h2>
                    </div>

                    <div className="category-list">
                        {categories.map((category) => (
                            <div className="category-card" key={category.id}>
                                <span>✦</span>
                                <h3>{category.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="section" id="destinations">
                    <div className="section-heading">
                        <span>ĐIỂM ĐẾN NỔI BẬT</span>
                        <h2>Khám phá Việt Nam</h2>
                        <p>
                            Những địa điểm không thể bỏ lỡ
                            trong hành trình của bạn.
                        </p>
                    </div>

                    {loading ? (
                        <p>Đang tải địa điểm du lịch...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className="destination-grid">
                            {destinations.map((place) => (
                                <article
                                    className="destination-card"
                                    key={place.id}
                                >
                                    {place.image && (
                                        <img
                                            src={place.image}
                                            alt={place.name}
                                        />
                                    )}

                                    <div className="destination-info">
                                        <span>
                                            📍 {place.province?.name || place.address}
                                        </span>

                                        <h3>{place.name}</h3>

                                        <p>
                                            {place.description ||
                                                `Khám phá vẻ đẹp và trải nghiệm đặc sắc tại ${place.name}.`}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <section className="cta-section">
                    <h2>Bắt đầu hành trình của bạn</h2>

                    <p>
                        Đăng ký tài khoản để cùng khám phá
                        những điểm đến tuyệt vời.
                    </p>

                    <Link to="/register">
                        Tham gia ngay
                    </Link>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Home;
