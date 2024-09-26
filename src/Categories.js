import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const nav = useNavigate();
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
          category: id
        }
      );
  
      let x = response.data;
      console.log("x in category", x);
      setSelectedCategory(x);
  
      if (x.length === 0) {
        // Show SweetAlert if no polls are found
        Swal.fire({
          icon: 'info',
          title: 'No Polls Found',
          text: 'There are no polls available for this category.',
        });
      } else {
        console.log("category with location");
        nav('/HomePage', { state: { x } });
      }
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };
  return (
    <div>
      <div className="laptopcate">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            className="categoryyyyy"
          >
            {category.category_name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
