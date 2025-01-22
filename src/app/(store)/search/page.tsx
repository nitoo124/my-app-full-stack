import ProductGrid from "@/app/components/pages/productGrid";
import { searchProductByName } from "@/sanity/lib/products/searchProductByName";

async function Searchpage({ searchParams }: any) {
  const { query } = await searchParams;
  const products = await searchProductByName(query);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white shadow-md rounded-md p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            No products found for: <span className="text-red-500">{query}</span>
          </h1>
          <p className="text-gray-600">Try searching with different keywords</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Search results for <span className="text-purple-500">{query}</span>
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default Searchpage;
