import { useContext } from "react";
//context
import { AuthContext } from "../../Contexts/AuthContext";
//------------------------------------------------------------

const useAuth = ()=> {
    return useContext(AuthContext);
}

export default useAuth;