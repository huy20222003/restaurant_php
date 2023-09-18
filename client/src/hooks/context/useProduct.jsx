//context
import { useContext } from "react";
import {ProductsContext} from '../../Contexts/ProductsContext';
//----------------------------------------------------------

const useProduct = ()=> {
    return useContext(ProductsContext);
}

export default useProduct;
