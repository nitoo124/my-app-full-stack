import AddToBasket from "@/app/components/pages/addToBasket";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

async function Productpage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div
          className={`relative aspect-square overflow-hidden rounded-xl shadow-lg border border-gray-200 ${
            isOutOfStock ? "opacity-60" : ""
          }`}
        >
          {product.image && (
            <Image
              src={urlFor(
                Array.isArray(product.image) ? product.image[0] : product.image
              ).url()}
              alt={product.name || "Product Image"}
              loading="lazy"
              fill
              sizes="100%"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              {product.name}
            </h1>
            <div className="text-2xl font-bold text-green-600 mb-4">
              ${product.price?.toFixed(2)}
            </div>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>
          {/* Add to Cart Button */}
          <div className="mt-6">
            <AddToBasket product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productpage;
