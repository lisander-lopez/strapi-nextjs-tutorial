import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.scss'

import { fromImageToUrl } from '../actions/image';
import { twoDecimals } from '../actions/format';
import { API_URL } from '../config';

export async function getStaticProps(){
  const res = await fetch(`${API_URL}/products/`);
  const products = await res.json();

  return {
    props: {
      products
    },
    revalidate: 1
  }
}


export default function Home({products}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        products.map(product => {
          return(
            <div key={product.name} className={styles.product}>
              <Link href={`/products/${product.slug}`}>
                <a>
                  <div className={styles.product__Row}>
                    
                    <div className={styles.product__ColImg}>
                      <img src={fromImageToUrl(product.image)} /> 
                    </div>
                    
                    <div className={styles.product__Col}> 
                      {product.name} ${twoDecimals(product.price)}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })
      }
    </div>
  )
}
