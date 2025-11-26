// Mock data for testing purposes when database is not available
export const mockProducts = [
  {
    id: 1,
    name: "Modern Coffee Table",
    description: "Elegant glass and steel coffee table with minimalist design",
    price: 399.99,
    image_url: "modern-coffee-table",
    images: ["modern-coffee-table", "modern-coffee-table-2", "modern-coffee-table-3"],
    primary_image: "modern-coffee-table",
    category: "Furniture"
  },
  {
    id: 2,
    name: "Designer Armchair",
    description: "Comfortable and stylish armchair with premium fabric",
    price: 599.99,
    image_url: "designer-armchair",
    images: ["designer-armchair", "designer-armchair-2"],
    primary_image: "designer-armchair",
    category: "Furniture"
  },
  {
    id: 3,
    name: "Vintage Lamp",
    description: "Beautiful vintage table lamp with brass finish",
    price: 149.99,
    image_url: "vintage-lamp",
    images: ["vintage-lamp", "vintage-lamp-2", "vintage-lamp-3"],
    primary_image: "vintage-lamp",
    category: "Lighting"
  },
  {
    id: 4,
    name: "Contemporary Sofa",
    description: "Luxurious three-seater sofa with modern design",
    price: 1299.99,
    image_url: "contemporary-sofa",
    images: ["contemporary-sofa", "contemporary-sofa-2"],
    primary_image: "contemporary-sofa",
    category: "Furniture"
  },
  {
    id: 5,
    name: "Decorative Rug",
    description: "Handwoven rug with intricate pattern and soft texture",
    price: 249.99,
    image_url: "decorative-rug",
    images: ["decorative-rug", "decorative-rug-2"],
    primary_image: "decorative-rug",
    category: "Decor"
  },
  {
    id: 6,
    name: "Wall Art Collection",
    description: "Set of three abstract art pieces for modern interiors",
    price: 199.99,
    image_url: "wall-art",
    images: ["wall-art", "wall-art-2", "wall-art-3"],
    primary_image: "wall-art",
    category: "Decor"
  },
  {
    id: 7,
    name: "Dining Table Set",
    description: "Six-seater dining table with matching chairs",
    price: 1799.99,
    image_url: "dining-table",
    images: ["dining-table", "dining-table-2", "dining-table-3"],
    primary_image: "dining-table",
    category: "Furniture"
  },
  {
    id: 8,
    name: "Bedroom Dresser",
    description: "Spacious dresser with six drawers and elegant handles",
    price: 799.99,
    image_url: "bedroom-dresser",
    images: ["bedroom-dresser", "bedroom-dresser-2"],
    primary_image: "bedroom-dresser",
    category: "Furniture"
  }
];

export const mockCartItems = [
  {
    id: 1,
    product_id: 1,
    name: "Modern Coffee Table",
    price: 399.99,
    quantity: 1,
    image_url: "modern-coffee-table"
  }
];

export const mockOrders = [
  {
    id: 1,
    user_id: 1,
    total: 399.99,
    status: "completed",
    created_at: new Date().toISOString(),
    items: [
      {
        id: 1,
        product_id: 1,
        name: "Modern Coffee Table",
        price: 399.99,
        quantity: 1
      }
    ]
  }
];

export const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "customer"
};

export const mockAdminUser = {
  id: 2,
  name: "Admin User",
  email: "admin@example.com",
  role: "admin"
};