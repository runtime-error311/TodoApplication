import { useState } from "react";
import UserContext from "./userContext"; 
import { useEffect } from "react";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

    useEffect(()=>{
        const checkAuth = async()=>{
            try{
                const result = await axios.get(VITE_API_URL+'me',{withCredentials:true});
                // toast.success(result.data.message);
                console.log(result.data.data)
                setUser(result.data.data);
            }
            catch(err){
                console.log(err);
                // toast.error(err.data.message);
                setUser(null);
                
                
            }
        }
        checkAuth();
    },[])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;