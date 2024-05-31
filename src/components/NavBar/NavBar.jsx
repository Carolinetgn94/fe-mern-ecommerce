import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile} from "react-icons/cg";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar () {
    return(
        <div className="nav-items">
            <Link to="/">
            <h3 className="home-link">Home</h3>
            </Link>
            <Link to="/products">
            <h3 className="products-link">Products</h3>
            </Link>
            <Link to="/faq">
            <h3 className="FAQ-link">FAQ</h3>
            </Link>
            <div className="wishlist">
                <AiOutlineHeart size={30} />
                <span className="wishcount">1</span>
            </div>
            <div className="shoppingcart">
                <AiOutlineShoppingCart size={30} />
                <span className="cartcount">1</span>
            </div>
            <div className="profile">
                <Link to="/login">
                <CgProfile size={30} />
                </Link>
            </div>
        </div>
    )
}

export default NavBar;