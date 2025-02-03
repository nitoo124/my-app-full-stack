import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live"; // Ensure this is correctly imported

export const getMyOrders = async (userId: string) => {
  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      ...,
      product[] {
        ...,
        products->{
         _id,
          name,
          price,
          image}
      }
    }
  `);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId }, // Pass the userId as a parameter
    });

    return orders.data; // Return the data or an empty array if no orders are found
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error ("Error fetching orders")
  }
};