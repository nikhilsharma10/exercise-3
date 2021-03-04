import React, { useContext } from "react";
import { Button, Grid } from '@material-ui/core'
import Link from 'next/link'
import { useEffect } from 'react'
import { CartContext } from "./CartContext"
import Image from 'next/image'

const ProductItem = ({product}) => {

    const [cart, setCart] = useContext(CartContext);

    useEffect(() => {
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || '[]';
        if (cartFromLocalStorage !== '[]') {
            setCart(cartFromLocalStorage);
        }
    }, []);

    const addToCart = (product) => {
        const numbers = [{"id": product.id, "title": product.title, 
                        "image": product['images'][0].src, "price": product['variants'][0].price, 
                        "quantity" : 1}];

        let cartCopy = [...cart];
        let {id} = product;
        let existingItem = cartCopy.find(cartItem => { return (JSON.parse(cartItem)[0].id == id) });

        if (existingItem) {
            existingItem = JSON.parse(existingItem)[0];
            existingItem.quantity = existingItem.quantity + 1;
            existingItem.price = existingItem.price * 2;
            const j = cartCopy.findIndex(cartItem => { return (JSON.parse(cartItem)[0].id == id) });
            cartCopy.splice([j], 1);
            cartCopy.push('[' + JSON.stringify(existingItem) + ']');
        } else { 
            cartCopy.push(JSON.stringify(numbers))
        }

        setCart(cartCopy);
        localStorage.setItem("cart", JSON.stringify(cartCopy))
    }

    return (
        <div className="productContainer">
            <Grid item className="productItem">
                <Link href="/product/[id]" as={`/product/${product.id}`}>
                    <a>
                        <Image
                            src={product['images'][0].src}
                            width={500}
                            height={500}/>
                        <div className="productTitle">{product.title}</div>
                        <div className="productCost">£{product['variants'][0].price}</div>
                    </a>
                </Link>
                <Button 
                    onClick={() => addToCart(product)} 
                    variant="contained" 
                    color="primary" >
                        ADD TO CART
                </Button>
            </Grid>
        </div>
    )
}

export default ProductItem;