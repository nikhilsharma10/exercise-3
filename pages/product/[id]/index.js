import React, {useState} from 'react';
import { Grid, Select, MenuItem } from '@material-ui/core'
import Image from 'next/image'
import parse from 'html-react-parser';
import { server } from '../../../config'

const product = ({productWithId}) => {

    const [available, setAvailable] = useState();
    const [selectValue, setSelectValue] = useState(productWithId.variants[0].title);

    const handleVariantChange = (event) => {
        const selectedVariant = event.target.value;
        productWithId.variants.map((variant) => {
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
                    src={productWithId['images'][0].src}
                    width={700}
                    height={700}/>
            </Grid>
            <Grid item className="productPageDetails">
                <div className="productPageTitle">
                    <h2>{productWithId.title}</h2>
                </div>
                <div className="productPageBody">
                    {parse(productWithId.body_html)}
                </div>
                < br/>
                <div className="productPageVendor">
                    Vendor: {productWithId.vendor}
                </div>
                < br/>
                <div className="productPageVariants">
                    <span className="productPageVariantTitle">Variants:</span>
                    <Select onChange={handleVariantChange} 
                            value={selectValue} 
                            className="productPageDropdown">
                        {productWithId.variants.map((variant) => (
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
                    Price: £{productWithId['variants'][0].price}
                </div>
            </Grid>
        </Grid>
    )
}

export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/resources/products.json`);
    const product = await res.json();
    const productId = `${context.params.id}`;
    let productWithId;

    Object.keys(product['products']).map((type) => {
        if (product['products'][type].id == productId) {
            productWithId = product['products'][type];
        }
    })

    return {
        props: {
            productWithId,
        },
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/resources/products.json`);
    const products = await res.json();

    const ids = products['products'].map((product) => product.id)
    const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}

export default product