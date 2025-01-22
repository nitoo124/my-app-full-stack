import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getProductBySlug =async(slug:string)=>{

    const PRODUCT_BY_TO_QUERY = defineQuery(`
        *[
        _type == "products" && slug.current == $slug
        ] | order(name asc)[0]
        `);


        try{
            const product = await sanityFetch({
                query : PRODUCT_BY_TO_QUERY,
                params:{
                    slug,
                }
            })
            return product.data || null;
        }catch(error){
            console.error("Error fetching product by id", error);
            return null;
        }
    

}