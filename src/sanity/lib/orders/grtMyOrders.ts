import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getMyOrders =async (userId: string)=>{
    const MY_ORDERS_QUERY = defineQuery(`
         *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      ...,
      product[] {
        ...,
        products->
      }
    `);
    try{
        const categories = await sanityFetch({
            query:MY_ORDERS_QUERY
        });

        return categories.data ||[];
}catch(error){
    console.error("Error fetching all products:", error);
    return ["Error fetching orders"];
}


}

