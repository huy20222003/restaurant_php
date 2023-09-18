//@mui
import { Grid } from "@mui/material";
//component
import CartTable from './CartTable';
import CartSummary from "./CartSummary";

//--------------------------------------------------

const CartSelect = ()=> {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <CartTable />
            </Grid>
            <Grid item xs={12} md={4}>
                <CartSummary />
            </Grid>
        </Grid>
    );
}

export default CartSelect;