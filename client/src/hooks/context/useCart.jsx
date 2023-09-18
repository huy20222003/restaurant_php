//context
import { useContext } from "react";
import {CartContext} from '../../Contexts/CartContext';
//----------------------------------------------------------

const useCart = ()=> {
    return useContext(CartContext);
}

export default useCart;
