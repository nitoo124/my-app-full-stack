interface Product {
    _id: string;
    name: string;
    description: Array<{
      _key: string;
      _type: string;
      children: Array<{
        _key: string;
        _type: string;
        text: string;
      }>;
      style: string;
      listItem?: string;
      level?: number;
    }>;
    categories: Array<{
      _type: string;
      _key: string;
      _ref: string;
    }>;
    price: number;
    stock: number;
    slug: {
      current: string;
      _type: string;
    };
    image: {
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    };
    sizes?: string[];
    _type: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
  }
  