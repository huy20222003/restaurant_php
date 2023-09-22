import { useContext } from "react";
//context
import { OrderContext } from "../../Contexts/OrderContext";
//------------------------------------------------------------

const useOrder = ()=> {
    return useContext(OrderContext);
}

export default useOrder;