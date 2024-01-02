import { Box, Button, TextField, Typography } from "@mui/material"
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev, //spread operator is often used in combination with destructuring.or copy of object eg:...prev using to create exact copy of formData object
      [e.target.name]: e.target.value,
    }))
  }
  console.log(formData)
  const senderFunction = async () => {//backend fetching
    const res = await axios.post("http://localhost:5000/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password
    })
      .catch((error) => {
        console.log(error);
      });
    console.log(res);
    const data = await res.data;
    return data;
  }
 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    senderFunction().then(()=>{navigate("/login")})
  }
  return (
    <div style={{ margin: "75px" }}>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          marginLeft="auto"
          flexDirection="column"
          width="300px"
          marginRight="auto"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">SignUp</Typography>
          <TextField
            type="text"
            variant="outlined"
            placeholder="Name"
            margin="normal"
            onChange={handleChange}
            name="name"
          />
          <TextField
            type="email"
            variant="outlined"
            placeholder="Email"
            margin="normal"
            onChange={handleChange}
            name="email"
          />
          <TextField
            type="password"
            variant="outlined"
            placeholder="Password"
            margin="normal"
            onChange={handleChange}
            name="password"
          />
          <Button variant="contained" type="submit">
            SignUp
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default SignUp
