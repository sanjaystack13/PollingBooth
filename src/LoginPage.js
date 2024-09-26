// import axios from "axios";
// import React, { useState } from "react";
// import {
//   Button,
//   Card,
//   Col,
//   Container,
//   Form,
//   FormControl,
//   Row,
// } from "react-bootstrap";
// import Swal from "sweetalert2";
// import apiUrl from "./api";
// import { useNavigate } from "react-router-dom";
// import("./Loginpage.css");

// const LoginPage = () => {
//   const navi = useNavigate();
//   const navi2 = useNavigate();
//   const [showphone,setShowphone] = useState()
//   const [details, setDetails] = useState({
//     phone_number: "",
//     password: "",
//   });
// const phoneValid = /^\d{10}$/;

//   const handleChange = (e) => {
//     setDetails((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     sessionStorage.setItem("user", details.phone_number);
//     try {
//       const response = await axios.post(`${apiUrl}/log/loginuser`, details);
//       if (response.status === 200) {
//         const SaveUser = response.data.user;
//         console.log("SaveUser", SaveUser);
//         sessionStorage.setItem("UserData", JSON.stringify(SaveUser));
//         Swal.fire({
//           title: "Good job!",
//           text: "Log in SuccessFully!",
//           icon: "success",
//         });
//         navi("/HomePage");
//       } else {
//         Swal.fire({
//           title: "Oops!",
//           text: "Something went wrong!",
//           icon: "error",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Oops!",
//         text: "An error occurred. Please try again later.",
//         icon: "error",
//       });
//     }
//   };

//   const handleSignup = () => {
//     navi2("/Signup");
//   };

//   const handlePassword = (e) => {
//     navi("/ForgotPassword");
//   };

//   return (
//     <div className="LoginBody">
//       <Container>
//         <Row
//           style={{
//             minHeight: "20vh",
//             paddingLeft: "15vw",
//             paddingTop: "3.8vw",
//             width:'auto'
//           }}
//         >
//           <Col style={{ fontFamily: "sans-serif" }} xs={6} lg={4}>
//           </Col>
//           <Col xs={2} lg={5}></Col>
//           <Col xs={4} lg={3}>
//             <Button onClick={handleSignup} style={{ padding: "5%" }}>
//               Sign up
//             </Button>
//           </Col>
//         </Row>
//         <Row style={{ minHeight: "60vh" }}>
//           <Col lg={3} xs={12}></Col>
//           <Col lg={6} xs={12}>
//             <Card className="Loginpageeee">
//               <h1 style={{ color: "black" }}>LOGIN</h1>
//               <Form.Label className="labellogin">Mobile No:</Form.Label>
//               <FormControl
//                 className="inputpassword"
//                 name="phone_number"
//                 type="text"
//                 value={details.phone_number}
//                 placeholder="Enter Your Mob no"
//                 onChange={handleChange}
//               />
//               <br />
//               <Form.Label className="labellogin">Password:</Form.Label>
//               <FormControl
//                 className="inputpassword"
//                 name="password"
//                 type="password"
//                 value={details.password}
//                 placeholder="Enter your Password"
//                 onChange={handleChange}
//                 required={6}
//                 minLength={6}
//                 maxLength={6}
//               />
//               <br />
//               <Button className="submit" onClick={handleSubmit}>
//                 Login
//               </Button>
//               <br />
//               <br />
//               <button className="forgotpassword" onClick={handlePassword}>
//                 Forgot Password?
//               </button>
//             </Card>
//           </Col>
//           <Col lg={3} xs={12}></Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default LoginPage;
import axios from "axios";
import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  Row,
} from "react-bootstrap";
import Swal from "sweetalert2";
import apiUrl from "./api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Loginpage.css";
import pollimage from "../src/Images/polling.jpg";

const LoginPage = () => {
  const navi = useNavigate();
  const formik = useFormik({
    initialValues: {
      phone_number: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone_number: Yup.string()
        .required("Required field")
        .matches(/^\d{10}$/, "Invalid phone number"),
      password: Yup.string()
        .required("Required field")
        .min(6, "Password must be at least 6 characters long"),
    }),
    onSubmit: async (values) => {
      sessionStorage.setItem("user", values.phone_number);
      try {
        const response = await axios.post(`${apiUrl}/log/loginuser`, values);
        if (response.status === 200) {
          const SaveUser = response.data.user;
          console.log("SaveUser", SaveUser);
          sessionStorage.setItem("UserData", JSON.stringify(SaveUser));
          Swal.fire({
            title: "Good job!",
            text: "Log in successfully!",
            icon: "success",
          });
          navi("/HomePage");
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
    },
  });

  const handleSignup = () => {
    navi("/Signup");
  };

  const handlePassword = () => {
    navi("/ForgotPassword");
  };

  return (
    <div className="LoginBody">
      <Container>
        <Row>
          <Col lg={4} xs={12}>
            <img src={pollimage}></img>
          </Col>
          <Col>
            <Row
              style={{
                minHeight: "20vh",
                paddingLeft: "15vw",
                paddingTop: "3.8vw",
                width: "auto",
              }}
            >
              <Col style={{ fontFamily: "sans-serif" }} xs={6} lg={4}></Col>
              <Col xs={2} lg={5}></Col>
              <Col xs={4} lg={3}>
                <Button
                  onClick={handleSignup}
                  style={{
                    padding: "5%",
                    background: "black",
                    color: "white",
                    border: "black",
                  }}
                >
                  Sign up
                </Button>
              </Col>
            </Row>
            <Row style={{ minHeight: "60vh" }}>
              <Col lg={3} xs={12}></Col>
              <Col lg={6} xs={12}>
                <Card className="Loginpageeee">
                  <h1 style={{ color: "white" }}>LOGIN</h1>
                  <h6 style={{ marginLeft: "-130px", paddingTop: "20px" }}>
                    Phone no:
                  </h6>
                  <FormControl
                    className="inputpassword"
                    name="phone_number"
                    type="text"
                    value={formik.values.phone_number}
                    placeholder="Enter Your Mob no"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone_number &&
                    formik.errors.phone_number && (
                      <div style={{ color: "red" }} className="error-message">
                        {formik.errors.phone_number}
                      </div>
                    )}
                  <br />
                  <h6 style={{ marginLeft: "-130px" }}>Password:</h6>
                  <FormControl
                    className="inputpassword"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    placeholder="Enter your Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required={6}
                    minLength={6}
                    maxLength={6}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div style={{ color: "red" }} className="error-message">
                      {formik.errors.password}
                    </div>
                  )}
                  <br />
                  <Button className="submit" onClick={formik.handleSubmit}>
                    Login
                  </Button>
                  <br />
                  <br />
                  <button className="forgotpassword" onClick={handlePassword}>
                    Forgot Password?
                  </button>
                </Card>
              </Col>
              <Col lg={8} xs={12}></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
