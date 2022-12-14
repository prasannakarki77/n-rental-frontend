import axios from "axios";
import { useEffect, useState } from "react";
import user_icon from "../images/user_icon.png";
import "../styles/profile.scss";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail, MdAddPhotoAlternate } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import UpdateProfile from "../components-user/UpdateProfile";
import UpdateProfileImage from "../components-user/UpdateProfileImage";
import UpdatePasswordForm from "../components-user/UpdatePasswordForm";

const Profile = () => {
  const [updateForm, setUpdateFormShow] = useState(false);
  const [imageUpdate, setImageUpdate] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const [profile, setProfile] = useState([]);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  };
  useEffect(() => {
    axios
      .get("http://localhost:90/user/dashboard", config)
      .then((res) => {
        setProfile(res.data);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const updateHandler = () => {
    setUpdateFormShow(true);
  };
  const imageUpdateHandler = () => {
    setImageUpdate(true);
  };
  const passwordUpdateHandler = () => {
    setPasswordUpdate(true);
  };

  return (
    <>
      <div className="profile">
        <UpdateProfile
          show={updateForm}
          onHide={() => setUpdateFormShow(false)}
          profile={profile}
        />

        <UpdateProfileImage
          show={imageUpdate}
          onHide={() => setImageUpdate(false)}
          profile={profile}
        />
        <UpdatePasswordForm
          show={passwordUpdate}
          onHide={() => setPasswordUpdate(false)}
        />
        <div className="profile__image">
          <MdAddPhotoAlternate onClick={imageUpdateHandler} />
          {}
          <img
            src={
              profile.profile_img
                ? `http://localhost:90/${profile.profile_img}`
                : user_icon
            }
            alt="profile_image"
          />
        </div>
        <div className="profile__details container">
          <p>Profile</p>

          <div className="profile__detail">
            <p className="profile__detail--label">Username</p>
            <p className="profile__detail--value">
              {" "}
              <FaUserAlt className="me-2" />
              {profile.username}
            </p>
          </div>
          <div className="row">
            <div className="profile__detail col-md-6">
              <p className="profile__detail--label">Firstname</p>
              <p className="profile__detail--value">
                {" "}
                <FaUserAlt className="me-2" />
                {profile.firstname ? profile.firstname : "----------"}
              </p>
            </div>
            <div className="profile__detail col-md-6">
              <p className="profile__detail--label">Lastname</p>
              <p className="profile__detail--value">
                <FaUserAlt className="me-2" />{" "}
                {profile.lastname ? profile.lastname : "----------"}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="profile__detail col-md-6">
              <p className="profile__detail--label">Address</p>
              <p className="profile__detail--value">
                <FaUserAlt className="me-2" />{" "}
                {profile.address ? profile.address : "----------"}
              </p>
            </div>
            <div className="profile__detail col-md-6">
              <p className="profile__detail--label">Gender</p>
              <p className="profile__detail--value">
                <FaUserAlt className="me-2" />{" "}
                {profile.gender ? profile.gender : "----------"}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="profile__detail col-md-6">
              <p className="profile__detail--label">Email</p>
              <p className="profile__detail--value">
                <MdEmail className="me-2" />{" "}
                {profile.email ? profile.email : "----------"}
              </p>
            </div>
            <div className="profile__detail col-md-6">
              <p className="profile__detail--label">Phone</p>
              <p className="profile__detail--value">
                <BsTelephoneFill className="me-2" />{" "}
                {profile.phone ? profile.phone : "----------"}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {" "}
              <button
                className="btn btn-primary me-2 profile__btn"
                onClick={updateHandler}
              >
                {" "}
                Update Profile
              </button>
            </div>
            <div className="col-md-6">
              {" "}
              <button
                onClick={passwordUpdateHandler}
                className="btn btn-danger profile__btn"
              >
                {" "}
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
