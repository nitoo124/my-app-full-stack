import { formatCurrency } from '@/sanity/lib/formatCurrency';
import { urlFor } from "@/sanity/lib/image";
import { getMyOrders } from '@/sanity/lib/orders/getMyOrders';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function Orders() {
  const { userId } = await auth();

  // Redirect if user is not logged in
  if (!userId) {
    return redirect('/');
  }

  // Fetch orders
  const orders = await getMyOrders(userId);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl'>
        <h1 className='text-4xl font-bold text-gray-900 tracking-tight mb-8'>My Orders</h1>

        {orders.length === 0 ? (
          <div>
            <p>You have not placed any order yet.</p>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className='bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6 p-4'
              >
                <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4'>
                  <p className='text-sm text-gray-600 mb-1 font-bold'>Order Number</p>
                  <p className='font-mono text-sm text-green-600 break-all'>{order.orderNumber}</p>
                </div>

                <div className='sm:text-right'>
                  <p className='text-sm text-gray-600 mb-1 font-bold'>Order Date</p>
                  <p>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</p>
                </div>

                <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center'>
                  <div className='flex items-center'>
                    <span className='text-sm mr-2'>Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.orderStatus === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className='sm:text-right'>
                    <p className='text-sm text-gray-600 mb-1'>Total Amount</p>
                    <p className='font-bold text-lg'>
                      {formatCurrency(order.totalPrice ?? 0, order.currency)}
                    </p>
                  </div>
                </div>

                {order.amountDiscount ? (
                  <div className='mt-4 p-3 sm:p-4 bg-red-50 rounded-lg'>
                    <p className='text-red-600 font-medium mb-1 text-sm sm:text-base'>
                      Discount Applied: {formatCurrency(order.amountDiscount, order.currency)}
                    </p>
                    <p className='text-sm text-gray-600'>
                      Original Subtotal:{' '}
                      {formatCurrency(
                        (order.totalPrice ?? 0) + order.amountDiscount,
                        order.currency
                      )}
                    </p>
                  </div>
                ) : null}

                <div className='px-4 py-3 sm:px-6 sm:py-4'>
                  <p className='text-sm font-semibold text-gray-600 mb-3 sm:mb-4'>
                    Order Items
                  </p>

                  <div className='space-y-3 sm:space-y-4'>
                    {order.product?.map((product, index) => {
                      // Skip if product or product.products is null/undefined
                      if (!product?.products) return null;

                      return (
                        <div key={product.products._id || index} className='flex items-center gap-4'>
                          {product.products.image && (
                            <Image
                              src={urlFor(product.products.image).url()}
                              alt={product.products.name || 'Product Image'}
                              width={50}
                              height={50}
                              loading='lazy'
                              className='object-cover w-12 h-12' // Removed rounded-full
                            />
                          )}
                          <div>
                            <p className='text-sm font-medium text-gray-900'>{product.products.name}</p>
                            <p className='text-sm text-gray-600'>
                              Quantity: {product.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;