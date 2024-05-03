export interface Cart {
  name: string;
  price: number;
  count: number;
}

export interface MenuItem {
  idx: number;
  name: string;
  imageUrl: string;
  price: number;
  categoryIdx: number;
  updatedAt: string;
}
