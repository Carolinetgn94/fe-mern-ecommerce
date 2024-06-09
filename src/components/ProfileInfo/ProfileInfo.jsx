import { useDispatch, useSelector } from "react-redux";
import "./ProfileInfo.css";
import React, { useEffect, useState } from "react";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { updatUserAddress, updateUserInformation } from "../../redux/actions/user.action";
import { toast } from "react-toastify";
import axios from "axios";
import { beServer } from "../../server";
import { RxCross1 } from "react-icons/rx";
import { Country } from "country-state-city";

function ProfileInfo({ active }) {
  const { user, error, updateAddressSuccessMessage} = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState(user && user.email);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateAddressSuccessMessage) {
      toast.success(updateAddressSuccessMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, updateAddressSuccessMessage]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
    toast.success("Information updated!");
  }

  async function handleImage(e) {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${beServer}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  return (
    <div className="contentContainer">
      {active === 1 && (
        <div className="profileSection">
          <div className="profilePic">
            <img src={user?.avatar || "placeholder-image-url"} alt="Profile" />
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <AiOutlineCamera
              htmlFor="image"
              className="cameraIcon"
              onClick={() => document.getElementById("image").click()}
            />
          </div>
          <div className="profileForm">
            <form onSubmit={handleSubmit}>
              <div className="profileName">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="profileEmail">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="profilePhoneNumber">
                <label htmlFor="number">Phone Number</label>
                <input
                  type="number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="insertPassword">
                <label>Enter Your Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input required value="Update" type="submit" />
            </form>
          </div>
        </div>
      )}

      {active === 2 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
}

function Address() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];


  async function handleSubmit(e) {
    e.preventDefault();

    if (country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          postalCode,
          addressType,
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setPostalCode(null);
      setAddressType("");
    }
  }

  return (
    <div className="addressContent">
      {open && (
        <div className="createAddressForm">
          <div className="formContainer">
            <div className="closeForm">
              <RxCross1 size={30} onClick={() => setOpen(false)} />
            </div>
            <div>
              <h1>Add New Address</h1>
            </div>
            <>
              <form onSubmit={handleSubmit}>
                <div className="newAddressInfo">
                  <label>Country</label>
                  <select
                    name=""
                    id=""
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Choose Your Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option
                          className="block pb-2"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="newAddressInfo">
                  <label>City</label>
                  <input
                    type="city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="newAddressInfo">
                  <label>Address 1</label>
                  <input
                    type="address"
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="newAddressInfo">
                  <label>Address 2</label>
                  <input
                    type="address"
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
                <div className="newAddressInfo">
                  <label>Postal Code</label>
                  <input
                    type="number"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <div className="newAddressInfo">
                  <label>Address Type</label>
                  <select
                    name=""
                    id=""
                    value={addressType}
                    onChange={(e) => setAddressType(e.target.value)}
                  >
                    <option value="">Choose Address Type</option>
                    {addressTypeData &&
                      addressTypeData.map((item) => (
                        <option
                          key={item.name}
                          value={item.name}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="submitNewAddressButton">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </>
          </div>
        </div>
      )}

      <div className="headerRow">
        <div className="addressTitle">
          <h1>My Addresses</h1>
        </div>
        <div className="addAddressButton" onClick={() => setOpen(true)}>
          <button>Add New</button>
        </div>
      </div>

      <div className="defaultAddress">
        <h5>Default Address</h5>
        <h6>pasir ris st 32</h6>
        <div>
          <AiOutlineDelete size={25} />
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
