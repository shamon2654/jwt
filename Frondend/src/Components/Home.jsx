import axios from 'axios';
import React, { useEffect, useState } from 'react'

axios.defaults.withCredentials = true;//checking   

const Home = () => {
  const [user, setUser] = useState();
  let flag=true
  const refreshToken = async () => {//refresh token seting
    const response = await axios.get("http://localhost:5000/refreshTok", {
      withCredentials: true,
    }).catch((error) => console.log(error))
    const data = await response.json();
    console.log(data)
    return data
    }
    const passRequest = async() => {
        const res = await axios.get("http://localhost:5000/verify", {
            withCredentials: true,//clinet side verification 
        }).catch((error) => console.log(error))
        const data = await res.data;
        return data;  
    }
  useEffect(() => {
    if (flag) {
      flag = false;
        passRequest().then((data) => setUser(data));
    }
    let interval = setInterval(() => {
      refreshToken().then((data)=>setUser(data))
    }, 1000 * 30)
    return ()=>clearInterval(interval)
    },[])
  return (
    <div style={{ margin: "75px" }}>
    helo
    </div>
  )
}

export default Home
