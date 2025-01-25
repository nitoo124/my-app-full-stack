import Productview from "@/app/components/pages/productview";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const products = await getProductsByCategory(slug);
  const categories = await getAllCategories();
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 py-12 px-6">
      {/* Page Container */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-5xl">
        {/* Page Title */}
        <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8">
          {slug
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Collection
        </h1>
        {/* Product View Component */}
        <Productview products={products} categories={categories} />
      </div>
    </div>
  );
}

export default page;
