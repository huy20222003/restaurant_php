import { useContext } from "react";
//context
import { EmployeesContext } from "../../Contexts/EmployeesContext";
//------------------------------------------------------------

const useEmployee = ()=> {
    return useContext(EmployeesContext);
}

export default useEmployee;