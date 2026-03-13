import { useState } from "react";
import UserContext from "./userContext"; 
import { useEffect } from "react";
import { me } from "../services/authServices";


function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

    useEffect(()=>{
      const checkAuth = async()=>{
        try{
          const result = await me();
          console.log(result?.data?.data)
          setUser(result?.data?.data);
        }
        catch(err){
          console.log(err);
          setUser(null);  
        }
      }
      
      // setInterval(()=>{ 
        checkAuth();
      // },[60000]);
      
    },[])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;