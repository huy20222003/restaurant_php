//context
import { useContext } from "react";
import {CommonContext} from '../../Contexts/CommonContext';
//----------------------------------------------------------

const useCommon = ()=> {
    return useContext(CommonContext);
}

export default useCommon;
