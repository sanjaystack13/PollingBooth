import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiUrl from "./api";
import Swal from "sweetalert2";
import { Card, Col, Container, FormControl, Row } from "react-bootstrap";

const VerifyOtpPassword = () => {
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const p = sessionStorage.getItem("UserPhone");
  const navigate = useNavigate();
  const location = useLocation()
  console.log(location?.state?.x)

  const handleChangeconfirm = (e) => {
    setConfirmpassword(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/updateuser`, {
        identifier: p,
        password: password,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Good job!",
          text: "Your password has been reset successfully!",
          icon: "success",
        });
        navigate("/");
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong!",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "An error occurred. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Container fluid className="bodyyy">
        <Row style={{ height: "20vh" }}></Row>
        <Row style={{ height: "60vh" }}>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card className="Loginpageeee">
              <label>
                <b style={{color:"white"}}> Password:</b>
              </label>
              <FormControl
                className="mobinputpass"
                type="number"
                value={password}
                onChange={handleChangePassword}
                required={6}
                minLength={6}
                maxLength={6}
              />
              <br />
              <label>
                <b style={{color:"white"}}>Confirm Password:</b>
              </label>
              <FormControl
                type="number"
                name="confirmpassword"
                value={confirmpassword}
                onChange={handleChangeconfirm}
                required={6}
                minLength={6}
                maxLength={6}
              />
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{ background: "grey", color: "white" }}
                  onClick={()=>handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </Card>
          </Col>
          <Col lg={3}></Col>
        </Row>
        <Row style={{ height: "20vh" }}></Row>
      </Container>
    </div>
  );
};

export default VerifyOtpPassword;
