import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw Error("The auth context  is not available")
    }
    return context 
}