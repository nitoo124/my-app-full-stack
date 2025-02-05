import React from 'react';
import { Products } from '../../../../sanity.types';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

function ProductCard({ product }: { product: Products }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col rounded-lg border  border-gray-200 shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 overflow-hidden ${
        isOutOfStock ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <div className="relative w-full h-64 bg-gray-100">
        {product.image && (
          <Image
            src={urlFor(Array.isArray(product.image) ? product.image[0] : product.image).url()}
            alt={product.name || 'Product Image'}
            loading="lazy"
            fill
            sizes="100%"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="font-bold text-lg text-white">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4 bg-white flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name || 'Unnamed Product'}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description?.map((block) =>
            block._type === 'block'
              ? block.children?.map((child) => child.text).join('')
              : ''
          ).join(' ') || 'No description available'}
        </p>
        <p className="mt-4 text-lg font-semibold text-green-600">${product.price?.toFixed(2)}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
