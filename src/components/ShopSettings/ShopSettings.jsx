import { useSelector } from "react-redux";
import "./ShopSettings.css";
import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";

function ShopSettings() {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [postalCode, setPostalcode] = useState(seller && seller.postalCode);

  async function handleImage(e) {
    const file = e.target.files[0];
    setAvatar(file);
  }

  async function updateHandler(e) {
    e.preventDefault();
  }

  return (
    <div className="shopSettingContainer">
      <div className="shopAvatar">
        <img src={seller?.avatar || "placeholder-image-url"} alt="shopAvatar" />

        <input
          type="file"
          id="image"
          className="hidden"
          onChange={handleImage}
        />
        <div className="cameraIcon">
          <AiOutlineCamera
            htmlFor="image"
            className="cameraIcon"
            onClick={() => document.getElementById("image").click()}
          />
        </div>
      </div>
      <div className="shopSettingForm">
        <form onSubmit={updateHandler}>
          <div className="shopName">
            <label>Shop Name</label>
            <input
              type="text"
              required
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="shopDescription">
            <label>Shop Description</label>
            <input
              type="text"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="shopAddress">
            <label>Shop Address</label>
            <input
              type="text"
              required
              placeholder={seller?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="shopPhoneNumber">
            <label>Shop Phone Number</label>
            <input
              type="number"
              required
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="shopPostalCode">
            <label>Shop Postal Code</label>
            <input
              type="number"
              required
              placeholder={seller?.postalCode}
              value={postalCode}
              onChange={(e) => setPostalcode(e.target.value)}
            />
          </div>
          <input required value="Update Shop" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default ShopSettings;
