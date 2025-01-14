export type Cart = {
    userId: string;
    items: Array<{
      description: string;
      id: string;
      name: string;
      price: number;
      quantity: number;
      imageString: string;
    }>;
  };