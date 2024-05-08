export interface JoinMember {
  id: string;
  pw: string;
  name: string;
  email: string;
  role: string;
}

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
  category: number;
  updatedAt: string;
}

export interface Order {
  menuCount: number;
  totalPrice: number;
  status: string;
  memberIdx: number;
  purchaseIdx: string;
}
