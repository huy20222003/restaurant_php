import { useContext } from "react";
//context
import { RoleContext } from "../../Contexts/RoleContext";
//------------------------------------------------------------

const useRole = ()=> {
    return useContext(RoleContext);
}

export default useRole;