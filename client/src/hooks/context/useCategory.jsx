//context
import { useContext } from "react";
import {CategoryContext} from '../../Contexts/CategoryContext';
//----------------------------------------------------------

const useCategory = ()=> {
    return useContext(CategoryContext);
}

export default useCategory;
