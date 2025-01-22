import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "products",
  title: "Product Name",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Product name",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name", // Automatically generates slug from the name
        maxLength: 96, // Optional: limit the slug length
      },
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      title: "Product Image",
    }),
    defineField({
      name: "description",
      type: "array",
      title: "Product Description",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Product Price",
    }),
    defineField({
      name: "stock",
      type: "number",
      title: "Stock Quantity",
      description: "Available stock for the product",
    }),
    defineField({
      name: "sizes",
      type: "array",
      title: "Available Sizes",
      description: "Select the sizes available for this product",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags", // Displays sizes as tags in the Studio
      },
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      title: "Product Category",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `$${select.subtitle}`,
        media: select.media,
      };
    },
  },
});
