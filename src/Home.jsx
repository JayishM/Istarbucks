import Navbar from "./components/navbar/navbar.jsx";
import Hero from "./components/hero/hero.jsx";
import Trending from "./components/trending/trending.jsx";
import WhyChoose from "./components/whyChoose/whyChoose.jsx";
import About from "./components/about/about.jsx";
import Reviews from "./components/reviews/reviews.jsx";
import OrderCTA from "./components/orderCTA/orderCTA.jsx";
import Footer from "./components/footer/footer.jsx";
import "./App.css";

function App() {
    return (
        <div className="page">
            

            <Hero />

            <div className="section-title d-flex align-items-center gap-3">
                <hr className="flex-grow-1" />
                <h5 className="mb-0 text-nowrap">Our Popular Drinks</h5>
                <hr className="flex-grow-1" />
            </div>

            <Trending />
            <WhyChoose />
            <About />
            <Reviews />
            <OrderCTA />
        </div>
    );
}

export default App;