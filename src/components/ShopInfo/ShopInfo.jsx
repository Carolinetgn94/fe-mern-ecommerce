import { useDispatch, useSelector } from "react-redux";
import "./ShopInfo.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { beServer } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getAllProductsShop } from "../../redux/actions/product.action";
import { CgProfile } from "react-icons/cg";

function ShopInfo({ isOwner }) {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
  }, []);

  async function logoutHandler() {
    try {
      const response = await axios.get(`${beServer}/shop/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/shop-login", { replace: true }); 
        window.location.reload(); 
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  }

  return (
    <div className="shopInfoContainer">
      <div className="shopInfoHeader">
        <div className="shopInfoTitle">
          <h2>Hello, {seller.name}</h2>
        </div>
        <div className="dashboardAvatar">
          {seller?.avatar ? (
            <img
              src={seller.avatar}
              alt={seller.name}
              className="dashboardAvatarImg"
            />
          ) : (
            <CgProfile className="icon" size={30} />
          )}
        </div>
        <div className="shopInfoDescription">
          <p>{seller.description}</p>
        </div>
      </div>
      <div className="shopInfoDetails">
        <div className="shopInfo">
          <h5>Address</h5>
          <h4>{seller.address}</h4>
        </div>
        <div className="shopInfo">
          <h5>Phone Number</h5>
          <h4>{seller.phoneNumber}</h4>
        </div>
        <div className="shopInfo">
          <h5>Total Products</h5>
          <h4>{products && products.length}</h4>
        </div>
        <div className="shopInfo">
          <h5>Joined On</h5>
          <h4>{seller.createdAt?.slice(0, 10)}</h4>
        </div>
      </div>
      {isOwner && (
        <div className="buttons">
          <Link to="/settings">
            <button className="editButton">Edit Shop</button>
          </Link>

          <button className="logOutButton" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ShopInfo;
