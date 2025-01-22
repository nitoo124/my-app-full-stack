import { COUPON_CODES } from "@/sanity/lib/sales/couponCode";
import { getActiveSalesByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import Image from "next/image";

async function MegaSaleBanner() {
  const sale = await getActiveSalesByCouponCode(COUPON_CODES.BMega);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className=" mb-5 flex flex-col lg:flex-row justify-between items-center max-w-screen-xl mx-auto bg-gradient-to-r from-purple-700 to-black text-white px-6 py-10 mt-2 rounded-lg shadow-lg">
      {/* Content Section */}
      <div className="p-4 text-center lg:text-start flex-1">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{sale.title}</h2>
        <p className="text-lg sm:text-xl font-semibold mt-2 mb-6">{sale.description}</p>

        <div className="flex justify-center lg:justify-start">
          <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition sm:text-lg text-base">
            <span>
              Use Code:{" "}
              <span className="text-purple-700">{sale.couponCode}</span>
            </span>
            <span className="ml-2 font-bold sm:text-lg text-base">for {sale.discountAmount}% OFF</span>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-6 lg:mt-0 flex-1 flex justify-center">
        <Image
          src={"/hero.png"}
          alt="hero image"
          width={500}
          height={500}
          className="max-w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}

export default MegaSaleBanner;
