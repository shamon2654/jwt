import { Box, Button, TextField, Typography } from "@mui/material"
import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();//instance of navigate
  const [formData, setFormData] = useState({
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
    const res = await axios.post("http://localhost:5000/login", {//axios using post the data in data base it like an another mothode of fetch
      email: formData.email,
      password: formData.password
    })
      .catch((error) => {
        console.log(error);
      });
    console.log(res);
    const data = await res.data;//the value store in the response of data
    return data;
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    senderFunction().then(() => { navigate("/home") })//navigate use when we login after that will go home or any page just give the path that page
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
          <Typography variant="h2">Login</Typography>
          
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

export default Login
