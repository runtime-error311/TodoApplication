import { useState,useEffect, ReactNode } from "react";
import UserContext from "./userContext"; 
import { me } from "../services/authServices";
import { useMemo } from "react";
import { User } from "../types/auth.types";

type Props= {
  children:ReactNode
}
function UserContextProvider({ children }:Props) {
  const [user, setUser] = useState<User|null>(null);
  const value = useMemo(()=>({user,setUser}),[user])
    useEffect(()=>{
      const checkAuth = async()=>{
        try{
          const result = await me();
          setUser(result?.data?.data.user);
        }
        catch(err){
          console.error(err);
          setUser(null);  
        }
      }
        checkAuth();
    },[])
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;