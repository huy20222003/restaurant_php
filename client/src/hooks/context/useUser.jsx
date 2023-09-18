//context
import { useContext } from "react";
import {UsersContext} from '../../Contexts/UsersContext';
//----------------------------------------------------------

const useUser = ()=> {
    return useContext(UsersContext);
}

export default useUser;
