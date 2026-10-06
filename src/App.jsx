import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/footer/footer.jsx";
import Cart from "./pages/cart/Cart";
import Home from "./Home";
import Menu from "./pages/menu/Menu";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import Reviews from "./pages/reviews/Reviews";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import Checkout from "./pages/checkout/Checkout";
import OrderSuccess from "./pages/order-success/OrderSuccess";
import Orders from "./pages/orders/Orders";
import ProductDetails from "./pages/product-details/ProductDetails";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product" element={<ProductDetails />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;