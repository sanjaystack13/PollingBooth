import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  Col,
  FormControl,
  NavDropdown,
  Offcanvas,
  Row,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Topnavbar = () => {
  const [data, setData] = useState("");
  const [result,setResult] = useState([])
  const [currentUser, setCurrentUser] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [search,setSearch]= useState()
  const nav = useNavigate();
  const nav2 = useNavigate()
  const navsearch = useNavigate()


  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await axios.post("http://localhost:5000/polls/search", {
          query: search
        });
        const searchdata = response.data.poll_ids;
        if(search){
          setResult(searchdata);
        }
        else{
          setResult("")
        }
      } catch (error) {
        console.error("Error fetching Search:", error);
      }
    };
  
    fetchSearch();
  },[search]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/category/getall"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/polls/getbycategory",
        {
          category: id,
        }
      );
      let x = response.data;
      console.log("x in category", x);
      setSelectedCategory(x);
      console.log("category with location");
      nav("/HomePage", { state: { x } });
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  useEffect(() => {
    const getUser = () => {
      const userData = sessionStorage.getItem("UserData");
      console.log(userData)
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setCurrentUser(parsedUserData._id);
        setData(parsedUserData.user_name);
      }
    };
    getUser();
  }, []);
  const [trendingpolls, setTrendingpolls] = useState([]);
  useEffect(() => {
    const trend = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/polls/top3",
          trendingpolls
        );
        const final = response.data;
        if (final) {
          setTrendingpolls(final);
        }
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };
    trend();
  }, []);
  console.log(trendingpolls);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClear = ()=>{
    sessionStorage.clear()
    // nav2('/')
    // Swal.fire(
    //   'Logged out!',
    //   'You have been logged out.',
    //   'success'
    // )
  }
  return (
    <Container fluid
      style={{height: "10vh",position: "fixed",top: "0",backgroundColor: "transparent",color: "black",}}
      className="topnavbar-fixed ">
        <center>
      <div className="TopnavbarLaptop">
        <Row>
        <Navbar expand="lg">
          <Container fluid>
            <Navbar.Brand style={{color:'black',paddingLeft:'20px'}} href="#home">POLLING BOOTH</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <FormControl
                    style={{ width: "100%",marginLeft: "250px" }}
                    placeholder="Search"
                    onChange={(e) => {
                      setSearch(e.target.value); // Update the search state
                      navsearch('/HomePage', { state: { search: e.target.value } }); // Navigate to '/HomePage' with the search value in state
                    }}
                    value={search}
                  ></FormControl>
                </Nav.Link>
                <Nav.Link style={{width:'auto'}}>
                  <h5 style={{ marginLeft: "300px", color:'black',paddingTop:'10px' }}>
                    Welcome {data ? `${data}` : `guest`}!!
                  </h5>
                </Nav.Link>
                <Nav.Link style={{width:'auto'}}>
                <Button onClick={handleClear} style={{ marginLeft: "200px" }}>Logout</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </Row>
      </div>
      </center>

      <div className="MobileTopnavbar">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand className="Pollingboothtitle" href="#home">
              POLLING BOOTH
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={handleShow}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav>
                    <FormControl
                      style={{ width: "100%" }}
                      placeholder="Search"
                    />
                    <Nav.Link>
                      <h2 className="welcome-message">
                        Welcome {data ? `${data}` : `guest`}!!
                      </h2>
                    </Nav.Link>
                    <Nav.Link href="/Homepage">POLL LIST</Nav.Link>
                    <Nav.Link href="/Addpoll">ADD POLL</Nav.Link>
                    <Nav.Link href="#link">VOTED POLLS</Nav.Link>
                    <Nav.Link href="/ProfilePage">USER DETAILS</Nav.Link>
                  </Nav>
                  <h1>TRENDING POLLS</h1>
                  <br />
                  {trendingpolls?.map((polls, index) => (
                    <>
                      <Card className="cardtrendingpolls" key={index}>
                        <b>{polls.question}</b>
                        <i class="bi bi-person">{polls.totalVotes}Voters</i>
                        <i class="bi bi-heart">{polls.totalLikes}Likes</i>
                      </Card>
                    </>
                  ))}
                  <div className="button-grid">
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        onClick={() => handleCategoryClick(category._id)}
                        style={{
                          height: "50px",
                          color: "#fff",
                          border: "none",
                          background: "black",
                          borderRadius: "5px",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                      >
                        {category.category_name}
                      </button>
                    ))}
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </Container>
  );
};

export default Topnavbar;
