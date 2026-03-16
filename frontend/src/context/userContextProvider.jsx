import { useState,useEffect } from "react";
import UserContext from "./userContext"; 
import { me } from "../services/authServices";
import { useMemo } from "react";


function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(()=>({user,setUser}),[user])
    useEffect(()=>{
      const checkAuth = async()=>{
        try{
          const result = await me();
          setUser(result?.data?.data);
        }
        catch(err){
          console.error(err);
          setUser(null);  
        }
      }
      
      // setInterval(()=>{ 
        checkAuth();
      // },[60000]);
      
    },[])
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;