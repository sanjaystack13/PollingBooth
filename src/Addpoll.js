import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Addpoll = () => {
  const [addpoll, setAddpoll] = useState({
    question: "",
    options: [{ option: "" }, { option: "" }],
    duration: "",
    category: "",
    createdBy: "",
  });
  const nav = useNavigate();
  const [categories, setCategories] = useState([]);
  const [currentuser, setCurrentuser] = useState("");
  const location = useLocation();
  const navigate = useNavigate()
  const edit = location?.state?.item;
  console.log("edit", edit);
  useEffect(() => {
    const getUser = () => {
      const userData = sessionStorage.getItem("UserData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setCurrentuser(parsedUserData._id);
      }
      if (edit != null) {
        setAddpoll({
          question: edit.question,
          options: edit.options,
          duration: edit.duration,
          category: edit.category,
          createdBy: edit.createdBy,
        });
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/category/getall"
        );
        const allcategories = response.data;
        setCategories(allcategories);
        if (allcategories.length > 0) {
          setAddpoll((prev) => ({
            ...prev,
            category: allcategories[0]._id, // Set the first category as default
          }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getUser();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setAddpoll((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOptionChange = (index, value) => {
    const newOptions = [...addpoll.options]; // Create a copy of the options array
    newOptions[index] = { option: value }; // Update the option at the specified index
    setAddpoll((prev) => ({
      ...prev,
      options: newOptions, // Set the updated options array
    }));
  };

  const handleAddOption = () => {
    setAddpoll((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const handleRemoveOption = (index) => {
    setAddpoll((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = async (e) => {
    try {
      if (edit) {
        const response = await axios.post(
          "http://localhost:5000/polls/update",
          {
poll_id: edit._id,...addpoll,});
        console.log(response.data);
        if(response.status===200){
          navigate("/HomePage")
          Swal.fire({
            title: "Success!",
            text: "Poll Updated successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          setAddpoll({
            question: "",
            options: [{ option: "" }, { option: "" }],
            duration: "",
            category: "",
            createdBy: currentuser,
          });
          location.state.item = null;
        }
       
      } else {
        const pollData = {
          ...addpoll,
          createdBy: currentuser,
          options: addpoll.options.map((option) => ({ option: option.option })),
        };
        console.log(pollData);
        e.preventDefault();
        try {
          const response = await axios.post(
            "http://localhost:5000/polls/create",
            pollData
          );
          if (response.status === 201) {
            nav("/Homepage");
            Swal.fire({
              title: "Success!",
              text: "Poll Created successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
            setAddpoll({
              question: "",
              options: [{ option: "" }, { option: "" }],
              duration: "",
              category: "",
              createdBy: null,
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an issue creating the poll",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {}
  };
  return (
    <div className="addpollbg">
      <Container fluid >
        <Row >
          <Col  style={{color:'black'}}><h4>CREATE YOUR POLL</h4></Col>
        </Row>
        <Row className="justify-content-center">
          <Card className="p-4 shadow" style={{ background: "lightblue",color:'black' }}>
            <FormLabel style={{color:'black'}} className="d-block mb-2">
              <i class="bi bi-emoji-laughing-fill">
              <b style={{paddingLeft:'7px'}}>Choose Your Category:</b>
              </i>
            </FormLabel>
            <select
              name="category"
              value={addpoll.category}
              onChange={handleChange}
              className="form-control mb-3"
              style={{ width: "100%" }}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
            </select>

            <FormLabel style={{color:'black'}} className="d-block mb-2">
            <i class="bi bi-question-circle">
            <b style={{paddingLeft:'7px'}}>Create  a Question:</b>

            </i>
            </FormLabel>
            <FormControl
              name="question"
              type="text"
              value={addpoll.question}
              onChange={handleChange}
              className="mb-3"
              style={{ height: "100px", background: "white" }}
              placeholder="Type a Question"
            />

            {addpoll.options.map((option, index) => (
              <div key={index} className="mb-3">
                <FormControl
                  name="options"
                  value={option.option}
                  type="text"
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="mb-2"
                  style={{ background: "white" }}
                  placeholder={`Option ${index + 1}`}
                />
                {addpoll.options.length > 2 && (
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Remove Option
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="primary"
              onClick={handleAddOption}
              className="mb-3"
            >
              Add Option
            </Button>

            <FormLabel style={{color:'black'}} className="d-block mb-2">
            <i class="bi bi-hourglass-split" >
            <b style={{paddingLeft:'7px'}}> Set Duration:</b>
            </i>
            </FormLabel>
            <FormControl
              name="duration"
              value={addpoll.duration}
              onChange={handleChange}
              className="mb-3"
              style={{ backgroundColor: "white" }}
              placeholder="Enter duration"
            />
            <center>
              <Button variant="primary" onClick={handleSubmit}>
                {edit ? "Update" : "Create"}
              </Button>
            </center>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default Addpoll;
