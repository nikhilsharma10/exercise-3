import ProductItem from './ProductItem'

const ProductList = ({products}) => {
    const productsArray = {products}.products.products.products;
    return (
        <div className="productsGrid">
            {productsArray.map((product) => (
                <ProductItem key={product.id} product={product}/> 
            ))}
        </div>
    )
}

export default ProductList;