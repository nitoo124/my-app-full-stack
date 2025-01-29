import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const order = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      type: "string",
      title: "Order Number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripeCustomerId",
      type: "string",
      title: "Stripe Customer ID",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripePaymentIntentId",
      type: "string",
      title: "Stripe Payment Intent ID",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clerkUserId",
      type: "string",
      title: "Clerk User ID",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      type: "string",
      title: "Customer Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Customer Email",
      validation: (Rule) => Rule.required().email(), // Added email validation
    }),
    defineField({
      name: "products",
      type: "array",
      title: "Products",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product Bought",
              type: "reference",
              to: [{ type: "products" }],
            }),
            defineField({
              name: "quantity",
              type: "number",
              title: "Quantity Purchased",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "orderStatus",
      type: "string",
      title: "Order Status",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orderDate",
      type: "datetime",
      title: "Order Date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "totalPrice",
      type: "number",
      title: "Total Price",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "currency",
      type: "string",
      title: "Currency",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amountDiscount",
      type: "number",
      title: "Amount Discount",
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency:  "currency",
      orderId: "orderNumber",
      email : "email" // Entire product array
    },
    prepare(select) {
    const orderIdSnippet= `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
    return{
      title: `${select.name}(${orderIdSnippet})`,
      subtitle: `${select.amount}${select.currency}, ${select.email}`,
      media : BasketIcon
    }
    },
  },
});
