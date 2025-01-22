import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"
import { console } from "inspector";

export const getProductsByCategory = async (categorySlug : string)=>{
     const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[
        _type == "products" && references(*[_type == "category" && slug.current == $categorySlug]._id)
        ] | order(name asc)
        `);
        try{
            const product = await sanityFetch({
                query : PRODUCTS_BY_CATEGORY_QUERY,
                params:{
                    categorySlug,
                }
            });
        return product.data || [];
        }catch(error){
            console.error("Error fetching products by category:", error);
            return [];
        }

     


        }
