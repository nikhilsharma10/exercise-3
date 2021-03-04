import React, {useState} from 'react';
import { Grid, Select, MenuItem } from '@material-ui/core'
import Image from 'next/image'
import parse from 'html-react-parser';
import { server } from '../../../config'
import productData from '../../../data/products.json'

const product = ({productWithHandle}) => {

    const [available, setAvailable] = useState();
    const [selectValue, setSelectValue] = useState(productWithHandle.variants[0].title);

    const handleVariantChange = (event) => {
        const selectedVariant = event.target.value;
        productWithHandle.variants.map((variant) => {
            if (variant.title == selectedVariant) {
                setAvailable(variant.available);
                setSelectValue(variant.title);
            }
        })
    }

    return (
        <Grid container className="containerProductPage">
            <Grid item className="productPageImage">
                <Image
                    src={productWithHandle['images'][0].src}
                    alt={productWithHandle.title + " Image"}
                    width={700}
                    height={700}/>
            </Grid>
            <Grid item className="productPageDetails">
                <div className="productPageTitle">
                    <h2>{productWithHandle.title}</h2>
                </div>
                <div className="productPageBody">
                    {parse(productWithHandle.body_html)}
                </div>
                < br/>
                <div className="productPageVendor">
                    Vendor: {productWithHandle.vendor}
                </div>
                < br/>
                <div className="productPageVariants">
                    <span className="productPageVariantTitle">Variants:</span>
                    <Select onChange={handleVariantChange} 
                            value={selectValue} 
                            className="productPageDropdown">
                        {productWithHandle.variants.map((variant) => (
                            <MenuItem key={variant.id} name={variant.id} value={variant.title}>{variant.title}</MenuItem>
                        ))}
                    </Select>
                </div>
                < br/>
                <div className="productPageAvailable">
                    Available: {(available) ? 'Yes' : 'No' }
                </div>
                < br/>
                < br/>
                <div className="productPagePrice">
                    Price: £{productWithHandle['variants'][0].price}
                </div>
            </Grid>
        </Grid>
    )
}

export const getStaticProps = async (context) => {
    //const res = await fetch(`${server}/resources/products.json`);
    //const product = await res.json();
    const product = productData;
    const productHandle = `${context.params.handle}`;
    let productWithHandle;

    Object.keys(product['products']).map((type) => {
        if (product['products'][type].handle == productHandle) {
            productWithHandle = product['products'][type];
        }
    })

    return {
        props: {
            productWithHandle,
        },
    }
}

export const getStaticPaths = async () => {
    //const res = await fetch(`${server}/resources/products.json`);
    //const products = await res.json();

    const products = productData;

    const handles = products['products'].map((product) => product.handle)
    const paths = handles.map((handle) => ({ params: { handle: handle.toString() } }))

    //console.log(handles);
    //console.log(paths);

  return {
    paths,
    fallback: false,
  }
}

export default product