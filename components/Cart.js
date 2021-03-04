import { Grid, Button } from "@material-ui/core";
import { useContext } from "react"
import { CartContext } from "./CartContext"
import Image from 'next/image'
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export const Cart = () => {
    const [cart, setCart] = useContext(CartContext);

    var totalCost = cart.reduce(function(_this, val) {
        val = JSON.parse(val);
        return parseFloat(_this) + parseFloat((val[0].price));
    }, 0);

    const removeFromCart = (removeItem) => {
        console.log(removeItem);
        let cartCopy = [...cart];
        const j = cartCopy.findIndex(cartItem => { return (JSON.parse(cartItem)[0].id == removeItem) });
        cartCopy.splice([j], 1);
        setCart(cartCopy);
        localStorage.setItem("cart", JSON.stringify(cartCopy))
    }

    return (
        <div className="Cart">
            <Grid item>
                <div className="cartTitleSection">
                    <span className="cartTitle">CART</span>&nbsp;&nbsp;&nbsp;
                    <span className="cartCount">{cart.length}</span>
                </div>
                <TableContainer component={Paper}>
                    <Table className="Table" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ITEM</TableCell>
                            <TableCell align="right">PRICE</TableCell>
                            <TableCell align="center">QUANTITY</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((cartItems) => (
                                <TableRow key={JSON.parse(cartItems)[0].id}>
                                    <TableCell component="th" scope="row">
                                        <Image
                                            src={JSON.parse(cartItems)[0].image}
                                            width={50}
                                            height={50}/>
                                            < br/>
                                        <div className="cartTitle">{JSON.parse(cartItems)[0].title}</div>
                                    </TableCell>
                                    <TableCell align="right">£{JSON.parse(cartItems)[0].price}</TableCell>
                                    <TableCell align="center">
                                        {JSON.parse(cartItems)[0].quantity}
                                        <div className="removeItemElement">
                                            <Button 
                                                onClick={() => removeFromCart(JSON.parse(cartItems)[0].id)} 
                                                variant="contained" 
                                                color="secondary" >
                                                    REMOVE
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="tableTotalRow">
                                <TableCell>
                                    <div className="totalCost">
                                        Total
                                    </div>
                                </TableCell><TableCell>
                                </TableCell>
                                <TableCell align="right">
                                    £{totalCost.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
            </Grid>
        </div>
    )
}