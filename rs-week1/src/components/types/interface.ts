interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];
}

interface IProductProps {
  product: IProduct;
}

interface IFormCard {
  id?: number;
  title: string;
  description: string;
  price: number;
  date: string;
  productStatus: string;
  category: string;
  imageUrl: string;
}

interface IFormCardProps {
  product: IFormCard;
}

export { IProduct, IProductProps, IFormCard, IFormCardProps };
