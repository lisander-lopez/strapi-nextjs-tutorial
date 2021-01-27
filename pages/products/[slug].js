import Head from 'next/head';
import { twoDecimals } from '../../actions/format';

import { fromImageToUrl } from '../../actions/image';
import { API_URL } from '../../config';
import { useRouter } from 'next/router'

export async function getStaticProps(contx) {
    const slug = contx.params.slug;
    const res = await fetch(`${API_URL}/products/?slug=${slug}`);
    const product = await res.json();

    return {
        props: {
            product: product[0]
        },
        revalidate: 1
    }
}

export async function getStaticPaths(){
    const res = await fetch(`${API_URL}/products/`);
    const products = await res.json();
    return {
        paths: products.map(product => {
                return (
                    {
                        params: { 
                            slug: String(product.slug)
                        }
                    }
                );
            }
        ),
        fallback: false
    }
}

const Product = ({product}) => {
    const router = useRouter();
    return (
        <div>
            {
                router.isFallback &&
                    <h1>This page is not current!</h1>
            }
            {/* MINIMAL SEO Stuff */}
            <Head>
                {
                    product.meta_title &&
                        <title> {product.meta_title} </title>
                }

                {
                    product.meta_description &&
                        <meta name="description" content={product.meta_description} />
                }
            </Head>
            <h3>{ product.name }</h3>
            <img src={ fromImageToUrl(product.image) } alt=""/>
            <h3>{ product.name }</h3>
            <span>${ twoDecimals(product.price) }</span>
            <p>{ product.content }</p>
        </div>
    )
}

export default Product;