export const COUPON_CODES ={
    BMega : "BMega",
    xmAS2021:"xmAS2021",
    NY2022 : "NY2022",
} as const;

export type CouponCode = keyof typeof COUPON_CODES