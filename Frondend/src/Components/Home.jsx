import axios from 'axios';
import React, { useEffect, useState } from 'react'

axios.defaults.withCredentials = true;//checking   

const Home = () => {
    const [user, setUser] = useState();
    const passRequest = async() => {
        const res = await axios.get("http://localhost:5000/verify", {
            withCredentials: true,//clinet side verification 
        }).catch((error) => console.log(error))
        console.log(res)
        const data = await res.data;
        console.log(data)
        return data;  
    }
    useEffect(() => {
        passRequest().then((data) => setUser(data));
    },[])
  return (
    <div style={{ margin: "75px" }}>
    helo
    </div>
  )
}

export default Home
