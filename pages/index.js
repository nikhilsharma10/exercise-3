import Head from 'next/head'
import { Cart } from '../components/Cart';
import ProductList from '../components/ProductList'
import { server } from '../config'

export default function Home({products}) {
  return (
    <div>
      <Head>
        <title>My awesome shopping site</title>
      </Head>
      <div className="productSection">
        <Cart />
        <ProductList products={{products}} />
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${server}/resources/products.json`);
  const products = await res.json();
  return {
    props: {
      products
    }
  }
}