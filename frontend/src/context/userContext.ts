import { createContext } from "react";
import { User } from "../types/auth.types";

export type UserContextType = {
    user:User|null,
    setUser:React.Dispatch<React.SetStateAction<User | null>>
}
const UserContext = createContext<UserContextType|null>(null);

export default UserContext;