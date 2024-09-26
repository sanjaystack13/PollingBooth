import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import HomePage from "./HomePage";
import "./ProfilePage.css";
import profileimg from "../src/Images/png-transparent-user-profile-computer-icons-login-user-avatars.png";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [currentuser, setCurrentUser] = useState("");
  const [data, setData] = useState({});
  const [phonenumber, setPhonenumber] = useState();
  const [createdpolls, setCreatedpolls] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [likees, setLikes] = useState([]);
  const [likedpolls, setLikedpolls] = useState([]);
  const [votedpolls, setVotedpolls] = useState([]);
  const location = useLocation();
  const [isvisible, setIsvisible] = useState();
  const [imagedata, setImagedata] = useState();
  const [view, setView] = useState(false);
  const [createView, setCreateView] = useState(false);
  const [likedView, setLikedView] = useState(false);
  const [votedView, setVotedView] = useState(false);

  useEffect(() => {
    const userdata = sessionStorage.getItem("UserData");
    if (userdata) {
      const parsedUserData = JSON.parse(userdata);
      setCurrentUser(parsedUserData._id);
      const fetchUserInfo = async (userId) => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/getProfile",
            {
              user_id: userId,
              current_user: parsedUserData._id,
            }
          );
          const profileData = response.data.user;
          setData(profileData);
          setCreatedpolls(profileData.created_polls || []);
          setFollowers(profileData.user_followers || []);
          setFollowing(profileData.user_following || []);
          setLikedpolls(profileData.liked_polls || []);
          setVotedpolls(profileData.voted_polls || []);
          setLikes(profileData.user_likers || []);
          setPhonenumber(profileData.user.phone_number || []);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };

      const userIdToFetch = location?.state?.userId || parsedUserData?._id;
      fetchUserInfo(userIdToFetch);
    }
  }, [location]);

  const imageUploader = (image) => {
    setImagedata(image);
  };

  const profileUpload = async (image) => {
    try {
      const formdata = new FormData();
      formdata.append("profile", image);

      const response = await axios.post(
        "http://localhost:5000/api/uploadprofile",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrl = response.data.profile;
      return imageUrl;
    } catch (error) {
      console.error("Error uploading profile image", error);
    }
  };
  //  const handleProfile = async (phone)=>{
  //   const response = await axios.post("http://localhost:5000/api/updateuser",{
  //     identifier: phone,
  //     user_profile: "",
  //   })
  //   if (response.status === 200) {
  //     Swal.fire({
  //       title: "Success",
  //       text: "Image Uploaded Successfully",
  //       icon: "success",
  //     });
  //   } else {
  //     Swal.fire({
  //       title: "Error",
  //       text: "Image Not Uploaded",
  //       icon: "error",
  //     });
  //   }
  //  }
  const handleEdit = async (phone) => {
    try {
      const imageUrlProfile = await profileUpload(imagedata);
      const response = await axios.post(
        "http://localhost:5000/api/updateuser",
        {
          identifier: phone,
          user_profile: imageUrlProfile,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Image Uploaded Successfully",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Image Not Uploaded",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error",
      });
    }
  };

  const imageview = () => {
    setView(!view);
  };
  console.log(phonenumber);
  const handleView = () => {
    setCreateView(!createView);
  };
  const handleLikedView = () => {
    setLikedView(!likedView);
  };
  const handleVotedView = () => {
    setVotedView(!votedView);
  };
  return (
    <div>
      <Card
        className="cardprofilepage"
        style={{ marginTop: "50px", paddingTop: "20px" }}
      >
        <Container>
          <Card className="carduserdetails">
            <div style={{ display: "flex" }}>
              <img
                style={{
                  height: "70px",
                  width: "70px",
                  padding: "10px",
                  borderRadius: "35px",
                }}
                src={`http://localhost:5000${data?.user_profile}`}
              ></img>
              <h5 style={{ paddingTop: "20px", paddingLeft: "10px" }}>
                <b style={{ color: "black" }}> USERNAME: </b>
                <b style={{ paddingLeft: "10px", color: "black" }}>
                  {data?.user_name}
                </b>
              </h5>
              <br />
            </div>
            {currentuser === data?._id && (
              <div>
                <i
                  style={{
                    color: "black",
                    paddingLeft: "10px",
                    paddingBottom: "10px",
                  }}
                  onClick={imageview}
                  className="bbi bi-camera-fill"
                >
                  <b style={{ paddingLeft: "10px" }}>Change Profile</b>
                </i>

                {view && (
                  <>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      name="user_profile"
                      onChange={(e) => imageUploader(e.target.files[0])}
                      required
                    />
                    <Button
                      onClick={() => handleEdit(data?.phone_number)} // Ensure `phone_number` is properly defined and available
                      style={{ marginTop: "10px" }}
                    >
                      Upload
                    </Button>
                  </>
                )}
              </div>
            )}
            <div style={{ padding: "20px" }}>
              <Row>
                <Col lg={4}>
                  <Card style={{ padding: "10px" }}>
                    <h6 style={{ paddingRight: "30px" }}>
                      <h5
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        Followers:{" "}
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        {followers?.length}
                      </div>
                    </h6>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card style={{ padding: "10px" }}>
                    <h6
                      style={{
                        paddingRight: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        Following:
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        {following?.length}
                      </div>
                    </h6>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card style={{ padding: "10px" }}>
                    <h6 style={{ paddingRight: "30px" }}>
                      <h5
                        className="polls"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Created:
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        {createdpolls?.length}
                      </div>
                    </h6>
                  </Card>
                </Col>
              </Row>
            </div>
          </Card>
        </Container>
        <Row>
          <Button
            className="CreatedPolls"
            onClick={handleView}
            style={{ paddingTop: "20px" }}
          >
            <h3>{createView ? "Created Polls" : "Created Polls"}</h3>
          </Button>
          <div style={{ marginTop: "20px" }}>
            {createView && <HomePage createdpolls={createdpolls} />}
          </div>
          <Button
            className="CreatedPolls"
            onClick={handleLikedView}
            style={{ paddingTop: "20px" }}
          >
            <h3>{likedView ? "Liked Polls" : "Liked Polls"}</h3>
          </Button>
          <div style={{ marginTop: "20px" }}>
            {likedView && <HomePage createdpolls={likedpolls} />}
          </div>
          <Button
            className="CreatedPolls"
            onClick={handleVotedView}
            style={{ paddingTop: "20px" }}
          >
            <h3>{votedView ? "Voted Polls" : "Voted Polls"}</h3>
          </Button>
          <div style={{ marginTop: "20px" }}>
            {votedView && <HomePage createdpolls={votedpolls} />}
          </div>
        </Row>
      </Card>
    </div>
  );
};

export default ProfilePage;
