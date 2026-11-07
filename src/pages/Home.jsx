import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const destinations = [
    {
        name: "Vịnh Hạ Long",
        location: "Quảng Ninh",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=900"
    },
    {
        name: "Phố cổ Hội An",
        location: "Đà Nẵng",
        image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=900"
    },
    {
        name: "Sa Pa",
        location: "Lào Cai",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900"
    },
    {
        name: "Tràng An",
        location: "Ninh Bình",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900"
    }
];

const categories = [
    "Biển đảo",
    "Núi rừng",
    "Văn hóa – Lịch sử",
    "Danh lam thắng cảnh"
];

function Home() {
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

                    <button onClick={() => {
                        document.getElementById("destinations")
                            ?.scrollIntoView({ behavior: "smooth" });
                    }}>
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
                            <div className="category-card" key={category}>
                                <span>✦</span>
                                <h3>{category}</h3>
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

                    <div className="destination-grid">
                        {destinations.map((place) => (
                            <article
                                className="destination-card"
                                key={place.name}
                            >
                                <img src={place.image} alt={place.name} />

                                <div className="destination-info">
                                    <span>📍 {place.location}</span>
                                    <h3>{place.name}</h3>
                                    <p>
                                        Khám phá vẻ đẹp và trải nghiệm
                                        đặc sắc tại {place.name}.
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
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