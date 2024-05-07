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
  categoryIdx: number;
  updatedAt: string;
}
