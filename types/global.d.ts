declare module "types/global.d.ts" {
  interface Product {
    id: number;
    brand_id: number;
    category_id: number;
    name: string;
    yield: number;
    color: string;
    stocks_available: number;
    part_number: string;
    item_number: string;
    item_description: string;
    compatible_with: string;
    suppliers_price: string;
    our_price: string;
    thumbnail: string;
    created_at: string;
    updated_at: string;
  }
}
